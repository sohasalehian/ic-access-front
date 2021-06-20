import React, { useReducer, useState } from "react";
import "./SingleSlideTool.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SingleSlideTool = (props) => {
  const[isHover, toggleHover] = useReducer((isHover) => !isHover, false);
  const[isHoverSlider, toggleHoverSlider] = useReducer((isHoverSlider) => !isHoverSlider, false);
  const[isHoverButton, toggleHoverButton] = useReducer((isHoverButton) => !isHoverButton, false);
  const[closeLeft, setCloseLeft] = useState(false);

  const toggleCloseLeft = () => {setCloseLeft(!closeLeft)}

  return (
    <div className='main-single-slide-tool'>
      <div className={'hidden-slide ' + (closeLeft ? 'visible' : '')}
        onMouseEnter={toggleHoverSlider} onMouseLeave={toggleHoverSlider} />

      <div className={'left-slide ' + (closeLeft ? 'hide' : '')}
        onMouseEnter={toggleHover} onMouseLeave={toggleHover}>

        <div className={'left-half-circle half-circle back-position '
              + (isHover ? '' : 'hide ')}
              onClick={toggleCloseLeft}>
          <FontAwesomeIcon icon="arrow-left" />
        </div>

        <div className='slider'>
          {props.left}
        </div>
      </div>

      <div className={'right-half-circle half-circle open-position '
            + (isHoverButton || isHoverSlider ? '' : 'hide ')
            + (closeLeft ? '' : 'disabled')}
          onMouseEnter={toggleHoverButton} onMouseLeave={toggleHoverButton}
          onClick={() => {setCloseLeft(false);}}>
        <FontAwesomeIcon icon="arrow-right" />
      </div>

      <div className={'right-component ' + (closeLeft ? 'full' : '')}>
        {props.right}
      </div>
    </div>
  );
};

export default SingleSlideTool;
