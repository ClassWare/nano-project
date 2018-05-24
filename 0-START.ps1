cmd /c start powershell -NoExit -WindowStyle Minimized -Command { $Host.UI.RawUI.WindowTitle = "VU-MAIN" }
Read-Host "Press ENTER"
cmd /c start powershell -NoExit -WindowStyle Minimized -Command { $Host.UI.RawUI.WindowTitle = "FS-SERVER"; node fs-server-csvtojson }
