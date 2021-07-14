import React from 'react';
import GlobalStyle from './globalStyles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Works from './pages/Works/Works';
import Tools from './pages/Tools/Tools';
import CTMap from './pages/Tools/CTC/CombinationToneMap'
import Blog from './pages/Blog/Blog';
import ScrollToTop from './components/ScrollToTop';
import { Navbar, Footer } from './components';
import Store from './pages/Tools/CTC/CombinationToneMap.context';



// Create Audio Context
// Audio Context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

export const AudioReactContext = React.createContext(audioContext);

function App() {
  

  return (

    <Store>
      <Router>
        <GlobalStyle />
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/works' exact component={Works} />
          <Route path='/tools' exact component={Tools} />
          <Route path='/tools/CTC' exact component={CTMap } />
          <Route path='/blog' exact component={Blog} />
        </Switch>
      </Router>
    </Store>
  );
}

export default App;
