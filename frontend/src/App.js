import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course/:courseId" element={<EditCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
