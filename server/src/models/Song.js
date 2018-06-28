

module.exports = (sequelize, DataTypes) => {
	const Song = sequelize.define('Song', {
		title: { type: DataTypes.STRING, unique: true, field: "title" },
		artist: { type: DataTypes.STRING, unique: false, field: "artist" },
		genre: { type: DataTypes.STRING, unique: false, field: "genre" },
		album: { type: DataTypes.STRING, unique: false, field: "album" },
		albumImage: { type: DataTypes.STRING, unique: false, field: "albumImage" },
		youtubeId: { type: DataTypes.STRING, unique: true, field: "youtubeId" },
		lyrics: { type: DataTypes.TEXT, unique: false, field: "lyrics" },
		tab: { type: DataTypes.TEXT, unique: false, field: "tab" }
	}, {
		tableName: "Songs",
		hooks: {

		}
	});

	return Song;
}