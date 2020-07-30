
import * as Constants from '../common/constants'
import { Utils } from '../common/utils';
const LOGIN_API_URL =  Constants.BASIC_URL + Constants.LOGIN_API_PREFIX;

class LoginService {
   
    handleError =(error)=>{
        console.error(error);
        return undefined;
    }

    handleLogin = async(user, url) =>{
        try{
            const data = await Utils.getAxios().post(url, user, { headers: Constants.HTTP_HEADERS });
            return data.data.data;
        } catch (error){
            return this.handleError(error);
        }
    } 

    login = async(user) =>{
       return await this.handleLogin(user,LOGIN_API_URL);
    }

    loginAsAGuest = async(user) =>{
        return await this.handleLogin(user,LOGIN_API_URL +"/guest");
    }
}


export default new LoginService();
