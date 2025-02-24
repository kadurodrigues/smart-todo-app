# Smart Todo App

A sleek, interactive to-do list application built with **React** and **TypeScript**. Designed to help you manage tasks efficiently, this app combines a clean UI with powerful features like adding, editing, toggling, deleting, and reordering tasks via drag-and-drop. It also includes an innovative AI feature to auto-generate tasks based on existing ones, making it a smart tool for productivity. This project serves as a personal journey to refresh React skills after working with Vue.js, showcasing modern development practices with custom hooks and the Context API.

## Features

- **Add Tasks**: Create new todos with a simple input form.
- **Edit Tasks**: Update existing tasks seamlessly with a dedicated "Save Changes" button.
- **Toggle Completion**: Mark tasks as done with a checkbox.
- **Delete Tasks**: Remove tasks you no longer need.
- **Drag-and-Drop Reordering**: Rearrange your list effortlessly by dragging tasks.
- **AI-Generated Tasks**: After creating your first task, unlock a "Generate by AI" button to suggest the next task based on previous ones—see the screenshot for a visual example!
- **Type Safety**: Leverages TypeScript for robust, error-free code.
- **Modular Design**: Uses custom hooks (`useTasksLogic`, `useTasksOrdering`) and Context API for state management.

## Demo

<!-- Add a live demo link if you deploy it, e.g., via Netlify or Vercel -->
*Coming soon!* A live demo is in the works—stay tuned!

## Installation

Get the app running locally in just a few steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Git](https://git-scm.com/)

### Steps
**1. Clone the Repository**
```bash
git clone git@github.com:kadurodrigues/smart-todo-app.git
cd smart-todo-app
```

**2. Install Dependencies**
```bash
npm install
```

**3. Start the App**
```bash
npm run dev
```

## Usage
- Add a Task: Type in the input field and click "Add."
- Edit a Task: Click "Edit" on a task, modify the text, and click "Save Changes."
- Reorder Tasks: Drag a task by clicking and holding, then drop it in a new spot.
- Complete or Delete: Check the box to mark a task as done, or click "Delete" to remove.
- Generate by AI: After adding your first task, use the "Generate by AI" button to create a suggested next task based on existing ones (see the screenshot above).

## Contribution

Feel free to fork this repo and submit pull requests! Suggestions, bug reports, or feature ideas are welcome via issues.

## About
Built by [me](https://github.com/kadurodrigues) as a fun way to dive back into React after working with Vue.js. Inspired by simplicity, functionality, and a love for clean code.
