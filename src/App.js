import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Navbar';
import ExercisesList from './components/ExercisesList';
import EditExercise from './EditExercise';
import CreateExercise from './CreateExercise';
import CreateUser from './CreateUser';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <br />
        <Routes>
          <Route path='/edit/:id' exact element={<EditExercise/>} />
          <Route path='/create' exact element={<CreateExercise/>} />
          <Route path='/user' element={<CreateUser/>} />
          <Route path='/' exact element={<ExercisesList/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
