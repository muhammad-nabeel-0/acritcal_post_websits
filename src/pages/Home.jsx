import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import FeaturedArticles from '../components/FeaturedArticles'

import Testimonials from '../components/Testimonials'

const Home = () => {
  
  return (
    <>
      <Hero/>
      <Testimonials/>
      <FeaturedArticles/>
    </>
  )
}

export default Home
