import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.comonent";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // store the state of user in App
    // know if the user has signin or out without manually fetch
    // oAuth allows users to signin with any other 3rd party service that they might have (google, facebook, github)
    // this is open subscribtion (open messaging system between our app and firebase)
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // to check if database has updated at that reference with any new data
        const userRef = await createUserProfileDocument(userAuth);
        // onSnapshot represents the data stored on database
        userRef.onSnapshot((snapshot) => {
          this.setState(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data(),
              },
            },
            () => {
              console.log("state:", this.state);
            }
          );
        });
      } else {
        this.setState({ currentUser: userAuth });
      }

      console.log("currentUser::", userAuth);
    });
  }

  componentWillUnmount() {
    // close the subscribtion
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
