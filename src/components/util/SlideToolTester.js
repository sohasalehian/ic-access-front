import React from "react";
import SlideTool from "./SlideTool"

const SlideToolTester = () => {

  return (
    <div className='main-tree-container'>
      <SlideTool
        defaultLeft={<p style={{background: '#aa5', width: '100%', height: '100%'}}>Default Left</p>}
        slideLeft={<p style={{background: '#5aa', width: '100%', height: '100%'}}>Slide Left</p>}
        right={<p style={{background: '#a5a', width: '100%', height: '100%'}}>No Content</p>}
      />
    </div>
  );
};

export default SlideToolTester;
