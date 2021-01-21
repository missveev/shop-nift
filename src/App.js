import './App.css';
import {Switch, Route} from 'react-router-dom';
import Homepage from "./Pages/homepage/Homepage";
import ShopPage from "./Pages/shop/shop";

function App() {
  return (
    <div>
        <Switch>
        <Route  exact path='/' component={Homepage} />
        <Route  path='/shop' component={ShopPage} />
        </Switch>
        </div>
  );
}

export default App;
