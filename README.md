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
   git clone https://github.com/alimransahin/level-2-assignment-2.git
   cd level-2-assignment-2
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   PORT=5000
   DATABASE_URL='mongodb+srv://assignment2_user:assignment2_user@cluster0.vgokw2y.mongodb.net/assignment-2?retryWrites=true&w=majority&appName=Cluster0'
   ```

4. **Run the application:**

   ```bash
   npm start
   ```

   The API should now be running on `http://localhost:5000`.

   **Sample Request Body for create product**

   ```bash
   {
   "id": "prd67890",
   "name": "Superphone X Pro",
   "description": "A high-end smartphone with cutting-edge technology and superior performance.",
   "price": {
    "official": 1199,
    "unofficial": 1150
   },
   "category": "Electronics",
   "tags": ["Smartphone", "Flagship", "Tech"],
   "variants": [
    {
      "type": "Color",
      "value": "Silver"
    },
    {
      "type": "Storage",
      "value": "512GB"
    }
   ],
   "inventory": {
    "quantity": 200,
    "inStock": "In Stock"
   },
   "manufacturer": {
    "name": "TechCorp International",
    "contact": "support@techcorp.com"
   },
   "dimensions": {
    "length": 155.3,
    "width": 73.5,
    "height": 7.8
   },
   "weight": 185,
   "images": "https://example.com/superphone-x-pro.jpg",
   "specifications": {
    "operatingSystem": "Android 14",
    "userInterface": "TechUI 5.0",
    "cpu": "Hexa-core Processor",
    "cpuCores": 6,
    "display": {
      "type": "OLED",
      "size": "6.9 inches",
      "resolution": "3200x1440",
      "aspectRatio": "19.5:9",
      "pixelDensity": "515 ppi",
      "screenToBodyRatio": "92%",
      "protection": "Sapphire Glass",
      "brightness": "800 nits",
      "notch": "None"
    },
    "camera": {
      "mainCamera": "64MP Triple Camera",
      "frontCamera": "40MP"
    },
    "battery": {
      "type": "Lithium-polymer",
      "charging": "Fast Charging 65W"
    },
    "features": ["5G", "Face Recognition", "Wireless Charging", "IP68"]
   },
   "releaseDate": "2024-09-15",
   "isDeleted": false
   }

   ```

   sample update url: `http://localhost:5000/api/products/1101`.
   **Sample Request Body for Update**

   ```bash
   {"name":"MY Phone"}
   ```

   **Sample Request Body for create order**

   ```bash
   {
   "email": "john.smith@example.com",
   "productId": "1101",
   "price": 3,
   "quantity": 3
   }
   ```
