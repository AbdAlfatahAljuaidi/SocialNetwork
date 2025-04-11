<#
.SYNOPSIS
    A simple script which starts a react application from the forntend & the backend
.DESCRIPTION
    A script that starts your react application which also assumes that the present working directory is your application's directory. after starting the application it will open the link of the web app in microsoft edge
.PARAMETER WAPath
    The directory in which the web application exists.
    it is always presumed as $PWD
.PARAMETER FEName
    The file name in which the frontend logic exists.
    it is always presumed as frontend
.PARAMETER BEName
    The file name in which the backend logic exists.
    it is always presumed as backend
.PARAMETER WAURL
    the url of the working application
    it has the static value: "http://localhost:5173/"
.NOTES
    File Name      : Start-ReactApp.ps1
    Author         : Aamer Abu Arja (aamerabuarja@yahoo.com)
.EXAMPLE
    PS E:\ReactProjects\E-Commerce Project> & C:\Users\Admin\Start-ReactApp.ps1
.EXAMPLE
    PS C:\Users\Admin> Start-ReactApp.ps1 -WAPath "E:\ReactProjects\E-Commerce Project" -WAURL http://localhost:8080/
.EXAMPLE
    PS C:\Users\Admin> Start-ReactApp.ps1 -WAPath "E:\ReactProjects\E-Commerce Project"  -FEName ClientApp -BEName ServerApp
#>

# Add parameters for frontend, backend, and link
param(
    [string]$WAPath = "$PWD",
    [string]$FEName = "frontend",
    [string]$BEName = "backend",
    [string]$WAURL = "http://localhost:5173/"
)

# Install NPM Module
Install-Module -Name NPM

try {
    # Open VSCode on the application directory
    code $WAPath

    # Invoke Frontend Logic
    powershell.exe -NoProfile -Command "Set-Location "$WAPath/$FEName"; npm run dev;"
    # Set-Location "$WAPath/$FEName"
    # npm run dev

    # wait 1 second
    Start-Sleep 1

    # Invoke Backend Logic
    powershell.exe -NoProfile -Command "Set-Location "$WAPath/$BEName"; npx nodemon server;"
    # Set-Location "$WAPath/$BEName"
    # npx nodemon server

    # wait 2 seconds
    Start-Sleep 2

    # Open link in edge
    Start-Process microsoft-edge:$WAURL
}
catch {
    Write-Host "An error occured"
    Write-Host "Kindly validate whether or not the present working directory is your application's directory, otherwise supply the valid path for the frontend logic and the backend logic along with the valid link for your application"
    Write-Host $_.ScriptStackTrace
}