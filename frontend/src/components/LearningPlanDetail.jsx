import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import CommentSection from './CommentSection';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8089/api/v1";

function LearningPlanDetail() {
  const { planId } = useParams();
  const [learningPlan, setLearningPlan] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    fetchLearningPlan();
    checkLikeStatus();
    checkFollowStatus();
  }, [planId, navigate]);

  const fetchLearningPlan = async () => {
    try {
      const response = await axios.get(`${API_URL}/learning-plans/${planId}`);
      setLearningPlan(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching learning plan details');
      console.error('Error fetching learning plan details:', error);
      setLoading(false);
    }
  };

  const checkLikeStatus = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(
        `${API_URL}/likes/check/user/${user.userId}/resource/${planId}/type/LEARNING_PLAN`
      );
      setHasLiked(response.data.hasLiked);
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const checkFollowStatus = async () => {
    try {
      if (learningPlan) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.userId !== learningPlan.userId) {
          const response = await axios.get(
            `${API_URL}/follows/check/follower/${user.userId}/following/${learningPlan.userId}`
          );
          setIsFollowing(response.data.isFollowing);
        }
      }
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const handleLike = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (hasLiked) {
        // Unlike
        await axios.delete(
          `${API_URL}/likes/user/${user.userId}/resource/${planId}/type/LEARNING_PLAN`
        );
        setHasLiked(false);
      } else {
        // Like
        await axios.post(`${API_URL}/likes/save`, {
          userId: user.userId,
          username: user.username,
          resourceId: planId,
          resourceType: 'LEARNING_PLAN'
        });
        setHasLiked(true);
      }
      
      // Refresh learning plan to update like count
      fetchLearningPlan();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleFollow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (isFollowing) {
        // Unfollow
        await axios.delete(
          `${API_URL}/follows/unfollow/follower/${user.userId}/following/${learningPlan.userId}`
        );
        setIsFollowing(false);
      } else {
        // Follow
        await axios.post(`${API_URL}/follows/follow`, {
          followerId: user.userId,
          followerUsername: user.username,
          followingId: learningPlan.userId,
          followingUsername: learningPlan.username
        });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const renderTopicStatus = (completed) => {
    return completed ? 
      <span className="badge bg-success">Completed</span> : 
      <span className="badge bg-secondary">Not Completed</span>;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-4">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !learningPlan) {
    return (
      <>
        <Navbar />
        <div className="container mt-4">
          <div className="alert alert-danger" role="alert">
            {error || 'Learning plan not found'}
          </div>
          <Link to="/learning-plans" className="btn btn-primary">
            Back to Learning Plans
          </Link>
        </div>
      </>
    );
  }

  const user = JSON.parse(localStorage.getItem('user'));
  const isOwner = user.userId === learningPlan.userId;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h2 className="mb-0">{learningPlan.title}</h2>
                <div>
                  {!isOwner && (
                    <button 
                      className={`btn ${isFollowing ? 'btn-secondary' : 'btn-outline-light'} me-2`}
                      onClick={handleFollow}
                    >
                      {isFollowing ? 'Unfollow' : 'Follow'} {learningPlan.username}
                    </button>
                  )}
                  <button 
                    className={`btn ${hasLiked ? 'btn-danger' : 'btn-outline-light'}`}
                    onClick={handleLike}
                  >
                    {hasLiked ? 'Unlike' : 'Like'} ({learningPlan.likesCount})
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <h5>Description</h5>
                  <p>{learningPlan.description}</p>
                  <p>
                    <small className="text-muted">
                      Created by: <Link to={`/profile/${learningPlan.userId}`}>{learningPlan.username}</Link>
                    </small>
                  </p>
                  <p>
                    <small className="text-muted">
                      Status: {learningPlan.status.replace(/_/g, ' ')}
                    </small>
                  </p>
                  {learningPlan.completionDeadline && (
                    <p>
                      <small className="text-muted">
                        Deadline: {new Date(learningPlan.completionDeadline).toLocaleDateString()}
                      </small>
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <h5>Topics</h5>
                  {learningPlan.topics && learningPlan.topics.length > 0 ? (
                    <div className="list-group">
                      {learningPlan.topics.map((topic, index) => (
                        <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <h6>{topic.title}</h6>
                            <p className="mb-0">{topic.description}</p>
                          </div>
                          {renderTopicStatus(topic.completed)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No topics added yet.</p>
                  )}
                </div>

                <div className="mb-4">
                  <h5>Resources</h5>
                  {learningPlan.resources && learningPlan.resources.length > 0 ? (
                    <div className="list-group">
                      {learningPlan.resources.map((resource, index) => (
                        <a 
                          key={index} 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="list-group-item list-group-item-action"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6>{resource.title}</h6>
                              <small className="text-muted">{resource.type}</small>
                            </div>
                            <i className="bi bi-box-arrow-up-right"></i>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p>No resources added yet.</p>
                  )}
                </div>

                {isOwner && (
                  <div className="d-flex justify-content-end">
                    <Link to={`/edit-learning-plan/${planId}`} className="btn btn-warning me-2">
                      Edit Learning Plan
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <CommentSection 
              resourceId={planId} 
              resourceType="LEARNING_PLAN" 
              commentsCount={learningPlan.commentsCount}
              onCommentAdded={fetchLearningPlan}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LearningPlanDetail;
