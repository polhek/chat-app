import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { initialState } from './context/reducers';
import { UserProvider } from './context/userContext';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <UserProvider initialState={initialState}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
