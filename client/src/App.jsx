import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Register from "./components/register/Register";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Alert from "./components/alert/Alert";
import { loadUser } from "./redux/actions/auth";
import Post from "./components/posts/Post";
import PrivateRoute from "./routes/PrivateRoute";
import SinglePost from "./components/posts/SinglePost";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/posts" component={Post} />
              <PrivateRoute exact path="/post/:id" component={SinglePost} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
