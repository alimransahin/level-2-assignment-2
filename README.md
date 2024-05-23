# level-2-assignment-2

# Product Management API

This is a simple Node.js and Express API for managing products using MongoDB with Mongoose.

## Prerequisites

Make sure you have the following installed on your local development machine:

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (running locally or a cloud instance)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/product-management-api.git
   cd product-management-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/productsdb
   ```

   Replace `mongodb://localhost:27017/productsdb` with your actual MongoDB connection string if different.

4. **Run the application:**

   ```bash
   npm start
   ```

   The API should now be running on `http://localhost:3000`.
