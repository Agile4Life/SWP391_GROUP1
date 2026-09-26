import json, sys
from pathlib import Path
chunks = json.loads(Path("graphify-out/.graphify_chunks.json").read_text(encoding="utf-8"))
prompt_template = Path(r"c:\Users\gkgam\OneDrive\Tài liệu\GitHub\SWP391_GROUP1\.agents\skills\graphify\references\extraction-spec.md").read_text(encoding="utf-8")

cwd = Path(".").resolve()
prompts_dir = cwd / "graphify-out" / "chunk_prompts"
prompts_dir.mkdir(exist_ok=True)
total_chunks = len(chunks)

for i, chunk_files in enumerate(chunks):
    chunk_num = i + 1
    file_list_str = "\n".join(chunk_files)
    chunk_path = cwd / "graphify-out" / f".graphify_chunk_{chunk_num:02d}.json"
    
    prompt = prompt_template.replace("FILE_LIST", file_list_str)
    prompt = prompt.replace("CHUNK_NUM", str(chunk_num))
    prompt = prompt.replace("TOTAL_CHUNKS", str(total_chunks))
    prompt = prompt.replace("DEEP_MODE", "")
    prompt = prompt.replace("CHUNK_PATH", str(chunk_path))
    
    prompt_file = prompts_dir / f"chunk_{chunk_num:02d}.txt"
    prompt_file.write_text(prompt, encoding="utf-8")
print(f"Created {total_chunks} prompt files")
