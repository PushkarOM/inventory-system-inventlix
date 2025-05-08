# Inventory System - Inventlix

A full-stack Inventory Management System built for Inventlix's internship assignment (Round 2). This system allows users to log in, view an overview dashboard, manage products, search/filter items, and perform CRUD operations, complete with image upload and CSV export functionality.

## 🔧 Tech Stack

- **Frontend**: React.js (with shadcn/ui for UI components)
- **Backend**: Django REST Framework
- **Database**: SQLite (development)

---

## ✨ Features

### ✅ Backend
- Token-based authentication
- CRUD API endpoints for inventory items
- Pagination, filtering, and search via query parameters
- CSV export functionality
- Image upload support
- Automatic stock level classification (Low, Medium, High)
- Serializer validation for `price`, `quantity`, and `category`
- Admin authentication for access control
- Unit test cases for API endpoints

### ✅ Frontend
- Login page with token-based authentication
- Dashboard with overview of total products and stock levels
- All Products page with:
  - Pagination
  - Search and filter functionality
  - View, update, and delete products
- Product detail page
- Create product modal with image upload
- Clean and modular UI using shadcn/ui components

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn

---

### 🖥️ Backend Setup

```bash
# Clone the repo
git clone https://github.com/your-username/inventory-system-inventlix.git
cd inventory-system-inventlix/backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate.bat

# Install dependencies
pip install -r requirements.txt

# Create a .env file in the backend folder with the following:
SECRET_KEY=your-secret-key
DEBUG=True

# Run migrations
python manage.py migrate

# Create superuser for admin access
python manage.py createsuperuser

# Start the development server
python manage.py runserver


# Frontend Setup
cd ..
cd ./frontend

# Install Dependencies
npm install --legacy-peer-deps

# Start the server
npm run dev


# Visit the URL in your browser (or wait for auto pop up)
Local:   http://localhost:5173/login
```

---


## ⚠️ Assumptions & Known Limitations

- The system is currently designed for a single admin user.
- User registration and role-based access control are not implemented.
- Images are stored locally in the backend's `media/` directory (not on cloud storage).
- SQLite is used for development; PostgreSQL is recommended for production.
- Error handling is basic and can be improved for better user experience.
- Product categories are hardcoded; only the following values are accepted during creation, updation, filtering: `["Electronics", "Stationery", "Apparel"]`


  ## 🎥 Demo Video

[Watch the Demo]([https://your-video-link.com](https://youtu.be/R4gWaSjiOKk))
