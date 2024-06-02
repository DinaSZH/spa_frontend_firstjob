# FirstJob App

FirstJob App is a comprehensive platform designed to help users find jobs, create resumes, and connect with mentors. It provides a variety of features for job seekers, HR personnel, and mentors, leveraging modern web technologies.

## Scripts

The following scripts are available in the project:

npm run dev: Start the development server with Vite.
npm run build: Build the project for production.
npm run lint: Lint the project files.
npm run preview: Preview the built project.

## Dependencies

The FirstJob App relies on several key dependencies to provide a robust and feature-rich experience. Below is an overview of the most significant ones:

- **@mantine/core**: A comprehensive component library for React, Mantine provides a wide range of UI components that are easy to use and customizable. It is used throughout the application for building the user interface.

- **@mantine/dates**: A date and time picker library for React, used for handling all date-related inputs in the application.

- **@mantine/form**: Provides form handling capabilities including validation and input management, essential for creating user forms such as registration and login.

- **@mantine/hooks**: A collection of React hooks that simplify state management, event handling, and other common tasks.

- **@reduxjs/toolkit**: The official, recommended way to write Redux logic. It helps to simplify the process of setting up a Redux store and provides tools for managing state in a predictable way.

- **@tabler/icons-react**: A set of free MIT-licensed high-quality SVG icons for you to use in your web projects. It is used for adding icons to the application.

- **@tanstack/react-query**: Powerful asynchronous state management for React, which simplifies data fetching, caching, synchronization, and more. It's used extensively for handling API calls and managing server state.

- **axios**: A promise-based HTTP client for the browser and Node.js, used for making HTTP requests to the backend API.

- **classnames**: A utility for conditionally joining classNames together, which is useful for dynamically applying classes to React components.

- **dayjs**: A lightweight alternative to Moment.js for parsing, validating, manipulating, and displaying dates and times in JavaScript.

- **html-react-parser**: A utility for parsing HTML strings into React components, allowing for dynamic rendering of HTML content.

- **jwt-decode**: A small library for decoding JSON Web Tokens (JWTs), used for handling authentication tokens.

- **keycloak-js**: An official Keycloak client library for JavaScript applications, used for integrating authentication and authorization using Keycloak.

- **react**: The core library for building user interfaces in the application.

- **react-dom**: The package that provides DOM-specific methods that can be used at the top level of your app to enable the use of React.

- **react-hook-form**: A performant, flexible, and extensible form library for React, which reduces the number of re-renders and simplifies form handling.

- **react-hot-toast**: A library for creating beautiful notifications in React, used for displaying toast notifications in the app.

- **react-imask**: A library for creating input masks in React applications, useful for formatting user input.

- **react-phone-number-input**: A React component for entering and validating phone numbers.

- **react-quill**: A rich text editor component for React, used for text input fields that require formatting options.

- **react-redux**: Official React bindings for Redux, making it easier to connect React components to the Redux store.

- **react-router-dom**: A declarative routing library for React, used for navigating between different pages and views in the application.

# Development

## File Structure

├── public
├── src
│ ├── assets
│ ├── config
│ ├── components
│ ├── helpers
│ ├── layout
│ ├── pages
│ ├── services
│ ├── store
│ ├── styles
│ ├── App.jsx
│ ├── main.jsx
├── .eslintrc.js
├── package.json
├── README.md
├── vite.config.js

src/pages: Contains the main pages of the application such as Home, Profile, SearchVacancy, etc.
src/components: Reusable components used throughout the application.
src/helpers: Helper components for conditional rendering based on user roles or authentication state.
src/services: Directory contains the Keycloak service, which is used for handling authentication and authorization within the application.
src/store: Redux store configuration and slices.
src/styles: Global styles for the application.

# Starting the Development Server

To start the development server, run: npm run dev

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
