import json
from pathlib import Path
detect = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding="utf-8"))
words = detect.get("total_words", 0)
files = detect.get("total_files", 0)
code = len(detect.get("files", {}).get("code", []))
docs = len(detect.get("files", {}).get("document", []))
papers = len(detect.get("files", {}).get("paper", []))
images = len(detect.get("files", {}).get("image", []))
videos = len(detect.get("files", {}).get("video", []))
print(f"Corpus: {files} files · ~{words} words")
if code: print(f"  code:     {code} files")
if docs: print(f"  docs:     {docs} files")
if papers: print(f"  papers:   {papers} files")
if images: print(f"  images:   {images} files")
if videos: print(f"  video:    {videos} files")
if detect.get("skipped_sensitive"):
    print(f"Skipped {len(detect['skipped_sensitive'])} sensitive files: {', '.join([Path(p).name for p in detect['skipped_sensitive']])}")
