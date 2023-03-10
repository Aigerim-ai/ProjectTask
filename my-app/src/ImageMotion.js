import React, { useState, useMemo, useEffect } from 'react';

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
    console.log(list)
    for (const item of list) {
      setIndex(currentImage => (currentImage + 1) % item.length);
      await new Promise(res => setTimeout(res, 100))
    } 
 
  }
useEffect(() => {
animate()
},[])
  function nextstep() {

    const i = {
      1: 2,
      2: 3,
      3: 1
    }
    setCurrentFolder(prev => i[prev])
  }

  function prevstep() {
    const i = {
      1: 3,
      2: 1,
      3: 2
    }
    setCurrentFolder(prev => i[prev])
  }
console.log(currentFolder)
  return (
    <div className="container">
      <div className='slideshow'>
        <img
          src={currentFolder}
        />

      </div>
      <button onClick={prevstep} className='prev'>prev</button>
      <button onClick={nextstep} className='next'>next</button>
    </div>
  );
}

export default ImageMotion;