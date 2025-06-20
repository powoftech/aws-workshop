# Todo Frontend Application

A modern, responsive Todo application built with React, TypeScript, and TailwindCSS.

## Features

- ✅ Create new todos with title and optional description
- ✅ Mark todos as complete/incomplete
- ✅ Edit existing todos inline
- ✅ Delete todos
- ✅ Filter todos by status (All, Active, Completed)
- ✅ Real-time statistics
- ✅ Responsive design
- ✅ Error handling with user feedback
- ✅ Loading states

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/           # React components
│   ├── TodoForm.tsx     # Form for creating new todos
│   ├── TodoItem.tsx     # Individual todo item component
│   └── TodoList.tsx     # List of todos with filtering
├── services/            # API service layer
│   └── todoService.ts   # Todo API calls
├── types/               # TypeScript type definitions
│   └── todo.ts          # Todo-related types
├── App.tsx              # Main application component
├── index.css            # Global styles with TailwindCSS
└── main.tsx             # Application entry point
```

## API Integration

This frontend connects to a REST API with the following endpoints:

- `GET /api/todos` - Fetch all todos
- `GET /api/todos/:id` - Fetch a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete a todo

## UI Components

### TodoForm

- Clean form for creating new todos
- Validation for required fields
- Character limits matching API constraints
- Loading states during submission

### TodoItem

- Checkbox for completion status
- Inline editing capability
- Delete confirmation
- Timestamps for creation and updates
- Visual indicators for completed items

### TodoList

- Filtering by completion status
- Empty state handling
- Progress statistics
- Responsive grid layout

## Styling

Built with TailwindCSS for:

- Responsive design
- Consistent color scheme
- Smooth transitions
- Accessible focus states
- Modern shadow and border styling

## Error Handling

- Network error handling
- User-friendly error messages
- Graceful degradation when API is unavailable
- Loading states for all async operations

## Performance Features

- Optimistic UI updates
- Minimal re-renders with proper state management
- Efficient filtering and searching
- Responsive design for all screen sizes
