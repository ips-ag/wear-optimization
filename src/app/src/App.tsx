import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MainLayout from './laytouts/MainLayout';
import Home from './pages/Home';
import Main from './pages/Main';

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/">
          <MainLayout>
            <Home />
          </MainLayout>
        </Route>
        <Route path="/main">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
