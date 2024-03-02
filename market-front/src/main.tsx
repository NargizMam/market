import ReactDOM from 'react-dom/client'
import {ThemeProvider} from "@mui/material";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import {BrowserRouter} from "react-router-dom";
import theme from "./theme.ts";
import App from './App.tsx'
import {persistor, store} from "./app/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>)
