Ext.define('feel-your-way.view.SelectorList', {
	extend: 'Ext.dataview.DataView',
	xtype: 'selectorlist',

	config: {
		offset: 200,
		a: .5,
		itemHeight: 50,
		scrollable: {
			disabled: true
		},
		recordNum: null
	},

	initialize: function() {
		this.callParent();
		this.on('refresh', function() {
			this.scroll(this.getOffset() - this.getHeight());
			Ext.getCmp('dial').setTheta((this.getOffset() - this.getHeight())*Math.PI/Ext.getCmp('dial').getDiameter());
		});
	},

	scroll: function(value, dial) {
		var index = Math.floor(value/50);
		
		var list = this.getAt(0).element.dom.childNodes;
		var a = this.getA();
		var offset = this.getOffset();

		list[0].parentElement.style.webkitTransform = 'translate3d(0px,' + value + 'px, 0px)';

		for (var i = 0; i < list.length; i++){

			// gets the elements distance from the top
			var x = list[i].offsetTop + parseFloat(list[i].parentElement.style.webkitTransform.split(',')[1]);
			// normal curve equation
			var height = 1/(a*Math.pow((2*Math.PI), .5)) * Math.pow(Math.E, -Math.pow((x - offset)/100, 2)/(2* Math.pow(a, 2))) * 40 + 30;
			

			list[i].style.fontSize = height + "px";
			list[i].style.height = height + "px";

			if (x - 5 < offset && x + list[i].clientHeight + 5 > offset) {
				list[i].classList.add('selected');
				this.setRecordNum(i);
			} else {
				list[i].classList.remove('selected');
			}
		}

		if (dial) {
			if (this.getOffset() - this.getHeight() < value) {
				dial.setRotatable('left');
				dial.onEnd();
				this.scroll(this.getOffset() - this.getHeight());
			} else if (this.getAt(0).element.getHeight() + value - this.getOffset() - this.getItemHeight() < 0) {
				dial.setRotatable('right');
				dial.onEnd();
				this.scroll(-this.getAt(0).element.getHeight() + this.getOffset() + this.getItemHeight());
			} else if (dial.getRotatable() !== true) {
				dial.setRotatable(true);
			}
		}
	}
});