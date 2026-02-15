## Limitations

# Phase 1

1. **In-Memory Data Storage**
   - Data is stored in a local array.
   - All data is lost when the server restarts.
   - No persistence layer (database) is implemented.

2. **No Unique Identifier**
   - Users are identified by name.
   - This can cause conflicts if multiple users have the same name.
   - No primary key or ID system is implemented.

3. **No Proper 404 Handling**
   - PUT and DELETE do not explicitly return a 404 response when a user is not found.
   - Error handling is minimal.

4. **Basic Validation Only**
   - Validation checks only for presence of required fields.
   - No type checking (e.g., ensuring age is a number).
   - No validation library is used.

5. **No Modular Structure**
   - All routes and server logic exist in a single file (`app.js`).
   - Not structured using routers, controllers, or middleware separation.

6. **No Authentication or Authorization**
   - All endpoints are publicly accessible.
   - No user identity or access control is implemented.

7. **No Error Handling Middleware**
   - Errors are not centrally handled.
   - No global error middleware is implemented.

8. **No Logging System**
   - No request logging beyond console debugging.
