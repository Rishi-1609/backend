## 1. Minimal Implementation of HTTP Methods

- Overview: 
Implemented a basic fullstack setup to understand core HTTP methods and the request–response lifecycle using Express and vanilla JavaScript.

1. Used a single index.html page with one form to handle all HTTP methods (GET, POST, PUT, DELETE).
2. Implemented all API routes directly inside app.js, where the Express server instance is created.
3. Configured the server to:
- 1. Serve static files from the public/ directory.
- 2. Serve index.html at http://localhost:3000/.
4. Used the Fetch API in the HTML page to send:
- 1. POST, PUT, and DELETE requests with JSON bodies.
- 2. GET requests to retrieve stored data.
5. Stored user data in an in-memory array:
- 1. Each request modifies this array.
- 2. Data is temporary and resets on server restart.