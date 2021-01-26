import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Homepage from "./Pages/homepage/Homepage";
import ShopPage from "./Pages/shop/shop";
import Header from "./Component/header/header"
import SignIn from "./Pages/SignIn/SignIn";
import {auth, createUserProfileDocument} from "./Firebase/firebase.utils";
import {setCurrentUser} from "./redux/user/user.actions";

class App extends React.Component {
    unsubscribeFromAuth = null

    componentDidMount() {
        const {setCurrentUser} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }
            else {
                setCurrentUser(userAuth);
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {

        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route path='/signIn' component={SignIn}/>
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps =dispatch=>({
   setCurrentUser: user=>dispatch(setCurrentUser(user))
})
export default connect(null, mapDispatchToProps)(App);
