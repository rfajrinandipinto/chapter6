# BINAR Car Management API (OpenAPI 3.0)

an API to manage Binar Car Rental Website , assignment for fullstack web development course by binar.
  
## Setup Server

    npm install

    npm run setup

## Setup Database

    sequelize db:drop
    sequelize db:create
    sequelize db:migrate
    sequelize db:seed:all

## Superadmin Account

    email: superadmin@gmail.com
    password: superadmin

## Run Server

    npm start / npm run develop

    Server will run at `http://localhost:8000` by default.

## API Documentation


| Documentation type | Link |
|--|--|--|
| OpenAPI Swagger UI | http://localhost:8000 <br> http://localhost:8000/docs | 

Authentication and authorization system used are `token-based auth`.
