import React from 'react';
import { Route, Switch } from 'react-router-dom';

/** Pages */
import FakeModal from './Pages/FakeModal';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="App" style={{ width: 1280, height: 800, margin: '0 auto', backgroundColor: '#FFEDF7' }}>
       <Switch>
        <Route exact path="/" component={Home} />          
        <Route path="/info" component={FakeModal} />          
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
export default App;
