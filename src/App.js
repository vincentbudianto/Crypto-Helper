import React from "react";
import Particles from "react-particles-js";
import Router from './Components/Routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import { lightTheme, darkTheme } from "./theme";
import { useDarkMode } from "./useDarkMode";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock, faLockOpen, faUnlock, faFile, faFileUpload, faCloudDownloadAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Switch from "./Components/switch";
import './App.css';

library.add(faLock, faLockOpen, faUnlock, faFile, faFileUpload, faCloudDownloadAlt, faTimesCircle);

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  let lineColor = theme === "light" ? "#6B2DBA" : "#3CA9D1";

  if (!componentMounted) {
    return <div/>;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <Particles
        className="particles"
        params={{
          particles: {
            number: {
              value: 150,
            },
            line_linked: {
              shadow: {
                enable: true,
                color: lineColor,
                blur: 3,
              },
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "grab",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
            },
          },
        }}
      />
      <>
        <GlobalStyles />
        <Switch theme={theme} toggleTheme={toggleTheme} />
        <div>
          <BrowserRouter basename="/Crypto-Helper">
            <Router />
          </BrowserRouter>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
