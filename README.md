# ShortenLink

Link shortener application includes:
- Backend: ASP.NET Core Web API
- Frontend: React + Vite + TypeScript

## 1. Prerequisites

- .NET SDK 10
- Node.js 20+
- npm
- SQL Server running on `localhost:1433`

## 2. Project Structure

- `ShortenLink/`: backend source (.NET)
- `frontend/`: frontend source (React)

## 3. Configuration Before Running

### Backend

Configuration file:
- `ShortenLink/ShortenLink.API/appsettings.json`

Important values:
- `ConnectionStrings:DefaultConnection`
- `ClientUrl` (default: `http://localhost:4243`)

Note: the backend uses `EnsureCreated()`, so the database will be created automatically on first run if the SQL Server connection is valid.

### Frontend

Development env file:
- `frontend/.env.development`

Current values:
- `VITE_API_URL=http://localhost:5046/api`
- `VITE_DEFAULT_APP_PATH=/app`

## 4. Run the Project (Development)

Open 2 separate terminals.

### Terminal 1: Run Backend

```bash
cd ShortenLink
dotnet run --project ShortenLink.API
```

Backend runs at:
- `http://localhost:5046`

### Terminal 2: Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
- `http://localhost:4243`

## 5. Main Backend Endpoints

- `POST /api/create`
- `GET /api/check?alias={alias}`
- `GET /api/{code}`

## 6. Production Build

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

### Backend

```bash
cd ShortenLink
dotnet build ShortenLink.sln
```

## 7. Notes

- Backend CORS currently allows frontend origin `http://localhost:4243`.
- If you change the frontend port, update the CORS configuration in the backend.