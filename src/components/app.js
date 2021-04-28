import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from "./login";
import Home from "./home/home";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Home />
            </Switch>
        </Router>
    )
}
export default App;