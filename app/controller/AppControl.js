Ext.define('feel-your-way.controller.AppControl', {
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
        	var today = new Date();
        	var timeString= today.toLocaleTimeString();
        	var line1 = timeString.substring(0, timeString.length - 6) + timeString.substring(timeString.length - 3).toLowerCase();
        	
        	// see if the minute has changed
        	if (dateTime.getHtml().split('</span')[0] === '<span>' + line1) {
        		// dont need to update
        	} else {
        		// need to update
    	        var dateString = today.toDateString();
    	        
    	        var line1 = timeString.substring(0, timeString.length - 6) + timeString.substring(timeString.length - 3).toLowerCase();
    	        var line2 = me.monthString(today.getMonth()) + ' ' + today.getDate() + ', ' + dateString.substring(dateString.length - 4).toUpperCase();
    	        dateTime.setHtml('<span>' + line1 + '</span><br />'
    	                + line2.toUpperCase() + '<br />'
    	                + me.dayString(today.getDay()).toUpperCase()
    	        );
        	}
        }, 1000, true);
	},

	wentHome: function() {
		Ext.getCmp('alreadyHome').addCls('clickedButton');
	},

	openMusic: function() {
		//Ext.util.cancelRepeatingTask('updateTime');
		var musicApp = Ext.create('feel-your-way.view.MusicMain',{
			id: 'musicContainer',
			fullscreen: true
		});

		this.getView().push(musicApp);
	},

	openClimate: function() {
		//Ext.util.cancelRepeatingTask('updateTime');
		var climateApp = Ext.create('feel-your-way.view.ClimateMain',{
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