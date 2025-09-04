# 🚀 Tracklight

**A modern, lightweight project and task management API built with TypeScript and Domain-Driven Design principles.**

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📋 Overview

Tracklight is a robust project management API designed to help teams organize, track, and manage their projects and tasks efficiently. Built with modern TypeScript and following Domain-Driven Design (DDD) architecture patterns, it provides a solid foundation for scalable project management solutions.

### ✨ Key Features

- 🏗️ **Domain-Driven Design Architecture** - Clean, maintainable codebase with proper separation of concerns
- 🔐 **Type-Safe Value Objects** - Robust data validation using TypeScript value objects
- 📊 **Project & Task Management** - Comprehensive project and task tracking capabilities
- 👥 **User Management** - Complete user authentication and authorization system
- 🎯 **Priority Management** - Task prioritization and organization features
- 🐘 **PostgreSQL Database** - Reliable data persistence with full ACID compliance
- 🧪 **Comprehensive Testing** - Full test suite with Vitest
- 🔧 **Development Tools** - Hot reload, linting, formatting, and type checking

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Container**: Docker & Docker Compose
- **Testing**: Vitest
- **Code Quality**: ESLint, Prettier
- **Architecture**: Domain-Driven Design (DDD)

## 🏗️ Project Structure

```
tracklight/
├── src/
│   ├── application/          # Application layer (use cases, services)
│   ├── domain/              # Domain layer (entities, value objects, domain logic)
│   │   └── shared/
│   │       ├── Ids/         # Value objects for entity identifiers
│   │       └── user/        # User-related value objects
│   ├── infrastructure/      # Infrastructure layer (repositories, external services)
│   ├── presentation/        # Presentation layer (controllers, routes)
│   └── index.ts            # Application entry point
├── database/
│   ├── migrations/         # Database schema migrations
│   ├── seeds/             # Database seed data
│   └── init/              # Database initialization scripts
├── tests/                 # Test files
└── docker-compose.yml     # Docker services configuration
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose**
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tracklight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the database**
   ```bash
   npm run db:up
   ```

4. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

5. **Seed the database (optional)**
   ```bash
   npm run db:seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

### Health Check

Visit `http://localhost:3000/health` to verify the API is running correctly.

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the TypeScript project |
| `npm run start` | Start the production server |
| `npm run test` | Run the test suite |
| `npm run test:ui` | Run tests with UI interface |
| `npm run test:run` | Run tests once and exit |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Lint the codebase |
| `npm run format` | Format code with Prettier |

### Database Scripts

| Script | Description |
|--------|-------------|
| `npm run db:up` | Start PostgreSQL database |
| `npm run db:down` | Stop PostgreSQL database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with test data |
| `npm run db:reset` | Reset database to clean state |
| `npm run db:logs` | View database logs |

## 🏛️ Architecture

### Domain-Driven Design

This project follows DDD principles with clear separation between:

- **Domain Layer**: Core business logic, entities, and value objects
- **Application Layer**: Use cases and application services
- **Infrastructure Layer**: External concerns (database, APIs, etc.)
- **Presentation Layer**: HTTP controllers and API routes

### Value Objects

The project uses TypeScript value objects for type safety and domain modeling:

- `UserId` - User identification
- `ProjectId` - Project identification  
- `TaskId` - Task identification
- `PriorityId` - Priority level identification
- `Email` - Email address validation and normalization

### Database Design

The system manages:
- **Users** - System users with authentication
- **Projects** - Project containers with metadata
- **Tasks** - Individual work items within projects
- **Project Members** - User-project relationships
- **Priorities** - Task priority levels

## 🧪 Testing

The project includes comprehensive testing with Vitest:

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run
```

Tests cover:
- Value object validation and behavior
- Domain logic and business rules
- API endpoints and integration

## 🔧 Development

### Code Quality

The project maintains high code quality through:

- **TypeScript** - Static type checking
- **ESLint** - Code linting and best practices
- **Prettier** - Consistent code formatting
- **Strict mode** - Enhanced TypeScript strictness

### Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://tracklight_user:tracklight_pass@localhost:5432/tracklight_db
```

## 🐳 Docker Support

The project includes Docker configuration for easy deployment:

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Write tests for new features
- Ensure all tests pass before submitting PRs
- Follow DDD principles and maintain clean architecture
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs
