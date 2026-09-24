import os
import sys
import json
from pathlib import Path

def main():
    ROOT = Path(".").resolve()
    OUT = ROOT / "graphify-out"
    OUT.mkdir(exist_ok=True)

    # Step 1: Write python and root markers
    (OUT / ".graphify_python").write_text(sys.executable, encoding="utf-8")
    (OUT / ".graphify_root").write_text(str(ROOT), encoding="utf-8")

    # Step 2: Detect
    from graphify.detect import detect
    print("Step 2: Detecting codebase files...")
    detection = detect(ROOT)
    (OUT / ".graphify_detect.json").write_text(json.dumps(detection, ensure_ascii=False, indent=2), encoding="utf-8")
    total = detection.get("total_files", 0)
    files_dict = detection.get("files", {})
    print(f"Detected {total} files:")
    for cat, flist in files_dict.items():
        if flist:
            print(f"  - {cat}: {len(flist)} files")

    # Step 3: AST Extraction
    from graphify.extract import collect_files, extract
    print("\nStep 3: Running AST structural extraction...")
    code_files = []
    for f in files_dict.get("code", []):
        p = Path(f)
        if p.is_dir():
            code_files.extend(collect_files(p))
        elif p.exists():
            code_files.append(p)

    if code_files:
        print(f"Extracting AST from {len(code_files)} code files...")
        ast_result = extract(code_files, cache_root=ROOT)
        (OUT / ".graphify_ast.json").write_text(json.dumps(ast_result, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"AST extracted: {len(ast_result.get('nodes', []))} nodes, {len(ast_result.get('edges', []))} edges")
    else:
        ast_result = {"nodes": [], "edges": [], "input_tokens": 0, "output_tokens": 0}
        (OUT / ".graphify_ast.json").write_text(json.dumps(ast_result, ensure_ascii=False), encoding="utf-8")
        print("No code files found.")

    # Step 3B: Semantic / Docs
    sem_result = {"nodes": [], "edges": [], "hyperedges": [], "input_tokens": 0, "output_tokens": 0}
    (OUT / ".graphify_semantic.json").write_text(json.dumps(sem_result, ensure_ascii=False), encoding="utf-8")

    # Step 3C: Merge
    merged_nodes = list(ast_result.get("nodes", []))
    seen = {n["id"] for n in merged_nodes}
    for n in sem_result.get("nodes", []):
        if n["id"] not in seen:
            merged_nodes.append(n)
            seen.add(n["id"])

    merged_edges = ast_result.get("edges", []) + sem_result.get("edges", [])
    merged_extract = {
        "nodes": merged_nodes,
        "edges": merged_edges,
        "hyperedges": sem_result.get("hyperedges", []),
        "input_tokens": 0,
        "output_tokens": 0,
    }
    (OUT / ".graphify_extract.json").write_text(json.dumps(merged_extract, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Merged extraction: {len(merged_nodes)} nodes, {len(merged_edges)} edges")

    # Step 4: Build graph and cluster
    from graphify.build import build_from_json
    from graphify.cluster import cluster, score_all
    from graphify.analyze import god_nodes, surprising_connections, suggest_questions
    from graphify.report import generate
    from graphify.export import to_json

    print("\nStep 4: Building graph and clustering...")
    G = build_from_json(merged_extract, root=str(ROOT), directed=False)
    if G.number_of_nodes() == 0:
        print("ERROR: Graph is empty.")
        sys.exit(1)

    communities = cluster(G)
    cohesion = score_all(G, communities)
    gods = god_nodes(G)
    surprises = surprising_connections(G, communities)

    # Generate human-readable labels for communities
    labels = {}
    for cid in communities:
        comm_nodes = communities[cid]
        best_node = None
        best_deg = -1
        for n in comm_nodes:
            deg = G.degree(n) if n in G else 0
            if deg > best_deg:
                best_deg = deg
                best_node = n
        if best_node:
            clean_name = str(best_node).split(".")[-1].split("/")[-1].replace("_", " ").title()
            labels[cid] = f"{clean_name} ({len(comm_nodes)} nodes)"
        else:
            labels[cid] = f"Community {cid} ({len(comm_nodes)} nodes)"

    questions = suggest_questions(G, communities, labels)
    tokens = {"input": 0, "output": 0}

    wrote = to_json(G, communities, str(OUT / "graph.json"), community_labels=labels)
    print(f"Wrote graph.json: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges, {len(communities)} communities")

    report = generate(G, communities, cohesion, labels, gods, surprises, detection, tokens, str(ROOT), suggested_questions=questions)
    (OUT / "GRAPH_REPORT.md").write_text(report, encoding="utf-8")
    print("Wrote GRAPH_REPORT.md")

    analysis = {
        "communities": {str(k): v for k, v in communities.items()},
        "cohesion": {str(k): v for k, v in cohesion.items()},
        "gods": gods,
        "surprises": surprises,
        "questions": questions,
    }
    (OUT / ".graphify_analysis.json").write_text(json.dumps(analysis, indent=2, ensure_ascii=False), encoding="utf-8")
    (OUT / ".graphify_labels.json").write_text(json.dumps({str(k): v for k, v in labels.items()}, ensure_ascii=False), encoding="utf-8")

    # Step 5: Export HTML
    print("\nStep 5: Exporting interactive HTML visualization...")
    try:
        from graphify.export import to_html
        to_html(G, communities, str(OUT / "graph.html"), community_labels=labels)
        print("Wrote graph.html")
    except Exception as e:
        print(f"HTML export error: {e}")

    print("\nGraphify initialization complete successfully!")

if __name__ == "__main__":
    main()
