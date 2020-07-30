const Schema = mainModule.mongoose.Schema;

const UserSchema = new Schema({
  firstname:String,
  lastname: String,
  username: String,
  password: String,
  role: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now }
});
UserSchema.methods.validPassword = function( pwd ) {
  return ( this.password === pwd );
};

module.exports = mainModule.mongoose.model("User", UserSchema);
