
exports.login = async function (req, res){
    try{
        let user = mainModule.utils.prepareUserobjectToClient(req.user);
        mainModule.requestUtils.successResponse(res, user,"login");
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"login");
    }  
}

exports.loginAsAGuest = async function (req, res){
    try{
        let guestUser = mainModule.utils.getGuestUser();
        mainModule.requestUtils.successResponse(res, guestUser,"loginAsAGuest");
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"loginAsAGuest");
    }   
}