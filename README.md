
# Notes/Task API

## About the Project

This is my backend development project, built using Node.js, Express.js and MongoDB.

The main purpose of this project is to create and manage notes through REST API endpoints. Users can add notes, view them, update existing notes and delete notes.

While building this project, I learned how backend applications work and how to connect an API with a MongoDB database.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Postman

## Features

- Create a new note
- View all notes
- View a note using its ID
- Update an existing note
- Delete a note
- Validate title and description
- Handle errors in one place
- Filter notes by title
- Search notes by title or description
- Sort notes by newest or oldest
- Limit the number of notes returned

## Project Structure

```text
Notes_Task_API/
│
├── models/
│   └── Note.js
│
├── node_modules/
├── .env
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## How to Run the Project

1. Clone or download this project.
2. Open the project folder in VS Code.
3. Install the required packages:

   npm install

4. Create a `.env` file and add your MongoDB connection string:

   MONGO_URI=your_mongodb_connection_string

5. Start the server:

   node server.js

6. Open Postman and test the API.

The server runs at:

http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /notes | Create a note |
| GET | /notes | Get all notes |
| GET | /notes/:id | Get a note by ID |
| PUT | /notes/:id | Update a note |
| DELETE | /notes/:id | Delete a note |

## Query Examples

- Filter: `/notes?title=Study`
- Search: `/notes?search=Java`
- Sort newest first: `/notes?sort=newest`
- Sort oldest first: `/notes?sort=oldest`
- Limit results: `/notes?limit=5`

You can also combine these query options.

## What I Learned

Through this project, I got practical experience with Node.js, Express.js, MongoDB and REST APIs. I learned how to build CRUD operations, validate user input, handle errors and test API endpoints using Postman.
