$zip = [System.IO.Compression.ZipFile]::OpenRead('D:\OneDrive\桌面\新官网图片\Segment Bolts刀角螺栓\Segment Bolt Specifications.docx')
$entry = $zip.GetEntry('word/document.xml')
$reader = New-Object System.IO.StreamReader($entry.Open())
$content = $reader.ReadToEnd()
$reader.Close()
$zip.Dispose()
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Write-Output $content