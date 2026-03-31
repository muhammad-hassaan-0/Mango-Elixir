import os

folder = "./public/assets/sequence"

# Get all jpg files
files = [f for f in os.listdir(folder) if f.lower().endswith(".jpg")]

# Sort properly (handles numbers like 1, 2, 10 correctly)
files.sort(key=lambda x: int(''.join(filter(str.isdigit, x)) or 0))

# Rename
for i, filename in enumerate(files, start=1):
    new_name = f"ezgif-frame-{i:03d}.jpg"
    
    src = os.path.join(folder, filename)
    dst = os.path.join(folder, new_name)
    
    os.rename(src, dst)

print("Done renaming الملفات ✅")