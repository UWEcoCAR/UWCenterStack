Ext.define('UWCenterStack.controller.MusicControl', {
	extend: 'Ext.app.Controller',


	config: {
		control: {
            musicApp: {
                initialize: 'restoreState'
            },
            audio: {
                timeupdate: 'updateDial',
                ended: 'nextSong'
            },
            volumeSlider: {
                sliderchange: 'updateVolume'
            },
            timeSlider: {
                sliderchange: 'updateAudio'
            },
			controls: {
				itemtap: 'select'
			},
            artistButton: {
            	touchend: 'artistSelect'
            },
            albumButton: {
            	touchend: 'albumSelect'
            },
            songButton: {
            	touchend: 'songSelect'
            },
            playlistButton: {
            	touchend: 'playlistSelect'
            },
            nowPlayingButton: {
            	touchend: 'goToNowPlaying'
            },
            trebleButton: {
            	touchend: 'trebleSelect',
            },
            bassButton: {
            	touchend: 'bassSelect',
            },
            repeatButton: {
            	touchend: 'repeatSelect',
            },
            shuffleButton: {
            	touchend: 'shuffleSelect',
            },
            homeButton: {
            	touchend: 'goHome'
            },
            playPause: {
                tap: 'playPauseToggle'
            },
            leftNav: {
            	touchend: 'leftNavSelect'
            },
            rightNav: {
            	touchend: 'rightNavSelect'
            }
		},

		refs: {
            musicApp: 'musicmain[id="musicContainer"]',
            audio: 'audio[id="audio"]',
            controls: 'dialselector[id="music"]',
			list: 'selectorlist[id="selectorList"]',
            dial: 'multidial[id="dial"]',
            timeSlider: 'circleslider[id="dial-outer-slider"]',
            volumeSlider: 'circleslider[id="dial-inner-slider"]',
            // music controls
            artistButton: 'button[id="artistButton"]',
            albumButton: 'button[id="albumButton"]',
            songButton: 'button[id="songButton"]',
            playlistButton: 'button[id="playlistButton"]',
            nowPlayingButton: 'button[id="nowPlaying"]',
            trebleButton: 'button[id="treblebutton"]',
            bassButton: 'button[id="bassButton"]',
            repeatButton: 'button[id="repeatButton"]',
            shuffleButton: 'button[id="shuffleButton"]',
            homeButton: 'button[id="musicHomeButton"]',
            playPause: 'circlebutton[id="playPause"]',
            
            leftNav: 'container[id="leftNav"]',
            rightNav: 'container[id="rightNav"]',
		},

        currentData: [],
        queue: [],
        queueIndex: null,

        nowPlaying: {
            onScreen: false,
            isPlaying: false,
            title: '',
            album: '',
            artist: '',
            genre: '',

            set: function(title, album, artist, genre, onScreen, isPlaying) {
                if (title !== null) this.title = title;
                if (album !== null) this.album = album;
                if (artist !== null) this.artist = artist;
                if (genre !== null) this.genre = genre;
                if (onScreen !== null) this.onScreen = onScreen;
                if (isPlaying !== null) this.isPlaying = isPlaying;
            }
        },
        currentlySelected: {
            album: '',
            artist: '',

            setArtist: function(artist) {
                this.artist = artist;
            },
            setAlbum: function(album) {
                this.album = album;
            }
        },

        toggledButtons: {
            repeat: false,
            shuffle: false,

            setRepeat: function(bool){
                this.repeat = bool;
            },
            setShuffle: function(bool){
                this.shuffle = bool;
            }
        }
    },

    leftNavSelect : function(obj, mouse) {
    	var y = mouse.pageY;
    	var button;
		if (y > 3 && y < 116) {
			this.goHome();
		} else if (y > 119 && y < 232) {
			button = Ext.ComponentQuery.query("#artistButton")[0];
			this.artistSelect(button);
		} else if (y > 245 && y < 358) {
			button = Ext.ComponentQuery.query("#albumButton")[0];
			this.albumSelect(button);
		} else if (y > 361 && y < 474) {
			button = Ext.ComponentQuery.query("#songButton")[0];
			this.songSelect(button);
		} else if (y > 477 && y < 591) {
			button = Ext.ComponentQuery.query("#playlistButton")[0];
			this.playlistSelect(button);
		}
    },
    
    
    rightNavSelect : function(obj, mouse) {
    	var y = mouse.pageY;
    	var button;
		if (y > 3 && y < 116) {
			button = Ext.ComponentQuery.query("#nowPlaying")[0];
			this.goToNowPlaying(button);
		} else if (y > 119 && y < 232) {
			button = Ext.ComponentQuery.query("#trebleButton")[0];
			this.trebleSelect(button);
		} else if (y > 245 && y < 358) {
			button = Ext.ComponentQuery.query("#bassButton")[0];
			this.bassSelect(button);
		} else if (y > 361 && y < 474) {
			button = Ext.ComponentQuery.query("#repeatButton")[0];
			this.repeatSelect(button);
		} else if (y > 477 && y < 591) {
			button = Ext.ComponentQuery.query("#shuffleButton")[0];
			this.shuffleSelect(button);
		}
    },
    
    goHome: function(){
        Ext.getCmp('view').pop(1);
    },

    playPauseToggle: function() {
        if (this.getAudio().isPlaying()){
            this.getAudio().pause();
            this.getNowPlaying().set(null,null,null,null,null, false);
            this.getPlayPause().addCls('playButton');
        } else {
            this.getAudio().play();
            this.getNowPlaying().set(null,null,null,null,null, true);
            this.getPlayPause().removeCls('playButton');
        }
    },

    restoreState: function() {
        this.getList().setStore(Ext.getStore('Songs'));
        var nowPlaying = this.getNowPlaying();
        nowPlaying.set(null,null,null,null,false,null); // possibly move to a onDestroy method
        if (nowPlaying.isPlaying){
            var dataContainer = Ext.getCmp('nowPlayingData');
            dataContainer.setHtml('<span>' + nowPlaying.title.toUpperCase() + '</span><br />' + nowPlaying.artist.toLowerCase() + '<br />' + nowPlaying.album.toLowerCase());
        }
        if (nowPlaying.isPlaying){
           this.goToNowPlaying(this.getNowPlayingButton());
        } else {
            this.songSelect(this.getSongButton());
        }
    },

    goToNowPlaying: function(button) {
        var playing = this.getNowPlaying();
        if(playing.isPlaying && !playing.onScreen) { // something is playing
            this.setActiveButton(button);
            this.getList().hide();
            playing.set(null,null,null,null, true, null);
            this.getDial().setMode('slider');
            this.clearSelectedData();
            this.getPlayPause().removeCls('playButton');
             this.getPlayPause().show();
             Ext.getCmp('selectButton').hide();
        }
    },

    setActiveButton: function(button) {
        var buttons = Ext.ComponentQuery.query('button');
        for (var i = buttons.length - 1; i >= 0; i--) {
            buttons[i].removeCls('clickedButton');
        };
        button.addCls('clickedButton');

        // reset toggled buttons
        var toggled = this.getToggledButtons();
        if (toggled.repeat) {
            this.getRepeatButton().addCls('clickedButton');
        }
        if (toggled.shuffle) {
            this.getShuffleButton().addCls('clickedButton');
        }

    },

    toggleButton: function(button) {
        var toggled = this.getToggledButtons();
        if (button === this.getRepeatButton()) {
            if (!toggled.repeat) {
                toggled.setRepeat(true);
                button.addCls('clickedButton');
            } else {
                toggled.setRepeat(false);
                button.removeCls('clickedButton');
            }
        } else if (button === this.getShuffleButton()) {
            if (!toggled.shuffle) {
                toggled.setShuffle(true);
                button.addCls('clickedButton');
            } else {
                toggled.setShuffle(false);
                button.removeCls('clickedButton');
            }
        }
    },

    generalFilter: function(selector, button) {
        this.checkPlaying();

        var me = this;
        var list = this.getList();
        template = '{' + selector + '}';
        var store = Ext.StoreManager.get('Songs');
        store.changeSorting(selector, list);
        list.setItemTpl(template);
        me.setCurrentData([]);

        store.clearFilter();

        store.filterBy(function(record, id) {
            var notContained;
            if (selector === 'artist') {
                notContained = (me.getCurrentData().indexOf(record.data.artist) === -1);
                if (notContained) {
                    me.getCurrentData().push(record.data.artist);
                }
            } else if (selector === 'album') {
                notContained = (me.getCurrentData().indexOf(record.data.album) === -1);
                if (notContained) {
                    me.getCurrentData().push(record.data.album);
                }
            }  else if (selector === 'title') {
                notContained = (me.getCurrentData().indexOf(record.data.title) === -1);
                if (notContained) {
                    me.getCurrentData().push(record.data.title);
                }
            } //else playlist
            return notContained;
        });
        this.getPlayPause().hide();
        Ext.getCmp('selectButton').setHtml('select')
        Ext.getCmp('selectButton').show();
        this.getList().scroll(0);
        this.getDial().setMode('dial');
    },

    artistSelect: function(button) {
        this.generalFilter('artist', button);
        this.setActiveButton(button);
    },

    albumSelect: function(button) {
        this.generalFilter('album', button);
        this.setActiveButton(button);
    },

    songSelect: function(button) {
        this.generalFilter('title', button);
        this.setActiveButton(button);
    },

    playlistSelect: function(button) {
        //this.setActiveButton(button);
    },

    trebleSelect: function(button) {
        // this.setActiveButton(button);
    },

    bassSelect: function(button) {
        // this.setActiveButton(button);
    },

    repeatSelect: function(button) {
        this.toggleButton(button);
    },

    shuffleSelect: function(button) {
        this.toggleButton(button);
    },

    filterData: function(store, currentlyDisplayed, tappedRecord) {
        me = this;
        me.setCurrentData([]);
        var selectedData = Ext.getCmp('selectedData');

        var tempArray = [];
        var items = Ext.getStore('Songs').getData().items;
        for(var i = 0; i < items.length; i++){
            tempArray.push(items[i]);
        }

        store.clearFilter();
        store.filterBy(function(record, id) {
            var notContained;
            if (currentlyDisplayed === "artist") { //artist -> display albums by that artist

                if (tappedRecord.album === "All Artists") { // all artists
                    me.generalFilter('album');
                    selectedData.setHtml('<span>all artists</span>');
                } else {
                    selectedData.setHtml('<span>' + tappedRecord.artist + '</span>');
                    notContained = (me.getCurrentData().indexOf(record.data.album) === -1);
                    if (notContained) {
                        me.getCurrentData().push(record.data.album);
                    }
                    me.getCurrentlySelected().setArtist(tappedRecord.artist);
                }


            } else if (currentlyDisplayed === "album") { //album -> display songs on that album
                notContained = (me.getCurrentData().indexOf(record.data.title) === -1);
                if (tappedRecord.album === "All Albums") { // all albums
                    var selectedArtist = me.getCurrentlySelected().artist;
                    if (!selectedArtist) { // previously selected all artists
                        if (notContained && record.data.album != 'All Albums') {
                            me.getCurrentData().push(record.data.title);
                        }
                        selectedData.setHtml('<span>all artists</span><br /> all albums');
                    } else { // wants all albums of an artist
                        if (notContained && (record.data.artist === selectedArtist)) {
                            me.getCurrentData().push(record.data.album + '' + record.data.title); // could have same song on multiple albums
                        }
                        selectedData.setHtml('<span>' + selectedArtist + '</span><br /> all albums');
                    }

                } else {
                    selectedData.setHtml('<span>' + tappedRecord.artist + '</span><br />' + tappedRecord.album);
                    if (notContained && (record.data.album === tappedRecord.album)) {
                        me.getCurrentData().push(record.data.title);
                    }
                }
            } else {
                if (record.data.title === tappedRecord.title) {
                    var currentlyPlaying = me.getNowPlaying();

                    var data = record.data;
                    currentlyPlaying.set(data.title, data.artist, data.album, data.genre, false, true);
                    me.goToNowPlaying(me.getNowPlayingButton());

                    var dataContainer = Ext.getCmp('nowPlayingData');
                    dataContainer.setHtml('<span>' + record.data.title.toUpperCase() + '</span><br />' + record.data.artist.toLowerCase() + '<br />' + record.data.album.toLowerCase());
                    me.setQueue(tempArray);
                    me.setQueueIndex(0);
                    me.getAudio().setUrl('./resources/music/' + data.url);
                    me.getAudio().play();
                }
            }

            if (currentlyDisplayed === "artist") {
                return notContained && (record.data.artist === tappedRecord.artist);
            } else if (currentlyDisplayed === "album") {
                return notContained && (record.data.album === tappedRecord.album);
            } else {
                return (record.data.title === tappedRecord.title);
            }
        });
        this.getList().scroll(0);
    },

    play: function(record) {
        var currentlyPlaying = me.getNowPlaying();
        var data = record.data;
        currentlyPlaying.set(data.title, data.artist, data.album, data.genre, null, true);
        if (this.getMusicApp()) {
            var dataContainer = Ext.getCmp('nowPlayingData');
            dataContainer.setHtml('<span>' + record.data.title.toUpperCase() + '</span><br />' + record.data.artist.toLowerCase() + '<br />' + record.data.album.toLowerCase());
        }
        this.getAudio().setUrl('./resources/music/' + data.url);
        this.getAudio().play();
    },

    clearSelectedData: function() {
        Ext.getCmp('selectedData').setHtml('');
    },

    checkPlaying: function() {
            var currentlyPlaying = this.getNowPlaying();
            if (currentlyPlaying.onScreen) {
                this.getList().show();
                currentlyPlaying.onScreen = false;
            }
            this.clearSelectedData();
    },

    select: function(list, record) {
            // record is the number in the list that was clicked
        var store = Ext.StoreManager.get('Songs');
        var currentlyDisplayed = store.getSorters()[1].getId();
            var tappedRecord = list.getStore().getAt(record).data;

            var template;
            if (currentlyDisplayed === "artist") {
                template = '{album}';
                store.changeSorting('album', list);
            } else if (currentlyDisplayed === "album") { //album -> display songs on that album
                template = '{title}';
                store.changeSorting('title', list);
            } else {
                template = '{title}';
            }
            list.setItemTpl(template);

            this.filterData(store, currentlyDisplayed, tappedRecord);
    },

    updateDial: function(audio, time){
        if (this.getMusicApp()) this.getTimeSlider().setSlider(time/audio.getDuration()*360);
    },
    updateAudio: function(angle, slider) {
        var audio = this.getAudio();
        audio.setCurrentTime(angle/360*audio.getDuration());
    },
    updateVolume: function(angle,slider) {
        this.getAudio().setVolume(angle/360);
    },

    nextSong: function(audio, time) {
        var buttons = this.getToggledButtons();

        // increment queueIndex
        this.setQueueIndex(this.getQueueIndex() + 1);

        // loop around if necessary
        if (this.getQueueIndex() >= this.getQueue().length && buttons.repeat && !buttons.shuffle){
            console.log('reached end of queue, starting over');
            this.setQueueIndex(0);
        }

        // if shuffle is on choose random song
        if (buttons.shuffle){
            console.log('choosing random song');
            this.setQueueIndex(Math.floor(Math.random() * this.getQueue().length));
        }

        // if repeat is off, this is possible and it should stop
        if (this.getQueueIndex() >= this.getQueue().length){
            console.log('reached end of queue');
            this.getNowPlaying().set('','','','', null, false);
            Ext.getCmp('nowPlayingData').setHtml('');
            this.togglePlayPause();
            this.getPlayPause().hide();
        } else {
            console.log('Playing queueIndex: ' + this.getQueueIndex());
            var record = this.getQueue()[this.getQueueIndex()];
            this.play(record);
        }
    }
});