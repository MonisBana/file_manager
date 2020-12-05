import "./App.css";
import { HashRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Routes from "./Routes";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Routes />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
