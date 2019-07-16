import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

/** Pages */
import FakeModal from './Pages/FakeModal';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import babySound from './assets/musics/baby.mp3';
import defaultSound from './assets/musics/default.mp3'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.audio = React.createRef();
  }

  componentDidUpdate() {
    console.log('cdu')
    if (this.props.missions.find(x => x.selected).time === 0) {
      this.dropTheBeat()
    }
  }
  dropTheBeat = () => {
    this.audio.current.src = this.props.sound.work === 'babySound' ? babySound : defaultSound;
    this.audio.current.play();
  }

  render() {
    const { sound } = this.props
    return (
      <div className="App" style={{ width: 1280, height: 800, margin: '0 auto', backgroundColor: '#FFEDF7' }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/info" component={FakeModal} />
          <Route component={NotFound} />
        </Switch>
        <p>{sound.work}</p>
        <audio ref={this.audio} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    missions: state.missions,
    sound: state.sound,
  }
};

export default connect(
  mapStateToProps
)(App);
