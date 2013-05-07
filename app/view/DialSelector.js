Ext.define('feel-your-way.view.DialSelector', {
	extend: 'Ext.Container',
	requires: ['Ext.dataview.DataView'],
	xtype: 'dialselector',

	config: {
		items: [
			{
				xtype: 'multidial',
				id: 'dial',
			 	style: 'position: fixed',
			 	mode: 'dial'
			},
			{
				xtype: 'circlebutton',
				id: 'selectButton'
			},
			{
				xtype: 'selectorlist',
				id: 'selectorList',
				store: 'Songs',
				itemTpl: '{title}',
				itemCls: 'selectorlistitem'
			}
		],

		listeners: [
			{
				delegate: '#dial-dial',
				event: 'dialrotate',
				fn: 'updateList'
			},
			{
				delegate: '#dial',
				event: 'restore',
				fn: 'restore'
			},
			{
				delegate: '#selectButton',
				event: 'tap',
				fn: 'select'
			}
		]
	},

	updateList: function(theta, dial) {
		Ext.getCmp('selectorList').scroll(theta/Math.PI * 100 + 290, dial);
	},

	restore: function(theta, dial){
		// var list = Ext.ComponentManager.get('list');
		// theta = theta/Math.PI*180;
		// if (theta%30 > -15){
		// 	theta = theta - theta%30;
		// } else {
		// 	theta = theta - (30 + theta%30);
		// }
		
		// dial.setTheta(theta/180*Math.PI);
		// dial.set();

		// list.angleChange(-theta, dial);
	},

	select: function() {
		list = Ext.ComponentManager.get('selectorList');
		this.fireEvent('itemtap', list, list.getRecordNum());
	}
});