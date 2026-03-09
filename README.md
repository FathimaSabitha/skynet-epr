
# Skynet EPR – Full Stack Technical Assessment

A lightweight performance evaluation system for managing **Employee/Student Performance Records (EPRs)**.

The system allows evaluators to create, update, and review performance records while providing analytics and AI-assisted remark generation.



# Implemented Features

## Level 1 (Core Features)

 People directory with filtering and search
 Create new EPR records
 Edit existing EPR records
 Ratings for:

* Overall performance
* Technical skills
* Non-technical skills

 Status management:

* Draft
* Submitted
* Archived

 View historical EPR records for each person



## Level 2 Enhancements

### Option A — Progress Summary & Analytics

Endpoint:

```
GET /api/epr/summary/:personId
```

Returns:

* Average overall rating
* Average technical rating
* Average non-technical rating
* Total EPR count
* Last three evaluation periods

Frontend includes a **Performance Snapshot card** displaying:

* Average rating
* Technical & non-technical badges
* Recent performance trend

---

### Option C — AI-Assisted EPR Remarks

Endpoint:

```
POST /api/epr/assist
```

Input:

```
overallRating
technicalSkillsRating
nonTechnicalSkillsRating
```

Output:

```
{
  "suggestedRemarks": "Generated performance feedback"
}
```

This feature uses **rule-based logic** to generate contextual feedback depending on the rating values.

The UI includes a **“Generate Suggested Remarks”** button that automatically fills the remarks field.



# Tech Stack

Frontend

* React
* TypeScript
* TailwindCSS
* Axios

Backend

* Node.js
* Fastify
* TypeScript
* PostgreSQL



# Project Structure


backend/
  controllers/
  routes/
  services/
  db/

frontend/
  components/
  api/
  types/


=

# Setup Instructions

## 1. Clone the repository

```
git clone https://github.com/FathimaSabitha/skynet-epr
cd skynet-epr
```

---

# Backend Setup

Navigate to backend folder:

```
cd backend
```

Install dependencies:

```
npm install
```

Create environment variables:

```
DATABASE_URL=postgres://user:password@localhost:5432/skynet
```

---

# Database Setup

Create PostgreSQL database:

```
createdb skynet
```

Run migrations:

```
npm run migrate
```

Seed sample data:

```
npm run seed
```

---

# Run Backend

```
npm run dev
```

Server runs at:

```
http://localhost:4000
```

---

# Frontend Setup

Navigate to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run frontend:

```
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

# How I Used AI in This Project

AI tools were used to assist with:

* Structuring backend APIs and database queries
* Improving rule-based logic for generating performance remarks
* Refining UI components and Tailwind styling
* Debugging issues during development (such as CORS and API integration)
* Drafting and refining parts of the project README


All architectural decisions, implementation, and testing were completed and verified manually.


