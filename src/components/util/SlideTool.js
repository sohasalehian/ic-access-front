import React, { useReducer, useState } from "react";
import "./SlideTool.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SlideTool = (props) => {
  const[isHover, toggleHover] = useReducer((isHover) => !isHover, false);
  const[isHoverSlider, toggleHoverSlider] = useReducer((isHoverSlider) => !isHoverSlider, false);
  const[isHoverButton, toggleHoverButton] = useReducer((isHoverButton) => !isHoverButton, false);
  const[slideLeft, setSlideLeft] = useState(props.slideToLeft);
  const[closeLeft, setCloseLeft] = useState(false);

  const toggleCloseLeft = () => {setCloseLeft(!closeLeft)}

  return (
    <div className='main-slide-tool'>
      <div className={'hidden-slide ' + (closeLeft ? 'visible' : '')}
        onMouseEnter={toggleHoverSlider} onMouseLeave={toggleHoverSlider} />

      <div className={'left-slide ' + (closeLeft ? 'hide' : '')}
        onMouseEnter={toggleHover} onMouseLeave={toggleHover}>

        {slideLeft ? props.slideLeft : props.defaultLeft}

        <div className={'left-half-circle half-circle back-position '
              + (isHover ? '' : 'hide ')}
              onClick={toggleCloseLeft}>
          <FontAwesomeIcon icon="arrow-left" />
        </div>
      </div>

      <div className={'right-half-circle half-circle default-position '
            + (isHoverButton || isHoverSlider ? '' : 'hide ')
            + (props.deactiveDefault || closeLeft || slideLeft ? '' : 'disable')}
          onMouseEnter={toggleHoverButton} onMouseLeave={toggleHoverButton}
          onClick={() => {setSlideLeft(false); setCloseLeft(false);}}>
        <FontAwesomeIcon icon="folder-open" />
      </div>
      <div className={'right-half-circle half-circle slide-position '
            + (isHoverButton || isHoverSlider ? '' : 'hide ')
            + (props.deactiveSlide || (!closeLeft && slideLeft) ? 'disable' : '')}
          onMouseEnter={toggleHoverButton} onMouseLeave={toggleHoverButton}
          onClick={() => {setSlideLeft(true); setCloseLeft(false);}}>
        <FontAwesomeIcon icon="cogs" />
      </div>

      <div className={'right-component ' + (closeLeft ? 'full' : '')}>
        {props.right}
      </div>
    </div>
  );
};

export default SlideTool;
