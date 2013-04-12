Ext.define('UWCenterStack.view.SelectorList', {
	extend: 'Ext.dataview.DataView',
	xtype: 'selectorlist',

	config: {

	},

	scroll: function(value, dial) {
		scroller = this.getScrollable().getScroller();
		scroller.scrollTo(0,value);
		var index = Math.floor(value/50);
		
		list = this.getAt(0).element.dom.childNodes;
		var a = .5;
		var offset = 200;

		for (var i = 0; i < list.length; i++){
			x = list[i].offsetTop + parseFloat(list[i].parentElement.parentElement.style.webkitTransform.split(',')[1]);
			height = 1/(a*Math.pow((2*Math.PI), .5)) * Math.pow(Math.E, -Math.pow((x - offset)/100, 2)/(2* Math.pow(a, 2))) * 40 + 30;
			list[i].style.height = list[i].style.fontSize= height + "px";

			if (x - 5 < offset && x + list[i].clientHeight + 5 > offset) {
				list[i].classList.add('selected');
			} else {
				list[i].classList.remove('selected');
			}
		}
	}
});