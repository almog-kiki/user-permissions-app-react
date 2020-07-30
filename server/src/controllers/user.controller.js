const UserModel = require('../models/user.model');

exports.getRoles = async function(req, res){
    try{
        let roles = mainModule.utils.clone(mainModule.constants.ROLES);
        roles.pop();
        mainModule.requestUtils.successResponse(res, roles, "getRoles");
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"getRoles")
    } 
}

exports.get = async function (req, res){
    try{
        const userObjectId = mainModule.utils.getObjectId(req.params.id);
        const user = await UserModel.findById(userObjectId, mainModule.utils.getDefaultUserProjection());
        mainModule.requestUtils.successResponse(res, user, "get User ");
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"get User")
    }   
}

exports.getAll = async function (req, res){
    try{
        let users = await UserModel.find({}, mainModule.utils.getDefaultUserProjection());
        users = mainModule.utils.clone(users)
        users.forEach(user =>user.role_name = user.role.name)
        const tableData = mainModule.utils.prepareUsersTableObject(users);
        mainModule.requestUtils.successResponse(res, tableData, "get all Users ");
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"getAll" )
    }   
}


exports.update = async function (req, res){
    try{
        const updateUser = req.body;
        let currUser  = await UserModel.findById(updateUser._id, mainModule.utils.getDefaultUserProjection())
        let savedUser = await mainModule.utils.saveModelChanges(currUser, updateUser)
        savedUser = mainModule.utils.prepareUserobjectToClient(savedUser);
        mainModule.requestUtils.successResponse(res, savedUser, "user updated")
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"create")
    }   
}

exports.create = async function (req, res){
    try{
        const {firstname, lastname, username, password, role_index} = req.body;
        let user = new UserModel({ 
                firstname: firstname,
                lastname: lastname,
                username: username, 
                password: password,
                role: mainModule.constants.ROLES[role_index] });
        let savedUser = mainModule.utils.clone(await user.save());
        savedUser.role_name = savedUser.role.name;
        user = mainModule.utils.prepareUserobjectToClient(savedUser);
        mainModule.requestUtils.successResponse(res, user, "New user created ")
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"create")
    }   
}

exports.deleteAll = async function (req, res){
    try{
        let result = await UserModel.deleteMany({"username":{$nin:["Administrator"]}})
        mainModule.requestUtils.successResponse(res, result,"All users deleted except Administrator")
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"deleteAll")
    }   
}

exports.deleteUsers = async function (req, res){
    try{
        let users = req.body;
        let deletedUsers = []
        users.forEach(userId=>{
            deletedUsers.push( mainModule.utils.getObjectId(userId))
        })
        let result = await UserModel.deleteMany({"_id": { $in: deletedUsers}, "username":{$nin:["Administrator"]}});
        mainModule.requestUtils.successResponse(res, result,"selected users deleted except Administrator")
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"deleteAll")
    }   
}