$ErrorActionPreference = "Stop"
$base = "f:\onecloud_frontend\frontend\src"

# Create directories
New-Item -ItemType Directory -Force -Path "$base\app\bootstrap" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\app\config\application" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\app\auth-pages" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\app\error-pages" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\shared\types" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\shared\constants" | Out-Null

# Move main.tsx & App.tsx
if (Test-Path "$base\main.tsx") { Move-Item -Path "$base\main.tsx" -Destination "$base\app\bootstrap\index.tsx" -Force }
if (Test-Path "$base\App.tsx") { Move-Item -Path "$base\App.tsx" -Destination "$base\app\App.tsx" -Force }

# Move config
if (Test-Path "$base\app\config\index.ts") { Move-Item -Path "$base\app\config\index.ts" -Destination "$base\app\config\application\index.ts" -Force }

# Move auth pages
if (Test-Path "$base\features\auth\pages\*") { Get-ChildItem -Path "$base\features\auth\pages\*" | Move-Item -Destination "$base\app\auth-pages\" -Force }

# Move error pages & rename
if (Test-Path "$base\features\errors\pages\ForbiddenPage.tsx") { Move-Item -Path "$base\features\errors\pages\ForbiddenPage.tsx" -Destination "$base\app\error-pages\403.tsx" -Force }
if (Test-Path "$base\features\errors\pages\UnauthorizedPage.tsx") { Move-Item -Path "$base\features\errors\pages\UnauthorizedPage.tsx" -Destination "$base\app\error-pages\401.tsx" -Force }
if (Test-Path "$base\features\errors\pages\NotFoundPage.tsx") { Move-Item -Path "$base\features\errors\pages\NotFoundPage.tsx" -Destination "$base\app\error-pages\404.tsx" -Force }
if (Test-Path "$base\features\errors\pages\ServerErrorPage.tsx") { Move-Item -Path "$base\features\errors\pages\ServerErrorPage.tsx" -Destination "$base\app\error-pages\500.tsx" -Force }
if (Test-Path "$base\features\errors\pages\MaintenancePage.tsx") { Move-Item -Path "$base\features\errors\pages\MaintenancePage.tsx" -Destination "$base\app\error-pages\503.tsx" -Force }
if (Test-Path "$base\features\errors\pages\GeneralErrorPage.tsx") { Move-Item -Path "$base\features\errors\pages\GeneralErrorPage.tsx" -Destination "$base\app\error-pages\GeneralErrorPage.tsx" -Force }

# Move types & constants
if (Test-Path "$base\types\index.ts") { Move-Item -Path "$base\types\index.ts" -Destination "$base\shared\types\index.ts" -Force }
if (Test-Path "$base\core\constants\index.ts") { Move-Item -Path "$base\core\constants\index.ts" -Destination "$base\shared\constants\index.ts" -Force }

# Cleanup empty directories
if (Test-Path "$base\features\auth") { Remove-Item -Path "$base\features\auth" -Recurse -Force }
if (Test-Path "$base\features\errors") { Remove-Item -Path "$base\features\errors" -Recurse -Force }
if (Test-Path "$base\types") { Remove-Item -Path "$base\types" -Recurse -Force }
if (Test-Path "$base\core\constants") { Remove-Item -Path "$base\core\constants" -Recurse -Force }

Write-Output "File moves completed successfully."
