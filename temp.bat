@echo off
robocopy "D:\OneDrive\桌面\工厂图\Display Rack Workshop" C:\temp-display /MOV *.* /NP /NFL /NDL /NJH /NJS
dir C:\temp-display
