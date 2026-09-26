import json, sys
from pathlib import Path
chunks = json.loads(Path("graphify-out/.graphify_chunks.json").read_text(encoding="utf-8"))
prompt_template = Path(r"c:\Users\gkgam\OneDrive\Tài liệu\GitHub\SWP391_GROUP1\.agents\skills\graphify\references\extraction-spec.md").read_text(encoding="utf-8")

subagents = []
total_chunks = len(chunks)
cwd = Path(".").resolve()

for i, chunk_files in enumerate(chunks):
    chunk_num = i + 1
    file_list_str = "\n".join(chunk_files)
    chunk_path = cwd / "graphify-out" / f".graphify_chunk_{chunk_num:02d}.json"
    
    prompt = prompt_template.replace("FILE_LIST", file_list_str)
    prompt = prompt.replace("CHUNK_NUM", str(chunk_num))
    prompt = prompt.replace("TOTAL_CHUNKS", str(total_chunks))
    prompt = prompt.replace("DEEP_MODE", "")
    prompt = prompt.replace("CHUNK_PATH", str(chunk_path))
    
    subagents.append({
        "TypeName": "research",
        "Role": f"Extraction {chunk_num:02d}",
        "Prompt": f"Task(description='Your task is to perform the following. Follow the instructions below exactly.\n\n<agent-instructions>\n{prompt}\n</agent-instructions>\n\nExecute this now. Output ONLY the structured JSON response and WRITE it to {chunk_path}.')",
        "Model": "flash"
    })

Path("graphify-out/subagents_payload.json").write_text(json.dumps(subagents, ensure_ascii=False), encoding="utf-8")
print(f"Generated payload for {len(subagents)} subagents")
