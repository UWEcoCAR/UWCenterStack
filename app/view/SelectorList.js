Ext.define('UWCenterStack.view.SelectorList', {
	extend: 'Ext.dataview.DataView',
	xtype: 'selectorlist',

	config: {
		offset: 100,
		itemHeight: 28,
		defaultItemHeight: 28,
		itemMargin: 10,
		defaultItemMargin: 10,
		defaultItemTpl: '<div>{title}</div>',

		dev: 3000,
		recordNum: 0,

		scrollable: {
			disabled: true
		}
	},

	initialize: function() {
		this.callParent();

		// This is a hack for getting around the latest Playbook update
		Ext.util.repeat('setupList', function() {
			Ext.util.cancelRepeatingTask('setupList');
			Ext.getCmp('selectorList').scroll(0);
			Ext.getCmp('dial-dial').setTheta(0);
        }, 1000, false);
		// this.on('refresh', function() {
		// 	this.scroll(0);
		// 	Ext.getCmp('dial-dial').setTheta(0);
		// });
	},

	scroll: function(value, dial) {
		var index = -Math.floor(value/(this.getItemHeight() + this.getItemMargin() * 2));

		var listContainer = this.getAt(0); // the thing that we scroll
		var list = listContainer.element.dom.childNodes; // each of the child nodes

		listContainer.element.dom.style.webkitTransform = 'translate3d(0px,' + (value + this.getOffset()) + 'px, 0px)';
		for (var i = Math.max(0, index - 5); i < Math.min(list.length, index + 8); i++){
			var x = list[i].offsetTop + value;

			var height = 1/Math.pow(2*Math.PI, .5) * Math.pow(Math.E, -Math.pow(x, 2)/(2*this.getDev())) * 2.5 * 15 + this.getItemHeight();
			list[i].style.fontSize = height + "px";
			list[i].style.height = height + "px";

			if (x - this.getItemHeight() - this.getItemMargin() < 0 && x + list[i].clientHeight - this.getItemHeight() + this.getItemMargin() > 0){
				list[i].classList.add('selected');
				this.setRecordNum(i);
			} else {
				list[i].classList.remove('selected');
			}
		}

		if (dial) {
			if (value > 0) { // if list has been scrolled too high
				dial.setRotatable('right');
				dial.onEnd();
				this.scroll(0);
			} else if (listContainer.element.getHeight()  < -value) { // if the list is too low
				dial.setRotatable('left');
				dial.onEnd();
				this.scroll(-listContainer.element.getHeight());
			} else if (dial.getRotatable() !== true){ // it's good, make sure dial can rotate
				dial.setRotatable(true);
			}
		}
	},

	restoreDefaults: function() {
		this.setItemHeight(this.getDefaultItemHeight());
		this.setItemMargin(this.getDefaultItemMargin());
		this.setItemTpl(this.getDefaultItemTpl());
	}
});