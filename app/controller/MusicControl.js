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
            nowPlayingButton: {
                tap: 'goToNowPlaying'
            },
            homeButton: {
                tap: 'goHome'
            }
		},

		refs: {
			list: '#music',

            // music controls
            artistButton: '#artistButton',
            albumButton: '#albumButton',
            songButton: '#songButton',
            nowPlayingButton: '#nowPlaying',


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
            }
            return notContained;
        });
        list.refresh();
    },

    albumSelect: function(button) {
        console.log('album click');

        var me = this;
        me.setActiveButton(button);
        me.checkPlaying();
        var list = Ext.getCmp('selectorList');
        var template = '{album}';
        var store = Ext.StoreManager.get('Songs');
        store.changeSorting('album', list);
        list.setItemTpl(template);
        var data = me.getCurrentData();

        while(data.length > 0) {
            data.pop();
        }

        store.clearFilter();

        store.filterBy(function(record, id) {        
            var notContained = (me.getCurrentData().indexOf(record.data.album) === -1);
            if (notContained) {
                me.getCurrentData().push(record.data.album);
            }
            return notContained;
        });
        list.refresh();
    },
    

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

        var data = me.getCurrentData();
        while(data.length > 0) {
            data.pop();
        }

        store.clearFilter();

        store.filterBy(function(record, id) {        
            var notContained = (me.getCurrentData().indexOf(record.data.title) === -1);
            if (notContained) {
                me.getCurrentData().push(record.data.title);

            }
            return notContained;
        });
        list.refresh();
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
                notContained = (me.getCurrentData().indexOf(record.data.album) === -1);
                if (notContained && (JSON.stringify(record.data.artist) == JSON.stringify(tappedRecord.artist))) {
                    me.getCurrentData().push(record.data.album);
                }
            } else if (currentlyDisplayed == JSON.stringify('album')) { //album -> display songs on that album
                console.log("was album, display songs");
                notContained = (me.getCurrentData().indexOf(record.data.song) === -1);
                if (notContained && (JSON.stringify(record.data.album) == JSON.stringify(tappedRecord.album))) {
                    me.getCurrentData().push(record.data.title);
                }
            } else {
                if (JSON.stringify(record.data.title) == JSON.stringify(tappedRecord.title)) {
                    var container = Ext.ComponentQuery.query('#pageContainer')[0];
                    var currentlyPlaying = me.getNowPlaying();
                    var data = record.data;
                    currentlyPlaying.set(data.title, data.artist, data.album, data.genre, true, true);
                    Ext.getCmp('selectorList').hide();
                    me.setActiveButton(me.getNowPlayingButton());
                    var dataContainer = Ext.ComponentQuery.query('#nowPlayingData')[0];
                    dataContainer.setHtml('<span>' + record.data.title + '</span><br />' + record.data.artist + '<br />' + record.data.album);
                    // container.push({
                    //     title: 'Now Playing: ' + record.data.title + ' by ' + record.data.artist + ' on the album ' + record.data.album
                    // });
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

    checkPlaying: function() {
            var currentlyPlaying = this.getNowPlaying();
            if (currentlyPlaying.onScreen) {
                Ext.getCmp('selectorList').show();
                currentlyPlaying.onScreen = false;
            }
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
            //store.changeSorting('title', list);
        }
        list.setItemTpl(template);

		var data = this.filterData(store, currentlyDisplayed, tappedRecord);
        // Ext.getCmp('selectorList').destroy();
        // Ext.ComponentQuery.query('#pageContainer')[0].push({
        //     id: 'centerInfo',
        //     data: data
        // });
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