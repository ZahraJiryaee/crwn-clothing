import React from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { googleSignInStart } from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  // handlesignInWithGoogle = () => {signInWithGoogle;}

  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className="sign-in">
        <h2>I already have an acconut</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            required
            label="Email"
            value={this.state.email}
            handleChange={this.handleChange}
          />
          <FormInput
            name="password"
            type="password"
            required
            label="Password"
            value={this.state.password}
            handleChange={this.handleChange}
          />

          <div className="buttons">
            <CustomButton type="submit">SIGN IN</CustomButton>
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
});

export default connect(null, mapStateToProps)(SignIn);
