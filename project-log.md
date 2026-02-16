## Phase 1. Minimal Implementation of HTTP Methods

- Overview: 
Implemented a basic fullstack setup to understand core HTTP methods and the request–response lifecycle using Express and vanilla JavaScript.

1. Used a single index.html page with one form to handle all HTTP methods (GET, POST, PUT, DELETE).
2. Implemented all API routes directly inside app.js, where the Express server instance is created.
3. Configured the server to:
    - Serve static files from the public/ directory.
    - Serve index.html at http://localhost:3000/.
4. Used the Fetch API in the HTML page to send:
    - POST, PUT, and DELETE requests with JSON bodies.
    - GET requests to retrieve stored data.
5. Stored user data in an in-memory array:
    - Each request modifies this array.
    - Data is temporary and resets on server restart.

## Phase 2. Modular Architecture & File-Based Persistence

- Overview:  
Refactored the backend into a modular layered structure and introduced file-based JSON persistence with metadata-driven ID management.

1. Separated backend into layers:
   - `app.js` for configuration and route mounting.
   - `routes/` for endpoint definitions.
   - `controllers/` for request handling logic.
   - `services/` for data access and file operations.

2. Replaced in-memory array storage with persistent JSON files:
   - `users.json` to store user records.
   - `userMetadata.json` to track incremental ID and total users.

3. Implemented Read → Parse → Modify → Write pattern using `fs.promises` with proper async/await handling across layers.

4. Added incremental ID generation using metadata:
   - Avoided scanning the full dataset for max ID.
   - Updated metadata on each successful user creation.

5. Introduced async startup initialization:
   - Ensured database files are initialized before server starts.
   - Wrapped server startup inside an async function for controlled execution.

6. Strengthened API behavior:
   - Proper use of HTTP status codes (200, 201, 400).
   - Consistent JSON responses.
   - Correct handling of empty dataset scenarios.

- System Characteristics:
   - Persistent across server restarts.
   - Modular and layered architecture.
   - Aware of atomicity and concurrency limitations.
   - Prepared for future migration to database-backed storage.

## Phase 3. Full CRUD Completion, Single-File Storage & Strict Initialization

- Overview:  
Completed full RESTful CRUD implementation for `/user`, migrated to a single structured storage file, and introduced strict fail-fast database initialization with schema validation.

1. Completed RESTful endpoints:
   - `GET /user` (Get all users)
   - `GET /user/:userId` (Get user by ID)
   - `POST /user` (Create user)
   - `PUT /user/:userId` (Update user by ID)
   - `DELETE /user/:userId` (Delete user by ID)

2. Refactored storage into a single JSON file structure:
   - Unified `meta` and `users` into one file.
   - Structure:
     ```json
     {
       "meta": { "lastId": number },
       "users": [ ... ]
     }
     ```
   - Removed separate metadata file.

3. Enforced identity immutability:
   - IDs are never reassigned.
   - Deleted users do not affect existing IDs.
   - `meta.lastId` increases monotonically.

4. Implemented proper delete semantics:
   - Used array `splice()` for safe removal.
   - Returned `204 No Content` for successful deletion.
   - Returned `404 Not Found` when user does not exist.

5. Added strict startup initialization inside service layer:
   - Creates database file only if missing.
   - Initializes file if empty.
   - Fails fast on corrupted JSON.
   - Validates schema before allowing server to start.
   - Prevents silent data resets.

6. Strengthened error discipline:
   - Clear distinction between `400`, `404`, `500`, and `204`.
   - Controllers do not access filesystem directly.
   - Services handle all persistence logic.

- System Characteristics:
   - Fully REST-compliant CRUD API.
   - Deterministic startup behavior.
   - Fail-fast database validation.
   - Clean separation of HTTP, business, and storage logic.
   - Architecturally ready for database migration (only service layer would change).
