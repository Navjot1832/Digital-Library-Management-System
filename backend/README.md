# Digital Library Spring Boot Backend

REST API for the React Digital Library Management System.

## Run

```powershell
cd backend
mvn spring-boot:run
```

The API starts at `http://localhost:8080/api` and the H2 console is available at
`http://localhost:8080/h2-console`.

## Demo Credentials

- Admin: `admin@library.com` / `Admin@123`
- Student: `student@library.com` / `Student@123`

## Main Endpoints

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/users`
- `GET /api/books`
- `POST /api/books`
- `PUT /api/books/{id}`
- `DELETE /api/books/{id}`
- `GET /api/transactions`
- `POST /api/transactions/issue`
- `POST /api/transactions/{id}/return`
- `GET /api/dashboard/summary`
