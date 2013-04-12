Ext.define('UWCenterStack.view.DialSelector', {
	extend: 'Ext.Container',
	requires: ['Ext.dataview.DataView'],

	config: {
		fullscreen: true,
		id: 'music',
		items: [
			{
				xtype: 'selectorlist',
				id: 'list',
				store: 'Songs',
				itemTpl: '<div>{title}</div>',
				itemCls: 'selectorlistitem'
			},
			{
				xtype: 'dial',
				id: 'dial',
				diameter: 400,
			//	top: ,
			//  left: ,
				centered: true
			},
			{
				xtype: 'circlebutton',
				id: 'selectButton',
				src: 'resources/icons/buttonUp.png',
				diameter: 100,
				centered: true,
			}
		],

		listeners: [
			{
				delegate: '#dial',
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
		Ext.getCmp('list').scroll(theta/Math.PI * dial.getDiameter(), dial);
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
		list = Ext.ComponentManager.get('list');
		dial = Ext.ComponentManager.get('dial');

		console.log(list.getItems().items[4].getHtml());

		this.fireEvent('select', list.getItems().items[4].getHtml(), list, dial);
	}
});