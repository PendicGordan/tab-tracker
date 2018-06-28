const {User} = require('../models')
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignUser(user) {
	const ONE_WEEK = 60*60*24*7;

	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	});
}

exports.register = async function(req, res) {
	console.log(req.body.email)
	try {
		const user = await User.create(req.body)
		res.send({user: user.toJSON()})
	} catch(err) {
		res.statusCode = 400;
		console.log(err)
		res.send({
			error: 'This email account is already in use.'
		})
	}
}

exports.login = async function(req, res) {
	console.log(req.body.email)
	try {
		const {email, password} = req.body
		const user = await User.findOne({
			where: {
				email: email
			}
		})
		if(!user) {
			return res.status(403).send({
				error: 'The login information was incorrect'
			})
		}
		let answer = await user.comparePassword(password);
		console.log(answer);

		//console.log(isPasswordValid);
		//const isPasswordInvalid =
		if(!answer.isPasswordValid) {
			return res.status(403).send({
				error: 'The login information was incorrect'
			})
		}
		res.send({
			user: user.toJSON(),
			token: jwtSignUser(user.toJSON())
		})

	} catch(err) {
		res.statusCode = 500;
		console.log(err);
		res.send({
			error: 'An error has occured trying to log in.'
		})
	}
}