import React from 'react';
import styled from 'styled-components';

const StlyeSvg = styled.svg`
  .circle-background,
  .circle-progress {
    fill: none;
  }
  .circle-background {
    stroke: transparent;
  }

  .circle-progress {
    stroke: #FF4384;
    stroke-linecap: square;
    stroke-linejoin: square;
  }

  .circle-text {
    font-size: 3em;
    font-weight: bold;
    fill: red;
  }
  .circle-line {
    stroke: #FF4384;
    fill: none;
  }
  .circle-heart {
    /* fill: #FF4384; */
    /* ${props => !props.isCountdown ? "fill: #FF4384" : 'fill: black' } */
  }
  .circle-button {
    /* fill: white; */
    /* ${props => (!props.isCountdown ? 'fill: white' : `fill: black` )} */
  }
`

export default class CircularProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isCountdown, startTimer, setCountdown, isSelected, buttonSize } = this.props;
    // Size of the enclosing square
    const sqSize = this.props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * this.props.percentage / 100;
    const heartCss = isCountdown ? { fill: 'white' } : { fill: '#FF4384' };
    const buttonCss = !buttonSize ? (!isCountdown ? { fill: 'white' } : { fill: '#FF4384' }) : { fill: '#FF4384' } 
    return (
      <StlyeSvg
          width={this.props.sqSize}
          height={this.props.sqSize}
          viewBox={viewBox}>
          <circle
          className="circle-background"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`} />
          <circle
            className="circle-line"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius + 6}
            strokeWidth={buttonSize ? '2px' : '4px'} />
          <circle
            className="circle-line"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius - 9}
            strokeWidth={buttonSize ? '2px' : '4px'} />
          <circle
            className="circle-background"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth}px`} />
          <circle
            className="circle-progress"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth - 2}px`}
            // Start progress marker at 12 O'Clock
            transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset
            }} />
            { !buttonSize && <circle
                className="circle-heart"
                cx={this.props.sqSize / 2}
                cy={this.props.sqSize / 2}
                r={buttonSize ? buttonSize - 1: radius-10}
                strokeWidth={50}
                style={heartCss}
              /> 
            }          
            {isSelected && !isCountdown ? (
              <svg style={{ cursor: 'pointer' }} onClick={() => startTimer()}>
                <circle                              
                  className="circle-button"
                  cx={this.props.sqSize / 2}
                  cy={this.props.sqSize / 2}
                  r={buttonSize ? 36 : 48}
                  style={buttonCss}
                />
                { buttonSize ? <polygon fill={buttonSize ? "white" : "#FF4384"} points="40,30 64,48 40,66"/> : <polygon fill="#FF4384" points="260,250 287,270 260,290"/> }                
              </svg> 
            ) : (
              <svg  style={{ cursor: 'pointer' }} onClick={() => setCountdown()}>
                <circle                  
                  className="circle-button"
                  cx={this.props.sqSize / 2}
                  cy={this.props.sqSize / 2}
                  r={buttonSize ? 36 : 48}
                  style={buttonCss}
                />
                { buttonSize ? (
                  <>
                    <rect x="38" y="32" fill="white" stroke="white" strokeWidth="2" width="4" height="31"/>
                    <rect x="53" y="32" fill="white" stroke="white" strokeWidth="2" width="4" height="31"/>
                  </>
                ) : (
                  <>
                    <rect x="257" y="255" fill="white" stroke="white" strokeWidth="3" width="5" height="33"/>
                    <rect x="277" y="255" fill="white" stroke="white" strokeWidth="3" width="5" height="33"/>
                  </>
                )}                
              </svg> 
            )}                     
      </StlyeSvg>
    );
  }
}

CircularProgressBar.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10
};