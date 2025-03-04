import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';

const Signin = () => {
  const [values, setValues] = useState({
    name: '',
    email: 'two@lcod.dev',
    password: '12345',
    error: '',
    success: false,
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, success, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.token) {
          let sessionToken = data.token;
          authenticate(sessionToken, () => {
            console.log('TOKKEN ADDED');
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log('Signin request failed');
      });
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange('email')}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange('password')}
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block mt-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In" description="Welcome to T-Shirt Store">
      {loadingMessage()}
      {signInForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
      {performRedirect()}
    </Base>
  );
};

export default Signin;
