import React, { useState, useMemo, useEffect } from 'react';
const requireImages = require.context('../assets/genplan/first/images', false, /\.jpg$/);

const images = {
  first: require.context('../assets/genplan/first/images', false, /\.jpg$/),
  second: require.context('../assets/genplan/second/images', false, /\.jpg$/),
  third: require.context('../assets/genplan/third/images', false, /\.jpg$/),
}

function ImageMotion() {
  const [currentFolder, setCurrentFolder] = useState(1);
  const [currentIndex, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const images1 = useMemo(() => {
    const list = []
    images.first.keys().forEach(filename => {
      list.push(images.first(filename));
    });
    return images
  }, [])

  const images2 = useMemo(() => {
    const list = []
    images.second.keys().forEach(filename => {
      list.push(images.second(filename));
    });
    return images
  }, [])

  const images3 = useMemo(() => {
    const list = []
    images.third.keys().forEach(filename => {
      list.push(images.third(filename));
    });
    return images
  }, [])

  const animate = async () => {
    const list = currentFolder === 1 ? images1 : currentFolder === 2 ? images2 : images3
    for (let item of list) {
      setIndex(currentImage => (currentImage + 1) % images1.length);
      await new Promise(res => setTimeout(res, 100))
    }      
  }

  function nextstep() {
    // setDirection(1)
    // const interval = setInterval(() => {
    //   setIndex(currentImage => (currentImage + 1) % images1.length);
    // }, 100);
    // if (currentIndex === images1.length - 1) {

    //   return () => clearInterval(interval);
    // }
    const i = {
      1: 2,
      2: 3,
      3: 1
    }
    setCurrentFolder(prev => i[prev])
  }

  function prevstep() {
    // setDirection(-1);
    // const interval = setInterval(() => {
    //   setIndex(currentImage => (currentImage - 1) % images1.length);
    // }, 100);

    // return () => clearInterval(interval);
    const i = {
      1: 3,
      2: 1,
      3: 2
    }
    setCurrentFolder(prev => i[prev])
  }

  useEffect(() => {

    animate();
  },[currentFolder, currentIndex, direction])
  return (
    <div className="container">
      <div className='slideshow'>
        <img
          src={
            currentFolder===1 ? images1[currentIndex] :
          currentFolder===2 ? images2[currentIndex] :
          images3[currentIndex]
          }
        />

      </div>
      <button onClick={prevstep} className='prev'>prev</button>
      <button onClick={nextstep} className='next'>next</button>
    </div>
  );
}

export default ImageMotion;