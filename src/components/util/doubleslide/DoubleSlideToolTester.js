import React from "react";
import SlideTool from "./DoubleSlideTool"

const DoubleSlideToolTester = () => {

  return (
    <div className='main-tree-container'>
      <DoubleSlideTool
        defaultLeft={<p style={{background: '#aa5', width: '100%', height: '100%'}}>Default Left</p>}
        slideLeft={<p style={{background: '#5aa', width: '100%', height: '100%'}}>Slide Left</p>}
        right={<p style={{background: '#a5a', width: '100%', height: '100%'}}>No Content</p>}
      />
    </div>
  );
};

export default DoubleSlideToolTester;
