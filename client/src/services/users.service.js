import * as Constants from '../common/constants'
import { Utils } from '../common/utils';

const USERS_API_URL =  Constants.BASIC_URL + Constants.USERS_API_PREFIX;

class UserDataService {

    handleError = (error )=>{
        console.error(error);
        Utils.getToastError(error.toString())
        return undefined;
    }

    getRoles = async () =>{
        try{
            const data = await Utils.getAxios().get(USERS_API_URL+"/roles", 
            { headers: Constants.HTTP_HEADERS});
            return data.data.data;
        } catch (error){
            return this.handleError(error);
        }
    }

    create = async(newUser)=>{
        try{
            const data = await Utils.getAxios().post(USERS_API_URL, newUser, { headers: Constants.HTTP_HEADERS });
            return data.data.data;
        } catch (error){
            return this.handleError(error);
        }
    }
    get = async()=>{
        try{
            const data = await Utils.getAxios().get(USERS_API_URL, { headers: Constants.HTTP_HEADERS });
             return data.data.data;
        } catch (error){
            return this.handleError(error);
        }
    }
    update = async(user)=>{
        try{
            const data = await Utils.getAxios().put(USERS_API_URL, 
                user,
            { headers: Constants.HTTP_HEADERS });
            return data.data;
        }catch (error){
            return this.handleError(error);
        }  
    }
    deleteUsers =  async (users)=>{
        try{
            const data = await Utils.getAxios().post(USERS_API_URL+"/deleteSelectedUsers",users,{ headers: Constants.HTTP_HEADERS });
            return data.data;
        }catch (error){
            return this.handleError(error);
        }
    } 
    deleteAllUsers =  async ()=>{
        try{
            const data = await Utils.getAxios().post(USERS_API_URL+"/deleteAll",{},{ headers: Constants.HTTP_HEADERS });
            return data.data;
        }catch (error){
            return this.handleError(error);
        }
    } 
}


export default new UserDataService();
