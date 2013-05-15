Ext.define('UWCenterStack.controller.AppControl', {
	extend: 'Ext.app.Controller',

	config: {
		control: {
			homeApp: {
				show: 'wentHome'
			},
            musicAppButton: {
            	tap: 'openMusic'
            },
            climateAppButton: {
            	tap: 'openClimate'
            }
		},

		refs: {
            view: '#view',
            homeApp: '#appContainer',
            musicAppButton: '#musicAppButton',
            climateAppButton: '#climateAppButton',
            diagnosticsAppButton: '#diagnosticsAppButton',
            moreAppsButton: 'appsButton'
		},
		
		
	},
	
	launch: function() {
		var me = this;
        var dateTime =  Ext.getCmp('dateTime');
        Ext.util.repeat('updateTime', function() {
        	var now = new Date();

            var hours = now.getHours();
            var minutes = now.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;

	        var line1 = hours + ':' + minutes + ' ' + ampm;
	        var line2 = me.monthString(now.getMonth()) + ' ' + now.getDate() + ', ' + now.getFullYear();
            var line3 = me.dayString(now.getDay());
	        dateTime.setHtml('<span>' + line1.toLowerCase() + '</span><br />'
	                + line2.toUpperCase() + '<br />'
	                + line3.toUpperCase()
	        );
        }, 60000, true);
	},

	wentHome: function() {
		Ext.getCmp('alreadyHome').addCls('clickedButton');
	},

	openMusic: function() {
		//Ext.util.cancelRepeatingTask('updateTime');
		var musicApp = Ext.create('UWCenterStack.view.MusicMain',{
			id: 'musicContainer',
			fullscreen: true
		});

		this.getView().push(musicApp);
	},

	openClimate: function() {
		//Ext.util.cancelRepeatingTask('updateTime');
		var climateApp = Ext.create('UWCenterStack.view.ClimateMain',{
			id: 'climateContainer',
			fullscreen: true
		});

		this.getView().push(climateApp);
	},
	
    monthString: function(month) {
        var possible = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return possible[month];
    },
    
    dayString: function(day) {
        var possible = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return possible[day];
    }
	
});