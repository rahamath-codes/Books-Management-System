# 📚 Book Management System

The **Book Management System** is a full-stack web application designed to manage books in a library, enabling two types of users: **Librarians** and **General Users**. The application allows users to search, view, favorite, and borrow books, while librarians have full control to manage book records and view all user activities.

This system is developed using:
- 💻 **Frontend**: Angular 20
- 🖥️ **Backend**: Spring Boot
- 🗄️ **Database**: MySQL
- 🔐 **Security**: Spring Security (Role-based access)

---

## 🧾 Modules Overview

- 📦 **Books_Management** — Spring Boot backend
- 💼 **Books-Management** — Angular frontend

---

## 🚀 Features

### 👩‍🏫 Librarian Role
- 🔄 Add, update, and delete books
- 👀 View all users and their borrowed books
- 🔐 Full access to all features

### 👨‍🎓 User Role
- 📖 View available books
- ❤️ Add to favorites
- 📚 Borrow and return books
- 👤 View own borrowed books

---

## 🛠️ Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | Angular 20, TypeScript, Bootstrap |
| Backend    | Spring Boot, Java 21, Spring Data JPA |
| Database   | MySQL                       |
| Security   | Spring Security             |
| Others     | Lombok, RESTful APIs        |

---

## 🧩 Backend Project Structure — `Books_Management`

```bash
Books_Management/
├── controller/
│   ├── BooksController.java
│   ├── BorrowedBookController.java
│   ├── FavoriteController.java
│   └── UserController.java
├── dto/
│   ├── BorrowedBookDTO.java
│   ├── BorrowRequest.java
│   ├── LoginDTO.java
│   └── UserDTO.java
├── models/
│   ├── Books.java
│   ├── BorrowedBook.java
│   ├── Favorite.java
│   ├── Role.java
│   └── Users.java
├── repository/
│   ├── BooksRepository.java
│   ├── BorrowedBookRepository.java
│   ├── FavoriteRepository.java
│   └── UsersRepository.java
├── service/
│   ├── BooksService.java
│   ├── BorrowedBookService.java
│   ├── FavoriteService.java
│   └── UserService.java
├── config/
│   ├── AppConfigs.java
│   └── SecurityConfigs.java
└── resources/
    ├── application.properties
    └── logback-spring.xml

🌐 Frontend Project Structure — Books-Management

Books-Management/
└── src/
    └── app/
        ├── addbook/
        ├── auth/
        ├── booklist/
        ├── borrowedbooklist/
        ├── borrowedbooks/
        ├── favoritebooks/
        ├── footer/
        ├── home/
        ├── interceptors/
        ├── login/
        ├── managebooks/
        ├── models/
        ├── nav/
        ├── page-not-found/
        ├── register/
        ├── searchlist/
        ├── service/
        └── userlist/

⚙️ How to Run

🧩 Backend (Spring Boot)

Import Books_Management into Eclipse or IntelliJ.
Create a MySQL database named booksmanagement.
Update application.properties with your database credentials.
Run BooksManagementApplication.java.

🌐 Frontend (Angular)

Navigate to Books-Management/ directory.
Run npm install to install dependencies.
Start the app using ng serve.
Access the app at http://localhost:4200.

📌 Notes
----------
✅ Ensure the backend is running before starting the frontend.
✅ MySQL service must be active with the correct credentials.
🔐 Role-based authorization is enabled using Spring Security.
📁 Keep screenshots in /screenshots for GitHub preview.

👨‍💻 Developed With Passion

Built as a part of a full-stack development practice project integrating Angular and Spring Boot in a realistic library system use case.


Let me know if you want this in a downloadable `.md` file, or if you’d like me to tailor it with your name or GitHub link!
