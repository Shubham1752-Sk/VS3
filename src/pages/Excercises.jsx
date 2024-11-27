import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import ExerciseDetail from '../components/ExcerciseComponents/pages/ExerciseDetail';
import Home from '../components/ExcerciseComponents/pages/Home';
import Navbar from '../components/ExcerciseComponents/components/Navbar2';
import Footer from '../components/ExcerciseComponents/components/Footer2';

const Excercise = () => (
  <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercise/:id" element={<ExerciseDetail />} />
    </Routes>
    <Footer />
  </Box>
);

export default Excercise;
