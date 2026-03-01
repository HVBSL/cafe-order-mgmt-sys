# Order Management System - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Content Type
All requests and responses use `application/json` content type.

---

## 1. COMPANY API

### 1.1 Create Company
Creates a new company record.

**Endpoint:** `POST /api/companies/create`

**Request Body:**
```json
{
  "name": "Pizza Palace",
  "email": "info@pizzapalace.com",
  "phoneNo": "9876543210",
  "address": "123 Main Street, New York, NY 10001"
}
```

**Success Response (201):**
```json
{
  "message": "Company created successfully",
  "company": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Pizza Palace",
    "email": "info@pizzapalace.com",
    "phoneNo": "9876543210",
    "address": "123 Main Street, New York, NY 10001",
    "createdAt": "2026-03-02T09:00:00.000Z",
    "updatedAt": "2026-03-02T09:00:00.000Z"
  }
}
```

**Error Response (400) - Duplicate Email:**
```json
{
  "message": "Company with this email already exists"
}
```

**Error Response (500):**
```json
{
  "message": "Error creating company",
  "error": "Database connection error"
}
```

---

### 1.2 Get Companies
Retrieves companies by ID, email, or all companies.

**Endpoint:** `GET /api/companies/get`

**Request Body (Get All):**
```json
{}
```

**Request Body (Get by ID):**
```json
{
  "companyId": "507f1f77bcf86cd799439012"
}
```

**Request Body (Get by Email):**
```json
{
  "email": "info@pizzapalace.com"
}
```

**Success Response (200):**
```json
{
  "companies": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Pizza Palace",
      "email": "info@pizzapalace.com",
      "phoneNo": "9876543210",
      "address": "123 Main Street, New York, NY 10001",
      "createdAt": "2026-03-02T09:00:00.000Z",
      "updatedAt": "2026-03-02T09:00:00.000Z"
    }
  ]
}
```

**Error Response (404):**
```json
{
  "message": "Company not found"
}
```

---

### 1.3 Update Company
Updates company information.

**Endpoint:** `PUT /api/companies/update`

**Request Body:**
```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "name": "Pizza Palace Premium",
  "email": "support@pizzapalace.com",
  "phoneNo": "9876543211",
  "address": "456 Main Street, New York, NY 10001"
}
```

**Success Response (200):**
```json
{
  "message": "Company updated successfully",
  "company": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Pizza Palace Premium",
    "email": "support@pizzapalace.com",
    "phoneNo": "9876543211",
    "address": "456 Main Street, New York, NY 10001",
    "createdAt": "2026-03-02T09:00:00.000Z",
    "updatedAt": "2026-03-02T09:15:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "message": "Company not found"
}
```

---

## 2. TABLES API

### 2.1 Create Table
Creates a new table for a company.

**Endpoint:** `POST /api/tables/create`

**Request Body:**
```json
{
  "tableNumber": 1,
  "capacity": 4,
  "companyId": "507f1f77bcf86cd799439012"
}
```

**Success Response (201):**
```json
{
  "message": "Table created successfully",
  "table": {
    "_id": "507f1f77bcf86cd799439011",
    "tableNumber": 1,
    "capacity": 4,
    "companyId": "507f1f77bcf86cd799439012",
    "status": true,
    "createdAt": "2026-03-02T09:20:00.000Z",
    "updatedAt": "2026-03-02T09:20:00.000Z"
  }
}
```

**Error Response (400) - Table Already Exists:**
```json
{
  "message": "Table with this number already exists for this company"
}
```

**Error Response (404):**
```json
{
  "message": "Company not found"
}
```

---

### 2.2 Get Tables
Retrieves tables based on company and optional filters.

**Endpoint:** `GET /api/tables/get`

**Request Body (Get All Tables for Company):**
```json
{
  "companyId": "507f1f77bcf86cd799439012"
}
```

**Request Body (Get Specific Table):**
```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "tableId": "507f1f77bcf86cd799439011"
}
```

**Request Body (Get Tables by Status):**
```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "status": true
}
```

**Success Response (200):**
```json
{
  "tables": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "tableNumber": 1,
      "capacity": 4,
      "companyId": "507f1f77bcf86cd799439012",
      "status": true,
      "createdAt": "2026-03-02T09:20:00.000Z",
      "updatedAt": "2026-03-02T09:20:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "tableNumber": 2,
      "capacity": 6,
      "companyId": "507f1f77bcf86cd799439012",
      "status": true,
      "createdAt": "2026-03-02T09:21:00.000Z",
      "updatedAt": "2026-03-02T09:21:00.000Z"
    }
  ]
}
```

**Error Response (404):**
```json
{
  "message": "Company not found"
}
```

---

### 2.3 Update Table
Updates table information.

**Endpoint:** `PUT /api/tables/update`

