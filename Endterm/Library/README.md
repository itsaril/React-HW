<div align="center">

<img src="https://img.icons8.com/color/96/books.png" width="90"/>

# 📚 Library App
### Intelligent Book Search & Personal Library Manager

A modern React + Firebase application featuring secure authentication, profile management, book search via API, and user favorites.

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%7C%20Storage%20%7C%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)

<br/>
</div>

---

## 🔥 Overview

**Library App** is a full-featured web application built with **React** and **Firebase**, allowing users to:

- Create an account with fully validated passwords  
- Log in securely  
- Upload a **profile picture**  
- Search for books using an external API  
- Add and remove books from **Favorites**  
- View a personalized profile with account details  

The project was developed as part of a React Endterm examination.

---

## 🎯 Key Features

### 🔐 **Authentication (Firebase Auth)**
- Secure signup & login  
- Password requirements:
  - 8+ characters  
  - Includes a number  
  - Includes a special character  
- Protected routes  

<div align="center">
  <img src="./screenshots/signup.png" width="750">
</div>

---

### 👤 **User Profile**
- Displays user email  
- Shows Firebase UID  
- Account creation time  
- Last sign-in time  
- Upload & store **profile picture** in Firebase Storage  

<div align="center">
  <img src="./screenshots/profile.png" width="750">
</div>

---

### 📖 **Book Search**
Powered by a public Books API.  

Users can:

- Search by keyword  
- Filter number of results  
- Add/remove favorites  
- View detailed information  

<div align="center">
  <img src="./screenshots/search.png" width="750">
</div>

---

## ❤️ Favorites System

The application includes a fully synchronized **Favorites system** powered by Firebase Firestore.

Users can:

- Add books to favorites  
- Remove books from favorites  
- View their personal favorites list at any time  
- Favorites persist across sessions (stored in Firestore)  

### 🖼️ Screenshot: Favorites Page
<div align="center">
  <img src="./screenshots/favorites.png" width="800">
</div>

---



