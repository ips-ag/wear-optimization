# Wear Optimization
 
A web application for detecting and optimizing wear patterns using AI vision analysis.
 
## Project Structure
 
The project consists of two main components:
 
- `/src/api`: Azure Functions backend API (.NET)
- `/src/app`: React frontend application (Vite + TypeScript)
 
## Prerequisites
 
- Node.js (v16 or later)
- .NET 6.0 SDK
- Azure Static Web Apps CLI (`npm install -g @azure/static-web-apps-cli`)
 
## Running Locally
 
1. Start the API (Azure Functions):
   ```bash
   cd src/api
   func start --port // default port is 7071
   ```
 
2. Start the web application:
 
   ```bashno
   cd src/app
   npm install
   npm run dev // default port is 5173
   ```
 
3. Start the Static Web Apps CLI to connect the frontend and API:
   ```bash
   swa start http://localhost:5173/ --api-devserver-url http://localhost:7071
   ```
 
The application will be available at `http://localhost:4280`.
 
## Development
 
- Frontend: React application with TypeScript, running on Vite
- Backend: Azure Functions with .NET
- Local development uses Azure Static Web Apps CLI to emulate the production environment
 