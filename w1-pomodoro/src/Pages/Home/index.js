import React from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';

/** Components */
import Nav from '../../Components/Nav';
import CircularProgressBar from '../../Components/CircularProgressBar'

/** Actions */
import * as Actions from '../../actions';

const StyledContainer = styled.div`
  display: flex;
  height: 100%;
  position: relative;
`

const StyledInput = styled.input`   
  border: none;  
  font-size: 16px;
  padding: 16px;
  box-sizing: border-box;
  font-style: italic;
  font-weight: bold;
  height: 100%;
  width: 100%;
  color: #FF4384;
  ::placeholder {
    color: #FF4384;
    font-weight: bold;
  }
  :focus {
    border: none;
    outline: none;
  }
`

const StyledInputWrap = styled.div`
  color: #FF4384;
  height: 56px;
  width: 445px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledAddButton = styled.button`
  border: none;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  color: #FF4384;
  font-size: 24px;
  cursor: pointer;
  :focus {
    border: none;
    outline: none;
  }
`

const StyledCheckButton = styled.button`
  border-radius: 50%;  
  background-color: transparent;
  border: 2px solid #003164;
  margin-right: 16px;
  cursor: pointer;
  ${props => "height:" + props.size + "px"}  
  ${props => "width:" + props.size + "px"}  
  :hover {
    border: 2px solid #003164c2;
  }
  :focus {
    outline: none;
  }
`
const StyledTomatoes = styled.span`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: #003164;
  display: inline-block;
  margin-right: 8px;
`
const StyledTriangle = styled.div`
  margin-left: -2px;
  margin-top: 2px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 7px;
  border-color: transparent transparent transparent #003164;
`
class Home extends React.Component {
  
  constructor() {
    super()
    this.state = {
      newMissionName: '',      
    }
  }
  countdown = () => {
    this.setState({
      time: this.state.time - 1
    })
  }
  setCountdown = (boolean) => {    
    this.props.setCountdownAction(boolean)
  }

  timer = () => {        
    if(!this.props.isCountdown) return
    if(this.props.missions.find(x => x.selected) && (this.props.missions.find(x => x.selected).time <= 0)) {
      return this.setCountdown(false)      
    }        
    this.props.countdown()    
    this.startTimer()    
  }

  startTimer = async () => {    
    await this.setCountdown(true)    
    setTimeout(this.timer, 1000)
  }

  render() {
    const { missions, addMission, finishMission, selectMission, isCountdown } = this.props
    const { newMissionName } = this.state
    return (
      <StyledContainer>      
        <div style={{ flex: 1, boxSizing: "border-box", padding: '48px' }}>
          <div style={{ width: '445px' }}>
            <StyledInputWrap>          
              <StyledInput type="text" value={this.state.mission} placeholder="ADD A NEW MISSION..." onChange={(e) => this.setState({ newMissionName: e.target.value})} />
              <StyledAddButton onClick={() => addMission(newMissionName)} >+</StyledAddButton>  
            </StyledInputWrap>
            <div style={{ marginTop: 145 }}> 
            {missions.find(x => x.selected) ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>          
                  <StyledCheckButton size={48} onClick={() => finishMission(missions.find(x => x.selected).id)}/>
                  <div style={{ marginTop: '5px' }}>
                    <p style={{ margin: 0, padding: 0, fontSize: '24px', fontWeight: 'bold', color: '#003164', marginBottom: '5px' }}>{missions.find(x => x.selected).name}</p>
                    {Array(missions.find(x => x.selected).tomatoes).fill('').map((x,i) => <StyledTomatoes key={i} />)}
                  </div>                          
                </div>
                <p style={{ fontSize: '176px', color: '#FF4384', fontWeight: 'bold', margin: '10px 0' }}>{parseInt(missions.find(x => x.selected).time/60) < 10 ? '0' + parseInt(missions.find(x => x.selected).time/60) : parseInt(missions.find(x => x.selected).time/60) }:{missions.find(x => x.selected).time%60 === 0 ? '00' : missions.find(x => x.selected).time%60 < 10 ? "0" + missions.find(x => x.selected).time%60 : missions.find(x => x.selected).time%60}</p>
              </> 
            ) : <p style={{ color: '#003164', fontSize: '24px' }}>PLEASE ADD A MISSION FIRST</p>}                  
            </div>
            <div style={{ marginTop: 100 }}>            
              {missions.filter(x => !x.done).filter(x => !x.selected).slice(0, 3).map((x, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '8px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <StyledCheckButton size={20} onClick={() => finishMission(x.id)}/>
                    <div style={{ fontSize: 16, color: '#003164', fontWeight: 'bold', marginLeft: '-8px' }}>{x.name}</div>
                  </div>                
                  <StyledCheckButton size={20} onClick={() => selectMission(x.id)}>
                    <StyledTriangle/>
                  </StyledCheckButton>                  
                </div>)
              )}
              { missions.filter(x => !x.done).filter(x => !x.selected).length > 3 && <div style={{ float: 'right', fontSize: 14, fontWeight: 'bold', color: '#FF4384', padding: '5px 0' }}>MORE</div> }
            </div>         
          </div>
        </div>      
        <div style={{ width: 450, backgroundColor: '#003164', boxSizing: "border-box", padding: '48px'  }}>
          <Nav/>
        </div>
        <div style={{ position: 'absolute', left: '567px', top: '130px' }}>        
          <CircularProgressBar
            startTimer={() => this.startTimer()}
            setCountdown={() => this.setCountdown(false)}
            strokeWidth="16"
            sqSize="540"
            percentage={missions.find(x => x.selected) ? (100 - ((missions.find(x => x.selected).time/missions.find(x => x.selected).initialTime)).toFixed(3) * 100 ): 0}
            isCountdown={isCountdown}
            isSelected={Boolean(missions.find(x => x.selected))}
          />
        </div>      
      </StyledContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    missions: state.missions,
    isCountdown: state.isCountdown,
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    addMission: (newMissionName) => dispatch(Actions.addMission(newMissionName)),
    finishMission: (missionId) => dispatch(Actions.finishMission(missionId)),
    selectMission: (missionId) => dispatch(Actions.selectMission(missionId)),
    countdown: (missionId) => dispatch(Actions.countDown(missionId)),
    setCountdownAction: (isCountdown) => dispatch(Actions.setCountdown(isCountdown))
  }
}
export default connect(  
  mapStateToProps, mapDispatchToProps  
)(Home);