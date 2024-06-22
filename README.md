# Job Board Back-End API

This is a Job Board API built with Node.js, Express, MySQL, and Sequelize, following the MVC architecture. It includes features for user registration and login, job posting and browsing, job application with resume upload, and more.

## Features

- User Registration: Allow users to create an account as either an employer or a job seeker.
- User Login: Enable users to log in to their accounts.
- Browse Jobs: Display a list of available job listings.
- Search Jobs: Allow users to search for jobs by title, location, or category.
- View Job Details: Show detailed information about a job listing.
- Apply for a Job: Allow job seekers to apply for jobs by submitting their resume and cover letter.
- Post a Job: Enable employers to post job listings, including job title, description, location, and requirements.
- Manage Job Listings: Allow employers to edit or delete their job listings.
- View Applications: Enable employers to view and manage job applications.
- View Profile: Allow users to view and update their profile information.
- Resume Upload: Allow job seekers to upload resumes when applying for jobs.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:
   - git clone https://github.com/durgesh966/Job-Board-Back-End-API
   - cd job-board-api

2. Install dependencies:
   - npm install

3. Create a `.env` file in the root directory and add the following environment variables:
   
   - DATABASE_HOST=your_database_host
   - DATABASE_USER=your_database_user
   - DATABASE_PASSWORD=your_database_password
   - DATABASE_NAME=your_database_name
   - JWT_SECRET=your_jwt_secret
   - EMAIL_USER=your_email@example.com
   - bEMAIL_PASS=your_email_password

4. Set up the MySQL database:
   - CREATE DATABASE your_database_name;

5. Run the migrations to create the necessary tables:
   - npx sequelize-cli db:migrate

6. Start the server:
   - npm start

   The server will start on `http://localhost:3000`.

### API Endpoints

#### Auth

- `POST /auth/register` - Register a new user
<!-- {
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string"  // either "employer" or "jobseeker"
} -->

- `POST /auth/login` - Log in a user
<!-- {
  "email": "string",
  "password": "string"
} -->


#### Jobs

- `GET /jobs` - Get all job listings
- `POST /jobs` - Post a new job (employers only)
<!-- {
  "title": "string",
  "description": "string",
  "location": "string",
  "category": "string"
} -->

- `GET /jobs/:id` - Get a job listing by ID
- `PUT /jobs/:id` - Update a job listing by ID (employers only)
<!-- {
  "title": "string",
  "description": "string",
  "location": "string",
  "category": "string"
} -->

- `DELETE /jobs/:id` - Delete a job listing by ID (employers only)

#### Applications

- `POST /applications` - Apply for a job with a resume upload
<!-- {
  "jobId": "integer",
  "coverLetter": "string"
} -->

- `GET /applications` - Get all applications (employers only)

#### Users

- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
<!-- {
  "username": "string",
  "email": "string",
  "password": "string" // optional
} -->


### Middleware

- `authMiddleware.js` - Handles authentication using JWT
- `uploadMiddleware.js` - Handles file uploads using `multer`

### Models

- `User.js` - User model
- `Job.js` - Job model
- `Application.js` - Application model

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Conclusion

This job board API provides a comprehensive solution for managing job listings and applications. It supports various features essential for both job seekers and employers, including resume uploads and email notifications.