# Onation — Travel Papers & Tourism Guide Platform

## Project Overview
Onation is a frontend web application designed to help travelers know exactly what official documents and papers are required to travel to each country. Users can explore countries, browse cities, discover tourist attractions, and manage their favorite destinations — all in one place.

The project consists of two Angular applications:
- Onation — The main user-facing application
- OnationAdmin — The admin dashboard for managing platform content

## Features
### Authentication & User Management:

- User registration and login with form validation
- Social login integration (Google / Facebook)
- Forgot password flow: enter email → receive OTP code → reset password
- JWT-based session management
### Travel Papers

- Browse required official documents (visas, permits, entry papers) for each country
- Papers are linked per country so users know exactly what to prepare before traveling
### Countries & Navigation

- Browse a full list of countries with details and purposes
- Navigate from country → cities → tourist attractions in a clear hierarchy
- Dedicated pages per country with linked travel requirements
### Tourist Attractions

- Explore attractions filtered by city
- Save and manage favorite destinations
### UI & Experience

- Dark / Light theme toggle
- Multi-language support (Arabic / English) via ngx-translate
- Loading spinner and progress bar for async operations
- Dedicated error pages: 404 Not Found, Network Error, Server Error
- Confirmation dialogs for destructive actions

## Technologies Used

- Angular 17 — Frontend framework
- Angular Material — UI component library (tables, dialogs, forms)
- Angular CDK — Layout and interaction primitives
- Angular SSR — Server-Side Rendering with Express.js
- Bootstrap — Responsive grid and layout
- RxJS — Reactive data streams and HTTP handling
- ngx-translate — Internationalization (i18n)
- jwt-decode — Decoding JWT tokens on the client
- ngx-spinner — Loading indicators
- angularx-social-login — OAuth social login (Google / Facebook)
- TypeScript — Strongly typed application code
- Karma & Jasmine — Unit testing

## Project Structure
- **Components:** All UI views and reusable interface elements
  - Countries listing (home page)
  - Purposes / country details
  - Cities per country
  - Tourist attractions per city
  - Papers — required travel documents per country
  - Favorites — user saved destinations
  - About Us page
  - Header and navigation menu
  - Shared main layout wrapper
- **Registration:** Authentication module
  - Sign up and login forms
  - Forgot password flow (enter email → OTP code → change password)
- **Services:** API communication and business logic layer
  - Authentication service (login, register, JWT handling)
  - Countries data service
  - About Us service
  - Suggestion service
  - Alert, loading, and theme services
- **Models:** TypeScript interfaces for typed API responses
  - Countries, Cities, Papers, Purposes
  - Tourist Attractions, Suggestions, User Login
- **OnationAdmin:** Separate admin dashboard application
  - Admin login and authorization guard
  - Content management components
  - Admin-specific services and models

## Key Features Implementation
- Travel papers lookup for:
  - Fetching required documents per country from the API
  - Displaying visa types, permits, and entry requirements
  - Linking papers directly to each country's detail page
- Authentication flow implementation:
  - JWT token storage and decoding on the client
  - Route guards to protect authenticated pages
  - Social login integration (Google / Facebook) via OAuth
  - Multi-step forgot password (email → OTP verification → new password)
- Comprehensive form validation on all user inputs
- Global error handling with dedicated pages for network errors, server errors, and 404s
- Theme and language switching persisted across the session
- Reactive data flow using RxJS Observables and Angular HttpClient
- Scalable component architecture with shared layout and lazy-loadable modules

## Setup Instructions
1. Clone the repository
2. Install and run the User App:
```
cd Onation
npm install
ng serve
```
3. Install and run the Admin App:
```
cd OnationAdmin
npm install
ng serve 
```

## Environment Requirements

- Node.js v18+
- Angular CLI v17+

## Graduation Project
This project was developed as a graduation project for the Faculty of Computer Science. The core problem it solves is a real and common pain point — travelers often don't know which documents they need before visiting a country. Onation centralizes this information in one platform alongside a full tourism guide experience.
The frontend was built to consume a RESTful ASP.NET Core Web API backend, demonstrating practical skills in:

- Building scalable Angular applications with modular, feature-based architecture
- Implementing secure authentication flows (JWT + Social Login)
- Working with RESTful APIs using Angular HttpClient and RxJS
- Creating responsive, accessible, and multilingual user interfaces
- Applying Angular SSR for better performance and SEO
