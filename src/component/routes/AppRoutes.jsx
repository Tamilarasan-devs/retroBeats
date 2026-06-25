import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import RetroBeat from '../shared/RetroBeats';
import GalleryImages from '../pages/GalleryImages';
import ImageUpload from '../pages/ImageUpload';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import VideoPage from '../pages/VideoPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<GalleryImages />} />
      <Route path='/video' element={<VideoPage/> } />
      <Route path="/contact" element={<Contact />} />
      <Route path="/beats" element={<RetroBeat />} />
      <Route path="/upload" element={<ImageUpload />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

