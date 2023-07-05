import ReactDOM from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import redux from "./state/store";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { GlobalStyle, theme } from "./styles/index";
import { ThemeProvider } from "styled-components";

const { store, persistor } = redux;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const basename = process.env.PUBLIC_URL || '/';

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename={basename}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
