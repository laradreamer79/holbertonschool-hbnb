# HBnB UML Diagrams 

This document provides UML diagrams that describe the structure and behavior of the HBnB application.
The diagrams focus on the **Business Logic layer**, its interaction with other layers, and the overall system architecture.

---

## Diagrams Overview

This project includes the following UML diagrams:

1. Package Diagram  
2. Class Diagram
3. Sequence Diagrams  
   3.1 User Registration  
   3.2 Place Creation  

Each diagram explains a specific aspect of the system design and behavior.
Class Diagram
---
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

![Package Diagram](https://github.com/laradreamer79/holbertonschool-hbnb/blob/main/part1/Package%20Diagram.drawio%20.png)
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
- One **Place** can have many **Amenities**

**File:** 

![Class Diagram](https://github.com/laradreamer79/holbertonschool-hbnb/blob/main/part1/Class%20diagram.drawio%20(2).png)


---

## 3. Sequence Diagrams

Sequence diagrams describe how components interact over time to handle API requests.

---

### 3.1 User Registration Sequence Diagram

### Use Case
A user registers a new account.

### Flow
1. User sends `POST /users`
2. API forwards request to Business Logic
3. Business Logic saves user data in the Database
4. Database confirms creation
5. API returns `201 Created` response

### Layers Involved
- User
- API (Presentation Layer)
- Business Logic
- Database (Persistence Layer)

**File:**
 
![User Registration]( https://github.com/laradreamer79/holbertonschool-hbnb/blob/main/part1/User%20rigistration.drawio.png)

---

### 3.2 Place Creation Sequence Diagram

### Use Case
A user creates a new place listing.

### Flow
1. User sends `POST /places`
2. API calls Business Logic
3. Business Logic saves place data
4. Database confirms creation
5. API returns `201 Created`

### Layers Involved
- User
- API
- Business Logic
- Database

**File:**

![Place Creation]( https://github.com/laradreamer79/holbertonschool-hbnb/blob/main/part1/User%20rigistration.drawio.png )

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
