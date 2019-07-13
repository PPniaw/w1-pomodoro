import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/** icons */
import InsertChart from '@material-ui/icons/InsertChart';
import List from '@material-ui/icons/List';
import LibraryMusic from '@material-ui/icons/LibraryMusic';

const StyledLink = styled(Link)`
  color: white;
  margin-bottom: 48px;
  svg {        
    font-size: 36px;
  }
`
const StyledNavWrap = styled.div`  
  display: flex;
  flex-direction: column;
  width: 450;
  height: 100%;
  float: right;
  align-items: center;
`

export default function Nav() {
  return (
    <StyledNavWrap>
      <StyledLink to="/info/todo-list"><List/></StyledLink>
      <StyledLink to="/info/analytics"><InsertChart/></StyledLink>
      <StyledLink to="/info/ringtones"><LibraryMusic/></StyledLink>
      <p style={{ fontWeight: 'bold', fontSize: '24px', color: 'white', writingMode: 'vertical-lr', textAlign: 'right', flex: 1, fontFamily: 'futura' }}>POMODORO</p>
    </StyledNavWrap>
  )
}