**Request Body:**
```json
{
  "tableId": "507f1f77bcf86cd799439011",
  "tableNumber": 1,
  "capacity": 6,
  "status": true
}
```

**Success Response (200):**
```json
{
  "message": "Table updated successfully",
  "table": {
    "_id": "507f1f77bcf86cd799439011",
    "tableNumber": 1,
    "capacity": 6,
    "companyId": "507f1f77bcf86cd799439012",
    "status": true,
    "createdAt": "2026-03-02T09:20:00.000Z",
    "updatedAt": "2026-03-02T09:25:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "message": "Table not found"
}
```

---

## 3. SESSIONS API

### 3.1 Create Session
Creates a new customer session for a table.

**Endpoint:** `POST /api/sessions/create`

**Request Body:**
```json
{
  "tableId": "507f1f77bcf86cd799439011",
  "custName": "John Doe",
  "phoneNo": "98765432101",
  "companyId": "507f1f77bcf86cd799439012"
}
```

**Success Response (201):**
```json
{
  "message": "Session created successfully",
  "session": {
    "_id": "507f1f77bcf86cd799439013",
    "tableId": "507f1f77bcf86cd799439011",
    "custName": "John Doe",
    "phoneNo": "98765432101",
    "companyId": "507f1f77bcf86cd799439012",
    "active": true,
    "createdAt": "2026-03-02T10:30:00.000Z",
    "updatedAt": "2026-03-02T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "message": "Table not found or is not active"
}
```

---

### 3.2 Get Sessions
Retrieves active sessions based on filters.

**Endpoint:** `GET /api/sessions/get`

**Request Body:**
```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "tableId": "507f1f77bcf86cd799439011",
  "phoneNo": "98765432101"
}
```

**Success Response (200):**
```json
{
  "sessions": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "tableId": "507f1f77bcf86cd799439011",
      "custName": "John Doe",
      "phoneNo": "98765432101",
      "companyId": "507f1f77bcf86cd799439012",
      "active": true,
      "createdAt": "2026-03-02T10:30:00.000Z",
      "updatedAt": "2026-03-02T10:30:00.000Z"
    }
  ]
}
```

**Error Response (404):**
```json
{
  "message": "Company not found"
}
```

---

### 3.3 Update Session
Updates the active status of a session.

**Endpoint:** `PUT /api/sessions/update`

**Request Body:**
```json
{
  "sessionId": "507f1f77bcf86cd799439013",
  "active": false
}
```

**Success Response (200):**
```json
{
  "message": "Session updated successfully",
  "session": {
    "_id": "507f1f77bcf86cd799439013",
    "tableId": "507f1f77bcf86cd799439011",
    "custName": "John Doe",
    "phoneNo": "98765432101",
    "companyId": "507f1f77bcf86cd799439012",
    "active": false,
    "createdAt": "2026-03-02T10:30:00.000Z",
    "updatedAt": "2026-03-02T10:35:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "message": "Session not found"
}
```

---

## 4. MENU API

### 4.1 Create Menu Item
Creates a new menu item for a company.

**Endpoint:** `POST /api/menu/create`

**Request Body:**
```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "name": "Margherita Pizza",
  "price": 250,
  "category": "Pizza"
}
```

**Success Response (201):**
```json
{
  "message": "Menu item created successfully",
  "menu": {
    "_id": "507f1f77bcf86cd799439020",
    "name": "Margherita Pizza",
    "price": 250,
    "category": "Pizza",
    "companyId": "507f1f77bcf86cd799439012",
    "isAvailable": true,
    "isActive": true,
    "createdAt": "2026-03-02T10:45:00.000Z",
    "updatedAt": "2026-03-02T10:45:00.000Z"
  }
}
```

**Error Response (400) - Item Already Exists:**
```json
{
  "message": "Menu item with this name already exists for this company"
}
```

**Error Response (404):**
```json
{
  "message": "Company not found"
}
```

---

### 4.2 Get Menu Items
Retrieves all menu items for a company.

**Endpoint:** `GET /api/menu/get`

**Request Body:**
```json
{
  "companyId": "507f1f77bcf86cd799439012"
}
```

**Success Response (200):**
```json
{
  "menu": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "name": "Margherita Pizza",
      "price": 250,
      "category": "Pizza",
      "companyId": "507f1f77bcf86cd799439012",
      "isAvailable": true,
      "isActive": true,
      "createdAt": "2026-03-02T10:45:00.000Z",
      "updatedAt": "2026-03-02T10:45:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439021",
      "name": "Coke",
      "price": 50,
      "category": "Beverages",
      "companyId": "507f1f77bcf86cd799439012",
      "isAvailable": true,
      "isActive": true,
      "createdAt": "2026-03-02T10:46:00.000Z",
      "updatedAt": "2026-03-02T10:46:00.000Z"
    }
  ]
}
```

