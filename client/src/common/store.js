import React, {createContext, useReducer} from 'react';
import * as Constants from '../common/constants';

const initialState = {
  isAuthenticated: false,
  user: null,
  roles: null
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {

  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case Constants.LOGIN_SUCCESSFUL_ACTION:{
        const newState = {...state, isAuthenticated:true, user: action.data};
        return newState;
      }
      case Constants.GET_ROLES_ACTION:{
        const newState = {...state, roles: action.data};
        return newState;
      }
      case Constants.LOGINOUT_ACTION:{
        const newState = {...state, isAuthenticated:false, user: null};
        return newState;
      }
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }