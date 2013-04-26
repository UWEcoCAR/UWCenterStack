Ext.define('feel-your-way.view.CircleButton', {
	extend: 'Ext.Container',
	xtype: 'circlebutton',

	config: {
		diameter: null,
		cls: 'circleButton',

		listeners: {
			tap: {
				element: 'element',
				fn: function() {
					this.fireEvent('tap');
				}
			}
		}
	},

	initialize: function() {
		this.callParent();
		this.setHeight(this.getDiameter());
		this.setWidth(this.getDiameter());
	}
})