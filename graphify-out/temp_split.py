from pathlib import Path
uncached = [line for line in Path("graphify-out/.graphify_uncached.txt").read_text(encoding="utf-8").splitlines() if line]
docs = [f for f in uncached if not Path(f).suffix.lower() in [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]]
images = [f for f in uncached if Path(f).suffix.lower() in [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]]

chunks = []
chunk_size = 20
for i in range(0, len(docs), chunk_size):
    chunks.append(docs[i:i+chunk_size])
for img in images:
    chunks.append([img])

import json
Path("graphify-out/.graphify_chunks.json").write_text(json.dumps(chunks, ensure_ascii=False), encoding="utf-8")
print(f"Split {len(uncached)} files into {len(chunks)} chunks")
