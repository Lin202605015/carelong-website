import zipfile, re, sys, io
out = io.open('track-docx-out.txt', 'w', encoding='utf-8')
sys.stdout = out
from xml.etree import ElementTree as ET

path = 'track-bolts-src.docx'
z = zipfile.ZipFile(path)
xml = z.read('word/document.xml').decode('utf-8')
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

# Extract tables
root = ET.fromstring(xml)
body = root.find('w:body', ns)

def cell_text(tc):
    texts = []
    for t in tc.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
        texts.append(t.text or '')
    return ''.join(texts)

for tbl in body.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tbl'):
    print('=== TABLE ===')
    for row in tbl.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tr'):
        cells = [cell_text(tc) for tc in row.findall('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tc')]
        print(' | '.join(cells))
    print()

# Also print paragraphs outside tables
print('=== PARAGRAPHS ===')
for p in body.findall('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
    texts = []
    for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
        texts.append(t.text or '')
    line = ''.join(texts).strip()
    if line:
        print(line)
out.close()
