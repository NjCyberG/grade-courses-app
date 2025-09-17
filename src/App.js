import React, { useState, useEffect } from "react";

const API_URL = "https://learnersgain.com/wp-json/tg/v1/courses-by-grade/";

function App() {
  const [grade, setGrade] = useState("grade-1");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(API_URL + grade)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [grade]);

  const grades = [
    "grade-1", "grade-2", "grade-3", "grade-4",
    "grade-5", "grade-6", "grade-7", "grade-8",
    "grade-9", "grade-10", "grade-11", "grade-12"
  ];

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Explore Courses by Grade</h1>

      <select onChange={(e) => setGrade(e.target.value)} value={grade}>
        {grades.map((g) => (
          <option key={g} value={g}>
            {g.replace("-", " ").toUpperCase()}
          </option>
        ))}
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {courses.length === 0 ? (
          <p>No courses found for this grade.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <img
                src={course.featured_image}
                alt={course.title}
                style={{ width: "100%" }}
              />
              <h3>{course.title}</h3>
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Course
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;   // <-- This fixes the Netlify build error
