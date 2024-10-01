import React from 'react';
import PageContainer from 'src/components/container/PageContainer';

import Banner from '../../../components/landingpage/home/banner/Banner';
// import C2a from '../../../components/landingpage/home/c2a/C2a';
// import C2a2 from '../../../components/landingpage/home/c2a/C2a2';
import InfoCard from 'src/components/landingpage/home/infoCard/infoCard';
import SectionTitle from 'src/components/landingpage/home/infoSection/SectionTitle';
import Footer from '../../../components/landingpage/Footer';
import LpHeader from '../../../components/landingpage/Header';
import Testimonial from '../../../components/landingpage/home/testimonial/Testimonial';

const LandingPage = () => {
  return (
    <PageContainer title="Home" description="this is Landingpage">
      <LpHeader />
      <Banner />
      <InfoCard/>
      <SectionTitle/>
      <Testimonial />
      {/* <C2a />
      <C2a2 /> */}
      <Footer />
    </PageContainer>
  );
};

export default LandingPage;
