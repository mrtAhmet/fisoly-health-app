import { Routes, Route } from 'react-router-dom';
import React from 'react'
import '../css/MainContent.css'
import Home from '../pages/Home';
import About from '../pages/About'
import Posts from '../pages/Posts'
import Contact from '../pages/Contact';
import Calculate from '../pages/Calculate';
import BmiCalculator from '../components/Calculators/BmiCalculator';
import WaterCalculator from '../components/Calculators/WaterCalculator';
import PostDetail from '../pages/PostDetail';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';

function MainContent() {
    return (
        <div className='Content'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/posts' element={<Posts />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/calculate' element={<Calculate />} />
                <Route path='/calculate/bmi' element={<BmiCalculator />} />
                <Route path='/calculate/water' element={<WaterCalculator />} />
                <Route path='/posts/:id' element={<PostDetail />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/terms-of-service' element={<TermsOfService />} />
            </Routes>
        </div>
    )
}

export default MainContent