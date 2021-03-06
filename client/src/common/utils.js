import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorNotifcation from './ErrorNotifcation'
import SuccessNotifcation from './SuccessNotifcation'
export const Utils = {
    getAxios:()=>{
        let axiosClient = axios.create();
        axiosClient.defaults.timeout = 2000 * 10; //20 second
        return axiosClient;
    },
    drawSpinner: () => {
        return (
            <div key={"LOADER_KEY"} className="d-flex justify-content-center align-items-center" style={{minHeight:"100px"}}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    },
    redirectToTarget: (history, path) => {
        history.push(path);
    },
    clone:(obj)=>{
        return JSON.parse(JSON.stringify(obj))
    },
    isEmptyString: (str)=>{
        return str === undefined || str === null  || str === ""
    },
    getToastError:(text) =>{
        return toast.error(<ErrorNotifcation text={text}/>,{});
    },
    getToastSuccess:(text) =>{
        return toast.success(<SuccessNotifcation text={text}/>,{});
    },
    isNotAuthrizedUser:(permission)=>{
        return permission === "not_authorized";
    },
    isAdministrator: (permission)=>{
        return permission === "admin";
    },
    isViewOnly:(permission)=>{
        return permission === "regular";
    }
    
  
}