import React, { useState} from 'react';

function ImageMotion() {  
  const [currentImage, setIndex] = useState(0);
  
 
  const images1 = [];
  const images2 = [];
  const images3 = [];


  const requireImages = require.context('../assets/genplan/first/images', false, /\.jpg$/);

  
  requireImages.keys().forEach(filename => {
    images1.push(requireImages(filename));
  });


  function nextstep(){
    const interval = setInterval(() => {
      setIndex(currentImage => (currentImage + 1) % images1.length);
    }, 1000);

    return () => clearInterval(interval);
  }

  function prevstep(){
    
  }





  return (
    <div className="container">
      <div className='slideshow'>
     

      {images1.map((image, index) => (
        <img
          key={index}
          src={image}
          style={{
            padding: '100px',
            position: 'absolute',
            bottom: 0,
            left: 0,
            opacity: currentImage === index ? 1 : 0,
          }}
        />
      ))}

          <img alt="alt" className='slide'/>
          <img alt="alt" className='slide'/>

      </div>
          <button onClick={prevstep} className='prev'>prev</button>
          <button onClick={nextstep} className='next'>next</button>  
    </div>
  );
}

export default ImageMotion;