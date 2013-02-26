function Song(artist, album, title, genre) {
	this.artist = artist;
	this.album = album;
	this.title = title;
	this.genre = genre;
}

var musicLibrary = {
	songs : [
		new Song("Maroon 5", "Overexposed", "One More Night", "Pop"),
		new Song("Maroon 5", "Overexposed", "Payphone", "Pop"),
		new Song("Maroon 5", "Overexposed", "Daylight", "Pop"),
		new Song("Maroon 5", "Overexposed", "Lucky Strike", "Pop"),
		new Song("Maroon 5", "Overexposed", "The Man Who Never Lied", "Pop"),
		new Song("Maroon 5", "Overexposed", "Love Somebody", "Pop"),
		new Song("Maroon 5", "Overexposed", "Ladykiller", "Pop"),
		new Song("Maroon 5", "Overexposed", "Fortune Teller", "Pop"),
		new Song("Maroon 5", "Overexposed", "Sad", "Pop"),
		new Song("Maroon 5", "Overexposed", "Tickets", "Pop"),
		new Song("Maroon 5", "Overexposed", "Doin' Dirt", "Pop"),
		new Song("Maroon 5", "Overexposed", "Beautiful Goodbye", "Pop"),
		new Song("Maroon 5", "Overexposed", "Wipe Your Eyes", "Pop"),
		new Song("Maroon 5", "Overexposed", "Wasted Years", "Pop"),
		new Song("Maroon 5", "Overexposed", "Let's Stay Together", "Pop"),
		new Song("Maroon 5", "Hands All Over", "Misery", "Pop"),
		new Song("Maroon 5", "Hands All Over", "Give a Little More", "Pop"),
		new Song("Maroon 5", "Hands All Over", "Stutter", "Pop"),
		new Song("Maroon 5", "Hands All Over", "Don't Know Nothing", "Pop"),
		new Song("Maroon 5", "Hands All Over", "Never Gonna Leave This Bed", "Pop"),
		new Song("Maroon 5", "Hands All Over", "I Can't Lie", "Pop"),
		new Song("Maroon 5", "Hands All Over", "Hands All Over", "Pop"),
		new Song("Maroon 5", "Hands All Over", "How", "Pop"),
		new Song("Maroon 5", "Hands All Over", "Get Back In My Life", "Pop"),
		new Song("Maroon 5", "Hands All Over", "Just a Feeling", "Pop"),
		new Song("Maroon 5", "Hands All Over", "Runaway", "Pop"),
		new Song("Maroon 5", "Hands All Over", "Moves Like Jagger", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "Harder to Breathe", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "This Love", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "Shiver", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "She Will Be Loved", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "Tangled", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "The Sun", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "Must Get Out", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "Sunday Morning", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "Secret", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "Through With You", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "Not Coming Home", "Pop"),
		new Song("Maroon 5", "Songs About Jane", "Sweetest Goodbye", "Pop"),
		new Song("Coldplay", "Mylo Xyloto", "Mylo Xyloto", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "Hurts Like Heaven", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "Paradise", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "Charlie Brown", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "Us Against the World", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "M.M.I.X.", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "Every Teardrop Is a Watterfall", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "Major Minus", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "U.F.O.", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "Princesses of China", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "Up in Flames", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "A Hopeful Transmission", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "Don't Let It Break Your Heart", "Alternative"),
		new Song("Coldplay", "Mylo Xyloto", "Up With the Birds", "Alternative"),
		new Song("Coldplay", "A Rush of Blood To The Head", "Politik", "Alternative"),
		new Song("Coldplay", "A Rush of Blood To The Head", "In My Place", "Alternative"),
		new Song("Coldplay", "A Rush of Blood To The Head", "God Put A Smile Upon Your Face", "Alternative"),
		new Song("Coldplay", "A Rush of Blood To The Head", "The Scientist", "Alternative"),
		new Song("Coldplay", "A Rush of Blood To The Head", "Clocks", "Alternative"),
		new Song("Coldplay", "A Rush of Blood To The Head", "Daylight", "Alternative"),
		new Song("Coldplay", "A Rush of Blood To The Head", "Green Eyes", "Alternative"),
		new Song("Coldplay", "A Rush of Blood To The Head", "Warning Sign", "Alternative"),
		new Song("Coldplay", "A Rush of Blood To The Head", "A Whisper", "Alternative"),
		new Song("Coldplay", "A Rush of Blood To The Head", "A Rush Of Blood To The Head", "Alternative"),
		new Song("Coldplay", "A Rush of Blood To The Head", "Amsterdam", "Alternative"),
		new Song("Coldplay", "Viva la Vida", "Life In Technicolor", "Alternative"),
		new Song("Coldplay", "Viva la Vida", "Cemeteries of London", "Alternative"),
		new Song("Coldplay", "Viva la Vida", "Lost!", "Alternative"),
		new Song("Coldplay", "Viva la Vida", "42", "Alternative"),
		new Song("Coldplay", "Viva la Vida", "Lovers In Japan / Reign of Love", "Alternative"),
		new Song("Coldplay", "Viva la Vida", "Yes", "Alternative"),
		new Song("Coldplay", "Viva la Vida", "Viva la Vida", "Alternative"),
		new Song("Coldplay", "Viva la Vida", "Violet Hill", "Alternative"),
		new Song("Coldplay", "Viva la Vida", "Strawberry Swing", "Alternative"),
		new Song("Coldplay", "Viva la Vida", "Death and All His Friends", "Alternative"),
		new Song("Coldplay", "Viva la Vida", "Lost?", "Alternative"),
		new Song("Coldplay", "X & Y", "Square One", "Alternative"),
		new Song("Coldplay", "X & Y", "What If", "Alternative"),
		new Song("Coldplay", "X & Y", "White Shadows", "Alternative"),
		new Song("Coldplay", "X & Y", "Fix You", "Alternative"),
		new Song("Coldplay", "X & Y", "Talk", "Alternative"),
		new Song("Coldplay", "X & Y", "X & Y", "Alternative"),
		new Song("Coldplay", "X & Y", "Speed of Sound", "Alternative"),
		new Song("Coldplay", "X & Y", "A Message", "Alternative"),
		new Song("Coldplay", "X & Y", "Low", "Alternative"),
		new Song("Coldplay", "X & Y", "The Hardest Part", "Alternative"),
		new Song("Coldplay", "X & Y", "Swallowed In the Sea", "Alternative"),
		new Song("Coldplay", "X & Y", "Twisted Logic", "Alternative"),
		new Song("Coldplay", "X & Y", "Till Kingdom Come", "Alternative")
	],
	playlists : {
		"Driving Music" : [
			new Song("Coldplay", "X & Y", "Till Kingdom Come", "Alternative"),
			new Song("Coldplay", "Viva la Vida", "Viva la Vida", "Alternative"),
			new Song("Coldplay", "Mylo Xyloto", "Princesses of China", "Alternative"),
			new Song("Maroon 5", "Songs About Jane", "Harder to Breathe", "Pop"),
			new Song("Maroon 5", "Songs About Jane", "This Love", "Pop")
		],
		"Favorites" : [
			new Song("Maroon 5", "Overexposed", "One More Night", "Pop"),
			new Song("Maroon 5", "Overexposed", "Payphone", "Pop"),
			new Song("Maroon 5", "Hands All Over", "Misery", "Pop"),
			new Song("Maroon 5", "Hands All Over", "Moves Like Jagger", "Pop"),
			new Song("Coldplay", "Mylo Xyloto", "Paradise", "Alternative"),
			new Song("Coldplay", "Mylo Xyloto", "Princesses of China", "Alternative"),
			new Song("Coldplay", "A Rush of Blood To The Head", "Politik", "Alternative"),
			new Song("Coldplay", "A Rush of Blood To The Head", "The Scientist", "Alternative"),
			new Song("Coldplay", "A Rush of Blood To The Head", "Clocks", "Alternative"),
			new Song("Coldplay", "Viva la Vida", "Viva la Vida", "Alternative"),
			new Song("Coldplay", "X & Y", "Square One", "Alternative"),
			new Song("Coldplay", "X & Y", "White Shadows", "Alternative"),
			new Song("Coldplay", "X & Y", "Fix You", "Alternative")
		],
		"Coldplay Favorites" : [
			new Song("Coldplay", "Mylo Xyloto", "Paradise", "Alternative"),
			new Song("Coldplay", "Mylo Xyloto", "Princesses of China", "Alternative"),
			new Song("Coldplay", "A Rush of Blood To The Head", "Politik", "Alternative"),
			new Song("Coldplay", "A Rush of Blood To The Head", "The Scientist", "Alternative"),
			new Song("Coldplay", "A Rush of Blood To The Head", "Clocks", "Alternative"),
			new Song("Coldplay", "Viva la Vida", "Viva la Vida", "Alternative"),
			new Song("Coldplay", "X & Y", "Square One", "Alternative"),
			new Song("Coldplay", "X & Y", "White Shadows", "Alternative"),
			new Song("Coldplay", "X & Y", "Fix You", "Alternative")
		]
	}
}

