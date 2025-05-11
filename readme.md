# DevContainerSample

## Overview
This project demonstrates the use of a development container (`devcontainer.json`) to create a consistent and portable development environment. It leverages the `mcr.microsoft.com/devcontainers/universal` image for flexibility and compatibility.

## Features
- **Pre-configured Development Environment**: Includes settings for VS Code and Codespaces.
- **Port Forwarding**: Automatically forwards port `3000` for application access.
- **Custom Git Hooks**: Supports experimental Git hooks for enhanced workflows.
- **Optimized for Codespaces**: Includes configurations to skip Oryx and open specific files on startup.

## Requirements
- **Host Requirements**:
  - Minimum of 4 CPUs.
- **Tools**:
  - Docker (for running the development container).
  - Visual Studio Code with the Remote - Containers extension.

## Getting Started
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd DevContainerSample