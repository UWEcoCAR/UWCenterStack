Ext.define('feel-your-way.controller.MusicControl', {
	extend: 'Ext.app.Controller',

	config: {
		control: {
            audio: {
                timeupdate: 'updateDial',
                ended: 'nextSong'
            },
            timeSlider: {
                sliderchange: 'updateAudio'
            },
			controls: {
				itemtap: 'select'
			},
            artistButton: {
                tap: 'artistSelect'
            },
            albumButton: {
                tap: 'albumSelect'
            },
            songButton: {
                tap: 'songSelect'
            },
            playlistButton: {
                tap: 'playlistSelect'
            },
            nowPlayingButton: {
                tap: 'goToNowPlaying'
            },
            trebleButton: {
                tap: 'trebleSelect',
            },
            bassButton: {
                tap: 'bassSelect',
            },
            repeatButton: {
                tap: 'repeatSelect',
            },
            shuffleButton: {
                tap: 'shuffleSelect',
            },
            homeButton: {
                tap: 'goHome',
            }
		},

		refs: {
            audio: '#audio',
            controls: '#music',
			list: '#selectorList',
            dial: '#dial',
            timeSlider: '#dial-outer-slider',
            // music controls
            artistButton: '#artistButton',
            albumButton: '#albumButton',
            songButton: '#songButton',
            playlistButton: '#playlistButton',
            nowPlayingButton: '#nowPlaying',
            trebleButton: '#trebleButton',
            bassButton: '#bassButton',
            repeatButton: '#repeatButton',
            shuffleButton: '#shuffleButton',


            // non music controls
            homeButton: '#homeButton'
		},

        currentData: [],
        nowPlaying: {
            onScreen: false,
            isPlaying: false,
            title: '',
            album: '',
            artist: '',
            genre: '',

            set: function(title, album, artist, genre, url ,onScreen, isPlaying) {
                if (title !== null) this.title = title;
                if (album !== null) this.album = album;
                if (artist !== null) this.artist = artist;
                if (genre !== null) this.genre = genre;
                if (url !== null) this.url = url;
                if (onScreen !== null) this.onScreen = onScreen;
                if (isPlaying !== null) this.isPlaying = isPlaying;
            }
        },
        currentlySelected: {
            album: '',
            artist: '',

            setArtist: function(artist) {
                if (artist !== null) this.artist = artist;
            },
            setAlbum: function(album) {
                if (album !== null) this.album = album;
            }
        },

        toggledButtons: {
            repeat: false,
            shuffle: false
        }
    },

    goHome: function(button) {
        button.setIconCls('appsgreen');
    },


    goToNowPlaying: function(button) {
        var playing = this.getNowPlaying();
        var me = this;
        if(playing.isPlaying && !playing.onScreen) { // something is playing
            this.setActiveButton(button);
            playing.onScreen = true;
            this.getDial().setMode('slider');
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
                toggled.repeat = true;
                button.addCls('clickedButton');
            } else {
                toggled.repeat = false;
                button.removeCls('clickedButton');
            }
        } else if (button === this.getShuffleButton()) {
            if (!toggled.shuffle) {
                toggled.shuffle = true;
                button.addCls('clickedButton');
            } else {
                toggled.shuffle = false;
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
        var data = me.getCurrentData();

        while(data.length > 0) {
            data.pop();
        }

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
        list.refresh();

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
        this.setActiveButton(button);
    },

    bassSelect: function(button) {
        this.setActiveButton(button);
    },

    repeatSelect: function(button) {
        this.toggleButton(button);
    },

    shuffleSelect: function(button) {
        this.toggleButton(button);
    },

    filterData: function(store, currentlyDisplayed, tappedRecord) {

        me = this;
        var data = me.getCurrentData();
        while(data.length > 0) {
            data.pop();
        }
        store.clearFilter();
        store.filterBy(function(record, id) {
            var notContained;
            var selectedData = Ext.getCmp('selectedData');
            if (currentlyDisplayed == JSON.stringify('artist')) { //artist -> display albums by that artist

                if (JSON.stringify(tappedRecord.album) == JSON.stringify('All Artists')) { // all artists
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


            } else if (currentlyDisplayed == JSON.stringify('album')) { //album -> display songs on that album
                notContained = (me.getCurrentData().indexOf(record.data.title) === -1);
                if (JSON.stringify(tappedRecord.album) == JSON.stringify('All Albums')) { // all albums
                    var selectedArtist = me.getCurrentlySelected().artist;
                    if (!selectedArtist) { // previously selected all artists
                        if (notContained && record.data.album != 'All Albums') {
                            me.getCurrentData().push(record.data.title);
                        }
                        selectedData.setHtml('<span>all artists</span><br /> all albums');
                    } else { // wants all albums of an artist
                        if (notContained && (JSON.stringify(record.data.artist) == JSON.stringify(selectedArtist))) {
                            me.getCurrentData().push(record.data.album + '' + record.data.title); // could have same song on multiple albums
                        }  
                        selectedData.setHtml('<span>' + selectedArtist + '</span><br /> all albums');           
                    }

                } else {
                    selectedData.setHtml('<span>' + tappedRecord.artist + '</span><br />' + tappedRecord.album);
                    if (notContained && (JSON.stringify(record.data.album) == JSON.stringify(tappedRecord.album))) {
                        me.getCurrentData().push(record.data.title);
                    }
                }
            } else {
                if (JSON.stringify(record.data.title) == JSON.stringify(tappedRecord.title)) {
 var container = Ext.getCmp(pageContainer);
                    var currentlyPlaying = me.getNowPlaying();

                    var data = record.data;
                    currentlyPlaying.set(data.title, data.artist, data.album, data.genre, true, true);
                    me.getList().hide();
                    me.setActiveButton(me.getNowPlayingButton());

                    selectedData.setHtml('');
                    var dataContainer = Ext.ComponentQuery.query('#nowPlayingData')[0];
                    dataContainer.setHtml('<span>' + record.data.title.toUpperCase() + '</span><br />' + record.data.artist.toLowerCase() + '<br />' + record.data.album.toLowerCase());
                    
                    me.getAudio().setUrl('./resources/music/'+record.data.url);
                    me.getAudio().play();
                }
            }

            if (currentlyDisplayed == JSON.stringify('artist')) {
                return notContained && (JSON.stringify(record.data.artist) == JSON.stringify(tappedRecord.artist));
            } else if (currentlyDisplayed == JSON.stringify('album')) {
                return notContained && (JSON.stringify(record.data.album) == JSON.stringify(tappedRecord.album));
            } else {

                return (JSON.stringify(record.data.title) == JSON.stringify(tappedRecord.title));
            }
        });
    },

    clearSelectedData: function() {
        var selectedData = Ext.getCmp('selectedData');
        selectedData.setHtml('');
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
        var currentlyDisplayed = JSON.stringify(store.getSorters()[1]._id);
            var tappedRecord = list.getStore().getAt(record).data;

            var template;
            if (currentlyDisplayed == JSON.stringify('artist')) {
                template = '{album}';
                store.changeSorting('album', list);
            } else if (currentlyDisplayed == JSON.stringify('album')) { //album -> display songs on that album
                template = '{title}';
                store.changeSorting('title', list);
            } else {
                template = '{title}';
            }
            list.setItemTpl(template);

            this.filterData(store, currentlyDisplayed, tappedRecord);
    },

    filterLibrary: function(store, params) {
        store.filterBy(function(record, id){
            var bool = true;
                if (params.genre){
                    bool = bool && record.data.genre === params.genre;
                }
                if (params.artist){
                    bool = bool && record.data.artist === params.artist;
                }
                if (params.album){
                    bool = bool && record.data.album === params.album;
                }
            return bool;
        });

        if (params.request) {
            store.sort([
                {
                    property: params.request,
                    direction: 'ASC'
                }
            ]);

            this.getList().setItemTpl('{' + params.request + '}');
        }
    },

    clearFilters: function() {
        this.getStore().clearFilter();
    },

    updateDial: function(audio, time){
       this.getTimeSlider().setSlider(time/audio.getDuration()*360);
    },
    updateAudio: function(angle, slider) {
        var audio = this.getAudio();
        audio.setCurrentTime(angle/360*audio.getDuration());
    },

    nextSong: function(audio, time) {

    }
});