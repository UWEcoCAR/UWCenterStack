Ext.define('UWCenterStack.view.SelectorList', {
	extend: 'Ext.dataview.DataView',
	xtype: 'selectorlist',

	config: {
		offset: 100,
		itemHeight: 28,
		itemMargin: 10,

		a: .5,


		scrollable: {
			disabled: true
		}
	},

	initialize: function() {
		this.callParent();
		this.on('refresh', function() {
			this.scroll(this.getOffset() - this.getItemHeight());
			Ext.getCmp('dial-dial').setTheta((this.getOffset() - this.getItemHeight())*Math.PI/Ext.getCmp('dial-dial').getDiameter());
		});
	},

	scroll: function(value, dial) {
		console.log(value);
		var index = Math.floor(value/(this.getItemHeight() + this.getItemMargin()))

		var listContainer = this.getAt(0); // the thing that we scroll
		var list = listContainer.element.dom.childNodes; // each of the child nodes

		listContainer.element.dom.style.webkitTransform = 'translate3d(0px,' + (value + this.getOffset()) + 'px, 0px)';

		var num = this.getOffset()/(this.getItemHeight() + this.getItemMargin()) + index;
		for (var i = Math.max(0, num - 5); i < Math.min(list.length, list.length + 6); i++){
			var x = list[i].offsetTop + value;

			var a = this.getA();

			var height = 1/(a*Math.pow(2*Math.PI, .5)) * Math.pow(Math.E, -Math.pow((x-this.getOffset())/240, 2)/(2*Math.pow(a, 2))) * 20 + this.getItemHeight();
			list[i].style.fontSize = height + "px";
			list[i].style.height = height + "px";

			// if (x - this.getItemMargin() < this.getOffset() && x + list[i].clientHeight + this.getItemMargin() > this.getOffset()){
			// 	list[i].classList.add('selected');
			// } else {
			// 	list[i].classList.remove('selected');
			// }
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
	}
});