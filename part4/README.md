# HBnB - Part 4 Frontend

## Project Overview
This part of the HBnB project focuses on the frontend interface. It connects the user-facing pages to the backend API and allows users to browse places, log in, view place details, and submit reviews.

The frontend was built with HTML, CSS, and JavaScript. The pages communicate with the API using the Fetch API and manage authentication using a JWT token stored in cookies.

## Features
- Display a list of available places
- Filter places by maximum price
- Show detailed information for a selected place
- Display reviews for a place
- Allow authenticated users to submit reviews
- Show and hide Login/Logout buttons depending on authentication state
- Redirect unauthenticated users when needed

## Project Structure
- `index.html` — Home page with places list and price filter
- `login.html` — Login page
- `place.html` — Place details page with reviews and review form
- `add_review.html` — Review submission page
- `scripts.js` — JavaScript logic for API requests, authentication, filtering, and rendering
- `styles.css` — Styling for the frontend pages
- `logo.png`, `icon.png`, and other image files — Visual assets used in the interface

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Fetch API
- JWT authentication with cookies

## Authentication
Authentication is handled through the login endpoint. When a user logs in successfully, the JWT token is stored in cookies. The frontend then checks for this token to determine whether the user is authenticated.

If the token exists:
- The Login button is hidden
- The Logout button is shown
- The review form is displayed

If the token does not exist:
- The Login button is shown
- The Logout button is hidden
- The review form is hidden

## API Endpoints Used
The frontend communicates with the following backend endpoints:

- `POST /auth/login` — Authenticate user and return JWT token
- `GET /places/` — Retrieve all places
- `GET /places/<place_id>` — Retrieve details for a specific place
- `GET /reviews/` — Retrieve all reviews
- `POST /reviews/` — Submit a new review
- `GET /users/<user_id>` — Retrieve user information when needed

## How to Run
1. Start the backend server from Part 3.
2. Move to the `part4` directory.
3. Run a local HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
   Open the browser and visit:
    http://localhost:8000/index.html



## Testing Statements

The following tests were performed to verify the frontend behavior:

## 1. Places List
Verified that the frontend successfully fetches places from the API
Confirmed that all returned places are displayed as cards
Confirmed that each card shows the title, description, price, and a details link

## 2. Price Filter
Verified that changing the price filter updates the displayed places
Confirmed that places above the selected price are hidden
Confirmed that selecting All displays all places again

## 3. Login
Tested login with valid credentials and confirmed successful redirection to the home page
Tested login with invalid credentials and confirmed that an error message appears
Verified that the JWT token is stored in cookies after successful login

## 4. Authentication UI
Confirmed that the Login button is shown when no token exists
Confirmed that the Logout button is shown when a token exists
Verified that the review form is hidden from unauthenticated users
Verified that the review form is shown for authenticated users

## 5. Place Details
Confirmed that clicking "View Details" opens the correct place page
Verified that the place details page displays the selected place information
Verified that place reviews are loaded and displayed correctly

## 6. Reviews
Confirmed that existing reviews are shown as cards using the review-card class
Verified that each review displays:
the review comment
the review rating
a user reference
Verified that reviews are filtered correctly by place_id

## 7. Add Review
Tested review submission as an authenticated user
Confirmed that the review is sent to the backend successfully
Verified that the page reloads and the new review appears after submission
Confirmed that unauthenticated users cannot access review submission properly

## 8. Logout
Tested clicking the Logout button
Confirmed that the token cookie is cleared
Verified that the user is redirected to the home page
Confirmed that the Login button appears again after logout
Known Limitations
User names for reviews may depend on the available API response fields
Images for place cards are currently static/demo images unless backend image support is added
Styling was improved for usability, but the exact final appearance can vary depending on browser rendering

## Future Improvements
Add dynamic images for each place
Display host names directly from the backend response
Improve review user display with actual usernames
Add better responsive behavior for smaller screens
Improve accessibility and form validation messages

## Author

 Lara Alzannan
