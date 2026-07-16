@echo off
cd /d C:\Users\Lucas\Desktop\PapersMemes-Website\PaperMemes_Website
git add -A
set /p MSG="Message de commit : "
git commit -m "%MSG%"
for /f %%i in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%i
git push origin %BRANCH%
pause
