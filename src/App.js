import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Homepage from "./Pages/homepage/Homepage";
import ShopPage from "./Pages/shop/shop";
import Header from "./Component/header/header"
import SignIn from "./Pages/SignIn/SignIn";
import {auth, createUserProfileDocument} from "./Firebase/firebase.utils";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null
        };
    }

    unsubscribeFromAuth = null

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    this.setState({
                            currentUser: {
                                id: snapShot.id,
                                ...snapShot.data()
                            }
                        }
                    );
                    console.log(this.state);
                });
            } else {
                this.setState({currentUser: userAuth});
            }
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
