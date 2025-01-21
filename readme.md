# SavePass Backend

This is the **backend API** for the **SavePass**. The backend is built using **Express.js** and **MongoDB** to securely manage user credentials. It is deployed separately and serves as an API for the frontend, which is developed using React.

## Features

1. **Credential Management**:
   - Store, update, and delete user credentials in a **MongoDB** database.
2. **RESTful API**:
   - Provides a set of RESTful endpoints for managing credentials.
   - Endpoints for adding, editing, deleting, and retrieving credentials.
3. **CORS Support**:
   - CORS is configured to allow seamless communication between the frontend and backend, enabling smooth API calls.
4. **Environment Variables**:
   - The server uses environment variables for secure management of sensitive information like database URI and port.

## Deployment

The backend API is deployed separately. The frontend connects to this API for credential management.

## Getting Started

Follow these steps to run the backend locally:

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** and **npm** for managing dependencies.
- **MongoDB** for database storage (either locally or via a cloud provider like MongoDB Atlas).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ChirayuC01/save-pass-api.git

2. Navigate to the project directory:
   ```bash
   cd save-pass-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

4. Add environment variables:
   - Create a ```.env``` file in the root directory and add the following:
  
        ```go
        PORT=your_preferred_port
        MONGO_URI=your_mongodb_connection_string
        ```
    - Replace your_mongodb_connection_string with the connection string for your MongoDB database.
  
5. Start the backend server:
   ```bash
   node index.js
   ```

## Technologies Used

- **Express.js**: Backend framework for building the API and handling HTTP requests.
- **MongoDB**: NoSQL database for storing user credentials.
- **CORS**: Solved to allow frontend communication with the backend API.
- **dotenv**: For managing environment variables securely.
- **Vercel**: Deployment platform for fast and reliable hosting.
