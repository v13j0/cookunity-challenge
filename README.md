## Overview

This project is based on the requirements outlined in the [REQUIREMENTS.md](REQUIREMENTS.md) file.

## Implemented solution

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
- Features a responsive design for various screen sizes.
- Includes components for displaying individual cards and a list of cards.
- Includes a route with a form to add new cards (/add)
- Utilizes Next.js routing for navigation between pages.

## Prerequisites

Before running the project, ensure you have the following versions installed:

- Node.js: v18.0.0 or later
- npm: v8.0.0 or later
- React: v18.0.0 or later (included in the project dependencies)
- TypeScript: v5.0.0 or later (included in the project dependencies)
- NestJS: v10.0.0 or later (included in the project dependencies)

## Instructions for running locally

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

  - **Description**: Retrieve a specific card by its ID
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

- **GET /cards**

  - **Description**: Retrieve all cards with optional filtering and pagination
  - **Request**: `GET /cards?type=Electric&page=1&limit=10`
  - **Response**:
    ```json
    [
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
      // ... more cards
    ]
    ```

- **POST /cards**

  - **Description**: Create a new card
  - **Request**:
    ```json
    {
      "name": "Charizard",
      "type": "Fire",
      "hp": 120,
      "attack": 80,
      "thumb": "charizard.png",
      "weaknesses": ["Water", "Rock"],
      "resistances": ["Fire", "Grass"],
      "expansion": "Base Set",
      "rarity": "Rare"
    }
    ```
  - **Response**: The created card object

- **PUT /cards/:id**

  - **Description**: Update an existing card
  - **Request**: `PUT /cards/1`
    ```json
    {
      "hp": 70,
      "attack": 55
    }
    ```
  - **Response**: The updated card object

- **DELETE /cards/:id**

  - **Description**: Delete a specific card
  - **Request**: `DELETE /cards/1`
  - **Response**: A success message or the deleted card object

- **GET /cards/expansions**

  - **Description**: Get all unique expansions
  - **Request**: `GET /cards/expansions`
  - **Response**:
    ```json
    ["Base Set", "Jungle", "Fossil", "Team Rocket"]
    ```

- **GET /cards/types**
  - **Description**: Get all unique card types
  - **Request**: `GET /cards/types`
  - **Response**:
    ```json
    ["Electric", "Fire", "Water", "Grass", "Psychic", "Fighting"]
    ```

### Battle simulation

- **POST /battle**
  - **Description**: Simulate a battle between two cards
  - **Request**: `POST /battle`
    ```json
    {
      "card1Id": 1,
      "card2Id": 2
    }
    ```
  - **Response**:
    ```json
    {
      "winner": "Pikachu",
      "details": "Pikachu used Thunder Shock and won!"
    }
    ```

### Weaknesses and Resistances

- **GET /cards/:id/weaknesses-resistances**
  - **Description**: Get weaknesses and resistances for a specific card
  - **Request**: `GET /cards/1/weaknesses-resistances`
  - **Response**:
    ```json
    {
      "weaknesses": ["Ground"],
      "resistances": ["Electric"]
    }
    ```

## Production environment

The application is deployed and accessible in a production environment. You can access the live version at the following URL:

http://cookunity-challenge-frontend.vercel.app

## Development assumptions and considerations

Given the five-day timeframe, this project prioritizes core functionalities. Here are the key assumptions and decisions made:

1. **Backend Framework**: NestJS was chosen because I didn't have the chance to use it in other projects, and because it is currently being used at CookUnity, I wanted to give it a try.

2. **Database**: PostgreSQL was used as per the requirements. Prisma ORM was integrated because I was familiar with it.

3. **API Documentation**: Swagger was implemented as per the requirements.

4. **Frontend Framework**: Next.js was chosen for its server-side rendering capabilities and built-in routing, but also because I wanted to keep exploring it as I didn't have the chance to work on many Next.js projects in the past.

5. **Styling**: Tailwind CSS was used for rapid UI development, allowing for a clean and responsive design without writing a lot of custom CSS.

6. **State Management**: React's built-in hooks were used for state management given the project's scope.

7. **Card Battle Simulation**: Implemented as a simple comparison of attack values, considering weaknesses and resistances. A more complex battle system could be developed with additional time.

8. **Error Handling**: Basic error handling was implemented. In a production environment, more comprehensive error handling and logging would be beneficial.

9. **Testing**: Basic unit tests were set up, but comprehensive test coverage was not prioritized due to time constraints. In a real-world scenario, more extensive testing would be crucial.

10. **Deployment**: In the first instance, I wanted to use AWS services because it was another new thing to learn and to work with, but given the five-day timeframe and several failed attempts, I opted for Vercel because I was already familiar with it.

11. **Security**: Basic CORS configuration was implemented. In a production environment, more stringent security measures would be necessary.

12. **Data Seeding**: A basic data seeding script was created to populate the database with initial Pokemon cards. There's also a quick way to add cards within the UI under the /add route.
