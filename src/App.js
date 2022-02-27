import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-toastify/dist/ReactToastify.css';
import Routes from "./routes";
import store from "./store/store";
import theme from "./assets/theme";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import './App.css';

Sentry.init({
  dsn: "https://11473b9dc08e489f9dde77ec2922d801@o1153691.ingest.sentry.io/6233262",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function App() {

  return (
    <ThemeProvider theme={theme}>
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
