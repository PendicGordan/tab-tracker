const {Bookmark, Song} = require('../models')
const _ = require('lodash')

exports.index = async (req, res) => {
		try {
		    const userId = req.user.id

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
			UserId: req.user.id,
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

	    const userId = req.user.id
		const {bookmarkId} = req.params

		console.log('-----------> ', req.params)

		const bookmark = await Bookmark.findOne({
            where: {
                id: bookmarkId,
                UserId: userId
            }
        })

        if(!bookmark) {
	        return res.status(403).send({
                error: 'You do not have access to this bookmark'
            })
        }
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