// Determines if the given arguments are equal except returns true if either element is false.
// Useful for if statment equality caparisons that don't apply to undefiend objects.
function matches(thiz, that) {
	return thiz === that || !thiz || !that;
}

// Returns all of the artists in the library. Can optionally be filtered by genre and playlist.
function getArists(genre, playlist) {
	return queryLibrary({
		genre : genre, 
		playlist : playlist, 
		request : "artist"});
}

// Returns all of the albums in the library. Can optionally be filtered by artist, genre, and playlist.
function getAlbums(artist, genre, playlist) {
	return queryLibrary({
		artist : artist,
		genre : genre, 
		playlist : playlist, 
		request : "album"});
}

// Returns all of the songs in the library. Can optionally be filtered by artist, album, genre and playlist.
function getSongs(artist, album, genre, playlist) {
	return queryLibrary({
		artist : artist, 
		album : album, 
		genre : genre, 
		playlist : playlist, 
		request : "title"
	});
}

// Returns all of the playlists in the library.
function getPlaylists() {
	return queryLibrary({
		request : "playlist"
	});
}

// Returns all of the genres in the library.
function getGenres() {
	return queryLibrary({
		request : "genre"
	});
}

// Returns the song object of the song matching the given title. If more than one song
// contains the same title, then the first one in the library will be returned.
function getSong(title) {
	return queryLibrary({
		title : title,
		request : "song"
	});
}

