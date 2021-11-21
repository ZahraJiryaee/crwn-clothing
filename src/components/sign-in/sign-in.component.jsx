import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
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

          <CustomButton type="submit">Submit Form</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignIn;
