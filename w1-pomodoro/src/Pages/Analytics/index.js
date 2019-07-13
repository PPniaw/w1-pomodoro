import React from 'react';
import { connect } from 'react-redux'

function Analytics(props) {
  console.log(props.missions)
  return (
    <>
      <h1>A</h1>
    </>
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