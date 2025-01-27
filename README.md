# LMS
# MERN Stack Learning Platform

A full-featured learning platform built using the MERN stack with TypeScript. This project includes user authentication, course creation, management, and purchase functionality, as well as admin and user-specific dashboards. 

## Features

### Frontend
- Built with React (TypeScript) and Shadcn UI for styling.
- Implements **Redux Toolkit (RTK Query)** for state management and API handling.
- Responsive and intuitive UI with light/dark mode.
- Core functionalities include:
  - Login and Signup pages.
  - Navbar with dynamic routing.
  - Hero section and landing pages.
  - Courses, My Learning, and Profile pages.
  - Dashboard for admins to manage courses.
  - Protected routes for authenticated users.

### Backend
- Developed with Node.js, Express, and MongoDB.
- Implements user authentication using JWT.
- RESTful API endpoints for user and course management.
- Core functionalities include:
  - User registration, login, and profile management.
  - Course creation, editing, publishing/unpublishing, and removal.
  - Lecture addition, upload, and management using **Multer** and **Cloudinary**.
  - Payment integration with **Stripe** and webhooks for purchases.

### Additional Features
- Light/Dark mode for improved user experience.
- Advanced search and filter functionality for courses.
- Integration of course progress tracking.

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit (RTK Query)
- Shadcn UI
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- Multer for file uploads
- Cloudinary for media storage
- Stripe for payment processing

## Project Structure

```
repository/
├── backend/              # Backend code
│   ├── controllers/      # API controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middlewares/      # Authentication and other middleware
│   └── server.ts         # Express app setup
│
├── frontend/             # Frontend code
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── features/     # RTK Query slices
│   │   ├── pages/        # Page components
│   │   ├── app/          # Redux store
│   │   ├── App.tsx       # Root component
│   │   └── index.tsx     # Entry point
│   └── public/           # Static files
│
└── README.md             # Documentation
```

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- Stripe Account for payment integration

### Steps to Run

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AshFire1/LMS/
   cd repository
   ```

2. **Set Up Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file and add the following:
   # MONGO_URI=<your-mongodb-uri>
   # JWT_SECRET=<your-jwt-secret>
   # STRIPE_SECRET=<your-stripe-secret>
   npm run dev
   ```

3. **Set Up Frontend**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## API Endpoints

### User Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Course Endpoints
- `POST /api/courses` - Create a new course (Admin only)
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `PUT /api/courses/:id` - Edit course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)

### Payment Endpoints
- `POST /api/payment/checkout` - Create a Stripe checkout session
- `POST /api/payment/webhook` - Handle Stripe webhook events

## Contributions
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
