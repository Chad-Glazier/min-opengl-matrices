# Usage example: 
# .\scripts\publish_to_npm.ps1
param (
	[Parameter(Mandatory = $true, HelpMessage = "Enter the version in the format <major>.<minor>.<patch>")]
	[string]$version
)
deno run -A ./build.ts $version
Set-Location npm
npm publish
Set-Location ..
