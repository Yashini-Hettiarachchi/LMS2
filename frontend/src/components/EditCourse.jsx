import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8089/api/v1/courses";

function EditCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch course details
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/search/${courseId}`);
        const course = response.data;
        
        setTitle(course.title);
        setDescription(course.description);
        setInstructor(course.instructor);
        setDuration(course.duration);
        setLevel(course.level);
        setCategory(course.category);
        
        setLoading(false);
      } catch (error) {
        setError('Error fetching course details');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      await axios.put(`${API_URL}/edit/${courseId}`, {
        title,
        description,
        instructor,
        duration,
        level,
        category
      });
      
      alert('Course updated successfully!');
      navigate('/courses');
    } catch (error) {
      setError('Error updating course. Please try again.');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading course details...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h3 className="text-center">Edit Course</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="title">Course Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="instructor">Instructor</label>
                    <input
                      type="text"
                      className="form-control"
                      id="instructor"
                      value={instructor}
                      onChange={(e) => setInstructor(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="duration">Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      id="duration"
                      placeholder="e.g., 8 weeks, 3 months"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="level">Level</label>
                    <select
                      className="form-control"
                      id="level"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="category">Category</label>
                    <select
                      className="form-control"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Programming">Programming</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Update Course
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => navigate('/courses')}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCourse;
