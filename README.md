# CAMEL Web App

## Overview
CAMEL Web App is a React-based web interface designed to demonstrate CAMEL's various modules. This interactive platform enables users to explore and interact with CAMEL's capabilities through a user-friendly interface.

## Contributing
We welcome contributions! Please feel free to submit a Pull Request.

## Contributors
- Front-end Lead: [xinyuguan3](https://github.com/xinyuguan3) - Create Your First Agent
- Back-end Lead: [koch3092](https://github.com/koch3092)
- Back-end: [xzjjj](https://github.com/xzjjj) - Create Your Role Playing Session
- Full Stack: [User235514](https://github.com/User235514) - Create Your First Agent (Toolkits)

## Features
- **Multi-Model Support**
  - DeepSeek
  - Llama
  - Qwen
  - Support for future model integrations

- **Advanced Model Management**
  - Flexible model switching
  - Customizable system messages
  - Configurable model parameters
  - Tool integration support

- **Tool Integration**
  - Access to CAMEL toolkits
  - Tool-specific configuration options
  - Parameter input interface
  - Result visualization

- **Role Playing Sessions**
  - Multi-agent interactions
  - Customizable agent roles
  - Task-specific configurations
  - Session management

- **Workforce Module**
  - Coordinate multiple specialized agents
  - Mix of single agents and role-playing pairs
  - Customizable workforce configuration
  - Collaborative task solving
  - Flexible agent role assignment

## Target Users
- Developers integrating CAMEL into their applications
- Researchers exploring Agent capabilities
- Open-source contributors

## Technology Stack and Features

- ⚡ [**FastAPI**](https://fastapi.tiangolo.com) for the Python backend API.
    - 🧰 [SQLModel](https://sqlmodel.tiangolo.com) for the Python SQL database interactions (ORM).
    - 🔍 [Pydantic](https://docs.pydantic.dev), used by FastAPI, for the data validation and settings management.
    - 💾 [PostgreSQL](https://www.postgresql.org) as the SQL database.
- 🚀 [React](https://react.dev) for the frontend.
    - 💃 Using TypeScript, hooks, Vite, and other parts of a modern frontend stack.
    - 🎨 [Chakra UI](https://chakra-ui.com) for the frontend components.
    - 🤖 An automatically generated frontend client.
    - 🧪 [Playwright](https://playwright.dev) for End-to-End testing.
    - 🦇 Dark mode support.
- 🐋 [Docker Compose](https://www.docker.com) for development and production.
- 🔑 JWT (JSON Web Token) authentication.
- ✅ Tests with [Pytest](https://pytest.org).
- 📞 [Traefik](https://traefik.io) as a local reverse proxy / load balancer.
- 🚢 Deployment instructions using Docker Compose, including how to set up a frontend Traefik proxy to handle automatic HTTPS certificates.
- 🏭 CI (continuous integration) and CD (continuous deployment) based on GitHub Actions.

## Getting Started

### Clone Repository
You can clone this repository with:

```bash
git clone https://github.com/camel-ai/camel_web_app.git
```

### Configure

Copy the `.env.example` files to `.env`:

```bash
cp .env.example .env
```

Then you can then update configs in the `.env` files to customize your configurations.

Before deploying it, make sure you change at least the values for:

- `SECRET_KEY`
- `POSTGRES_PASSWORD`

You can (and should) pass these as environment variables from secrets.

Also, you can set the following environment variables:

- `SENTRY_DSN`: (default: "") The DSN for Sentry, if you are using it, you can set it later in .env.

### Generate Secret Keys

Some environment variables in the `.env` file have a default value of `changethis`.

You have to change them with a secret key, to generate secret keys you can run the following command:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Copy the content and use that as password / secret key. And run that again to generate another secure key.

### Run all services using Docker Compose
You can run all the services using Docker Compose with:
```bash
docker compose up -d
```

You will see something like:
```bash
[+] Running 15/15oard] exporting to image                                                                          0.0s
 ✔ Service frontend                            Built                                                              41.3s 
 ✔ Service celery-worker                       Built                                                              92.7s 
 ✔ Service backend                             Built                                                               1.2s 
 ✔ Service celery-dashboard                    Built                                                               0.6s 
 ✔ Network camel_web_app_default               Created                                                             0.0s 
 ✔ Network camel_web_app_traefik-public        Created                                                             0.0s 
 ✔ Volume "camel_web_app_app-db-data"          Created                                                             0.0s 
 ✔ Container camel_web_app-proxy-1             Started                                                             0.3s 
 ✔ Container camel_web_app-frontend-1          Started                                                             0.3s 
 ✔ Container camel_web_app-db-1                Started                                                             0.3s 
 ✔ Container camel_web_app-redis-1             Healthy                                                             5.8s 
 ✔ Container camel_web_app-celery-worker-1     Started                                                             5.9s 
 ✔ Container camel_web_app-adminer-1           Started                                                             0.4s 
 ✔ Container camel_web_app-backend-1           Started                                                             6.0s 
 ✔ Container camel_web_app-celery-dashboard-1  Started                                                             6.1s 
```
## URLs

### Development URLs

Development URLs, for local development.

Frontend: http://localhost:5173

Backend: http://localhost:8000

Automatic Interactive Docs (Swagger UI): http://localhost:8000/docs

Automatic Alternative Docs (ReDoc): http://localhost:8000/redoc

Adminer: http://localhost:8080

Traefik UI: http://localhost:8090

### Development URLs with `localhost.app.camel-ai.org` Configured

Development URLs, for local development.

Frontend: http://localhost.app.camel-ai.org

Backend: http://localhost.app.camel-ai.org/api

Automatic Interactive Docs (Swagger UI): http://localhost.app.camel-ai.org/docs

Automatic Alternative Docs (ReDoc): http://localhost.app.camel-ai.org/redoc

Adminer: http://localhost.app.camel-ai.org:8080

Traefik UI: http://localhost.app.camel-ai.org:8090

## License
(To be added: License information)
