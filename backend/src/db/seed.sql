-- Users
INSERT INTO users(name,email,role) VALUES
('Captain Smith','smith@pilot.com','instructor'),
('Captain John','john@pilot.com','instructor'),
('Alice Brown','alice@student.com','student'),
('Rahul Kumar','rahul@student.com','student'),
('Sara Lee','sara@student.com','student'),
('David Kim','david@student.com','student');

-- Courses
INSERT INTO courses(name,license_type,total_required_hours) VALUES
('CPL Integrated','CPL',200),
('Private Pilot License','PPL',45);

-- Enrollments
INSERT INTO enrollments(student_id,course_id,start_date,status) VALUES
(3,1,'2025-01-01','active'),
(4,1,'2025-01-01','active'),
(5,2,'2025-01-01','active'),
(6,2,'2025-01-01','active');

-- EPR Records
INSERT INTO epr_records(
person_id,
evaluator_id,
role_type,
period_start,
period_end,
overall_rating,
technical_skills_rating,
non_technical_skills_rating,
remarks,
status
) VALUES
(3,1,'student','2025-01-01','2025-03-01',4,4,3,'Good progress','submitted'),
(4,1,'student','2025-01-01','2025-03-01',5,5,4,'Excellent student','submitted'),
(5,2,'student','2025-01-01','2025-03-01',3,3,3,'Needs improvement','draft');