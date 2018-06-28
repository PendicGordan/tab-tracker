const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

//const SALT_FACTOR = bcrypt.genSaltSync(8, () => {  });
async function hashPassword(user, options) {

	if(!user.changed('password')) {
		return;
	}

	return await bcrypt.hash(user.password, bcrypt.genSalt(15, () => {}), null, (err, hash) => {
		user.password = hash;
	})
}

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		email: { type: DataTypes.STRING, unique: true, field: "email" },
		password: { type: DataTypes.STRING, unique: false, field: "password" }
	}, {
		tableName: "Users",
		hooks: {
			beforeCreate: hashPassword
		}
	});

	 User.prototype.comparePassword = function(password) {
		 return new Promise((resolve,reject) => {
			 console.log('Password FRONT-END: ' + password);
			 console.log('Password DB: ' + this.password + '<----');

			 resolve({ isPasswordValid: bcrypt.compareSync(password, this.password)});
		 });
	}

	return User;
}