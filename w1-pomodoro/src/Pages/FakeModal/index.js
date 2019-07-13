import React from 'react';
import styled, { css } from 'styled-components';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

/** Fake Page */
import TodoList from '../TodoList';
import Analytics from '../Analytics';
import Ringtones from '../Ringtones';

/** Actions */
import * as Actions from '../../actions';

/** icons */
import InsertChart from '@material-ui/icons/InsertChart';
import List from '@material-ui/icons/List';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import CircularProgressBar from '../../Components/CircularProgressBar'

const MyLink = ({ currentPath, ...restProps }) => <Link {...restProps} />;

const activePathStyles = css`
  color: #FF4384;  
`

const StyledLink = styled(MyLink)`  
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 48px;
  svg {        
    font-size: 36px;
  }
  text-decoration: none;
  ${props => (props.currentPath !== undefined) && props.currentPath === props.to && activePathStyles}
`
const StyledCloseBtn = styled.div`
  display: block;
  color: white;
  position: absolute;
  right: 73px;
  top: 43px;
  padding: 5px;
  height: 30px;
  width: 30px;
  transform: rotate(180deg);
  cursor: pointer;
  &:after {
    top: 15px;
    position: absolute;    
    content: '';
    transform: rotate(45deg);
    display: block;
    width: 30px;
    height: 3px;
    background-color: white;
  }
  &:before {
    top: 15px;
    position: absolute;
    content: '';
    transform: rotate(135deg);
    display: block;
    width: 30px;
    height: 3px;
    background-color: white;
  }
`
const StyledHalfCircle = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  background-color: #FFEDF7;
  border-radius: 50%;
  bottom: -175px;
  display: flex;
  justify-content: center;
`

class FakeModal extends React.Component {  
  
  setCountdown = (boolean) => {    
    this.props.setCountdownAction(boolean)    
  }

  timer = () => {
    if(this.props.missions.find(x => x.selected) && (this.props.missions.find(x => x.selected).time <= 0)) {
      this.props.setInitialTime()
      return this.setCountdown(false)      
    }        
    if(!this.props.isCountdown) return    
    this.props.countdown()
    setTimeout(this.timer, 1000)  
  }

  startTimer = async () => {    
    await this.setCountdown(true)
    setTimeout(this.timer, 1000)    
  }

  render() {
    const { history, location, missions, isCountdown } = this.props;
    
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#003164', position: 'relative', padding: '48px 85px 0 85px', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div style={{ width: 450 }}>
          <StyledLink to="/info/todo-list" currentPath={location.pathname}><List/><span style={{ fontSize: '36px', fontWeight: 'bold', marginLeft: '15px' }}>TO-DO LIST</span></StyledLink>
          <StyledLink to="/info/analytics" currentPath={location.pathname}><InsertChart/><span style={{ fontSize: '36px', fontWeight: 'bold', marginLeft: '15px' }}>ANALYTICS</span></StyledLink>
          <StyledLink to="/info/ringtones" currentPath={location.pathname}><LibraryMusic/><span style={{ fontSize: '36px', fontWeight: 'bold', marginLeft: '15px' }}>RINGTONE</span></StyledLink>
        </div>
        <StyledHalfCircle>
          <div style={{ marginTop: '-44px', backgroundColor: '#003164', height: 96, padding: '5px', borderRadius: '50%' }}>
            <CircularProgressBar
              startTimer={() => this.startTimer()}
              setCountdown={() => this.setCountdown(false)}
              strokeWidth="16"
              sqSize="96"
              buttonSize="38"
              percentage={missions.find(x => x.selected) ? (100 - ((missions.find(x => x.selected).time/missions.find(x => x.selected).initialTime)).toFixed(3) * 100 ): 0}
              isCountdown={isCountdown}
              isSelected={Boolean(missions.find(x => x.selected))}
            />
          </div>
          {missions.find(x => x.selected) &&
            <>
              <p style={{ position: 'absolute', top: '52px', fontSize: '62px', color: '#FF4384', fontWeight: 'bold', margin: '10px 0' }}>{parseInt(missions.find(x => x.selected).time/60) < 10 ? '0' + parseInt(missions.find(x => x.selected).time/60) : parseInt(missions.find(x => x.selected).time/60) }:{missions.find(x => x.selected).time%60 === 0 ? '00' : missions.find(x => x.selected).time%60 < 10 ? "0" + missions.find(x => x.selected).time%60 : missions.find(x => x.selected).time%60}</p>
              <p style={{ position: 'absolute', top: '140px', margin: 0, padding: 0, fontSize: '17px', fontWeight: '900', color: '#003164', marginBottom: '5px' }}>{missions.find(x => x.selected).name}</p>  
            </>
          }          
        </StyledHalfCircle>
        <div style={{ position: 'absolute', left: '550px', top: '48px', width: 445 }}>
          <Switch>        
            <Route path="/info/todo-list" component={TodoList} />
            <Route path="/info/analytics" component={Analytics} /> 
            <Route path="/info/ringtones" component={Ringtones} />                  
          </Switch>      
        </div>
        <StyledCloseBtn onClick={() => history.push('/')} />
        <p style={{ fontWeight: 'bold', fontSize: '24px', color: 'white', writingMode: 'vertical-lr', textAlign: 'right', flex: 1, fontFamily: 'futura', position: 'absolute', right: '73px', top: '586px', margin: 0 }}>POMODORO</p>
      </div>
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
    setCountdownAction: (isCountdown) => dispatch(Actions.setCountdown(isCountdown)),
    setInitialTime: () => dispatch(Actions.setInitialTime()),
  }
}
export default connect(  
  mapStateToProps, mapDispatchToProps  
)(FakeModal);