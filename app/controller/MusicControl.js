Ext.define('UWCenterStack.controller.MusicControl', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			a: '#music'
		},

        control: {
            a: {
                select: 'doSelect'
            }
        },

        currentData: null,
	},

    doSelect: function(text) {
        me = this;
        me.setCurrentData([]);
        Ext.StoreManager.get('Songs').filterBy(function(item){
            i = item;
            if (me.getCurrentData().indexOf(item.data.album) !== -1){
                return false;
            } else {
                me.getCurrentData().push(item.data.album);
                return true;
            }
        });
    },

	select: function() {
		var store = Ext.StoreManager.get('Songs');
		var params = {artist: 'Coldplay', request:'title'}; // this is temporary until this.getParams() is made
		this.filterLibrary(store, params);
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