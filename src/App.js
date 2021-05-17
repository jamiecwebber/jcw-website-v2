import React from 'react';
import GlobalStyle from './globalStyles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Works from './pages/Works/Works';
import Tools from './pages/Tools/Tools';
import CTC from './pages/Tools/CTC/CombinationToneCalculator'
import Blog from './pages/Blog/Blog';
import ScrollToTop from './components/ScrollToTop';
import { Navbar, Footer } from './components';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/works' exact component={Works} />
        <Route path='/tools' exact component={Tools} />
        <Route path='/tools/CTC' exact component={CTC } />
        <Route path='/blog' exact component={Blog} />
      </Switch>
    </Router>
  );
}

export default App;
