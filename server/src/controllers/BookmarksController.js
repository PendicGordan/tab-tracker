const {Bookmark, Song} = require('../models')
const _ = require('lodash')

exports.index = async (req, res) => {
		try {
			console.log(req.query)
			//console.log(req.body.params.songId)

			let where = {
				UserId: req.query.userId
			}

			if(req.query.songId) {
				where.SongId = req.query.songId
			}

			const bookmark = await Bookmark.findAll({
				where: where,
				include: [
					{
						model: Song
					}
				]
			})  .map(bookmark => bookmark.toJSON())
				.map(bookmark => _.extend({
					bookmarkId: bookmark.id
				}, bookmark.Song))

			console.log(bookmark)
			res.send(bookmark)
		} catch(err) {
			res.statusCode = 500;
			console.log(err);
			res.send({
				error: 'An error has occured trying to fetch bookmark.'
			})
		}
}

exports.post = async (req, res) => {
	try {
		const bookmark = await Bookmark.create({
			UserId: req.body.params.userId,
			SongId: req.body.params.songId
		})
		res.send(bookmark)
	} catch(err) {
		res.statusCode = 500;
		console.log(err);
		res.send({
			error: 'An error has occured trying to create the bookmark.'
		})
	}
}

exports.delete = async (req, res) => {
	try {
		const {bookmarkId} = req.params

		console.log('-----------> ', req.params)

		const bookmark = await Bookmark.findById(bookmarkId)
		await bookmark.destroy()

		res.send(bookmark)
	} catch(err) {
		res.statusCode = 500;
		console.log(err);
		res.send({
			error: 'An error has occured trying to delete the bookmark.'
		})
	}
}