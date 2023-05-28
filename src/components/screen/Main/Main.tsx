import React from 'react';
import Footer from '../Footer/Footer';
import AfterLearnCourse from './AfterLearnCourse/AfterLearnCourse';
import CourseAuthors from './CourseAuthors/CourseAuthors';
import OurProgram from './OurProgram/OurProgram';
import PaymentCourse from './PaymentCourse/PaymentCourse';
import PresentCourse from './PresentCourse/PresentCourse';
import styles from './Main.module.scss';

const Main = () => (
  <>
    <PresentCourse />
    <AfterLearnCourse />
    <div className={styles.containerBeige}>
      <OurProgram />
      <CourseAuthors />
    </div>
    <PaymentCourse />
    <Footer color="black" />
  </>
);

export default Main;
