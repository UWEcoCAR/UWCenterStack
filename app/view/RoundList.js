Ext.define('UWCenterStack.view.RoundList', {
	extend: 'Ext.Container',
	xtype: 'roundlist',

	config: {
		data: null,
		store: null,

		storeEventHooks: {
			beforeload: 'onBeforeLoad',
			load: 'onLoad',
			refresh: 'refresh',
			clear: 'onStoreClear',
			addrecords: 'onStoreAdd',
			removerecords: 'onStoreRemove',
			updaterecord: 'onStoreUpdate'
		},

		centered: true,
		width: 500,
		height: 500,
		diameter: 500,
		id: 'list',
		itemConfig: null,
		n: 11,
	},

	initialize: function() {
		this.callParent();
		for (var i = 0; i < this.getN(); i++) {
			var item = {
				xtype: 'roundlistitem',
				index: i,
				width: this.getItemConfig().width,
				height: this.getItemConfig().height,
			}
			this.add(item);
		}
		this.setHeight(this.getDiameter());
		this.setWidth(this.getDiameter() + this.getItemConfig().width);
	},

	angleChange: function(theta, dial) {
	var	startIndex = this.getItems().items[0].getIndex();
	var index = this.findOffset(theta);

		if (dial) {
			if (index < -4) {
				dial.setRotatable('left');
			} else if (index >= this.getStore().getCount() - 4) {
				dial.setRotatable('right');
			} else {
				dial.setRotatable(true);
			}
		}

		for (var i = index; i < this.getN() + index; i++) {
			item = this.getItems().items[i-index];
			if (i >= 0 && i < this.getStore().getCount()){
				style = 'display: block; -webkit-transform: translate(' + Math.round(-Math.cos(Math.PI/6*(i-index) - Math.PI/6 - (theta/180*Math.PI)%(Math.PI/6)) * 250 - 75 + this.getWidth()/2) + "px, " + 
														  Math.round(-Math.sin(Math.PI/6*(i-index) - Math.PI/6 - (theta/180*Math.PI)%(Math.PI/6)) * 250 + 40 + this.getHeight()/2) + "px);",
				item.setStyle(style);
				item.setHtml(this.getStore().getAt(i).data.title);
			} else {
				item.setStyle('display: none;');
				item.setHtml('');
			}
		}
	},

	findOffset: function(theta) {
		var offset = Math.floor(theta/30) - 4;
		return offset;
	},

	updateData: function(data) {
		var store = this.getStore();
		if (!store) {
			this.setStore(Ext.create('Ext.data.Store', {
				data: data,
				autoDestroy: true,
			}));
		} else {
			store.add(data);
		}
	},

	applyStore: function(store) {
		var me = this;

		if (store) {
			store = Ext.data.StoreManager.lookup(store);
			if (store && Ext.isObject(store) && store.isStore) {
				console.log('binding events!');
				store.on({
					beforeload: 'onBeforeLoad',
					load: 'onLoad',
					refresh: 'refresh',
					scope: this
				});
			} else {
				Ext.Logger.warn("The specified Store cannot be found", this);
			}
		}

		return store;
	},

	updateStore: function(newStore, oldStore) {
		var me = this,
            proxy, reader;

        if (oldStore && Ext.isObject(oldStore) && oldStore.isStore) {
            me.onStoreClear();
            if (oldStore.getAutoDestroy()) {
                oldStore.destroy();
            }
            else {
                oldStore.un(bindEvents);
                proxy = oldStore.getProxy();
                if (proxy) {
                    reader = proxy.getReader();
                    if (reader) {
                        reader.un('exception', 'handleException', this);
                    }
                }
            }
        }

        if (newStore) {
            if (newStore.isLoaded()) {
                this.hasLoadedStore = true;
            }

            if (newStore.isLoading()) {
                me.onBeforeLoad();
            }
            if (me.container) {
                me.refresh();
            }
        }
	},

	onBeforeLoad: function() {
		console.log("onbeforeload");
	},

	onLoad: function(store) {
		console.log('onload');
	},

	refresh: function() {
		console.log('refresh');
		var me = this;

        if (!me.getStore()) {
            return;
        }
        
        me.fireAction('refresh', [me], 'doRefresh');
	},

	doRefresh: function() {
		console.log('doRefresh!');
		var dial = Ext.ComponentManager.get('dial');
		dial.setTheta(0);
		this.angleChange(0, dial);
	}
});