# HBnB UML Diagrams 

The HBnB Evolution project is a simplified version of an AirBnB-style platform designed to demonstrate robust software engineering principles. This documentation outlines Part one, which focuses on the architectural design and system modeling that serve as the foundation for the application's development. The layered architecture —comprising Presentation, Business Logic, and Persistence layers- ensures a solid technical foundation before moving into the actual coding phase. By utilizing UML modeling, the project maps out complex interactions between users, property listings, reviews, and amenities, while ensuring data integrity through a centralized Facade pattern.

---

## Diagrams Overview

This project includes the following UML diagrams:

1. **Package Diagram**  
2. **Class Diagram**
3. **Sequence Diagrams :**  
     - User Registration
     - Place Creation
     - Review Submission
     - Fetching a List of Places

   ----

## Each diagram explains a specific aspect of the system design and behavior.

## 1. Package Diagram

### Purpose
The package diagram illustrates the **layered architecture** of the HBnB application
and how responsibilities are separated.

### Packages
- **Presentation Layer**
  - API Endpoints
  - Services
- **Business Logic Layer**
  - HBnB Facade
  - User
  - Place
  - Review
  - Amenity
- **Persistence Layer**
  - Repositories / DAOs
  - Database

### Design Pattern
- Uses the **Facade Pattern**
- Ensures separation of concerns and maintainability

**File:** `Package Diagram.drawio.png`

![Package Diagram](https://github.com/laradreamer79/holbertonschool-hbnb/blob/main/part1/package%20diagram.png)
---
## 2. Class Diagram

### Purpose
The class diagram represents the **internal structure of the Business Logic layer**.
It shows entities, their attributes, methods, and relationships.

### Classes Included
- User
- Place
- Review
- Amenity

### Key Features
- Attributes with data types
- Public methods for CRUD operations
- Associations between entities
- Multiplicity to show relationship cardinality

### Relationships
- One **User** can own many **Places**
- One **User** can write many **Reviews**
- One **Place** can have many **Reviews**
- Many **Places** can have many **Amenities**

**File:** 

![Class Diagram](https://github.com/laradreamer79/holbertonschool-hbnb/blob/main/part1/class%20diagram%20updated.png)


---

## 3. Sequence Diagrams

Sequence diagrams describe how components interact over time to handle API requests.

---

### User Registration Sequence Diagram

### Use Case
A user registers a new account.

### Flow
1. User sends `data (user)`
2. API forwards request to Business Logic to transfer data to register user
3. Business Logic saves user data in the Database
4. Database confirms creation
5. API returns `201 Created` response

### Layers Involved
- User
- API
- Business Logic
- Database

**File:**
 
![User Registration](https://github.com/laradreamer79/holbertonschool-hbnb/blob/main/part1/user%20registration%20sequence%20diagram.png)

---

### Place Creation Sequence Diagram

### Use Case
A user creates a new place listing.

### Flow
1. User sends `data (place)`
2. API calls Business Logic
3. Business Logic creates place
4. Database saves creation
5. API returns `201 Created`

### Layers Involved
- User
- API
- Business Logic
- Database

**File:**

![Place Creation](https://github.com/laradreamer79/holbertonschool-hbnb/blob/main/part1/place%20creation%20sequence%20diagram.png)

---

## Fetching a List of Places
Use Case
A user requests a list of all available places.

Flow
1. User sends a Request (list of places) to the API.
2. API calls the Business Logic layer to Filter Places based on criteria.
3. Business Logic communicates with the Database to Fetch places.
4. Database retrieves the data and sends return places back to the Business Logic.
5. Business Logic processes the data and sends Return list to the API.
6. API returns a Receive list (success) response to the user.

### Layers Involved
- User
- API
- Business Logic
- Database

![review submession](https://github.com/laradreamer79/holbertonschool-hbnb/blob/main/part1/fetching%20a%20list%20of%20places%20sequence%20diagram.png)

---

## Review Submission

### Use Case
A user submits a review for a specific place.

### Flow
1. User sends a post review request to the API.
2. API forwards the request to the Business Logic to Create review.
3. Business Logic instructs the Database to Save review.
4. Database confirms the action with a Review created message.
5. Business Logic confirms completion to the API by sending Return review.
6. API delivers a Success response back to the user.

### Layers Involved
- User
- API
- Business Logic
- Database

![review submession](https://github.com/laradreamer79/holbertonschool-hbnb/blob/main/part1/Review%20submission%20sequence%20diagram.png)
---

## Design Considerations

- Clear separation between layers
- Business Logic is isolated from direct database access
- API acts as the system entry point
- UML standards followed for clarity and consistency

---

## Conclusion

These diagrams provide a clear overview of:
- System **structure** (Class & Package diagrams)
- System **behavior** (Sequence diagrams)

They collectively explain how the HBnB application is designed and how data flows across its layers.
