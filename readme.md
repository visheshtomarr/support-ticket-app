# Support Ticket App

A MERN stack application for managing support tickets, designed to streamline issue tracking and communication for users. This app enables users to create, view, and manage their tickets with the added functionality of adding notes to tickets for further clarification. 

### Features

- **User Registration and Authentication**: 
    - Users can register by providing their name, email, and password.
    - A JWT (JSON Web Token) is generated upon successful registration.
    - Only authenticated users can access the ticket management features.
    
- **Ticket Management**:
    - Users can create, view, update, and delete their tickets.
    - Each ticket can have associated notes for detailed tracking.

- **Notes Functionality**:
    - Users can add notes to each ticket for further communication and clarification.
    - Note functionality allows users to chat on a ticket level with staff in the future (staff functionality not yet implemented).
  
### Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)

### API Endpoints

#### User Authentication
- `POST /api/users`: Register a new user
- `POST /api/users/login`: Authenticate a user and obtain a JWT

#### Ticket Management
- `GET /api/tickets`: Fetch all tickets for the logged-in user
- `POST /api/tickets`: Create a new ticket for the logged-in user
- `PUT /api/tickets/:ticketId`: Update a specific ticket owned by the user
- `DELETE /api/tickets/:ticketId`: Delete a specific ticket owned by the user

#### Notes Management
- `GET /api/tickets/:ticketId/notes`: Fetch all notes for a specific ticket
- `POST /api/tickets/:ticketId/notes`: Create a note for a specific ticket

### Future Improvements

- **Staff Interface**: Implementation of a staff module for managing and responding to tickets.
- **Enhanced Notifications**: Real-time notifications for users when a new note is added.
- **Role-Based Access Control**: Additional roles to restrict access based on user type.

### Installation and Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/visheshtomarr/support-ticket-app.git
    cd support-ticket-app
    ```

2. **Install server and client dependencies**:
    - Install backend/server dependencies:
      ```bash
      npm install
      ```
    - Install frontend/client dependencies:
      ```bash
      cd frontend
      npm install
      ```

3. **Environment Variables**:
    - In the root directory, rename the `.envexample` file to `.env` file and configure the following environment variables:
      ```plaintext
      NODE_ENV=development
      PORT=5000
      MONGODB_URI=mongodb+srv://your_uri
      JWT_SECRET=your_jwt_secret
      ```

4. **Start the Application**:
    - Run app in development (frontend & backend):
      ```bash
      npm run dev
      ```

5. **Accessing the App**:
    - Visit `http://localhost:3000` in your browser.
