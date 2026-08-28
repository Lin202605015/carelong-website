# -*- coding: utf-8 -*-
import shutil
import os

src = r'D:\OneDrive\桌面\工厂图\Display Rack Workshop'
dst = r'C:\temp-display'
os.makedirs(dst, exist_ok=True)

files = sorted(os.listdir(src))
print('Source files:', files)

for i, f in enumerate(files, 1):
    src_path = os.path.join(src, f)
    ext = os.path.splitext(f)[1].lower()
    dst_name = f'display-workshop-{i}{ext}'
    dst_path = os.path.join(dst, dst_name)
    shutil.copy2(src_path, dst_path)
    print(f'Copied: {f} -> {dst_name}')

print('\nDone. Files in temp:')
for f in sorted(os.listdir(dst)):
    size = os.path.getsize(os.path.join(dst, f))
    print(f'  {f} ({size//1024}KB)')
