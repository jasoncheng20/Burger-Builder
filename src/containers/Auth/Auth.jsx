import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";
import classes from "./Auth.module.css";
import * as actionTypes from "../../store/actions";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        typed: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        typed: false,
      },
    },
    isSignup: true,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  inputChangedHander = (e, field) => {
    // create clones
    const updatedForm = { ...this.state.controls };
    const updatedField = updatedForm[field];
    // update clones without mutating original while checking validity
    updatedField.value = e.target.value;
    updatedField.valid = this.checkValidity(
      updatedField.value,
      updatedField.validation
    );
    updatedField.typed = true;
    updatedForm[field] = updatedField;
    // check validation of whole form
    let formIsValid = true;
    for (let field in this.state.controls) {
      formIsValid = this.state.controls[field].valid && formIsValid;
    }
    // set state
    this.setState({ controls: updatedForm });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { email, password } = this.state.controls;
    this.props.auth(email.value, password.value, this.state.isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formfields = [];
    for (let field in this.state.controls) {
      formfields.push(field);
    }
    let form = formfields.map((field) => (
      <Input
        key={field}
        value={this.state.controls[field].value}
        elementConfig={this.state.controls[field].elementConfig}
        elementType={this.state.controls[field].elementType}
        changed={(e) => this.inputChangedHander(e, field)}
        invalid={!this.state.controls[field].valid}
        shouldValidate={this.state.controls[field].validation}
        typed={this.state.controls[field].typed}
      />
    ));
    let errorMessage = null;

    if (this.props.loading) {
      form = <Spinner />;
    }
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.AuthForm}>
        <form onSubmit={this.submitHandler}>
          {errorMessage}
          {form}
          <Button btnType="Success">
            Sign {this.state.isSignup ? "Up!" : "In!"}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          {this.state.isSignup
            ? "Log In as Existing User"
            : "Create an Account"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password) => dispatch(actionTypes.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
