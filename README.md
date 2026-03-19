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

## Frontend Docker (Production)

Build image (no cache):

```bash
docker build --pull --no-cache -t shortenlink-frontend:latest -f frontend/Dockerfile frontend
```

Run container:

```bash
docker rm -f shortenlink-frontend 2>/dev/null || true
docker run -d --name shortenlink-frontend -p 8080:80 --restart unless-stopped shortenlink-frontend:latest
```

Open:

- `http://localhost:8080`

## Docker Cache Cleanup

Clean build/image/container/volume caches:

```bash
docker builder prune -af
docker image prune -af
docker container prune -f
docker volume prune -f
```

Or clean everything in one command:

```bash
docker system prune -af --volumes
```