Ext.define('feel-your-way.view.SelectorList', {
	extend: 'Ext.dataview.DataView',
	xtype: 'selectorlist',

	config: {
		offset: 192,
		a: .5,
		itemHeight: 48,
		scrollable: {
			disabled: true
		},
		recordNum: null
	},

	initialize: function() {
		this.callParent();
		this.on('refresh', function() {
			this.scroll(this.getOffset() - this.getItemHeight());
			Ext.getCmp('dial-dial').setTheta((this.getOffset() - this.getItemHeight())*Math.PI/Ext.getCmp('dial-dial').getDiameter());
		});
	},

	scroll: function(value, dial) {
		var index = -Math.floor(value/48);
		
		var list = this.getAt(0).element.dom.childNodes;
		var a = this.getA();
		var offset = this.getOffset();

		list[0].parentElement.style.webkitTransform = 'translate3d(0px,' + value + 'px, 0px)';

		var num = this.getOffset()/48 + index;
		for (var i = Math.max(0, num-4); i < Math.min(list.length, num+6); i++){

			// gets the elements distance from the top
			var x = list[i].offsetTop + value;
			// normal curve equation
			var height = 1/(a*Math.pow((2*Math.PI), .5)) * Math.pow(Math.E, -Math.pow((x - offset)/96, 2)/(2* Math.pow(a, 2))) * 12 + 28;
			

			list[i].style.fontSize = height + "px";
			list[i].style.height = height + "px";
			if (x - 10 < offset + 10 && x + list[i].clientHeight + 10 > offset + 10) {
				list[i].classList.add('selected');
				this.setRecordNum(i);
			} else {
				list[i].classList.remove('selected');
			}
		}

		if (dial) {
			if (this.getOffset() - this.getItemHeight() < value) {
				dial.setRotatable('right');
				dial.onEnd();
				this.scroll(this.getOffset() - this.getItemHeight());
			} else if (this.getAt(0).element.getHeight() + value - this.getOffset() < 0) {
				dial.setRotatable('left');
				dial.onEnd();
				this.scroll(-this.getAt(0).element.getHeight() + this.getOffset());
			} else if (dial.getRotatable() !== true) {
				dial.setRotatable(true);
			}
		}
	}
});