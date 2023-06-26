import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const nav = useNavigate();

  const [user, setUser] = useState({
    userEmail: "",
    userPassword: ""
  });

  const [flag , setFlag] = useState(0);

  function handleChange(event) {
    const { name, value } = event.target;

    setUser(prevValue => {
      return {
        ...prevValue, [name]: value
      }
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(user);

    const data = {
      username: user.userEmail,
      password: user.userPassword
    };

    await axios.post('http://localhost:5000/signin', data)
      .then((response) => {
        console.log(response);
        if (response.status === 200)
        {
          setFlag(2);
          console.log(response.data);
          localStorage.setItem('id',response.data.id);
          localStorage.setItem('accessToken',response.data.accessToken);
          localStorage.setItem('signature',response.data.signature);
          var check = false;
          response.data.roles.forEach(element => {
            if(element === "ROLE_ADMIN") check = true;
          });
          if(check) localStorage.setItem('role','admin');
          setTimeout(() => {
            nav('/');
          }, 1500);    
        }
          
        else{
          setFlag(1);
          setTimeout(() => {
            window.location.reload(false);
          }, 1500);
          
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group ">
          <label for="exampleInputEmail1">Username</label>
          <input onChange={handleChange} value={user.userEmail} name="userEmail" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input onChange={handleChange} value={user.userPassword} name="userPassword" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div class="form-group">
          <p>New User? <a href="/register">Register</a></p>
        </div>
        <button type="submit" class="btn btn-secondary">Submit</button>
      </form>
      {flag===1 && <div className="container">
        <div class="alert alert-danger container " role="alert">
          Login attempt failed!!!
        </div>
      </div>}
      {flag===2 && <div className="container">
        <div class="alert alert-success container " role="alert">
          Login attempt Successful!!!
        </div>
      </div>}
    </div>
  );
}

export default Login;