# ShortenLinkApp

## Requirements

- .NET SDK (recommend .NET 10 to match project output)
- Node.js 20+
- npm 10+
- Sqlserver run on Docker

## Run Backend (.NET)

```bash
cd ShortenLink
dotnet restore
dotnet run --project ShortenLink.API
```

Default dev URL from launch settings:

- `http://localhost:5046`
- `https://localhost:7109`

## Run Frontend (Vite)

```bash
cd frontend
npm install
npm run dev
```

Vite dev server usually runs at:

- `http://localhost:4243`
