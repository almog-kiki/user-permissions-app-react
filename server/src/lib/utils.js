const UserModel = require('../models/user.model');

const clone =(obj)=>{
    return JSON.parse(JSON.stringify(obj));
}

const getObjectId = (id) =>{
    if (id){
        id = mainModule.mongo.ObjectID(id);
    }
    return id;
}

const getDefaultUserProjection = () =>{
    return {
        createdAt: false,
        updatedAt:false,
        password:false,
        __v: false
    };
}

const isLessThen10 =(number)=>{
    return number<10;
}

const addZeroIfNeeded =(number)=>{
    if(isLessThen10(number)) 
    {
        number ='0'+ number;
    }
    return number;
}

 const getDateDisplay=(date)=>{
    let dd = addZeroIfNeeded(date.getDate());
    let mm = addZeroIfNeeded(date.getMonth()+1);
    let hour = addZeroIfNeeded(date.getHours());
    let minutes = addZeroIfNeeded(date.getMinutes());

    const formatedDay = dd + "/" + mm + "/"+ date.getFullYear();
    const formatedHour = hour + ":" + minutes;
    return formatedDay + " - " + formatedHour;
}

 const log = (str) =>{
    let logMsg = getDateDisplay(new Date()) + ` ----   ` + str;
    console.log(logMsg);
}

const getGuestUser = () =>{
    const role = mainModule.constants.ROLES[2];
    return {
        _id: role.id,
        username: role.name,
        role: role
    }
}

const getAdminUserDefault = ()=>{
    const role = mainModule.constants.ROLES[0];
    return {
        firstname:"admin",
        lastname:"admin",
        username: role.name,
        password:"123",
        role:  role
    }
}
const isDefaultAdminExists = async () =>{
    const adminUser = await UserModel.findOne(getAdminUserDefault())
    return adminUser !== null;
}

const createDefaultAdminUser = async () =>{
    try{
        if( !await isDefaultAdminExists())
        {
            let defaultAdmin = await new UserModel(getAdminUserDefault());
            await defaultAdmin.save()
            mainModule.utils.log("Created admin user successful");
        } else{
            mainModule.utils.log("admin user aleady exists");
        }
        return true;
    } catch(error){
        mainModule.utils.log("cannot create admin user  - " + error.stack);
        return false;
    }
}

const prepareUserobjectToClient = (userFromDb) =>{
    let user = JSON.parse(JSON.stringify(userFromDb));
    delete user.password;
    delete user.__v;
    return user;
}

const headerSortingStyle = { backgroundColor: '#6D6D6D' };
const prepareUsersTableObject = (users) =>{
    let columns = [
        {
            dataField: 'id',
            text: '',
            sort: true,
            hidden: true
          }, {
            dataField: 'firstname',
            text:"Firstname",
            sort: true,
            headerSortingStyle
          }, {
            dataField: 'lastname',
            text: "Lastname",
            sort: true,
            headerSortingStyle
          },
          {
            dataField: 'username',
            text: "Username",
            sort: true,
            headerSortingStyle
          },
          {
            dataField: 'role_name',
            text: "Role",
            sort: true,
            editable: false,
            headerSortingStyle
          }
    ];

    return {
        columns,
        roleNameIndex:4,
        order:'desc',
        keyFieldID:'_id',
        data: users
    }

}

const saveModelChanges = async(model, data) => {
    Object.keys(data).forEach((key) => {
        if (key !== "_id" && key !== "__v") {
            model[key] = data[key];
        }
    });
    return await model.save();
}

module.exports = {
    log: log,
    createDefaultAdminUser: createDefaultAdminUser,
    getObjectId: getObjectId,
    getDefaultUserProjection:getDefaultUserProjection,
    prepareUserobjectToClient:prepareUserobjectToClient,
    getGuestUser:getGuestUser,
    clone:clone,
    prepareUsersTableObject:prepareUsersTableObject,
    saveModelChanges:saveModelChanges
}