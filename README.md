# Project Documentation

## Overview

This project is a card management application that allows users to view, add, and edit cards. The application is built using Next.js for the frontend and NestJS for the backend, with TypeScript for type safety.

## Assumptions

- The application assumes that the user has Node.js and npm installed.
- The backend requires a database connection, which should be configured in the `.env` file.

## Implemented Solution

### Backend

- The backend is implemented using **NestJS** and **TypeScript**.
- API endpoints are documented using **Swagger**.
- Libraries used:
  - `@nestjs/swagger`
  - `swagger-ui-express`
  - `prisma`
  - `nestjs`
- The backend exposes RESTful API endpoints for managing cards.

### Frontend

- The frontend is implemented using **Next.js** and **TypeScript**.
- Uses **Tailwind CSS** for styling.
- The frontend interacts with the backend API to fetch, add, and edit card data.

## Instructions for Running

### Backend

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up the database**:

   ```bash
   npx prisma migrate dev
   ```

3. **Start the server**:

   ```bash
   npm run start
   ```

4. **Access Swagger documentation** at `http://localhost:3001/api/docs`.

### Frontend

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Access the application** at `http://localhost:3000`.

## API Endpoints

### Cards

- **GET /cards**: Retrieve all cards.
- **GET /cards/:id**: Retrieve a specific card by ID.
- **POST /cards**: Add a new card.
- **PUT /cards/:id**: Update an existing card by ID.
- **DELETE /cards/:id**: Delete a card by ID.

### Example Request for Adding a Card

```json
POST /cards
{
"name": "Card Name",
"type": "Card Type",
"hp": 100,
"attack": 50,
"thumb": "http://example.com/image.png",
"weaknesses": ["Fire", "Water"],
"resistances": ["Grass"],
"expansion": "Expansion Name",
"rarity": "Rare"
}
```

### Example Response

```json
{
  "id": 1,
  "name": "Card Name",
  "type": "Card Type",
  "hp": 100,
  "attack": 50,
  "thumb": "http://example.com/image.png",
  "weaknesses": ["Fire", "Water"],
  "resistances": ["Grass"],
  "expansion": "Expansion Name",
  "rarity": "Rare"
}
```

## Additional Notes

- Ensure that the `.env` file is correctly configured with the necessary environment variables for both the backend and frontend.
- The Swagger documentation includes comprehensive details about each endpoint, including request parameters, request bodies, and response types.
- Authentication for the API endpoints is handled using Bearer tokens, as documented in the Swagger UI.

## Frontend Features

- Users can view a list of all cards.
- Users can add a new card using a form.
- Users can edit existing cards by selecting them from the list.
- The application provides a responsive design using Tailwind CSS.

## Backend Features

- The backend is structured using NestJS modules, controllers, and services.
- The application uses Prisma for database interactions.
- Swagger is used for API documentation, making it easy to test endpoints.

## Conclusion

This documentation provides an overview of the card management application, including setup instructions, API details, and features. For any issues or further questions, please refer to the code comments or reach out to the development team.
