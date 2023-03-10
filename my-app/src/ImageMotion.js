import React, { useState, useMemo, useEffect } from "react";

function importImages(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = {
  first: importImages(
    require.context("../assets/genplan/first/images", false, /\.jpg$/)
  ),
  second: importImages(
    require.context("../assets/genplan/second/images", false, /\.jpg$/)
  ),
  third: importImages(
    require.context("../assets/genplan/third/images", false, /\.jpg$/)
  ),
};

function ImageMotion() {
  const [currentFolder, setCurrentFolder] = useState("first");

  return (
    <div className="container">
      <div className="slideshow">
        {currentFolder === "first" && <Images folder={currentFolder} />}
        {currentFolder === "second" && <Images folder={currentFolder} />}
        {currentFolder === "third" && <Images folder={currentFolder} />}
      </div>
      <button
        onClick={() => {
          const target = {
            first: "second",
            second: "third",
            third: "first",
          };
          setCurrentFolder(target[currentFolder]);
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          const target = {
            first: "third",
            second: "first",
            third: "second",
          };
          setCurrentFolder(target[currentFolder]);
        }}
      >
        Next
      </button>
      <span>{currentFolder}</span>
    </div>
  );
}

const Images = ({ folder }) => {
  const [currentImage, setCurrentImage] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const imagesFolder = images[folder];
      const keys = Object.keys(imagesFolder);
      if (currentIndex === keys.length - 1) return;
      const nextIndex = currentIndex + 1;
      setCurrentImage(imagesFolder[keys[nextIndex]]);
      setCurrentIndex(nextIndex);
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <img
      src={currentImage}
      style={{
        height: "70vh",
        width: "80vw",
      }}
    />
  );
};

export default ImageMotion;