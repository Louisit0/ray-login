import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Link, Route, Switch } from "wouter";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";

const Router = () => (
  <>
    <Switch>
      <Route path="/" component={App} />

      <Route path="/home" component={Home} />

      <Route>404: No such page!</Route>
    </Switch>
  </>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
