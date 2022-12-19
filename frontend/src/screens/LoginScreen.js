import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  
  const redirect = window.location.search ? window.location.search.split('=')[1] : '/'
 const navigate= useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin

useEffect(()=>{
    if(userInfo){
        navigate(redirect)
    }
},[navigate, userInfo, redirect])

  const submitHandler =(e) =>{
      e.preventDefault()
      dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
            Sign In
        </Button>
      </Form>
      <Row className="py-3">
          <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
          </Link>
          </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