**Error Response (404):**
```json
{
  "message": "Menu not found for this company"
}
```

---

### 4.3 Update Menu Item
Updates a menu item's details.

**Endpoint:** `PUT /api/menu/update`

**Request Body:**
```json
{
  "itemId": "507f1f77bcf86cd799439020",
  "name": "Margherita Pizza",
  "price": 275,
  "category": "Pizza"
}
```

**Success Response (200):**
```json
{
  "message": "Menu item updated successfully",
  "menu": {
    "_id": "507f1f77bcf86cd799439020",
    "name": "Margherita Pizza",
    "price": 275,
    "category": "Pizza",
    "companyId": "507f1f77bcf86cd799439012",
    "isAvailable": true,
    "isActive": true,
    "createdAt": "2026-03-02T10:45:00.000Z",
    "updatedAt": "2026-03-02T10:50:00.000Z"
  }
}
```

---

### 4.4 Update Item Availability
Updates the availability status of a menu item.

**Endpoint:** `PUT /api/menu/update-availability`

**Request Body:**
```json
{
  "itemId": "507f1f77bcf86cd799439020",
  "isAvailable": false
}
```

**Success Response (200):**
```json
{
  "message": "Menu item availability updated successfully",
  "menu": {
    "_id": "507f1f77bcf86cd799439020",
    "name": "Margherita Pizza",
    "price": 275,
    "category": "Pizza",
    "companyId": "507f1f77bcf86cd799439012",
    "isAvailable": false,
    "isActive": true,
    "createdAt": "2026-03-02T10:45:00.000Z",
    "updatedAt": "2026-03-02T10:51:00.000Z"
  }
}
```

---

### 4.5 Delete Menu Item
Deletes/deactivates a menu item.

**Endpoint:** `DELETE /api/menu/delete`

**Request Body:**
```json
{
  "itemId": "507f1f77bcf86cd799439020"
}
```

**Success Response (200):**
```json
{
  "message": "Menu item deleted successfully"
}
```

---

## 5. ORDERS API

### 5.1 Place Order
Creates a new order with menu items.

**Endpoint:** `POST /api/orders/place-order`

**Request Body:**
```json
{
  "sessionId": "507f1f77bcf86cd799439013",
  "tableId": "507f1f77bcf86cd799439011",
  "companyId": "507f1f77bcf86cd799439012",
  "items": [
    {
      "menuId": "507f1f77bcf86cd799439020",
      "name": "Margherita Pizza",
      "price": 275,
      "quantity": 2
    },
    {
      "menuId": "507f1f77bcf86cd799439021",
      "name": "Coke",
      "price": 50,
      "quantity": 3
    }
  ]
}
```

**Success Response (201):**
```json
{
  "message": "Order placed successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439030",
    "sessionId": "507f1f77bcf86cd799439013",
    "tableId": "507f1f77bcf86cd799439011",
    "companyId": "507f1f77bcf86cd799439012",
    "status": "PLACED",
    "items": [
      {
        "menuId": "507f1f77bcf86cd799439020",
        "name": "Margherita Pizza",
        "price": 275,
        "quantity": 2
      },
      {
        "menuId": "507f1f77bcf86cd799439021",
        "name": "Coke",
        "price": 50,
        "quantity": 3
      }
    ],
    "createdAt": "2026-03-02T11:00:00.000Z",
    "updatedAt": "2026-03-02T11:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "message": "Session not found or is not active"
}
```

```json
{
  "message": "Menu item with ID 507f1f77bcf86cd799439020 not found or is not active"
}
```

---

### 5.2 Get Orders
Retrieves orders based on filters.

**Endpoint:** `GET /api/orders/get`

**Request Body:**
```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "sessionId": "507f1f77bcf86cd799439013",
  "tableId": "507f1f77bcf86cd799439011"
}
```

**Success Response (200):**
```json
{
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "sessionId": "507f1f77bcf86cd799439013",
      "tableId": "507f1f77bcf86cd799439011",
      "companyId": "507f1f77bcf86cd799439012",
      "status": "PLACED",
      "items": [
        {
          "menuId": "507f1f77bcf86cd799439020",
          "name": "Margherita Pizza",
          "price": 275,
          "quantity": 2
        },
        {
          "menuId": "507f1f77bcf86cd799439021",
          "name": "Coke",
          "price": 50,
          "quantity": 3
        }
      ],
      "createdAt": "2026-03-02T11:00:00.000Z",
      "updatedAt": "2026-03-02T11:00:00.000Z"
    }
  ]
}
```

---

### 5.3 Update Order Status
Updates the status of an order.

**Endpoint:** `PUT /api/orders/update-status`

**Request Body:**
```json
{
  "orderId": "507f1f77bcf86cd799439030",
  "status": "ACCEPTED"
}
```

