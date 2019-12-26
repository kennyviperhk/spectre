import React from 'react';
import Routes from './Routes.jsx';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import UserSession from './Components/UserSession/UserSession';
import User from './Components/User/User';
import Keyboardist from 'react-keyboardist';
import blue from '@material-ui/core/colors/blue';
import './App.scss';

const theme = createMuiTheme({
  // silence deprecation warns
  useNextVariants: true,
  palette: {
    primary: blue,
  },
  status: {
    danger: 'orange',
  },
});

const user = new User();

class App extends React.Component {

  next = () => {
    console.log('next', this.props, this.context);
  }

  prev = () => {
    console.log('prev');
  }

  render() {
    return (
      <React.Fragment>
       <Keyboardist
         bindings={{
           Right: this.next,
           Left: this.prev,
         }}
       />
      <UserSession.Provider value={user}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <header className="App-header">
              <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
              <Routes />
            </header>
          </div>
        </MuiThemeProvider>
      </UserSession.Provider>
      </React.Fragment>
    );
  }
}

export default App;
