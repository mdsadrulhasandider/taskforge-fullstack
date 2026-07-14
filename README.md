# 💼 TaskForge - Premium Full-Stack Freelance Task Marketplace

TaskForge is a production-ready, responsive Full-Stack Freelance Task Marketplace built with **React/Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **MongoDB**. It serves as a unified workspace where employers (clients) post tasks into a secure escrow system, and developers search, filter, and apply for contracts.

---

## 🚀 Key Features

### 1. Dynamic Landing Page (9 Premium Sections)
* **Interactive Hero:** Interactive slider enabling visitors to toggle between different freelancer roles (Developer, Designer, Writer, Marketer) showing custom copy and metrics.
* **Core Values & Features Grid:** Visual cards highlighting the platform's core benefits (Vetted Professionals, Secure Escrows, Milestone Pipeline).
* **Interactive Statistics & Chart:** Visualizes platform growth and earnings trends dynamically utilizing an area/line chart powered by **Recharts**.
* **Featured Task Openings:** Dynamic listing displaying exactly 4 popular tasks in a clean desktop grid with skeleton loading state animations.
* **How It Works Timeline:** 3-step timeline highlighting task posting, developer matching, and milestone payouts.
* **Leader Testimonials:** Grid of feedback reviews from actual tech leaders complete with star rating controls.
* **Accordion FAQ Section:** Expandable/collapsible FAQ panels dealing with operations, disputation, and fees.
* **Newsletter Signup Form:** Live newsletter form with client-side regex email validation and success notification.

### 2. Search & Filter Board (Explore Page)
* **Full-text Search:** Instant query filtering matching task titles, descriptions, and locations.
* **Multi-Field Filters:** Filter tasks by **Category** (Development, Design, Writing, Marketing), **Budget Range** (Min/Max limits), **Work Environment** (Remote, Hybrid, On-site), and **Priority** levels.
* **Sort Controls:** Sort listings instantly by Newest/Oldest posted, Budget amount, and Rating scores.
* **Skeleton Loaders:** Fluid, animated skeleton boxes showing during API request loads.

### 3. Public Details Page
* Dynamic details query loading task covers, overview text, budget parameters, post date, and client email.
* Recommends a list of **Related Project Listings** based on the category of the viewed task.
* Shared link copying functionality.

### 4. JWT Authentication System
* Hashed passwords stored securely using **Bcryptjs**.
* Authenticates and signs sessions using **JSON Web Tokens (JWT)** inside secure HTTP-only browser cookies.
* Dynamic navigation navbar routes (displaying 3 routes when logged out / 5 routes when logged in).
* **Autofill Demo Login buttons** on the login screen for instant credential parsing and testing.

### 5. Client Management Workspace (Protected Routes)
* **Post New Tasks (`/items/add`):** Multi-input form validating fields (Title, Category, Budget, Environment, Priority, Description, Image URL).
* **Manage Listings (`/items/manage`):** Tabulated dashboard workspace listing posted tasks with inline actions to View Details or permanently Delete them.

---

## 🛠️ Technology Stack

* **Frontend:** Next.js (App Router), React.js, Tailwind CSS, Lucide Icons, Recharts, TypeScript.
* **Backend:** Next.js API Routes (Serverless), JSON Web Tokens (JWT), Mongoose ODM, Bcryptjs.
* **Database:** MongoDB ( Atlas / Localhost ).

---

## 🔑 Demo Credentials

For quick evaluation and grading, use the demo access buttons on the Sign In page, or input these credentials:

| Profile Role | Demo Email | Password | Allowed Controls |
| :--- | :--- | :--- | :--- |
| **Regular Freelancer** | `user@taskforge.com` | `password123` | View listings, search, filter, read details, apply for contracts. |
| **Client / Employer** | `admin@taskforge.com` | `admin123` | Vetted permissions + **Add Task (`/items/add`)** and **Delete/Manage Task (`/items/manage`)**. |

---

## ⚙️ Local Development Setup

To run TaskForge locally, follow these steps:

### 1. Clone & Navigate
```bash
git clone https://github.com/mdsadrulhasandider/taskforge-fullstack.git
cd taskforge-fullstack
```

### 2. Configure Environment Variables
Create a `.env.local` file at the root of the project:
```env
# MongoDB Connection URI (Local database or Atlas Connection string)
MONGODB_URI=mongodb://localhost:27017/taskforge

# JWT Secret Key for Session Authentication
JWT_SECRET=super_secret_taskforge_jwt_key_2026_scic_13
```

### 3. Install Packages
```bash
npm install
```

### 4. Launch Development Server
```bash
npm run dev
```

Open **`http://localhost:3000`** in your browser.

*Note: On your first visit, the server will connect to MongoDB, create the database, and automatically seed **8 premium sample tasks** if the collection is empty.*
