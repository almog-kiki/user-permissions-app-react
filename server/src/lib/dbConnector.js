const { DB_URI } = require("../config");

establishDBConnection = async()=> {
  const mongoose = mainModule.mongoose;

  mongoose.connect(DB_URI, {  useNewUrlParser: true , useCreateIndex: true,useFindAndModify: false,useUnifiedTopology: true});
  let db = mongoose.connection;

  db.once('open', async () => {
    mainModule.utils.log('connected to the database')
    if (!await mainModule.utils.createDefaultAdminUser()){
      throw "ERROR : No admin user"
    }
  });

  db.on('error', (error)=>{
    mainModule.utils.log('MongoDB connection error: ' + error);
    console.error.bind(console, 'MongoDB connection error:')(error);
  });

  return db;
}

module.exports = {
  establishDBConnection: establishDBConnection
};