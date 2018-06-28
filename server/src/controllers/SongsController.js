const {Song} = require('../models')

exports.post = async function(req, res) {
	try {
		const song = await Song.create(req.body)
		res.send(song)
	} catch(err) {
		res.statusCode = 500;
		console.log(err);
		res.send({
			error: 'An error has occured trying to create a song.'
		})
	}
}

exports.index = async function(req, res) {
	try {
		let songs = null;
		const search = req.query.search

		if(search != undefined) {
			songs = await Song.findAll({
				where: {
					$or: [
						'title', 'artist', 'genre', 'album'
					].map(key => ({
						[key]: {
							$like: `%${search}%`,
						}
					}))
				}
			})
			console.log(songs)
			res.send(songs)
		} else {
			songs = await Song.findAll({
				limit: 10
			})
			res.send(songs)
		}
	} catch(err) {
		res.statusCode = 500;
		console.log(err);
		res.send({
			error: 'An error has occured trying to fetch songs.'
		})
	}
}


exports.show = async function(req, res) {
	try {
		const song = await Song.findById(req.params.songId)
		console.log(song)
		res.send(song)
	} catch(err) {
		res.statusCode = 500;
		console.log(err);
		res.send({
			error: 'An error has occured trying to fetch the song.'
		})
	}
}

exports.put = async function(req, res) {
	try {
		const song = await Song.update(req.body, {
			where: {
				id: req.params.songId
			}
		})
		console.log(song)
		res.send(song)
	} catch(err) {
		res.statusCode = 500;
		console.log(err);
		res.send({
			error: 'An error has occured trying to fetch the song.'
		})
	}
}