import React, { useState} from 'react';
import {motion} from 'framer-motion';
function ImageMotion() {  
  const [currentIndex, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
 
  const images1 = [];
  const images2 = [];
  const images3 = [];
  
  const requireImages = require.context('../assets/genplan/first/images', false, /\.jpg$/);
  const requireImages2 = require.context('../assets/genplan/second/images', false, /\.jpg$/);
  const requireImages3 = require.context('../assets/genplan/third/images', false, /\.jpg$/);

  requireImages.keys().forEach(filename => {
    images1.push(requireImages(filename));
  });
  requireImages2.keys().forEach(filename => {
    images2.push(requireImages(filename));
  });
  requireImages3.keys().forEach(filename => {
    images3.push(requireImages(filename));
  });

const variants = {
  initial: (direction) =>{
   return {
      x: direction > 0 ? 200 : -200,
      opacity: 0
    }
  },
  animate: {
    x: 0,
    opacity: 1,
  }, 
  exit: direction =>{
    return{
    x: direction >0 ? -200 : 200,
    opacity: 0,
  }
}
}

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
        <motion.img
          custom={direction}
          variants={variants}
          animate = "animate"
          initial = "initial"
          exit = "exit"
          src={images1[currentIndex]}
        />

      </div>
          <button onClick={prevstep} className='prev'>prev</button>
          <button onClick={nextstep} className='next'>next</button>  
    </div>
  );
}

export default ImageMotion;