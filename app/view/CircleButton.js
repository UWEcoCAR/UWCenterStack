Ext.define('feel-your-way.view.CircleButton', {
	extend: 'Ext.Container',
	xtype: 'circlebutton',

	config: {
		diameter: null,
		cls: 'circleButton',
		defaultHtml: '<div class="select">select</div>',

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
		this.setHtml(this.getDefaultHtml());
	},

	applyHtml: function(html) {
		return html;
	},

	restoreHtml: function() {
		this.setHtml(this.getDefaultHtml());
	}
})