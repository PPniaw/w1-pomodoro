import React from 'react';
import styled from 'styled-components';

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

export default function Ringtones() {
  return (
    <>      
      <StyledFoldingBtn>WORK</StyledFoldingBtn>
      <div style={{ height: 30 }}></div>
      <StyledFoldingBtn>BREAK</StyledFoldingBtn>
    </>
  )
}