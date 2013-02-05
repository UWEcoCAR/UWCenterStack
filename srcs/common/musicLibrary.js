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
	var artists = {};

	function filter(i, song) {
		if (!artists[song.artist] && matches(genre, song.genre)) {
			artists[song.artist] = true;
		}
	}

	if (playlist) {
		$.each(musicLibrary.playlists[playlist], filter);
	} else {
		$.each(musicLibrary.songs, filter);
	}
	return Object.keys(artists);
}

// Returns all of the albums in the library. Can optionally be filtered by artist, genre, and playlist.
function getAlbums(artist, genre, playlist) {
	var albums = {};
	
	function filter(i, song) {
		if (!albums[song.album] && matches(artist, song.artist) && matches(genre, song.genre)) {
			albums[song.album] = true;
		}
	}

	if (playlist) {
		$.each(musicLibrary.playlists[playlist], filter);
	} else {
		$.each(musicLibrary.songs, filter);
	}
	return Object.keys(albums);
}

// Returns all of the songs in the library. Can optionally be filtered by artist, album, genre and playlist.
function getSongs(artist, album, genre, playlist) {
	var songs = {};
	
	function filter(i, song) {
		if (!songs[song.title] && matches(artist, song.artist) && matches(album, song.album) && matches(genre, song.genre)) {
			songs[song.title] = true;
		}
	}

	if (playlist) {
		$.each(musicLibrary.playlists[playlist], filter);
	} else {
		$.each(musicLibrary.songs, filter);
	}
	return Object.keys(songs);
}

// Returns all of the playlists in the library.
function getPlaylists() {
	return Object.keys(musicLibrary.playlists);
}

// Returns all of the genres in the library.
function getGenres() {
	var genres = {};
	$.each(musicLibrary.songs, function(i, song) {
		if (!genres[song.genre]) {
			genres[song.genre] = true;
		}
	});
	return Object.keys(genres);
}

// Returns the song object of the song matching the given title. If more than one song
// contains the same title, then the first one in the library will be returned.
function getSong(title) {
	var matchingSong;
	$.each(musicLibrary.songs, function(i, song) {
		if (song.title === title) {
			matchingSong = song;
		}
	});
	return matchingSong;
}