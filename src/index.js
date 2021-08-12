import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundry from "./components/errorBoundary/errorBoundary";

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundry>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ErrorBoundry>
    </React.StrictMode>,
    document.getElementById("root")
);
