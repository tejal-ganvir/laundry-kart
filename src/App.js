import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Routes from "./routes";
import store from "./store/store";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import lightBlue from "@material-ui/core/colors/lightBlue";

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
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;
