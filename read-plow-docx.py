import zipfile, io, sys
out = io.open('plow-docx-out.txt', 'w', encoding='utf-8')
sys.stdout = out
path = 'plow-bolts-src.docx'
z = zipfile.ZipFile(path)
xml = z.read('word/document.xml').decode('utf-8')
ns = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'

import xml.etree.ElementTree as ET
root = ET.fromstring(xml)
body = root.find(ns+'body')

def cell_text(tc):
    return ''.join(t.text or '' for t in tc.iter(ns+'t'))

for tbl in body.iter(ns+'tbl'):
    print('=== TABLE ===')
    for row in tbl.iter(ns+'tr'):
        cells = [cell_text(tc) for tc in row.findall(ns+'tc')]
        print(' | '.join(cells))
    print()

print('=== PARAGRAPHS ===')
for p in body.findall(ns+'p'):
    line = ''.join(t.text or '' for t in p.iter(ns+'t')).strip()
    if line:
        print(line)
out.close()