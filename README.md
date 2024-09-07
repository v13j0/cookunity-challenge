## Overview

This project is based on the requirements outlined in the [REQUIREMENTS.md](REQUIREMENTS.md) file.
The application is built using Next.js for the frontend and NestJS for the backend, with TypeScript for type safety.

## Implemented Solution

### Backend

- The backend is implemented using **NestJS** and **TypeScript**.
- API endpoints are documented using **Swagger**.
- Libraries used:
  - `@nestjs/swagger`: For API documentation
  - `swagger-ui-express`: To serve Swagger UI
  - `@prisma/client`: ORM for database operations
  - `@nestjs/common`, `@nestjs/core`: Core NestJS libraries
  - `class-validator`, `class-transformer`: For DTO validation and transformation
  - `@nestjs/config`: For environment configuration
- The backend exposes RESTful API endpoints for managing Pokémon cards, including:
  - Create, Read, Update, Delete (CRUD) operations
  - Card battle simulation
  - Identifying card weaknesses and resistances

### Frontend

- The frontend is implemented using **Next.js** and **TypeScript**.
- Uses **Tailwind CSS** for styling.
- The frontend interacts with the backend API to fetch and add card data.
- Implements a card cache context for efficient data management.
- Features a responsive design for various screen sizes.
- Includes components for displaying individual cards and a list of cards.
- Provides forms for adding new cards.
- Utilizes Next.js routing for navigation between pages.

## Prerequisites

Before running the project, ensure you have the following versions installed:

- Node.js: v18.0.0 or later
- npm: v8.0.0 or later
- React: v18.0.0 or later (included in the project dependencies)
- TypeScript: v5.0.0 or later (included in the project dependencies)
- NestJS: v10.0.0 or later (included in the project dependencies)

## Instructions for Running

### Backend

1. **Install dependencies**:

   ```bash
   cd backend
   npm install
   ```

2. **Set up the database**:

   Ensure PostgreSQL is installed and running. If not, follow these steps:

   1. Install PostgreSQL:

      - For Ubuntu/Debian: `sudo apt-get install postgresql`
      - For macOS with Homebrew: `brew install postgresql`
      - For Windows: Download and install from https://www.postgresql.org/download/windows/

   2. Start PostgreSQL service:

      - For Ubuntu/Debian: `sudo service postgresql start`
      - For macOS: `brew services start postgresql`
      - For Windows: It should start automatically, or use the PostgreSQL GUI tools

   3. Create a new database:
      - Open a terminal and run: `psql -U postgres`
      - In the psql prompt, type: `CREATE DATABASE pokemon_cards;`
      - Exit psql with `\q`

   Create a `.env` file in the `backend` directory by copying the `.env.example` file and updating it with your specific configuration:

   ```bash
   cp .env.example .env
   ```

   Then, open the `.env` file and fill in the necessary environment variables with your actual values.

   Replace `username`, `password`, and `pokemon_cards` with your PostgreSQL credentials and desired database name.

   Then run:

   ```bash
   npx prisma migrate dev
   ```

3. **Seed the database**:

   To populate the database with initial data, run the following command:

   ```bash
   npm run seed
   ```

   This will execute the seed script, which adds a set of predefined Pokemon cards to your database.

4. **Start the server**:

   ```bash
   npm run start:dev
   ```

5. **Access Swagger documentation** at `http://localhost:3001/api/docs`.

### Frontend

1. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment**:

   Create a `.env.local` file in the `frontend` directory by copying the `.env.local.example` file:

   ```bash
   cp .env.local.example .env.local
   ```

   Then, open the `.env.local` file and update the environment variables with your specific configuration if needed.

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Access the application** at `http://localhost:3000`.

## API Endpoints

### Cards

- **GET /cards/:id**
  - **Request**: `GET /cards/1`
  - **Response**:
    ```json
    {
      "id": 1,
      "name": "Pikachu",
      "type": "Electric",
      "hp": 60,
      "attack": 50,
      "thumb": "pikachu.png",
      "weaknesses": ["Ground"],
      "resistances": ["Electric"],
      "expansion": "Base Set",
      "rarity": "Rare"
    }
    ```

### Battle Simulation

- **POST /battle**: Simulate a battle between two cards.

### Weaknesses and Resistances

- **GET /cards/:id/weaknesses**: Get weaknesses for a specific card.
- **GET /cards/:id/resistances**: Get resistances for a specific card.

## Production Environment

The application is deployed and accessible in a production environment. You can access the live version at the following URL:

https://pokemon-card-battle-frontend.vercel.app

This deployment is hosted on Vercel, providing a seamless and performant experience for users. The production environment mirrors the functionality of the local development setup, allowing you to interact with the application, add Pokemon cards, and simulate battles in real-time.

Backend is hosted on Vercel as well, leveraging serverless functions for NestJS applications:

1. **Serverless NestJS on Vercel**: NestJS backends can be deployed as serverless functions on Vercel, allowing for scalable and cost-effective hosting.

2. **Adaptation for Serverless**: The NestJS application is adapted to work with serverless architecture by using a serverless-express wrapper.

3. **Configuration**: A `vercel.json` file is created in the project root to specify build settings and routes for the serverless functions.

4. **Deployment Process**:

   - The NestJS app is built using `npm run build`
   - Vercel CLI is used to deploy the application
   - Vercel automatically creates serverless functions from the built NestJS app

This serverless deployment on Vercel ensures that our NestJS backend is highly available, scalable, and cost-efficient, complementing our frontend deployment.

## Notes

During the development of this application, several assumptions were made:

1. **User Authentication**: The current version does not include user authentication. It's assumed that all users have equal access to all features.

2. **Data Persistence**: The application assumes that the database (likely PostgreSQL with Prisma ORM) is always available and functioning correctly.

3. **Card Data**: It's assumed that all Pokemon cards follow a consistent structure with the fields specified in the API responses (id, name, type, hp, attack, etc.).

4. **Battle Mechanics**: The battle simulation is likely simplified and may not account for all complexities found in the actual Pokemon Trading Card Game.

5. **API Rate Limiting**: There's an assumption that users won't abuse the API with excessive requests. No rate limiting is explicitly mentioned.

6. **Browser Compatibility**: The frontend is assumed to work on modern web browsers. Compatibility with older browsers may not be guaranteed.

7. **Network Conditions**: The application assumes users have a stable internet connection for fetching data and images.

8. **Scalability**: While using serverless functions, there's an assumption that the current architecture can handle the expected user load.

9. **Data Integrity**: It's assumed that users input valid data when adding new cards, though some server-side validation is likely in place.

10. **Real-time Updates**: The application may not support real-time updates. Users might need to refresh to see changes made by others.

11. **Localization**: The application is assumed to be in English, without built-in support for multiple languages.
