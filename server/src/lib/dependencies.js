
module.exports = {
    requireDependencies() {
        mainModule.mongo = require('mongodb');
        mainModule.mongoose = require('mongoose');
        mainModule.express = require('express');
        mainModule.expressSession =  require('express-session');
        mainModule.app = mainModule.express();
        mainModule.bodyParser = require('body-parser');
        mainModule.passport = require('passport');
        mainModule.LocalStrategy = require('passport-local').Strategy;

        mainModule.cors = require('cors');
        mainModule.utils = require('./utils');
        mainModule.requestUtils = require('./requestUtils');
        mainModule.constants = require('./constants');

        mainModule.passport.use(new mainModule.LocalStrategy(
            async function(username, password, done) {
                const UserModel = require('../models/user.model');
                let user = await UserModel.findOne({ username: username })
                if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
                }
                  if (!user.validPassword(password)) {
                  return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            }
          ));
    }
};