import React, { useContext, useEffect, Fragment } from 'react';
import { Container } from 'reactstrap';
import * as Constants from '../common/constants';
import { store } from '../common/store.js';
import UsersTable from './usersTable'
import UserService from '../services/users.service'
import { Utils } from '../common/utils';
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  let history = useHistory();

  const isUserExists = () =>{
    return globalState.state.user ? true : false;
  }

  const fetchRoles = async () => {
    if(isUserExists()) {
      const myRoles = await UserService.getRoles()
      dispatch({ data: myRoles ,type: Constants.GET_ROLES_ACTION})
    }else {
      Utils.redirectToTarget(history,"/login")
    }
  };

  useEffect (()=>{
    document.body.style.overflow = "auto";
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


  const getPermissionIcon = () => {
    let icon = globalState.state.user.role.icon;
    return  icon ? icon :""
  }

  return (
    <Container className="home-container">
      { isUserExists() && 
        <Fragment>
          <div className="d-flex justify-content-start align-items-center">
            <h1>{Constants.WELCOME_TITLE} {globalState.state.user.username}</h1>
            <div style={{marginLeft:"15px"}}><img height="32" width="32" src={getPermissionIcon()} alt=""/>
            </div>
          </div>
          { globalState.state.roles && 
            <UsersTable permission={globalState.state.user.role.id} roles={globalState.state.roles}></UsersTable>
          }
        </Fragment>
      }
    </Container>
  );
}

export default Home;