import React from "react";
import styled from "styled-components";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";


function Login(props) {
  console.log(props);
  const [form, setForm] = React.useState({
    //sets state of the form to empty fields
    username: "", //user name is Nil
    password: "", //password is Nil
  });
  const validateForm = () => {
    let username = form.username;
    if (username.length < 5) {
      alert("Longer username needed");
    }
  };
  // const [userError, setUserError] = useState();

  const login = (e) => {
    validateForm();
    e.preventDefault(); //method stops the default action of an element from happening. For example: Prevent a submit button from submitting a form.
    //props.login(form);////

    axios
      .post()
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setForm({
          username: "",
          password: "",
        });
        props.history.push("/dashboard");
      })
      .catch()
      .finally(() => {
        // tools.setSubmitting(false);
      });
  };

  const handleChanges = (e) => {
    //event object
    setForm({ ...form, [e.target.name]: e.target.value }); //uses the spread operator to update the keys on our state object. It changes the value of username or pw one key at a time.
  };

  return (
    <div textAlign="center">
      <Link to="/signup">Sign up</Link>
      <DivStyle>
        <FormDiv>
          <HeaderStyle>Log In</HeaderStyle>

          <form onSubmit={login}>
            {" "}
            {/* onsubmit calls the method login  */}
            <div className="ui fluid input">
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChanges}
                placeholder="UserName"
                required
              />
            </div>
            <div className="ui fluid input">
              <input
                name="password" //input name
                type="password" //input type
                value={form.password} //the value of the input
                onChange={handleChanges} //anytime the field changes it will call handlechanges which uses a method to input each keystroke
                placeholder="Password" //input placeholder
                required
              />
            </div>
            <Button style={buttonStyle} type="submit" fluid>
              Log In
            </Button>
          </form>
        </FormDiv>
      </DivStyle>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state,
    userInfo: { ...state.userInfo },
  };
}

const mapDispatchToProps = {
  //signin,
  //getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
