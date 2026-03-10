# PHUTURE – Backend API

The PHUTURE backend is a RESTful API built with Node.js and Express that powers the PHUTURE e-commerce platform.

It handles authentication, user management, products, and order processing.

🌐 **Live Demo:**  
https://phuture-frontend.vercel.app/

⚠️ Project Status  
🚧 This project is currently under active development.

---

# Tech Stack

## Runtime
- Node.js

## Framework
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JSON Web Tokens (JWT)
- Refresh token system

## Security
- Password hashing (bcrypt)
- HTTP-only cookies
- CORS configuration

---

# Current Features

## Authentication
- User registration
- User login
- JWT access token generation
- Refresh token system
- Secure logout

## API Architecture
- RESTful API structure
- Modular route system
- Controller-based architecture
- Middleware-based request handling
- Global error handling

## Security
- Password hashing
- Token validation
- Protected routes
- Secure cookie handling

---

# Features In Progress

- Product management API
- Shopping cart system
- Wishlist API
- Order management system
- Admin dashboard API

---

# Planned Features

- Payment gateway integration
- Image upload handling
- Product search and filtering
- Email notifications
- Rate limiting
- Logging and monitoring

---

# Running the Backend Locally

Install dependencies

npm install

Run development server

npm run dev

The backend will run at

http://localhost:5000

---

# Environment Variables

Create a .env file

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
CLIENT_URL=http://localhost:5173

---

# API Endpoints

Authentication

POST /api/auth/signup  
POST /api/auth/login  
POST /api/auth/logout  
POST /api/auth/refresh

---

# Author

Yusri Nelson  
Junior Full-Stack Developer  
Cape Town, South Africa
