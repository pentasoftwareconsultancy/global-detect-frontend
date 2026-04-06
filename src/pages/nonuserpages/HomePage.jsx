import React from 'react'
import HomeHero from "../../components/nonuser/home/HomeHero";
import AboutUs from "../../components/nonuser/home/AboutUs";
import Blogs from "../../components/nonuser/home/Blogs";
import Services from "../../components/nonuser/home/Services";
import EnquiryForm from "../../components/nonuser/home/EnquiryForm";
import HowItWorks from '../../components/nonuser/home/HowItWorks';
import Review from '../../components/nonuser/home/Review';
import ContactInfo from '../../components/nonuser/home/ContactInfo';

const HomePage = () => {
  return (
    <div className="bg-[#0b1120]">
        <HomeHero />
        <AboutUs />
        <HowItWorks />
        <Services />
        <Blogs />
        <Review />
        <EnquiryForm />
        <ContactInfo />
    </div>
  )
}

export default HomePage