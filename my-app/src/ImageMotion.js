import React, { useState} from 'react';
const requireImages = require.context('../assets/genplan/first/images', false, /\.jpg$/);

function ImageMotion() {  
  const [currentIndex, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
 
  const images1 = [];



  requireImages.keys().forEach(filename => {
    images1.push(requireImages(filename));
  });



  function nextstep(){
    setDirection(1)
    const interval = setInterval(() => {
      setIndex(currentImage => (currentImage + 1)  % images1.length);
    }, 100);
    if(currentIndex === images1.length - 1){

      return () => clearInterval(interval);
    }
  }

  function prevstep(){
    setDirection(-1);
    const interval = setInterval(() => {
      setIndex(currentImage => (currentImage - 1) % images1.length);
    }, 100);

    return () => clearInterval(interval);
  }





  return (
    <div className="container">
      <div className='slideshow'>
        <img
          src={images1[currentIndex]}
        />

      </div>
          <button onClick={prevstep} className='prev'>prev</button>
          <button onClick={nextstep} className='next'>next</button>  
    </div>
  );
}

export default ImageMotion;