## Assumptions

- List any assumptions made regarding required fields, data structure, and validations.

## Implemented Solution

### Backend

- The backend is implemented using NestJS and TypeScript.
- API endpoints are documented using Swagger.
- Libraries used: `@nestjs/swagger`, `swagger-ui-express`, `prisma`, `nestjs`.

### Frontend

- The frontend is implemented using Next.js and TypeScript.
- Uses Tailwind CSS for styling.

## Instructions for Running

### Backend

1. Install dependencies: `npm install`
2. Set up the database: `npx prisma migrate dev`
3. Start the server: `npm run start`
4. Access Swagger documentation at `http://localhost:3001/api-docs`

### Frontend

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`

## Additional Notes

- Ensure that the `.env` file is correctly configured with the necessary environment variables for both the backend and frontend.
- The Swagger documentation includes comprehensive details about each endpoint, including request parameters, request bodies, and response types.
- Authentication for the API endpoints is handled using Bearer tokens, as documented in the Swagger UI.
