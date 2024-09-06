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

## Instructions for Running

### Backend

1. **Install dependencies**:

   ```bash
   cd backend
   npm install
   ```

2. **Set up the database**:

   Ensure PostgreSQL is installed and running. Then create a `.env` file in the `backend` directory with the following content:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/pokemon_cards?schema=public"
   ```

   Replace `username`, `password`, and `pokemon_cards` with your PostgreSQL credentials and desired database name.

   Then run:

   ```bash
   npx prisma migrate dev
   ```

3. **Start the server**:

   ```bash
   npm run start:dev
   ```

4. **Access Swagger documentation** at `http://localhost:3001/api/docs`.

### Frontend

1. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment**:

   Create a `.env.local` file in the `frontend` directory with:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Access the application** at `http://localhost:3000`.

## API Endpoints

### Cards

- **GET /cards**: Retrieve all cards.
- **GET /cards/:id**: Retrieve a specific card by ID.
- **POST /cards**: Add a new card.
- **PUT /cards/:id**: Update an existing card by ID.
- **DELETE /cards/:id**: Delete a card by ID.

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

5. **Scalability**: This setup allows the backend to automatically scale based on incoming requests, optimizing resource usage and cost.

6. **Cold Starts**: While serverless functions may experience cold starts, Vercel's infrastructure minimizes this impact for improved performance.

This serverless deployment on Vercel ensures that our NestJS backend is highly available, scalable, and cost-efficient, complementing our frontend deployment.