**Status Values:**
- `PLACED` - Order placed by customer
- `ACCEPTED` - Order accepted by restaurant
- `PREPARING` - Order is being prepared
- `READY` - Order is ready for pickup
- `DELIVERED` - Order delivered to customer
- `CANCELLED` - Order cancelled

**Success Response (200):**
```json
{
  "message": "Order status updated successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439030",
    "sessionId": "507f1f77bcf86cd799439013",
    "tableId": "507f1f77bcf86cd799439011",
    "companyId": "507f1f77bcf86cd799439012",
    "status": "ACCEPTED",
    "items": [
      {
        "menuId": "507f1f77bcf86cd799439020",
        "name": "Margherita Pizza",
        "price": 275,
        "quantity": 2
      },
      {
        "menuId": "507f1f77bcf86cd799439021",
        "name": "Coke",
        "price": 50,
        "quantity": 3
      }
    ],
    "createdAt": "2026-03-02T11:00:00.000Z",
    "updatedAt": "2026-03-02T11:05:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "message": "Order not found"
}
```

---

## Error Handling

### Common Error Responses

**500 - Internal Server Error:**
```json
{
  "message": "Error creating session",
  "error": "Connection timeout"
}
```

**400 - Bad Request:**
```json
{
  "message": "Invalid request parameters"
}
```

---

## Summary Table

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/companies/create` | Create a new company |
| GET | `/api/companies/get` | Retrieve companies |
| PUT | `/api/companies/update` | Update company details |
| POST | `/api/tables/create` | Create a new table |
| GET | `/api/tables/get` | Retrieve tables |
| PUT | `/api/tables/update` | Update table details |
| POST | `/api/sessions/create` | Create a new session |
| GET | `/api/sessions/get` | Retrieve sessions |
| PUT | `/api/sessions/update` | Update session status |
| POST | `/api/menu/create` | Create menu item |
| GET | `/api/menu/get` | Retrieve menu items |
| PUT | `/api/menu/update` | Update menu item |
| PUT | `/api/menu/update-availability` | Update item availability |
| DELETE | `/api/menu/delete` | Delete menu item |
| POST | `/api/orders/place-order` | Place new order |
| GET | `/api/orders/get` | Retrieve orders |
| PUT | `/api/orders/update-status` | Update order status |

---

## Testing with cURL

### Create Company Example:
```bash
curl -X POST http://localhost:5000/api/companies/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pizza Palace",
    "email": "info@pizzapalace.com",
    "phoneNo": "9876543210",
    "address": "123 Main Street, New York, NY 10001"
  }'
```

### Create Table Example:
```bash
curl -X POST http://localhost:5000/api/tables/create \
  -H "Content-Type: application/json" \
  -d '{
    "tableNumber": 1,
    "capacity": 4,
    "companyId": "507f1f77bcf86cd799439012"
  }'
```

### Create Session Example:
```bash
curl -X POST http://localhost:5000/api/sessions/create \
  -H "Content-Type: application/json" \
  -d '{
    "tableId": "507f1f77bcf86cd799439011",
    "custName": "John Doe",
    "phoneNo": "98765432101",
    "companyId": "507f1f77bcf86cd799439012"
  }'
```

### Place Order Example:
```bash
curl -X POST http://localhost:5000/api/orders/place-order \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "507f1f77bcf86cd799439013",
    "tableId": "507f1f77bcf86cd799439011",
    "companyId": "507f1f77bcf86cd799439012",
    "items": [
      {
        "menuId": "507f1f77bcf86cd799439020",
        "name": "Margherita Pizza",
        "price": 275,
        "quantity": 2
      }
    ]
  }'
```

---

## Notes

- All IDs are MongoDB ObjectIds (24-character hexadecimal strings)
- Timestamps are in ISO 8601 format
- **Company Setup Flow:**
  1. First, create a company using the Company API
  2. Use the returned `companyId` for all subsequent operations
- **Table Setup:**
  - Create tables for the company after company creation
  - `status: true` indicates table is active and available
  - `status: false` indicates table is inactive/occupied
- **Session Flow:**
  1. Create a table first
  2. Create a session for that table
  3. Session must be active to place orders
- **Menu Management:**
  - Create menu items for the company
  - `isActive: true` means item can be ordered
  - `isAvailable: true` means item is currently available (not out of stock)
- **Order Placement:**
  - Session must be active
  - Table must be available
  - Menu items must be active and available
  - All items must belong to the same company
- **Validation Rules:**
  - Email addresses must be unique across companies
  - Table numbers must be unique within a company
  - Menu item names must be unique within a company
- **Database Requirements:**
  - MongoDB must be properly configured
  - Connection string should be set via `MONGO_URI` environment variable
  - All required indexes should be created automatically by Mongoose
