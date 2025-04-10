# Next.js + Tailwind CSS + Prisma + TypeGraphQL Boilerplate

A modern, full-stack boilerplate to kickstart your TypeScript web application development with a powerful tech stack.

## Features

- **Next.js 15+**: React framework with optimized performance and developer experience
- **TypeScript**: Type-safe code for better developer productivity
- **Prisma ORM**: Type-safe database client for simplified database access
- **TypeGraphQL**: Create GraphQL APIs using TypeScript classes and decorators
- **Apollo Client/Server**: Complete GraphQL implementation with client and server
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Type Safety**: End-to-end type safety from database to frontend
- **Vercel Deployment Ready**: Optimized setup for seamless Vercel deployment

## Stack Details

- **Frontend**: Next.js, React 19, Apollo Client, Tailwind CSS
- **API**: GraphQL with TypeGraphQL, Apollo Server integrated with Next.js API routes
- **Database**: MongoDB (via Prisma ORM)
- **Authentication**: JWT with bcrypt password hashing
- **Type Generation**: Automatic TypeScript types from GraphQL schema

## Getting Started

### Prerequisites

- Node.js 18+ and yarn
- MongoDB database

### Installation

1. Clone this repository

```bash
git clone https://github.com/yourusername/next-tailwind-prisma-typegraphql.git
cd next-tailwind-prisma-typegraphql
```

2. Install dependencies

```bash
yarn install
```

3. Set up environment variables

```
# Create a .env file based on .env.example
cp .env.example .env
# Edit the .env file with your database connection string and other settings
```

4. Set up the database

```bash
yarn prisma db push
```

### Running the Development Server

```bash
# Run the Next.js frontend with integrated GraphQL API
yarn dev

# Run GraphQL code generation in watch mode
yarn cw
```

## Project Structure

```
├── app/                  # Next.js app router pages
│   ├── api/              # API routes
│   │   └── graphql/      # GraphQL API endpoint
├── lib/                  # Shared utilities
│   ├── graphql/          # GraphQL schema and resolvers
│   │   ├── resolvers/    # Custom GraphQL resolvers
│   │   └── schema.ts     # GraphQL schema setup
├── prisma/               # Prisma schema and generated clients
│   ├── schema.prisma     # Database schema
│   └── generated/        # TypeGraphQL generated resolvers
├── public/               # Static assets
└── codegen.ts            # GraphQL code generation config
```

## Scripts

- `yarn dev` - Start Next.js development server with integrated GraphQL API
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn cw` - Run GraphQL code generation in watch mode
- `yarn prisma generate` - Generate Prisma client

## Authentication

The boilerplate includes a complete authentication system with:

- User registration
- User login with JWT generation
- Password hashing with bcrypt
- Protected resolvers/routes

## Type Safety

This boilerplate provides end-to-end type safety:

- Database schema to Prisma client
- Prisma to TypeGraphQL resolvers
- GraphQL schema to frontend queries

## Deployment

This boilerplate is optimized for Vercel deployment. The GraphQL API is served through Next.js API routes, eliminating the need for a separate server process.

To deploy to Vercel:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
