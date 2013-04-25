Ext.define('feel-your-way.controller.MusicControl', {
	extend: 'Ext.app.Controller',

	config: {
		control: {
			list: {
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
			list: '#music',

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

            set: function(title, album, artist, genre, onScreen, isPlaying) {
                if (title !== null) this.title = title;
                if (album !== null) this.album = album;
                if (artist !== null) this.artist = artist;
                if (genre !== null) this.genre = genre;
                if (onScreen !== null) this.onScreen = onScreen;
                if (isPlaying !== null) this.onScreen = onScreen;
            }
        },
        toggledButtons: {
            repeat: false,
            shuffle: false
        }
	},

    goHome: function(button) {
        console.log('home button clicked');
        button.setIconCls('appsgreen');
    },


    goToNowPlaying: function(button) {
        console.log("now playing was clicked");
        var playing = this.getNowPlaying();
        if(playing.isPlaying && !playing.onScreen) { // something is playing
            this.setActiveButton(button);
            playing.onScreen = true;
            Ext.getCmp('selectorList').hide();
        }
    },

    setActiveButton: function(button) {
        var buttons = Ext.ComponentQuery.query('button');
        for (var i = buttons.length - 1; i >= 0; i--) {
            buttons[i].removeCls('clickedButton');
        };
        button.addCls('clickedButton');

        // if (toggled.repeat) {
        //     this.getRepeatButton().addCls('clickedButton');
        // } else {
        //     this.getShuffleButton().addCls('clickedButton');
        // }

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
        console.log(selector + ' click');
        this.setActiveButton(button);
        this.checkPlaying();

        var me = this;
        var list = Ext.getCmp('selectorList');
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

    },

    artistSelect: function(button) {
        this.generalFilter('artist', button);
    },

    albumSelect: function(button) {
        this.generalFilter('album', button);
    },
    
    songSelect: function(button) {
        this.generalFilter('title', button);
    },

    playlistSelect: function(button) {
        console.log('no playlist functionality');
        // this.setActiveButton(button);
    },

    trebleSelect: function(button) {
        console.log('no treble functionality');
        this.setActiveButton(button);
    },

    bassSelect: function(button) {
        console.log('no bass functionality');
        this.setActiveButton(button);
    },

    repeatSelect: function(button) {
        console.log('no repeat functionality');
        this.toggleButton(button);
    },

    shuffleSelect: function(button) {
        console.log('no shuffle functionality');
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
            console.log("filtering...");
            var notContained;
            if (currentlyDisplayed == JSON.stringify('artist')) { //artist -> display albums by that artist
                console.log("was artist, display album");
                // var selectedData = Ext.ComponentQuery.query('#selectedData')[0];
                console.log("click on" + tappedRecord.artist);
                // selectedData.setHtml(tappedRecord.artist);
                notContained = (me.getCurrentData().indexOf(record.data.album) === -1);
                if (notContained && (JSON.stringify(record.data.artist) == JSON.stringify(tappedRecord.artist))) {
                    me.getCurrentData().push(record.data.album);
                }
            } else if (currentlyDisplayed == JSON.stringify('album')) { //album -> display songs on that album
                console.log("was album, display songs");
                notContained = (me.getCurrentData().indexOf(record.data.song) === -1);
                // var selectedData = Ext.ComponentQuery.query('#selectedData')[0];
                // selectedData.setHtml(tappedRecord.artist + '<br />' + tappedRecord.album);
                if (notContained && (JSON.stringify(record.data.album) == JSON.stringify(tappedRecord.album))) {
                    me.getCurrentData().push(record.data.title);
                }
            } else {
                if (JSON.stringify(record.data.title) == JSON.stringify(tappedRecord.title)) {
                    var container = Ext.getCmp(pageContainer);
                    var currentlyPlaying = me.getNowPlaying();

                    var data = record.data;
                    currentlyPlaying.set(data.title, data.artist, data.album, data.genre, true, true);
                    Ext.getCmp('selectorList').hide();
                    me.setActiveButton(me.getNowPlayingButton());

                    me.getList().hide();

                    // var selectedData = Ext.ComponentQuery.query('#selectedData')[0];
                    // selectedData.setHtml('');
                    // var dataContainer = Ext.ComponentQuery.query('#nowPlayingData')[0];
                    // dataContainer.setHtml('<span>' + record.data.title + '</span><br />' + record.data.artist + '<br />' + record.data.album);
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
        console.log("...done");
    },

    clearSelectedData: function() {
        // var selectedData = Ext.ComponentQuery.query('#selectedData')[0];
        // selectedData.setHtml('');
    },

    checkPlaying: function() {
            var currentlyPlaying = this.getNowPlaying();
            if (currentlyPlaying.onScreen) {
                Ext.getCmp('selectorList').show();
                currentlyPlaying.onScreen = false;
            }
            this.clearSelectedData();
    },

	select: function(list, record) {
        console.log('selected');
        // record is the number in the list that was clicked
		var store = Ext.StoreManager.get('Songs');
		var currentlyDisplayed = JSON.stringify(store.getSorters()[1]._id);
        var tappedRecord = list.getStore().getAt(record).data;

        var template;
        if (currentlyDisplayed == JSON.stringify('artist')) {
            console.log("tapped: " + tappedRecord.artist);
            template = '{album}';
            store.changeSorting('album', list);
        } else if (currentlyDisplayed == JSON.stringify('album')) { //album -> display songs on that album
            console.log("tapped: " + tappedRecord.album);
            template = '{title}';
            store.changeSorting('title', list);
        } else {
            console.log("tapped: " + tappedRecord.title);
            template = '{title}';
        }
        list.setItemTpl(template);

		var data = this.filterData(store, currentlyDisplayed, tappedRecord);
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
    }
});