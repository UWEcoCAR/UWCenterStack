Ext.define('feel-your-way.controller.SelectControl', {
	extend: 'Ext.app.Controller',

	config:{
		refs: {
			select: '#selectButton',
			dial: '#dial-dial',
			outerSlider: '#dial-outer-slider',
			innerSlider: '#dial-inner-slider'
		},

		control: {
			dial: {
				dialrotate: 'dialRotate'
			},
			outerSlider: {
				sliderchange: 'timeChange'
			},
			innerSlider: {
				sliderchange: 'volumeChange'
			}
		}
	},

	volumeChange: function(degree, slider) {
		this.getSelect().setHtml('<p style="text-decoration: underline;">' + Math.floor(degree/3.6 + 1) + '</p>100');
	},

	timeChange: function(degree, slider) {

	},

	dialRotate: function(){
		
	}
})