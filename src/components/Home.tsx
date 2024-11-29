import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../public/images/img1.svg'
import img2 from '../../public/images/Frame_1-removebg-preview.png'


const Home: React.FC = () => {
  return (
      <section className="hero-section">
        <img src={img1} className='up-img1' alt="colors" />
        <img src={img1} className='down-img1' alt="colors" />
        <div className="hero-content">

          <h1>Hello, Friend!</h1>
          <p>
          It’s no coincidence you found us—you belong here. Our mission is to help <span className='italic'>you</span> spread happiness and kindness, one thoughtful act at a time. Join our growing family of kind-hearted individuals, just like you, working together to make the world brighter. Let’s create a ripple of kindness, starting with <span className='italic'>you</span>.
          </p>
            <button>
            <Link to="/auth" className="join-now-button">
            Join Now!
          </Link>
            </button>
        </div>
        <div className="hero-img">
            <img src={img2} alt="logo" />
        </div>
      </section>
  );
};

export default Home;
