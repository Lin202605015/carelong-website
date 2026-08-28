# -*- coding: utf-8 -*-
import shutil, os

src = r'D:\OneDrive\桌面\工厂图\Stamping Workshop'
dst = r'C:\temp-stamping'
os.makedirs(dst, exist_ok=True)

files = sorted(os.listdir(src))
print('Source:', files)
for i, f in enumerate(files, 1):
    ext = os.path.splitext(f)[1].lower()
    shutil.copy2(os.path.join(src, f), os.path.join(dst, f'stamping-workshop-{i}{ext}'))
print('Done:', sorted(os.listdir(dst)))
