const {History, Song} = require('../models')
const _ = require('lodash')

exports.index = async (req, res) => {
		try {
			console.log(req.query)
			//console.log(req.body.params.songId)

			let where = {
				UserId: req.query.userId
			}

			const histories = await History.findAll({
				where: where,
				include: [
					{
						model: Song
					}
				]
			})  .map(history => history.toJSON())
				.map(history => _.extend({
                    historyId: history.id
				}, history.Song))

			console.log(histories)
			res.send(histories) // _.uniq(histories)
		} catch(err) {
			res.statusCode = 500;
			console.log(err);
			res.send({
				error: 'An error has occured trying to fetch history.'
			})
		}
}

exports.post = async (req, res) => {
	try {
		const histories = await History.create({
			UserId: req.body.params.userId,
			SongId: req.body.params.songId
		})
		res.send(histories)
	} catch(err) {
		res.statusCode = 500;
		console.log(err);
		res.send({
			error: 'An error has occured trying to create the history object.'
		})
	}
}