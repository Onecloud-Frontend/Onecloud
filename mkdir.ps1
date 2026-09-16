$ErrorActionPreference = "Stop"
$base = "f:\onecloud_frontend\frontend\src"

New-Item -ItemType Directory -Force -Path "$base\core\security" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\core\telemetry" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\core\api\client" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\core\api\interceptors" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\core\api\query" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\core\api\types" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\core\permissions\models" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\core\permissions\evaluators" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\core\permissions\hooks" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\core\permissions\constants" | Out-Null

Write-Output "Directories created."
