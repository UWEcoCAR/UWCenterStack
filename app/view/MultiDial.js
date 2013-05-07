Ext.define('feel-your-way.view.MultiDial', {
	extend: 'Ext.Container',
	xtype: 'multidial',

	config: {
		cls: 'multidial',
		innerCircleDiameter: null,
		outerCircleDiameter: null,

		innerSlider: null,
		outerSlider: null,
		dial: null,
		mode: 'dial', // or 'slider' 

		listeners: {
			touchstart: {
				element: 'element',
				fn: 'onStart'
			},
			touchmove: {
				element: 'element',
				fn: 'onMove',
			},
			touchend: {
				element: 'element',
				fn: 'onEnd'
			}
		}
	},

	constructor: function(config) {
		this.callParent(arguments);
		this.setWidth(config.outerCircleDiameter);
		this.setHeight(config.outerCircleDiameter);

		var dial = Ext.create('feel-your-way.view.Dial', {
			id: config.id + '-dial',
			cls: 'dial',
			diameter: config.outerCircleDiameter
		});

		var outerSlider = Ext.create('feel-your-way.view.CircleSlider',{
			id: config.id + '-outer-slider',
			cls: 'outer-slider slider',
			diameter: config.outerCircleDiameter
		});

		var innerSlider = Ext.create('feel-your-way.view.CircleSlider',{
			id: config.id + '-inner-slider',
			cls: 'inner-slider slider',
			diameter: config.innerCircleDiameter
		});
		
		innerSlider.setSlider(Ext.getCmp('audio').getVolume() * 360);

		this.setDial(dial);
		this.setOuterSlider(outerSlider);
		this.setInnerSlider(innerSlider);
		this.add([dial, outerSlider, innerSlider]);
		this.updateMode(this.getMode());
	},

	onStart: function(event, element) {
		if (this.getMode()=='dial') this.getDial().onStart(event, this.getDial().element);
		this.getInnerSlider().onStart(event, this.getInnerSlider().element);
		if (this.getMode() == 'slider') this.getOuterSlider().onStart(event, this.getOuterSlider().element);
	},

	onMove: function(event, element) {
		if (this.getMode()=='dial') this.getDial().onMove(event, this.getDial().element);
		this.getInnerSlider().onMove(event, this.getInnerSlider().element);
		if (this.getMode() == 'slider') this.getOuterSlider().onMove(event, this.getOuterSlider().element);
	},

	onEnd: function(event, element) {
		if (this.getMode()=='dial') this.getDial().onStart(event, this.getDial().element);
		this.getInnerSlider().onStart(event, this.getInnerSlider().element);
		if (this.getMode() == 'slider') this.getOuterSlider().onStart(event, this.getOuterSlider().element);
		Ext.getCmp('selectButton').restoreHtml();
	},

	updateMode: function(mode) {
		if (this.getDial() !== null){
			if (mode == 'slider'){
				this.getDial().hide();
				this.getOuterSlider().show();
			} else if( mode == 'dial'){
				this.getDial().show();
				this.getOuterSlider().hide();
			}
		}
	}
});