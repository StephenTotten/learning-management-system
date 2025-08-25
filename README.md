# Learning Management System

A full-stack web application for online course management and learning, built with React and Node.js.

## Features

- **Course Browsing**: Explore available courses with a clean, responsive interface
- **User Navigation**: Intuitive navigation with mobile-responsive design
- **Course Management**: Platform for managing online courses and learning materials
- **Database Integration**: PostgreSQL database with Sequelize ORM

## Tech Stack

### Frontend
- **React** 19.1.0 - UI library
- **React Router DOM** 7.7.1 - Client-side routing
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** 5.1.0 - Web framework
- **PostgreSQL** - Database
- **Sequelize** 6.37.7 - ORM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
learning-management-system/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   │   └── db.js         # Database configuration
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── index.js         # Server entry point
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning-management-system
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the server directory:
   ```env
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   PORT=5000
   ```

5. **Database Setup**
   - Create a PostgreSQL database
   - Update the `.env` file with your database credentials

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on http://localhost:5000

2. **Start the frontend client**
   ```bash
   cd client
   npm start
   ```
   Client runs on http://localhost:3000

### Production Mode

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Start the server**
   ```bash
   cd server
   npm start
   ```

## API Endpoints

- `GET /api` - Health check endpoint

## Available Scripts

### Client
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Server
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.