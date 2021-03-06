import React from 'react';
import {inject} from 'mobx-react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';

@inject('appStore')
export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      uid: '',
      pwd: '',
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.appStore.signIn(this.state)
  }
  
  render() {
    if (this.props.appStore.user) {
      return <Redirect to="/" />
    }

    return (
      <LoginForm onSubmit={ (e) => {this.submitForm(e) }}>
        <h3>Login</h3>
        <p>
          <Label name={'uid'}>email</Label>
          <Input type='text' name="uid" onInput={(e) => this.setState({uid: e.target.value})}/>
        </p>
        <p>
          <label htmlFor="uid">password</label>
          <Input type='password' name="pwd" onInput={(e) => this.setState({pwd: e.target.value})}/>
        </p>
        <Button type="submit">Login</Button>
      </LoginForm>
    );
  }
}


const LoginForm = styled.form`
  padding: 1rem;
  margin: 1rem auto;
  max-width: 250px;
  border: 1px solid #ccc;

  label {
    display: block;
    font-size: 0.75rem;
    margin-bottom: 6px;
  }

  > p, h3 {
    margin-bottom: 0.5rem;
  }
`;

