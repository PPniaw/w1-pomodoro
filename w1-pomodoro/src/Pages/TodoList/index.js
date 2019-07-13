import React from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';

import * as Actions from '../../actions';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';

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
  border: 1px solid white;  
  cursor: pointer;
  ${props => "height:" + props.size + "px"}  
  ${props => "width:" + props.size + "px"}  
  :hover {
    border: 1px solid white;
  }
  :focus {
    outline: none;
  }
`

const StyledTriangle = styled.div`
  margin-left: 0px;
  margin-top: 2px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent white;  
`

const StyledTriangle2 = styled.div`
  margin-left: 0px;
  margin-top: 2px;
  margin-right: 15px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 6px;
  border-color: transparent transparent transparent white;
  ${props => {return props.show ? 'transform: rotate(-90deg)' : 'transform: rotate(90deg)'}}
`

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
const StyledTomatoes = styled.span`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: white;
  display: inline-block;
  margin-right: 8px;
`

class TodoList extends React.Component {  
  constructor() {
    super()
    this.state = {
      newMissionName: '',
      isTodoShow: true,
      isDoneShow: true
    }
  }
  render() {
    const { missions, addMission, finishMission, selectMission } = this.props
    const { newMissionName, isTodoShow, isDoneShow } = this.state
    return (
      <>
        <StyledInputWrap>          
          <StyledInput type="text" value={this.state.mission} placeholder="ADD A NEW MISSION..." onChange={(e) => this.setState({ newMissionName: e.target.value})} />
          <StyledAddButton onClick={() => addMission(newMissionName)} >+</StyledAddButton>  
        </StyledInputWrap>
        <div style={{ marginTop: 55 }}>
          <StyledFoldingBtn onClick={ () => this.setState({isTodoShow: !isTodoShow })}>TO-DO<StyledTriangle2 show={isTodoShow}/></StyledFoldingBtn>
          {isTodoShow && missions.filter(x => !x.done).length > 0 && missions.filter(x => !x.done).map((x, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ffffff3b', padding: '10px 0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <StyledCheckButton size={20} onClick={() => finishMission(x.id)}/>
                <div style={{ fontSize: 16, color: 'white', fontWeight: 'bold', marginLeft: 16 }}>{x.name}</div>
              </div>                
              <StyledCheckButton size={20} onClick={() => selectMission(x.id)}>
                <StyledTriangle/>
              </StyledCheckButton>                  
            </div>)
          )}          
        </div>
        <div style={{ marginTop: 55 }}>
          <StyledFoldingBtn onClick={ () => this.setState({isDoneShow: !isDoneShow })}>DONE<StyledTriangle2 show={isDoneShow}/></StyledFoldingBtn>
          {isDoneShow && missions.filter(x => x.done).length > 0 && missions.filter(x => x.done).map((x, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ffffff3b', padding: '10px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutline style={{ color: 'white', marginRight: 20, }} />
                <div style={{ fontSize: 16, color: 'white', fontWeight: 'bold', textDecoration: 'line-through', paddingTop: '4px', }}>{x.name}</div>
              </div>
              <div>
                {Array(x.tomatoes).fill('').map((x,i) => <StyledTomatoes key={i} />)}
              </div>
            </div>)
          )}          
        </div>    
      </>
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
  }
}
export default connect(  
  mapStateToProps, mapDispatchToProps  
)(TodoList);