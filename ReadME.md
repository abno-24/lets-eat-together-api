# Restaurant Dish Search API - NodeJS, ExpressJS & MySQL.

## Assignment Goal

Backend service to find the top 10 restaurants where a specific dish (filtered by a mandatory price range) has been ordered the most.

---

## 🚀 Live Deployment and Submission Links

| Component             | Detail                                      | Link                                                                   |
| :-------------------- | :------------------------------------------ | :--------------------------------------------------------------------- |
| **Live API URL**      | The public endpoint for the search service. | `lets-eat-together-api-production.up.railway.app/api/v1/search/dishes` |
| **GitHub Repository** | The public link to the source code.         | `https://github.com/abno-24/lets-eat-together-api`                     |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (via `mysql2/promise` with Connection Pooling)
- **Deployment:** Railway

---

## 🧪 API Usage and Sample Request

The entire use case is served by a single GET endpoint.

**Endpoint:** `/api/v1/search/dishes`

**Method:** `GET`

**Mandatory Query Parameters:**

- `name`: The dish name (e.g., `biryani`). Partial matching is supported.
- `minPrice`: The minimum price (e.g., `150`).
- `maxPrice`: The maximum price (e.g., `300`).

### Example Request

lets-eat-together-api-production.up.railway.app/api/v1/search/dishes?name=Biryani&minPrice=150&maxPrice=300

### Expected Response Format (Success 200)

```json
{
  "statusCode": 200,
  "data": {
    "restaurants": [
      // Top 1 (Highest order count in the price range)
      {
        "restaurantId": 1,
        "restaurantName": "Biryani King",
        "city": "Mumbai",
        "dishName": "Chicken Biryani",
        "dishPrice": 220,
        "orderCount": 10
      }
      // ... up to 10 results
    ]
  },
  "message": "Top restaurants retrieved successfully",
  "success": true
}
```

## ⚙️ Local Setup Steps

To run the code locally, follow these steps:

**Prerequisites**

- NodeJS
- MySQL Server (local instance running)
- MySQL Workbench

**Installation**

- git clone https://github.com/abno-24/lets-eat-together-api
- cd lets-eat-together-api
- npm install

**Database Configuration (.env)**

```
PORT=3000
CORS_ORIGIN=*

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_local_root_password
DB_NAME=dish_search_service
```

**Schema and Data Seeding**

1. Create the database: Run `CREATE DATABASE dish_search_service;` in your MySQL client.
2. Connect to the new database (dish_search_service) via your MySQL client.
3. Execute the schema script located at: `database/schema.sql`
4. Execute the seed script located at: `database/seed.sql`

**Run the Server**

```
npm start
```

The API Health check will be available at http://localhost:3000/api/v1/health.

The main search endpoint will be available at http://localhost:3000/api/v1/search/dishes...
