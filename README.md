[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19689639&assignment_repo_type=AssignmentRepo)
# Express.js Products API

This project is a RESTful API built with Express.js for managing products. It demonstrates routing, middleware, error handling, and advanced features like filtering, pagination, and search.


##  Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- [Postman](https://www.postman.com/), Insomnia, or curl for API testing

### Installation & Running the Server

1. **Clone the repository:**
   ```
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and set your API key:
     ```
     cp .env.example .env
     ```
     Edit `.env` and set `API_KEY` to any string you want.

4. **Start the server:**
   ```
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

---

##  API Documentation

### Authentication

- For `POST`, `PUT`, and `DELETE` requests, include the header:
  ```
  x-api-key: your_api_key_here
  ```

---

### Endpoints

#### 1. **GET /api/products**

- **Description:** List all products, with optional filtering, search, and pagination.
- **Query Parameters:**
  - `category` — Filter by category (e.g., `?category=electronics`)
  - `search` — Search by product name (e.g., `?search=laptop`)
  - `page` — Page number for pagination (e.g., `?page=1`)
  - `limit` — Number of products per page (e.g., `?limit=2`)
- **Example Request:**  
  ```
  GET http://localhost:3000/api/products?category=electronics&search=laptop&page=1&limit=2
  ```
- **Example Response:**
  ```json
  {
    "total": 1,
    "page": 1,
    "limit": 2,
    "products": [
      {
        "id": "1",
        "name": "Laptop",
        "description": "High-performance laptop with 16GB RAM",
        "price": 1200,
        "category": "electronics",
        "inStock": true
      }
    ]
  }
  ```

---

#### 2. **GET /api/products/:id**

- **Description:** Get a specific product by ID.
- **Example Request:**  
  ```
  GET http://localhost:3000/api/products/1
  ```
- **Example Response:**
  ```json
  {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
  ```

---

#### 3. **POST /api/products**

- **Description:** Create a new product.  
- **Headers:**  
  `x-api-key: your_api_key_here`  
  `Content-Type: application/json`
- **Body Example:**
  ```json
  {
    "name": "Wireless Headphones",
    "description": "Noise-cancelling Bluetooth headphones",
    "price": 150,
    "category": "electronics",
    "inStock": true
  }
  ```
- **Example Response:**
  ```json
  {
    "id": "generated-uuid",
    "name": "Wireless Headphones",
    "description": "Noise-cancelling Bluetooth headphones",
    "price": 150,
    "category": "electronics",
    "inStock": true
  }
  ```

---

#### 4. **PUT /api/products/:id**

- **Description:** Update an existing product.
- **Headers:**  
  `x-api-key: your_api_key_here`  
  `Content-Type: application/json`
- **Body Example:** (same as POST)
- **Example Request:**  
  ```
  PUT http://localhost:3000/api/products/1
  ```
- **Example Response:**  
  Returns the updated product object.

  ```json
  {
    "id": "1",
    "name": "Laptop Pro",
    "description": "Upgraded 32GB RAM model",
    "price": 1500,
    "category": "electronics",
    "inStock": true
  }
  ```

---

#### 5. **DELETE /api/products/:id**

- **Description:** Delete a product.
- **Headers:**  
  `x-api-key: your_api_key_here`
- **Example Request:**  
  ```
  DELETE http://localhost:3000/api/products/1
  ```
- **Example Response:**
  ```json
  {
    "message": "Product deleted",
    "product": {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  }
  ```

---

#### 6. **GET /api/products/stats**

- **Description:** Get product statistics (count by category and total).
- **Example Request:**  
  ```
  GET http://localhost:3000/api/products/stats
  ```
- **Example Response:**
  ```json
  {
    "countByCategory": {
      "electronics": 2,
      "kitchen": 1
    },
    "total": 3
  }
  ```



## Error Handling

- **400 Bad Request:** Invalid input or missing fields.
- **401 Unauthorized:** Missing or invalid API key.
- **403 Forbidden:** Invalid API key.
- **404 Not Found:** Product not found.
- **500 Internal Server Error:** Unexpected server error.



## Example curl Commands

- **Create Product:**
  ```sh
  curl -X POST http://localhost:3000/api/products \
    -H "Content-Type: application/json" \
    -H "x-api-key: your_api_key_here" \
    -d '{"name":"Tablet","description":"A new tablet","price":300,"category":"electronics","inStock":true}'
  ```

- **Get All Products:**
  ```sh
  curl http://localhost:3000/api/products
  ```



## 📄 License

MIT