// Returns an array of elements from the musicLibrary matching the given params.
// params options:
// 	artist (optional)
// 	album (optional)
// 	title (optional)
// 	genre (optional)
// 	playlist (optional)
// 	request - The song attribute that the elements will be of. Options:
// 		artist - returns the artist names
// 		album - returns the album names
// 		title - returns the song titles
// 		genre - returns the genres
// 		playlist - returns all the playlist names
//		song - returns the whole song objects
//
// Examples:
//
// params = {artist: "Coldplay", request : "album"} 
// This would return all of the albums in the library by Coldplay.
//
// params = {playlist: "Favorites", request : "song"}
// This woudld return all of the song objects of the songs in the Favorites albumb.


function queryLibrary(params) {
	// Immediately return the playlists
	if (params.request === "playlist") {
		return Object.keys(musicLibrary.playlists);
	}

	// Initialize results array
	var results = [];
	
	// Adds the requested attribute of the song to the results array
	// if it isn't already in the array and it matches the params.
	function filter(i, song) {
		// By default we want the attribute of the song specified by params.request
		var data = song[params.request];

		// If the requested attribute is "song" then we want the whole song object.
		if (params.request === "song") {
			data = song;
		}

		if ($.inArray(data, results) === -1
				&& matches(params.artist, song.artist) 
				&& matches(params.album, song.album) 
				&& matches(params.title, song.title) 
				&& matches(params.genre, song.genre)) {
			results.push(data);
		}
	}

	// Determines if we should query against the whole library or just a specific playlist.
	var songList = musicLibrary.songs;
	if (params.playlist) {
		songList = musicLibrary.playlists[params.playlist];
	}
	$.each(songList, filter);

	return results;
}