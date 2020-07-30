
mainModule = this;
require('./src/lib/dependencies').requireDependencies();
mainModule.db = require('./src/lib/dbConnector').establishDBConnection(); 

let PORT = 5000;

function startServer() {
  let app = mainModule.app;
  require('./src/lib/middlewares').usingMiddlewares(app);
  
  app.listen(PORT, () => {
    console.log(" running on localhost:" + PORT);
    console.log("--------------------------");
  });
}

startServer();


process.on('unhandledRejection', (reason, p) =>
console.error('Unhandled Rejection at: Promise ', p, reason)
);

process.on('uncaughtException', async (error)=>{
  console.log("uncaughtException ", error)
  process.exit(0)
});

process.on('SIGINT', async ()=>{
  console.log("SIGINT")
  process.exit(0)
});

process.on('SIGTERM', async ()=>{
  console.log("SIGTERM")
  process.exit(0)
});