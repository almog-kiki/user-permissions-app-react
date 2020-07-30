
const USERS_SERVICE = '/api/v1/users';
const LOGIN_SERVICE = '/api/v1/login';
const user = require('../routes/user.route');
const login = require('../routes/login.route');
const UserModel = require('../models/user.model');

module.exports = {
    usingMiddlewares(app) {
        app.use(mainModule.cors());
        app.use(mainModule.express.static('public'))

        app.use(mainModule.expressSession({ 
            secret: "cats2",
            resave: false,
            saveUninitialized: true,
            proxy: true  ,
            cookie: { secure: true, httpOnly: false, maxAge: 600000 }
         }));

      
        app.use(mainModule.express.urlencoded({ extended: true }))
        app.use(mainModule.express.json()); 

        app.use(mainModule.passport.initialize());
        app.use(mainModule.passport.session());

        mainModule.passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
          
        mainModule. passport.deserializeUser(function(id, done) {
            UserModel.findById(id, function(err, user) {
                done(err, user);
            });
        });    

        app.use(LOGIN_SERVICE, login);
        app.use(USERS_SERVICE, mainModule.requestUtils.isUserLoggedIn, user);
    }
};