import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8089/api/v1/learning-plans";

function LearningPlanList() {
  const [learningPlans, setLearningPlans] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'my', 'public'
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    fetchLearningPlans();
  }, [navigate, filter]);

  const fetchLearningPlans = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      let endpoint = '/getall';
      
      if (filter === 'my') {
        endpoint = `/user/${user.userId}`;
      } else if (filter === 'public') {
        endpoint = '/public';
      }
      
      const response = await axios.get(`${API_URL}${endpoint}`);
      setLearningPlans(response.data);
    } catch (error) {
      setError('Error fetching learning plans');
      console.error('Error fetching learning plans:', error);
    }
  };

  const handleNavigateToAddLearningPlan = () => {
    navigate('/add-learning-plan');
  };

  const handleViewLearningPlan = (planId) => {
    navigate(`/learning-plan/${planId}`);
  };

  const handleEditLearningPlan = (planId) => {
    navigate(`/edit-learning-plan/${planId}`);
  };

  const handleDeleteLearningPlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this learning plan?')) {
      try {
        await axios.delete(`${API_URL}/delete/${planId}`);
        alert('Learning plan deleted successfully');
        fetchLearningPlans(); // Refresh the list
      } catch (error) {
        setError('Error deleting learning plan');
        console.error('Error deleting learning plan:', error);
      }
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const renderLearningPlanStatus = (status) => {
    switch (status) {
      case 'NOT_STARTED':
        return <span className="badge bg-secondary">Not Started</span>;
      case 'IN_PROGRESS':
        return <span className="badge bg-primary">In Progress</span>;
      case 'COMPLETED':
        return <span className="badge bg-success">Completed</span>;
      default:
        return <span className="badge bg-secondary">Not Started</span>;
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">Learning Plans</h1>
            
            <div className="d-flex justify-content-between mb-4">
              <div className="btn-group" role="group">
                <button 
                  className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleFilterChange('all')}
                >
                  All Plans
                </button>
                <button 
                  className={`btn ${filter === 'my' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleFilterChange('my')}
                >
                  My Plans
                </button>
                <button 
                  className={`btn ${filter === 'public' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleFilterChange('public')}
                >
                  Public Plans
                </button>
              </div>
              
              <button
                className="btn btn-success"
                onClick={handleNavigateToAddLearningPlan}
              >
                Create Learning Plan
              </button>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {learningPlans.length === 0 ? (
              <div className="alert alert-info" role="alert">
                No learning plans found. Create your first learning plan!
              </div>
            ) : (
              <div className="row">
                {learningPlans.map((plan) => (
                  <div key={plan._id} className="col-md-4 mb-4">
                    <div className="card h-100">
                      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">{plan.title}</h5>
                        {renderLearningPlanStatus(plan.status)}
                      </div>
                      <div className="card-body">
                        <p className="card-text">{plan.description}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            Created by: {plan.username}
                          </small>
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            Topics: {plan.topics ? plan.topics.length : 0}
                          </small>
                        </p>
                        <div className="d-flex justify-content-between">
                          <span>
                            <i className="bi bi-heart-fill text-danger"></i> {plan.likesCount}
                          </span>
                          <span>
                            <i className="bi bi-chat-fill text-primary"></i> {plan.commentsCount}
                          </span>
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-between">
                        <button
                          className="btn btn-info"
                          onClick={() => handleViewLearningPlan(plan._id)}
                        >
                          View
                        </button>
                        {plan.userId === user.userId && (
                          <>
                            <button
                              className="btn btn-warning"
                              onClick={() => handleEditLearningPlan(plan._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteLearningPlan(plan._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LearningPlanList;
