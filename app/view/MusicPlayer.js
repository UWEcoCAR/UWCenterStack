Ext.define('feel-your-way.view.MusicPlayer', {
	extend: 'Ext.Container',
	requires: ['Ext.Audio', 'feel-your-way.view.CircleSlider'],
	xtype: 'musicplayer',

	config: {
		fullscreen: true,

		items: [
			{
				xtype: 'circleslider',
				id: 'timeSlider',
				cls: 'slider',
				diameter: 500,
			},
			{
				xtype: 'audio',
				id: 'audio',
				hidden: true,
				url: 'resources/audio/06 Campus.mp3',
				autoResume: true
			}
		],

		listeners: [
			{
				delegate: '#audio',
				event: 'timeupdate',
				fn: 'updateSlider'
			},
			{
				delegate: '#timeSlider',
				event: 'sliderchange',
				fn: 'updateAudio'
			},
			{
				delegate: '#timeSlider',
				event: 'sliderselect',
				fn: 'pauseAudio'
			}
		]
	},

	updateSlider: function(audio, time) {
		timeSlider = Ext.getCmp('timeSlider');
		timeSlider.setSlider(time/audio.getDuration()*360);
	},

	updateAudio: function(angle, slider) {
		audio = Ext.getCmp('audio');
		audio.setCurrentTime(angle/360*audio.getDuration());
	}
});