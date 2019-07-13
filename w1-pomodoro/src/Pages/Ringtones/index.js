import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import * as Actions from '../../actions';

const StyledFoldingBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #ffffff3b;  
  font-size: 22px;
  font-weight: bold;
  padding: 8px 15px;
  margin-bottom: 5px;
`
const StyledCheckButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;  
  background-color: transparent;
  border: 1px solid white;  
  cursor: pointer;
  ${props => "height:" + props.size + "px"}  
  ${props => "width:" + props.size + "px"}
  ${props => props.sound === props.soundName && 'border-color: #FF4384' }    
  :focus {
    outline: none;
  }
`

class Ringtones extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sounds: {
        break: [
          {
            name: 'babySound'
          },
          {
            name: 'default'
          }
        ],
        work: [
          {
            name: 'babySound'
          },
          {
            name: 'default'
          }
        ]
      }
    }
  }

  render() {
    const { setWorkSound, setBreakSound, sound } = this.props    
    return (
      <>      
        <StyledFoldingBtn>WORK</StyledFoldingBtn>
        <div style={{ height: 30, marginBottom: 60, width: '100%' }}>
          {this.state.sounds.work.map((x, i) => (
            <div key={i} style={{ display: 'inline-block', width: '33%', padding: '10px 5px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                <StyledCheckButton sound={sound.work} soundName={x.name} size={20} onClick={() => {setWorkSound(x.name)}}>
                  { sound.work === x.name ? (
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', textAlign: 'center', position: 'absolute', borderRadius: '50%', backgroundColor: '#FF4384' }}></span>
                  ) : <span style={{ display: 'inline-block', width: '12px', height: '12px', textAlign: 'center', position: 'absolute', borderRadius: '50%', backgroundColor: '#003164' }}></span>}                  
                </StyledCheckButton>
                <div style={{ fontSize: 16, color: 'white', fontWeight: 'bold', marginLeft: 10 }}>{x.name.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
        <StyledFoldingBtn>BREAK</StyledFoldingBtn>
        <div style={{ height: 30, marginBottom: 30, width: '100%' }}>
          {this.state.sounds.break.map((x, i) => (
            <div key={i} style={{ display: 'inline-block', width: '33%', padding: '10px 5px', boxSizing: 'border-box'}}>
              <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                <StyledCheckButton sound={sound.break} soundName={x.name} size={20} onClick={() => {setBreakSound(x.name)}}>
                  { sound.break === x.name ? (
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', textAlign: 'center', position: 'absolute', borderRadius: '50%', backgroundColor: '#FF4384' }}></span>
                  ) : <span style={{ display: 'inline-block', width: '12px', height: '12px', textAlign: 'center', position: 'absolute', borderRadius: '50%', backgroundColor: '#003164' }}></span>}                  
                </StyledCheckButton>
                <div style={{ fontSize: 16, color: 'white', fontWeight: 'bold', marginLeft: 10 }}>{x.name.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    missions: state.missions,
    isCountdown: state.isCountdown,
    sound: state.sound
  }
};
const mapDispatchToProps = (dispatch) => {
  return {    
    setWorkSound: (sound) => dispatch(Actions.setWorkSound(sound)),
    setBreakSound: (sound) => dispatch(Actions.setBreakSound(sound)),
  }
}
export default connect(  
  mapStateToProps, mapDispatchToProps  
)(Ringtones);