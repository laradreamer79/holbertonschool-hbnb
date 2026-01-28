# High-Level Package Diagram — HBnB (Three-Layer Architecture)

## Diagram (Mermaid)

```mermaid
flowchart TB
  %% HBnB - High-Level Three-Layer Architecture with Facade

  subgraph PL["Presentation Layer (Services / API)"]
    API["API Endpoints\n(REST Controllers)"]
    SVC["Services\n(Input validation, request handling, response formatting)"]
    API --> SVC
  end

  subgraph BL["Business Logic Layer (Models / Domain)"]
    FAC["Facade\n(HBnBFacade)"]
    USER["User"]
    PLACE["Place"]
    REVIEW["Review"]
    AMENITY["Amenity"]

    FAC --> USER
    FAC --> PLACE
    FAC --> REVIEW
    FAC --> AMENITY
  end

  subgraph PERS["Persistence Layer (Data Access / Storage)"]
    REPO["Repositories / DAOs\n(CRUD + Queries)"]
    DB["Database"]
    REPO --> DB
  end

  %% Communication pathways
  SVC -->|calls facade methods| FAC
  FAC -->|uses repositories| REPO

  %% Return flow (conceptual)
  REPO -->|returns data| FAC
  FAC -->|returns results| SVC
  SVC -->|HTTP response| API
