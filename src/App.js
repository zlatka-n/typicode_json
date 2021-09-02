import MainPage from "./components/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import "./css/index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users" exact component={MainPage} />
          <Route path="/user/:id" exact component={UserProfile} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
