<#
.SYNOPSIS
    SCMS - Bo chay local du an (Sports Center Management System)
.DESCRIPTION
    Tu dong kiem tra moi truong (Node, Java, SQL Server), khoi tao DB neu thieu,
    va khoi chay dong thoi Spring Boot API (8080) va React Web (5173).
.PARAMETER Only
    Chi chay mot thanh phan: 'all', 'web', 'api', 'db'
.PARAMETER NoBrowser
    Khong tu dong mo trinh duyet
.PARAMETER SkipDbCheck
    Bo qua kiem tra ket noi SQL Server
#>
[CmdletBinding()]
param(
    [ValidateSet("all", "web", "api", "db")]
    [string]$Only = "all",
    [switch]$NoBrowser,
    [switch]$SkipDbCheck
)

$Host.UI.RawUI.WindowTitle = "SCMS - Local Runner"

function Write-Header {
    Clear-Host
    Write-Host "=================================================================" -ForegroundColor Cyan
    Write-Host "    SPORTS CENTER MANAGEMENT SYSTEM (SCMS) - LOCAL RUNNER        " -ForegroundColor Cyan
    Write-Host "=================================================================" -ForegroundColor Cyan
    Write-Host "  Web App:       http://localhost:5173" -ForegroundColor White
    Write-Host "  Backend API:   http://localhost:8080/api/v1/health" -ForegroundColor White
    Write-Host "  Swagger UI:    http://localhost:8080/swagger-ui/index.html" -ForegroundColor White
    Write-Host "=================================================================" -ForegroundColor Cyan
    Write-Host ""
}

Write-Header

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$rootDir = Split-Path -Parent $scriptDir
$apiDir = Join-Path $rootDir "apps\api"
$webDir = Join-Path $rootDir "apps\web"

# 1. Kiem tra file .env
$envFile = Join-Path $rootDir ".env"
$envExample = Join-Path $rootDir ".env.example"
if (-not (Test-Path $envFile)) {
    if (Test-Path $envExample) {
        Write-Host "-> Chua co file .env, dang tu dong tao tu .env.example ..." -ForegroundColor Yellow
        Copy-Item $envExample $envFile
        Write-Host "[OK] Da tao file .env!" -ForegroundColor Green
    }
}

# Load local environment values for the API and frontend subprocesses.
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith('#')) {
            $separator = $line.IndexOf('=')
            if ($separator -gt 0) {
                $name = $line.Substring(0, $separator).Trim()
                $value = $line.Substring($separator + 1).Trim()
                Set-Item -Path "Env:$name" -Value $value
            }
        }
    }
}

# A temporary signing key keeps local development usable without storing a secret in the repository.
if (($Only -in @("all", "api")) -and [string]::IsNullOrWhiteSpace($env:APP_JWT_SECRET)) {
    $localJwtSecretBytes = [byte[]]::new(32)
    [System.Security.Cryptography.RandomNumberGenerator]::Fill($localJwtSecretBytes)
    $env:APP_JWT_SECRET = [Convert]::ToBase64String($localJwtSecretBytes)
    Write-Host "[INFO] Generated an in-memory JWT secret for this local run." -ForegroundColor DarkGray
}
if ($Only -in @("all", "api")) {
    if ([string]::IsNullOrWhiteSpace($env:SPRING_PROFILES_ACTIVE)) {
        $env:SPRING_PROFILES_ACTIVE = "sqlserver,local"
    } elseif ($env:SPRING_PROFILES_ACTIVE -notmatch '(^|,)local(,|$)') {
        $env:SPRING_PROFILES_ACTIVE += ",local"
    }
}
# 2. Pre-flight check: Node.js & npm
if ($Only -in @("all", "web")) {
    $nodeCmd = Get-Command node -ErrorAction SilentlyContinue
    $npmCmd = Get-Command npm -ErrorAction SilentlyContinue
    if (-not $nodeCmd -or -not $npmCmd) {
        Write-Host "[LOI] Khong tim thay Node.js hoac npm trong he thong." -ForegroundColor Red
        Write-Host "Vui long cai dat Node.js (>= 20) tu https://nodejs.org/" -ForegroundColor Yellow
        exit 1
    }
    $nodeVer = (& node -v).Trim()
    Write-Host "[CHECK] Node.js: $nodeVer" -ForegroundColor Green

    # Kiem tra node_modules trong apps/web
    $webModules = Join-Path $webDir "node_modules"
    if (-not (Test-Path $webModules)) {
        Write-Host "-> Thu muc node_modules chua ton tai, dang chay 'npm install' cho apps/web ..." -ForegroundColor Yellow
        Push-Location $webDir
        npm install
        Pop-Location
        Write-Host "[OK] Cai dat npm dependencies thanh cong!" -ForegroundColor Green
    }
}

