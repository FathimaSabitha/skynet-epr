CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('student','instructor','admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    license_type TEXT,
    total_required_hours NUMERIC
);

CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    start_date DATE,
    status TEXT CHECK (status IN ('active','completed','dropped'))
);

CREATE TABLE epr_records (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    evaluator_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_type TEXT CHECK (role_type IN ('student','instructor')),
    period_start DATE,
    period_end DATE,
    overall_rating INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
    technical_skills_rating INTEGER CHECK (technical_skills_rating BETWEEN 1 AND 5),
    non_technical_skills_rating INTEGER CHECK (non_technical_skills_rating BETWEEN 1 AND 5),
    remarks TEXT,
    status TEXT CHECK (status IN ('draft','submitted','archived')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);