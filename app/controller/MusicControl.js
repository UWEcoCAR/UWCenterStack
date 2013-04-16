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
            }
		},

		refs: {
			list: '#centerInfo',
            artistButton: '#artistButton',
            albumButton: '#albumButton',
            songButton: '#songButton',
            nowPlayingButton: '#nowPlaying'
		},

        currentData: [],
        nowPlaying: {
            onScreen: false,
            isPlaying: false,
            title: '',
            album: '',
            artist: '',
            genre: ''
        }
	},


    goToNowPlaying: function() {
        console.log("now playing was clicked");
        var me = this;
        var playing = me.getNowPlaying();
        if(playing.isPlaying && !playing.onScreen) { // something is playing
            this.setActiveButton('#nowPlaying');
            playing.onScreen = true;
            Ext.ComponentQuery.query('#centerInfo')[0].hide();
        }
    },



    setActiveButton: function(buttonName) {
        var buttons = Ext.ComponentQuery.query('button');
        for (var i = buttons.length - 1; i >= 0; i--) {
            buttons[i].removeCls('clickedButton');
            console.log(buttons[i]);
        };
        var buttonClicked = Ext.ComponentQuery.query(buttonName)[0];
        buttonClicked.addCls('clickedButton');
    },

    // TODO - remove redundancy between artist/album/song select functions
    artistSelect: function() {
        console.log('artist click');
        this.setActiveButton('#artistButton');
        this.checkPlaying();
        var me = this;
        var list = Ext.ComponentQuery.query('#centerInfo')[0];
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

    albumSelect: function() {
        console.log('album click');
        this.setActiveButton('#albumButton');
        this.checkPlaying();
        var me = this;
        var list = Ext.ComponentQuery.query('#centerInfo')[0];
        template = '{album}';
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
    

    songSelect: function() {
        console.log('song click');
        this.setActiveButton('#songButton');
        this.checkPlaying();
        var me = this;
        var list = Ext.ComponentQuery.query('#centerInfo')[0];
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
                    currentlyPlaying.title = record.data.title;
                    currentlyPlaying.artist = record.data.artist;
                    currentlyPlaying.album = record.data.album;
                    currentlyPlaying.genre = record.data.genre;
                    currentlyPlaying.onScreen = true;
                    currentlyPlaying.isPlaying = true;
                    Ext.ComponentQuery.query('#centerInfo')[0].hide();
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
                Ext.ComponentQuery.query('#centerInfo')[0].show();
                currentlyPlaying.onScreen = false;
            }
    },

	select: function(theList, record) {
        // record is the number in the list that was clicked

		var store = Ext.StoreManager.get('Songs');
		var currentlyDisplayed = JSON.stringify(store.getSorters()[1]._id);
        var list = Ext.ComponentQuery.query('#centerInfo')[0];
        var tappedRecord = list.listItems[record]._record._data;

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
        // Ext.ComponentQuery.query('#centerInfo')[0].destroy();
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