# 3. Pre-flight check: Java & Maven
if ($Only -in @("all", "api")) {
    $javaCmd = Get-Command java -ErrorAction SilentlyContinue
    if (-not $javaCmd) {
        Write-Host "[LOI] Khong tim thay Java trong he thong." -ForegroundColor Red
        Write-Host "Du an yeu cau Java 21+. Vui long cai dat JDK 21+ va them vao PATH." -ForegroundColor Yellow
        exit 1
    }
    $javaVerOutput = (& java -version 2>&1 | Out-String)
    $firstLine = ($javaVerOutput -split "`r?`n")[0]
    Write-Host "[CHECK] $firstLine" -ForegroundColor Green

    # Kiem tra Maven Wrapper
    $mvnwCmd = Join-Path $apiDir "mvnw.cmd"
    if (-not (Test-Path $mvnwCmd)) {
        Write-Host "[CANH BAO] Khong thay mvnw.cmd tai apps/api." -ForegroundColor Yellow
    }
}

# 4. Pre-flight check: SQL Server & Khoi tao DB
if (-not $SkipDbCheck -and ($Only -in @("all", "api", "db"))) {
    Write-Host "-> Dang kiem tra ket noi SQL Server..." -ForegroundColor Yellow
    $initScript = Join-Path $scriptDir "init-db.ps1"
    if (Test-Path $initScript) {
        & powershell -NoProfile -ExecutionPolicy Bypass -File $initScript
        if ($LASTEXITCODE -ne 0) {
            Write-Host "[CANH BAO] Khong the ket noi den SQL Server." -ForegroundColor Yellow
            Write-Host "Hay chac chan SQL Server dang chay (port 1433) truoc khi API hoat dong." -ForegroundColor Yellow
            if ($Only -eq "db") { exit 1 }
        }
    }
}

if ($Only -eq "db") {
    Write-Host "`n[HOAN TAT] Che do khoi tao DB da chay xong." -ForegroundColor Green
    exit 0
}

Write-Host ""
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "               KHOI CHAY CAC DICH VU                             " -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

# Giai phong cac port truoc khi chay tranh bi conflict
$conn8080 = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
$conn5173 = Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue

if ($Only -in @("all", "api") -and $conn8080) {
    Write-Host "[CANH BAO] Port 8080 dang duoc su dung boi PID $($conn8080.OwningProcess)." -ForegroundColor Yellow
    Write-Host "  Neu can giai phong, hay chay: .\stop-local.ps1" -ForegroundColor Yellow
}
if ($Only -in @("all", "web") -and $conn5173) {
    Write-Host "[CANH BAO] Port 5173 dang duoc su dung boi PID $($conn5173.OwningProcess)." -ForegroundColor Yellow
    Write-Host "  Neu can giai phong, hay chay: .\stop-local.ps1" -ForegroundColor Yellow
}

# Khoi chay Backend API trong cua so moi
if ($Only -in @("all", "api")) {
    Write-Host "-> Dang khoi chay Backend API (Spring Boot) tren cong 8080..." -ForegroundColor Cyan
    $mvnExecutable = ".\mvnw.cmd"
    if (-not (Test-Path (Join-Path $apiDir "mvnw.cmd"))) {
        $mvnExecutable = "mvn"
    }

    $apiProcessCmd = "cd /d `"$apiDir`" && title SCMS API (Spring Boot 8080) && $mvnExecutable spring-boot:run"
    Start-Process -FilePath "cmd.exe" -ArgumentList "/k", $apiProcessCmd
    Write-Host "  [+] Da mo cua so chay API!" -ForegroundColor Green
}

# Khoi chay Frontend Web trong cua so moi
if ($Only -in @("all", "web")) {
    Write-Host "-> Dang khoi chay Frontend Web (React + Vite) tren cong 5173..." -ForegroundColor Cyan
    $webProcessCmd = "cd /d `"$webDir`" && title SCMS Web (React Vite 5173) && npm run dev"
    Start-Process -FilePath "cmd.exe" -ArgumentList "/k", $webProcessCmd
    Write-Host "  [+] Da mo cua so chay Web!" -ForegroundColor Green
}

Write-Host ""
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "             HE THONG DANG KHOI CHAY HOAN TAT!                   " -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "  Cac cua so Terminal rieng biet da duoc mo de giam sat log." -ForegroundColor White
Write-Host "  De dung ca 2 server, chay: .\stop-local.bat hoac .\stop-local.ps1" -ForegroundColor Gray
Write-Host "=================================================================" -ForegroundColor Green

# Cho trinh duyet mo sau vai giay
if (-not $NoBrowser -and ($Only -in @("all", "web"))) {
    Write-Host "-> Dang cho Web server san sang de mo trinh duyet..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:5173"
}
