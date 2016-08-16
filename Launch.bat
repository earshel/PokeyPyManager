@echo off
start "" python mgr.py
timeout 10
start http://127.0.0.1:5100
pause
