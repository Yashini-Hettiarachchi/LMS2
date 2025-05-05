import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8089/api/v1/courses";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    fetchCourses();
  }, [navigate]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/getall`);
      setCourses(response.data);
    } catch (error) {
      setError('Error fetching courses');
    }
  };

  const handleNavigateToAddCourse = () => {
    navigate('/add-course');
  };

  const handleEditCourse = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`${API_URL}/delete/${courseId}`);
        alert('Course deleted successfully');
        fetchCourses(); // Refresh the list
      } catch (error) {
        setError('Error deleting course');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">Available Courses</h1>
            <div className="text-center mb-4">
              <button
                className="btn btn-primary"
                onClick={handleNavigateToAddCourse}
              >
                Add New Course
              </button>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="row">
              {courses.map((course) => (
                <div key={course._id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-header bg-primary text-white">
                      <h5 className="card-title mb-0">{course.title}</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text"><strong>Description:</strong> {course.description}</p>
                      <p className="card-text"><strong>Instructor:</strong> {course.instructor}</p>
                      <p className="card-text"><strong>Duration:</strong> {course.duration}</p>
                      <p className="card-text"><strong>Level:</strong> {course.level}</p>
                      <p className="card-text"><strong>Category:</strong> {course.category}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <button
                        className="btn btn-success"
                        onClick={() => handleEditCourse(course._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteCourse(course._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {courses.length === 0 && (
              <div className="text-center mt-4">
                <p>No courses available. Add a new course to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseList;
