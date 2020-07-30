export const HTTP_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}   
export const USERS_API_PREFIX = '/api/v1/users';
export const LOGIN_API_PREFIX = '/api/v1/login';
export const GET_ROLES_ACTION = "ROLES";
export const LOGIN_SUCCESSFUL_ACTION = "LOGIN_SUCCESSFUL_ACTION";
export const LOGINOUT_ACTION = "LOGINOUT_ACTION"
export const LOGIN_UNSCCESSFUL_ACTION="username and/or password is incorrect";
export const APP_NAME = "Users App";

export const WELCOME_TITLE = "Welcome";
export const NOT_AUTHRIZED_USER_TITLE = "Not Authrized User";

export const USER_LIST_TITLE = "User List"
export const ADD_USER_TITLE = "Add User"

export const SEARCH_USER_PLACEHOLDER = "Search User (by firstname, lastname, username etc...)";

export const DELETE_BUTTON_TITLE = "Delete";
export const DELETE_USERS_TITLE = "Delete Users";
export const DELETE_USER_TITLE = "Delete User";

export const ARE_YOU_SURE_YOU_WANT_TO_DELETE_THOS_USERS = "Are you sure you want to delete those users?";
export const ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_USER= "Are you sure you want to delete the user?";


export const USER_FIRSTNAME_TITLE = "Firstname"
export const USER_LASTNAME_TITLE = "Lastname"
export const USER_USERNAME_TITLE = "Username"
export const USER_PASSWORD_TITLE = "password"
export const USER_ROLE_TITLE = "Role"

export const REMOVE_ALL_TITLE = "Remove All";
export const LOGIN_TITLE = "Login"

export const LOG_IN_AS_A_GUEST = "Log in as a guest";

export const USER_ADDED_SUCCESSFULLY_TOAST_TITLE = "User added successfully";
export const USER_ADDED_FAILED_TOAST_TITLE = "Create new user failed";
export const USERS_DELETED_SUCCESSFULLY_TOAST_TITLE="User/s remove successfully"

export const SEARCH_TITLE = "Search"

export const ADD = "Add"
export const CANCEL_BUTTON_TITLE= "Cancel";
export const CONFIRM_BUTTON_TITLE= "Confirm";
export const SEARCH = "Search"
export const NO_SEARCH_RESULT = "No search result";

export const USERNAME_REQUIRED_VALIDATION = "Username is required.";
export const USERNAME_LENGTH_VALIDATION   = "Username must be at least 4 characters long.";
export const PASSWORD_REQUIRED_VALIDATION = "password is required.";
export const PASSWORD_LENGTH_VALIDATION   = "password must be at least 4 characters long.";


export let BASIC_URL   = "http://localhost:5000"

//console.log("procces.env.NODE_ENV: " + process.env.NODE_ENV)
// if(process.env.NODE_ENV){
//   BASIC_URL   = "http://localhost:8080"
// }


export const toastStyle= {
    toastText: {
      fontSize: "30px",
      lineHeight:"30px",
      color:"#FFF"
    },
    toastIcon:{
      paddingRight:"20px",
      paddingLeft:"0"
    },
  }