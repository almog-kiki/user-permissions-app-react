
import React, { Fragment } from 'react';
import UserDataService from '../services/users.service';
import { Utils } from '../common/utils';
import * as Constants from '../common/constants';
import { FormGroup, Form, Input, Button } from 'reactstrap'


const FORM_USER_FIRSTNAME = "form_user_firstname_id";
const FORM_USER_LASTNAME = "form_user_lastname_id";
const FORM_USER_USERNAME = "form_user_username_id";
const FORM_USER_PASSWORD= "form_user_password_id";
const FORM_USER_ROLE = "form_user_role_id";

export default class UserList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoadingData: true,
            firstname:"",
            lastname:"",
            username:"",
            password:"",
            role_index:"",
        };
    }

    async componentDidMount(){
        this.setState({isLoadingData: false});
    }

    handleOnChangeInput = (event) =>{
        const inputValue = event.target.value;
        switch (event.target.id) {
            case FORM_USER_FIRSTNAME: {
                this.setState({ firstname: inputValue })
                break;
            }
            case FORM_USER_LASTNAME: {
                this.setState({ lastname: inputValue })
                break;
            }
            case FORM_USER_USERNAME: {
                this.setState({ username: inputValue })
                break;
            }
            case FORM_USER_PASSWORD: {
                this.setState({ password: inputValue })
                break;
            }
            case FORM_USER_ROLE: {
                this.setState({ role_index: inputValue })
                break;
            }
            default:
             console.log("default case - no id like that : " + event.target.id)
        }
    }

    handleCreateUser = async () =>{
        this.setState({
            isLoadingData: true,
        }, async () =>{
            const {firstname, lastname, username, password, role_index } = this.state;
            const  newUser = {firstname, lastname, username, password, role_index }
            const savedNewUser = await UserDataService.create(newUser); 
            if(savedNewUser){
                Utils.getToastSuccess(Constants.USER_ADDED_SUCCESSFULLY_TOAST_TITLE)
                this.setState({
                    isLoadingData: false,
                    firstname:"",lastname:"", username:"",password:"",role_index:""
                });
                this.props.handleSaveNewUser(savedNewUser);
            } else{
                this.setState({ isLoadingData: false });
            }
        })
    }

    isFormValidate = ()=>{
        const {firstname, lastname, username, password, role_index } = this.state;
        if(  Utils.isEmptyString(firstname)||
            Utils.isEmptyString(lastname) ||
            Utils.isEmptyString(username) ||
            Utils.isEmptyString(password) ||
            Utils.isEmptyString(role_index) )
        {
           return false;
        }
        return true;
    }

    drawCreateUserForm = () =>{
        const { firstname, lastname, username, password, role_index } = this.state;
        const { roles } = this.props;
        return (
            <Fragment>
                <Form>
                    <FormGroup>
                        <Input
                            value={firstname}
                            type="text"
                            id={FORM_USER_FIRSTNAME}
                            placeholder={Constants.USER_FIRSTNAME_TITLE}
                            onChange={this.handleOnChangeInput}
                            className="form-input"
                            maxLength="100"
                            />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            value={lastname}
                            type="text"
                            id={FORM_USER_LASTNAME}
                            placeholder={Constants.USER_LASTNAME_TITLE}
                            onChange={this.handleOnChangeInput}
                            className="form-input"
                            />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            value={username}
                            type="text"
                            id={FORM_USER_USERNAME}
                            placeholder={Constants.USER_USERNAME_TITLE}
                            onChange={this.handleOnChangeInput}
                            className="form-input"
                            />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            value={password}
                            type="password"
                            id={FORM_USER_PASSWORD}
                            placeholder={Constants.USER_PASSWORD_TITLE}
                            onChange={this.handleOnChangeInput}
                            className="form-input"
                            />
                    </FormGroup>
                    <FormGroup>
                    <Input type="select" name={FORM_USER_ROLE} 
                            id={FORM_USER_ROLE}
                            onChange={this.handleOnChangeInput}
                            value={role_index}>
                            <option value="-1"> {Constants.USER_ROLE_TITLE}</option>
                            { 
                                roles.map((aRole, index)=>{
                                    return <option value={aRole.index} key={'role'+index} >{aRole.name}</option>
                                })
                            }
                        </Input>
                    </FormGroup>
                    <div className="d-flex justify-content-end">
                        <Button style={{width:"130px"}}
                                color="info"
                                disabled={!this.isFormValidate()}
                                onClick={this.handleCreateUser}>
                            {Constants.ADD}
                        </Button>
                    </div>
                   
                </Form>
            </Fragment>
        )
    }

    render(){
        const { isLoadingData } = this.state;
        return (
            <div className="users-container">
                { isLoadingData  && Utils.drawSpinner() }
                { !isLoadingData && this.drawCreateUserForm() }
            </div>
        )
    }

}