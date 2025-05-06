import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="jumbotron text-center">
          <h1 className="display-4">Welcome to Learning Management System</h1>
          <p className="lead">
            A platform for sharing and discovering structured learning plans
          </p>
          <hr className="my-4" />
          <p>
            Browse learning plans, create your own, or connect with other learners.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/learning-plans" className="btn btn-primary btn-lg">
              Browse Learning Plans
            </Link>
            <Link to="/register" className="btn btn-success btn-lg">
              Register
            </Link>
            <Link to="/login" className="btn btn-info btn-lg">
              Login
            </Link>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <h3 className="card-title">Create Learning Plans</h3>
                <p className="card-text">
                  Organize your learning journey with structured plans and resources.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <h3 className="card-title">Connect with Others</h3>
                <p className="card-text">
                  Follow other learners, like and comment on their learning plans.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <h3 className="card-title">Track Your Progress</h3>
                <p className="card-text">
                  Monitor your learning journey and celebrate your achievements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
