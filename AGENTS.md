# AGENTS.md

## 🧠 Project Overview: Recora

Recora is a full-stack MERN application designed to manage and interact with structured records in a scalable, production-style architecture.

The project is divided into:

* `client/` → Frontend (React)
* `server/` → Backend (Node.js + Express)

The system is built with a strong focus on clean architecture, modular design, and real-world backend practices.

---

## 🎯 Goals

* Build a production-ready full-stack application
* Implement authentication and authorization
* Design scalable REST APIs
* Maintain clean separation between frontend and backend
* Enable easy extension into a SaaS-style system

---

## 🏗️ Architecture

### Client (Frontend)

* React-based UI
* Handles user interaction and rendering
* Communicates with backend via REST API
* Stores authentication state (JWT/session)

### Server (Backend)

* Node.js + Express
* Handles business logic and API endpoints
* Connects to database (MongoDB expected)
* Follows modular structure:

  * routes → define endpoints
  * controllers → handle request/response
  * services → business logic
  * models → database schemas

---

## 🔐 Authentication

* JWT-based authentication
* Login / Register endpoints
* Middleware for protected routes
* Future: role-based access control

---

## 📁 Folder Structure

```
recora/
├── client/         # React frontend
├── server/         # Express backend
├── AGENTS.md       # Agent context (this file)
└── .antigravity/   # Agent-specific configs
```

---

## ⚙️ Backend Conventions

* Use **MVC-like structure**
* Keep controllers thin
* Move logic into services
* Use async/await (no callbacks)
* Centralized error handling
* Use middleware for:

  * auth
  * validation
  * logging

---

## 🎨 Frontend Conventions

* Component-based structure
* Separate UI and logic when possible
* Use hooks for state management
* Keep API calls isolated (services layer)

---

## 🔌 API Design Principles

* RESTful endpoints
* Consistent naming
* Use proper HTTP methods:

  * GET → fetch data
  * POST → create
  * PUT/PATCH → update
  * DELETE → remove
* Return structured JSON responses:

```
{
  success: true,
  data: {},
  message: ""
}
```

---

## 🚀 Development Workflow

1. Define feature
2. Design API contract
3. Implement backend (routes → controller → service → model)
4. Connect frontend
5. Test end-to-end

---

## 🧪 Testing (future scope)

* Unit tests for services
* API testing (Postman / automated)
* Integration tests

---

## 📦 Future Improvements

* Role-based permissions
* Real-time features (WebSockets)
* File uploads
* Docker-based deployment
* CI/CD pipeline
* Monitoring and logging

---

## 🧠 Agent Guidelines

When working on this project:

* Always respect folder structure
* Do not mix business logic into routes
* Prefer readability over clever code
* Keep functions small and focused
* Follow existing patterns before introducing new ones

---

## ⚠️ Constraints

* Keep backend modular and scalable
* Avoid tight coupling between components
* Do not introduce unnecessary dependencies
* Maintain consistency across files

---

## 🧩 Key Idea

This project is designed not just to "work", but to simulate how real-world production systems are structured.

Focus on:

* clarity
* maintainability
* scalability

---

## 🔚 End of Context

This file serves as the primary context for coding agents working on Recora.
