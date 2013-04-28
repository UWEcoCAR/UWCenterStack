Ext.define('feel-your-way.view.CircleButton', {
	extend: 'Ext.Container',
	xtype: 'circlebutton',

	config: {
		diameter: null,
		cls: 'circleButton',
		html: 'select',

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
	},

	applyHtml: function(html) {
		return '<div style="display:table-row;height:'+this.getDiameter()+'px;"><div style="display:table-cell; text-align: center;vertical-align:middle;width:'+this.getDiameter()+'px;">'+html+'</div></div>'
	}
})