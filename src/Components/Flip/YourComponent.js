import React, { useState } from 'react';
import './youcomponent.css'; // Add your CSS file

const YourComponent = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <main className="heading-main">
      <div className="card-container">
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
          <div className="front">
            <div className="heading-heading">
              TWENTYTWOAM
            </div>
            <div className="heading-description">
              Consultancy and Design Solutions for B2B Brands
            </div>
          </div>
          <div className="back">
            <div className="mask-heading">
              Content behind the mask
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default YourComponent;
