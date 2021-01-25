import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Homepage from "./Pages/homepage/Homepage";
import ShopPage from "./Pages/shop/shop";
import Header from "./Component/header/header"
import SignIn from "./Pages/SignIn/SignIn";
import {auth} from "./Firebase/firebase.utils";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null
        };
    }

    unsubscribeFromAuth = null

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({currentUser: user});
            console.log(user);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {

        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route path='/signIn' component={SignIn}/>
                </Switch>
            </div>
        );
    }
}


export default App;
