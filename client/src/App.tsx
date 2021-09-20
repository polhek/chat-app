import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { initialState, userReducer } from './context/reducers';
import { UserProvider } from './context/userContext';

import Home from './pages/Home';
import Login from './pages/Login';
////reducer={userReducer}
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
