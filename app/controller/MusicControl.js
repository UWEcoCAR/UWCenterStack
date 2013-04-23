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
<<<<<<< HEAD
            genre: '',

            set: function(title, album, artist, genre, onScreen, isPlaying) {
                if (title !== null) this.title = title;
                if (album !== null) this.album = album;
                if (artist !== null) this.artist = artist;
                if (genre !== null) this.genre = genre;
                if (onScreen !== null) this.onScreen = onScreen;
                if (isPlaying !== null) this.onScreen = onScreen;
            }
=======
            genre: ''
        },
        toggledButtons: {
            repeat: false,
            shuffle: false
>>>>>>> New styling, Controls for all Buttons
        }
	},

    goHome: function(button) {
        console.log('home button clicked');
<<<<<<< HEAD
        button.setIconCls('appsgreen');
=======
        this.setActiveButton('#homeButton');
>>>>>>> New styling, Controls for all Buttons
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

<<<<<<< HEAD


    setActiveButton: function(button) {
=======
    setActiveButton: function(buttonName) {
>>>>>>> New styling, Controls for all Buttons
        var buttons = Ext.ComponentQuery.query('button');
        for (var i = buttons.length - 1; i >= 0; i--) {
            buttons[i].removeCls('clickedButton');
        };
<<<<<<< HEAD
        button.addCls('clickedButton');
    },

    // TODO - remove redundancy between artist/album/song select functions
    artistSelect: function(button) {
        console.log('artist click');

        var me = this;
        me.setActiveButton(button);
        me.checkPlaying();
        var list = Ext.getCmp('selectorList');
        template = '{artist}';
        var store = Ext.StoreManager.get('Songs');
        store.changeSorting('artist', list);
        list.setItemTpl(template);
        var data = me.getCurrentData();

        while(data.length > 0) {
            data.pop();
        }

        store.clearFilter();

        store.filterBy(function(record, id) {        
            var notContained = (me.getCurrentData().indexOf(record.data.artist) === -1);
            if (notContained) {
                me.getCurrentData().push(record.data.artist);
=======
        
        /* restore buttons that are toggles */
        var toggled = this.getToggledButtons();
        if (toggled.repeat) {
            var buttonClicked = Ext.ComponentQuery.query('#repeatButton')[0];
            buttonClicked.addCls('clickedButton');
        }
        if (toggled.shuffle) {
            var buttonClicked = Ext.ComponentQuery.query('#shuffleButton')[0];
            buttonClicked.addCls('clickedButton');
        }

        var buttonClicked = Ext.ComponentQuery.query(buttonName)[0];
        buttonClicked.addCls('clickedButton');
    },

    toggleButton: function(buttonName) {
        var toggled = this.getToggledButtons();
        if (buttonName === '#repeatButton') {
            var buttonClicked = Ext.ComponentQuery.query('#repeatButton')[0];
            if (!toggled.repeat) {
                toggled.repeat = true;
                buttonClicked.addCls('clickedButton');
            } else {
                toggled.repeat = false;
                buttonClicked.removeCls('clickedButton');
>>>>>>> New styling, Controls for all Buttons
            }
        } else if (buttonName === '#shuffleButton') {
            var buttonClicked = Ext.ComponentQuery.query('#shuffleButton')[0];
            if (!toggled.shuffle) {
                toggled.shuffle = true;
                buttonClicked.addCls('clickedButton');
            } else {
                toggled.shuffle = false;
                buttonClicked.removeCls('clickedButton');
            }
        }
    },

<<<<<<< HEAD
    albumSelect: function(button) {
        console.log('album click');

        var me = this;
        me.setActiveButton(button);
        me.checkPlaying();
        var list = Ext.getCmp('selectorList');
        var template = '{album}';
=======
    generalFilter: function(selector, button) {
        console.log(button + ' click');
        this.setActiveButton('#' + button + 'Button');
        this.checkPlaying();
        var me = this;
        var list = Ext.ComponentQuery.query('#centerInfo')[0];
        template = '{' + selector + '}';
>>>>>>> New styling, Controls for all Buttons
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

<<<<<<< HEAD
    songSelect: function(button) {
        console.log('song click');

        var me = this;
        me.setActiveButton(button);
        me.checkPlaying();
        var list = Ext.getCmp('selectorList');
        template = '{title}';
        var store = Ext.StoreManager.get('Songs');
        store.changeSorting('title', list);
        list.setItemTpl(template);
=======
    artistSelect: function() {
        this.generalFilter('artist', 'artist');
    },
>>>>>>> New styling, Controls for all Buttons

    albumSelect: function() {
        this.generalFilter('album', 'album');
    },
    
    songSelect: function() {
        this.generalFilter('title', 'song');
    },

    playlistSelect: function() {
        console.log('no playlist functionality');
        this.setActiveButton('#playlistButton');
    },

    trebleSelect: function() {
        console.log('no treble functionality');
        this.setActiveButton('#trebleButton');
    },

    bassSelect: function() {
        console.log('no bass functionality');
        this.setActiveButton('#bassButton');
    },

    repeatSelect: function() {
        console.log('no repeat functionality');
        this.toggleButton('#repeatButton');
    },

    shuffleSelect: function() {
        console.log('no shuffle functionality');
        this.toggleButton('#shuffleButton');
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
                var selectedData = Ext.ComponentQuery.query('#selectedData')[0];
                console.log("click on" + tappedRecord.artist);
                selectedData.setHtml(tappedRecord.artist);
                notContained = (me.getCurrentData().indexOf(record.data.album) === -1);
                if (notContained && (JSON.stringify(record.data.artist) == JSON.stringify(tappedRecord.artist))) {
                    me.getCurrentData().push(record.data.album);
                }
            } else if (currentlyDisplayed == JSON.stringify('album')) { //album -> display songs on that album
                console.log("was album, display songs");
                notContained = (me.getCurrentData().indexOf(record.data.song) === -1);
                var selectedData = Ext.ComponentQuery.query('#selectedData')[0];
                selectedData.setHtml(tappedRecord.artist + '<br />' + tappedRecord.album);
                if (notContained && (JSON.stringify(record.data.album) == JSON.stringify(tappedRecord.album))) {
                    me.getCurrentData().push(record.data.title);
                }
            } else {
                if (JSON.stringify(record.data.title) == JSON.stringify(tappedRecord.title)) {
                    var container = Ext.ComponentQuery.query('#pageContainer')[0];
                    var currentlyPlaying = me.getNowPlaying();
<<<<<<< HEAD
                    var data = record.data;
                    currentlyPlaying.set(data.title, data.artist, data.album, data.genre, true, true);
                    Ext.getCmp('selectorList').hide();
                    me.setActiveButton(me.getNowPlayingButton());
=======
                    currentlyPlaying.title = record.data.title;
                    currentlyPlaying.artist = record.data.artist;
                    currentlyPlaying.album = record.data.album;
                    currentlyPlaying.genre = record.data.genre;
                    currentlyPlaying.onScreen = true;
                    currentlyPlaying.isPlaying = true;
                    Ext.ComponentQuery.query('#centerInfo')[0].hide();
                    me.setActiveButton('#nowPlaying');

                    var selectedData = Ext.ComponentQuery.query('#selectedData')[0];
                    selectedData.setHtml('');

>>>>>>> New styling, Controls for all Buttons
                    var dataContainer = Ext.ComponentQuery.query('#nowPlayingData')[0];
                    dataContainer.setHtml('<span>' + record.data.title + '</span><br />' + record.data.artist + '<br />' + record.data.album);
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
        var selectedData = Ext.ComponentQuery.query('#selectedData')[0];
        selectedData.setHtml('');
    },

    checkPlaying: function() {
            var currentlyPlaying = this.getNowPlaying();
            if (currentlyPlaying.onScreen) {
                Ext.getCmp('selectorList').show();
                currentlyPlaying.onScreen = false;
            }
            this.clearSelectedData();
    },

	select: function(theList, record) {
        console.log('selected');
        // record is the number in the list that was clicked
		var store = Ext.StoreManager.get('Songs');
		var currentlyDisplayed = JSON.stringify(store.getSorters()[1]._id);
        var list = Ext.getCmp('selectorList');
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
<<<<<<< HEAD
        // Ext.getCmp('selectorList').destroy();
        // Ext.ComponentQuery.query('#pageContainer')[0].push({
        //     id: 'centerInfo',
        //     data: data
        // });
=======
>>>>>>> New styling, Controls for all Buttons
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