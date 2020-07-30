
import React, { useState,useContext,useEffect, Fragment } from 'react';
import * as Constants from '../common/constants';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faLock } from '@fortawesome/free-solid-svg-icons'
import {Utils} from '../common/utils'
import { store } from '../common/store.js';
import LoginService from '../services/login.service'
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const globalState = useContext(store);
    const { dispatch } = globalState;
    let history = useHistory();
    const [user, setUser] = useState({username:"", password:""})
    const [isLoading, setIsLoading] = useState(false)
  
    useEffect(() => {
        document.body.style.overflow = "hidden";
        dispatch({ data: {} ,type: Constants.LOGIN_SUCCESSFUL_ACTION })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleInputChange = (event) => {
        event.persist();
        setUser((prevState) => ({
           ...prevState,
           [event.target.id]: event.target.value
        }));
    }

    const handleLoginAction = async(isGuest) => {
        setIsLoading(true);
        let result = undefined;
        if(isGuest){
            result = await LoginService.loginAsAGuest(user);
        } else{
            result = await LoginService.login(user);
        }

        if(result){
            dispatch({ data: result ,type: Constants.LOGIN_SUCCESSFUL_ACTION })
            Utils.redirectToTarget(history,"/");
        } else {
            Utils.getToastError(Constants.LOGIN_UNSCCESSFUL_ACTION)
        }
    }

    const isFormEmpty = () =>{
        return  Utils.isEmptyString(user.username) || Utils.isEmptyString(user.password)
    }

    return (
        <Fragment>
            {isLoading && Utils.drawSpinner()}
            { !isLoading &&
                <Container>
                    <Row className="justify-content-center mt-5">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form>
                                            <div className="mb-4">
                                                <h1>{Constants.LOGIN_TITLE}</h1>
                                            </div>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText> <FontAwesomeIcon icon={faUser}/></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" required value={user.username} 
                                                        onChange={(event)=>handleInputChange(event)} 
                                                        placeholder="Username"
                                                        id="username" 
                                                        autoComplete="username" />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText> <FontAwesomeIcon icon={faLock}/> </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" required
                                                    id="password" 
                                                    value={user.password} 
                                                    onChange={(event)=>handleInputChange(event)} 
                                                    placeholder="Password" autoComplete="current-password" />
                                            </InputGroup>
                                            <InputGroup className="mt-4 d-flex justify-content-end">
                                                    <Button 
                                                        disabled={isFormEmpty()}
                                                        onClick={()=>handleLoginAction(false)} color="info" className='px-4'>Login
                                                        <span className={(isLoading ? ' fa fa-spinner fa-spin fa-1x' : '')} ></span>
                                                    </Button>
                                            </InputGroup>
                                            <InputGroup className="mt-2 d-flex justify-content-center">
                                            <button  className="login-as-a-guest" type="button" onClick={()=>handleLoginAction(true)}>
                                                { Constants.LOG_IN_AS_A_GUEST }
                                            </button>
                                            </InputGroup>
                                            
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            }
            <div className="bg"></div>
        </Fragment>
    )
}  
export default Login;
