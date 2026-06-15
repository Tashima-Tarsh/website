@echo off
setlocal enabledelayedexpansion

cd /d "d:\website\website"

echo. >> FINAL_PUSH.log
echo [%date% %time%] Starting Phase 2 deployment >> FINAL_PUSH.log
echo. >> FINAL_PUSH.log

echo Staging files...
git add article-12/index.html >> FINAL_PUSH.log 2>&1
git add disha/origin/index.html >> FINAL_PUSH.log 2>&1
git add digital-constitutional-personhood/index.html >> FINAL_PUSH.log 2>&1
git add docs/editorial/phase-2-content-review.md >> FINAL_PUSH.log 2>&1

echo Checking status...
git status --short >> FINAL_PUSH.log 2>&1

echo. >> FINAL_PUSH.log
echo Committing...
git commit -m "content: clarify digital governance, author frameworks, and origins" >> FINAL_PUSH.log 2>&1

echo. >> FINAL_PUSH.log
echo Getting commit hash...
for /f %%i in ('git rev-parse HEAD') do set HASH=%%i
echo Commit: %HASH% >> FINAL_PUSH.log
echo Commit: %HASH%

echo. >> FINAL_PUSH.log
echo Pushing to GitHub...
git push origin seo/phase-2-content-authority -u >> FINAL_PUSH.log 2>&1

echo. >> FINAL_PUSH.log
echo [%date% %time%] Deployment complete >> FINAL_PUSH.log

echo.
echo ✓ Log written to FINAL_PUSH.log
echo.
echo Opening log...
type FINAL_PUSH.log
