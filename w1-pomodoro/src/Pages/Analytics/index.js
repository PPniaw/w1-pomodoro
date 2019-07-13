import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Plot from 'react-plotly.js';

const StyledFoldingBtn = styled.div`
  z-index: 10;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #ffffff3b;  
  font-size: 22px;
  font-weight: bold;
  padding: 8px 15px;
  margin-bottom: 15px;
`

function Analytics(props) {  
  return (
    <div style={{ position: 'relative' }}>
      <StyledFoldingBtn>FOCUS TIME</StyledFoldingBtn>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ width: '50%', display: 'inline-block'}}>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>TODAY</div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ fontSize: '60px', fontWeight: 'bold', color: '#FF4384' }}>20</div>
            <div style={{fontSize: '16px', fontWeight: 'bold', color: '#ffffff3b', marginLeft: '5px' }}>/TOMATO</div>
          </div>        
        </div>
        <div style={{ width: '50%', display: 'inline-block'}}>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>WEEK</div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ fontSize: '60px', fontWeight: 'bold', color: '#FF4384' }}>89</div>
            <div style={{fontSize: '16px', fontWeight: 'bold', color: '#ffffff3b', marginLeft: '5px' }}>/TOMATO</div>
          </div>        
        </div>
      </div>
      <StyledFoldingBtn>CHART</StyledFoldingBtn>
      <div style={{ marginLeft: '-55px', marginTop: '-60px', position: 'relative', zIndex: 1 }}>
        <Plot   
          data = {[
            {
              x: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7'],
              y: [10, 14, 20, 0, 5, 12, 3],
              type: 'bar',
              marker: {
                color: 'white',                
              },
              hoverinfo: 'none',            
            }
          ]}
          layout={{width: 580, height: 500, paper_bgcolor: '#003164', plot_bgcolor : '#003164', color: 'white', font:{
            color: 'white'
          } }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    missions: state.missions    
  }
};

export default connect(
  mapStateToProps
)(Analytics)