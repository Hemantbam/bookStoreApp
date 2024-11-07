BookMandu is a user-friendly bookstore web application designed to make browsing, buying, and managing books easy and enjoyable for both users and administrators. Here’s an overview of the key features that make BookMandu a complete bookstore platform:

Simple Task Flow: The app’s clean and intuitive design allows users to explore, browse, and purchase books without hassle, ensuring a smooth experience.

User Registration Verification: To maintain secure user accounts, the app verifies new users by sending an OTP to their email. Users can only complete registration after verifying their email with the OTP.

Password Reset: If users forget their password, they can reset it by receiving an OTP to their email and verifying it, ensuring secure and easy access recovery.

Notification Management: Users receive updates on important actions like order confirmations, and pop-up messages are in place to confirm their choices, making each step transparent and informed.

Secure Access and Data Protection: The app uses encrypted passwords to keep user details safe and a token-based authorization system with strong encryption to ensure secure access.

Authentication and Role-Based Access Control: BookMandu provides separate roles for users and admins, allowing only admins to access management features while users focus on browsing and purchasing.

Subscribe Feature: Users can subscribe to receive updates, enabling the app to collect and use subscriber data for future communications and offers.

Contact Us Service: A dedicated contact section allows users to reach out for inquiries or support, creating a responsive and connected experience.

Book Recommendations: Users are offered personalized book recommendations based on what’s popular, recently added, and the latest releases, helping them find books of interest easily.

User, Book, and Order Management for Admins: Admins have full control over managing users, books, and orders, keeping the bookstore organized and updated efficiently.




Technologies Used in BookMandu:

Key Frontend Technologies:

React JS:
Utilizes various hooks like useState, useEffect for state management and handling side effects.
useContext is used to share global data such as user authentication status across components.
Private Routes are implemented to restrict access to certain pages, ensuring only authenticated users or admins can access specific parts of the app.
DOM Manipulation is used for updating the UI dynamically in response to user actions and data changes.

Alert Management:
SweetAlert (swal): Provides stylish and interactive alert messages to enhance user experience, offering clear and informative notifications such as order confirmations, cancellations, and other important updates.

HTTP Requests:
Axios: Axios is used for making HTTP requests to interact with the backend, handling API calls for tasks like fetching books, managing orders, and updating user details.
Security:

JWT Decode: It is used to decode the token and retrieve user information (like user roles, email) for access control and role-based routing.


Key Backend Technologies:
Node.js:
runtime for executing JavaScript code on the server side.

Express.js:
A popular Node.js web framework used to build APIs and handle HTTP requests.

MySQL and MySQL2:
These are libraries used to interact with a MySQL database for storing and retrieving data.
mysql is the older package, while mysql2 is a more modern version with additional features and better performance.

bcrypt:
A library used for hashing passwords securely before storing them in the database.

jsonwebtoken:
Used for generating and verifying JSON Web Tokens (JWTs), typically for authentication and secure access.

multer:
A middleware for handling multipart/form-data, primarily used for uploading files (e.g., book images).

nodemailer:
Used for sending emails from the server. This could be useful for email notifications, password resets, or order updates.

CORS (Cross-Origin Resource Sharing):
A middleware to allow cross-origin requests, typically used when the frontend and backend are hosted on different domains or ports.



Development Tools:
Nodemon:
A development tool that automatically restarts the server when changes are detected in the code, improving development speed.

