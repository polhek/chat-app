import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { initialState } from './context/reducers';
import { SocketProvider } from './context/SocketProvider';
import { UserProvider } from './context/userContext';
import { UsersProvider } from './context/UsersProvider';
import Chat from './pages/Chat';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <SocketProvider>
      <UsersProvider>
        <UserProvider initialState={initialState}>
          <Router>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/chat/:userName" component={Chat} />
            </Switch>
          </Router>
        </UserProvider>
      </UsersProvider>
    </SocketProvider>
  );
}

export default App;
