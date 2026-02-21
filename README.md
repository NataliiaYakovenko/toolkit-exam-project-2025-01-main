This project contains a series of tasks (0–13) implemented using Docker, MongoDB, PostgreSQL, Node.js, and React.

Getting Started (Development Mode)
The project runs using Docker. All services are defined in docker-compose-dev.yaml.

Requirements:
Docker version: 29.0.4 (build 3247a5a)

Start script: start-dev.sh

This script will:
Start all containers in development mode.
Run Sequelize migrations to set up the PostgreSQL database.
Run Sequelize seeds to populate initial data.
Alternatively, you can run manually:

bash
docker-compose -f docker-compose-dev.yaml up
docker exec -it <server-container-name> npx sequelize db:migrate
docker exec -it <server-container-name> npx sequelize db:seed:all
After startup, the application is available at: http://localhost:3000

| Service | URL / Connection | Description |
|---------|------------------|-------------|
| Frontend (React) | http://localhost:3000 | Client application |
| Backend (Server) | http://localhost:5000 | API server |
| MongoDB | `localhost:27017` | NoSQL database (shm-chat) |
| PostgreSQL | `localhost:5432` | SQL database (todo-dev) |

### Database Configuration
| PostgreSQL (db-dev)      | MongoDB (mongo-dev)    |
|--------------------------|------------------------|
| **Host:** localhost      | **Host:** localhost    |
| **Port:** 5432           | **Port:** 27017        |
| **Database:** todo-dev   | **Database:** shm-chat |
| **User:** postgres       |                        |
| **Password:** password   |                        |

## Completed Tasks
## Task 0 - DOCKER
Configured docker-compose-dev.yaml for running frontend, backend, MongoDB, and PostgreSQL together.
Created start-dev.sh script to simplify startup and automatically run database migrations and seeds.
---

## Task 1 - BUG FIXED
Removed unused imports and libraries across the codebase.
Updated dependencies to latest compatible versions.
Standardized code style.
Fixed responsive issues for mobile views.
---

## Task 2 - LAYOUT
Created a new "How It Works" page.
Added a navigation link to the page: http://localhost:3000/howItWorks
---

## Task 3 - DYNAMIC BRANDING 
Added a dynamic link to the "Event" page in the user menu (points to /event).
---

## Task 4 - BUTTON GROUP
Added a link to the "Button Group" page in the user menu (points to /button-group).
---

## Task 5 - DB NO-SQL
Added db-no-sql directory to server/src/locomotive.mongodb.js
It contains a query.mongodb query to count the number of records containing the word "locomotive" in the Messages collection
---

## Task 6 - DB SQL
Developed a scheme for chat migration from NO-SQL to SQL chatPostgres.sql, screenshot ERD.png
---

## Task 7 - DB SQL
Task Display the number of users by roles {admin: 40, customer: 22, ...} File:usersByRole.sql
---

## Task 8 - DB SQL
All users with the customer role who made orders during the New Year holidays from December 25 to January 14 must receive 10% cashback from all orders during this period. File: usersCashback.sql
---

## Task 9 - DB SQL
For the creative role, you need to pay 3 users with the highest rating $ 10 to their accounts. File: usersTopRating.sql
---

## Task 10 - NODE.JS
Created error logger server/logger
logger.js
---

## Task 11 - NODE.JS
Created a schedule to copy and clear the contents of the error.log file, and move the data to a new file
loggerTransform.js
---

## Task 12 - FULLSTACK
Added new role Moderator
Added distribution of the moderator's decision to Creative's mail
---

## Task 13 - FULLSTACK
MIGRATE CHAT FROM MONGO TO POSTGRES
Described Sequelize models and migrations
Changed the logic of requests on the server