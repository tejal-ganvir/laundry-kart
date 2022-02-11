import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from "./routes";
import store from "./store/store";

import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {

  const THEME = createTheme({
    typography: {
     "fontFamily": `"Nunito", "Arial", sans-serif`,
     "fontSize": 13,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    },
    palette: {
      primary: {
        light: '#f75daf',
        main: '#ec0883',
        dark: '#b60563',
        contrastText: '#fff',
      },
      secondary: {
        light: '#a474f1',
        main: '#7620FF',
        dark: '#4807af',
        contrastText: '#fff',
      },
    },
 });

  return (
    <ThemeProvider theme={THEME}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
