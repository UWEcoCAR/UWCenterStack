Music
=========

The music object is a global object made for controling lists of music and quickly playing notifications.

How to Use
----------

```javascript
	var supplier = new LastFmSupplier('username', 'password', function(error) {
		if (error) throw error;

		Music.setSupplier(supplier);
		Music.start();
	});
```


Suppliers
---------

In order to play a list of songs with the Music object you must create a Supplier object. Supplier objects need to implement at least these three functions.

#### next()

Returns the next song or null.

#### previous()

Returns the last song or null.

#### isDone()

Returns true if there is nothing left to play. False otherwise.

Supplier objects can be initialized in any way as long as the last argument is a callback and are allowed to have any other functions or fields.


Music API
--------
The Music object directly extend the node EventEmitter, so all [EventEmitter methods](http://nodejs.org/api/events.html#events_class_events_eventemitter) are also part of the Music object. 

#### Music.playOver(src)

This function takes in the filepath of an audio file and a value between 0 and 1 and plays it as soon as it can. This is a 'fire and forget' function meaning it has no callbacks and doesn't call the Music object to emit any events. It can play sounds on top of whatever is playing.

#### Music.setSupplier(supplier, volume)

This function takes in a supplier object, overwriting the current one if it exists. It is possible to seamlessly switch between supplier objects calling this function mid-song.

#### Music.start()

Starts playing the music object. Will throw an error if a supplier has not been set or the Music object was previously started and wasn't stopped.

#### Music.stop()

Resets the music object. Throws an error if the object has not been started.

#### Music.pause()

Pauses the currently playing song. Throws error if the supplier has not been set, fails silently if nothing is currently playing or music was already paused.

#### Music.play() 

Resumes playing a paused song. Throws error if the supplier is not set. Fails silently if there is nothing currently playing or the currently playing song is already playing.

#### Music.next()

Stops the current song and attempts to play the next song. Will throw an error if supplier is not set. If there is no song to play it will play nothing.

#### Music.previous()

If the current song has been playing for over 3 seconds it starts the song over. Otherwise attempts to play the last long. Throws an error if the supplier is not set. If there is not a song to play it will play nothing.

#### Music.seek(seconds)

Attemps to start the song at the given time. Needs to be tested.

#### Music.getInfo()

Returns information about the current song playing, if no song is currently playing it returns an empty object.


Events
---------

Currently the Music object only emits a few choice media events. Information about when these media events are fired can be found [here](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events).
