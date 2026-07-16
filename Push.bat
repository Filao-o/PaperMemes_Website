@echo off
cd /d C:\Users\Lucas\Desktop\PapersMemes-Website\PaperMemes_Website
git add -A
set /p MSG="Message de commit : "
git commit -m "%MSG%"
git push origin main
pause