Ext.define('feel-your-way.controller.ClimateControl', {
	extend: 'Ext.app.Controller',

	config: {
		control: {
            audio: {
                timeupdate: 'updateDial',
                ended: 'nextSong'
            },
            volumeSlider: {
                sliderchange: 'updateVolume'
            },
            timeSlider: {
                sliderchange: 'updateAudio'
            },
			controls: {
				itemtap: 'select'
			},
            homeButton: {
            	tap: 'goHome'
            },
            tempButton: {
                tap: 'tempSelect'
            },
            fanButton: {
                tap: 'fanSelect'
            },
            seatButton: {
                tap: 'seatSelect'
            },
            ventButton: {
                tap: 'ventSelect'
            },
            passDriverButton: {
                tap: 'passDriverSelect',
            },
            acButton: {
                tap: 'acSelect',
            },
            defrostButton: {
                tap: 'defrostSelect',
            },
            circulateButton: {
                tap: 'circulateSelect',
            },
            autoButton: {
                tap: 'autoSelect',
            }

		},

		refs: {
            audio: '#audio',
            controls: '#music',
			list: '#selectorList',
            dial: '#dial',
            timeSlider: '#dial-outer-slider',
            volumeSlider: '#dial-inner-slider',
            // climate controls
            tempButton: '#tempButton',
            fanButton: '#fanButton',
            seatButton: '#seatButton',
            ventButton: '#ventButton',
            passDriverButton: '#passDriverSwitch',
            acButton: '#acButton',
            defrostButton: '#defrostButton',
            circulateButton: '#circulateButton',
            autoButton: '#autoButton',

            // non music controls
            homeButton: '#homeButton'
		},

        currentData: [],
        queue: [],
        queueIndex: null,

        toggledButtons: {
            driver: true, //switch between driver and passenger, default driver
            circulate: false,
            auto: false,
            ac: false,
            defrost: false,

            setAc: function(bool){
                this.ac = bool;
            },
            setAuto: function(bool){
                this.auto = bool;
            },
            setCirculate: function(bool){
                this.circulate = bool;
            },
            setDriver: function(bool){
                this.driver = bool;
            },
            setDefrost: function(bool) {
            	this.defrost = bool;
            }
        }
    },

    goHome: function(button) {
        Ext.Viewport.add([Ext.create('feel-your-way.view.Main', {
            id: 'appContainer',
            fullscreen: true,
        })]);
        var climateView = Ext.ComponentQuery.query('#pageContainer')[0];
        Ext.Viewport.remove(climateView, true);
    },

    setActiveButton: function(button) {
        var buttons = Ext.ComponentQuery.query('button');
        for (var i = buttons.length - 1; i >= 0; i--) {
            buttons[i].removeCls('clickedButton');
        };
        button.addCls('clickedButton');

        // reset toggled buttons -TODO
        var toggled = this.getToggledButtons();
//        if (toggled.repeat) {
//            this.getRepeatButton().addCls('clickedButton');
//        }
//        if (toggled.shuffle) {
//            this.getShuffleButton().addCls('clickedButton');
//        }

    },

    // TODO which ones of these can be the ONLY one on at a time?
    // for example, does defrost cancel other toggle buttons?
    toggleButton: function(button) {
        var toggled = this.getToggledButtons();
        if (button === this.getAcButton()) {
        	var on = toggled.ac;
        	toggled.setAc(!on);
        	if (on) {
        		button.removeCls('clickedButton');
        	} else {
        		button.addCls('clickedButton');
        	}
        } else if (button === this.getAutoButton()) {
        	var on = toggled.auto;
        	toggled.setAuto(!on);
        	if (on) {
        		button.removeCls('clickedButton');
        	} else {
        		button.addCls('clickedButton');
        	}
        } else if (button === this.getCirculateButton()) {
        	var on = toggled.circulate;
        	toggled.setCirculate(!on);
        	if (on) {
        		button.removeCls('clickedButton');
        	} else {
        		button.addCls('clickedButton');
        	}
        } else if (button === this.getPassDriverButton()) {
        	var on = toggled.driver;
        	toggled.setDriver(!on);
        	if (on) {
        		button.removeCls('clickedButton');
        	} else {
        		button.addCls('clickedButton');
        	}
        } else if (button === this.getDefrostButton()) {
        	var on = toggled.defrost;
        	toggled.setDefrost(!on);
        	if (on) {
        		button.removeCls('clickedButton');
        	} else {
        		button.addCls('clickedButton');
        	}
        }
    },

    tempSelect: function(button) {
        this.setActiveButton(button);
    },

    fanSelect: function(button) {
        this.setActiveButton(button);
    },
   
    seatSelect: function(button) {
        this.setActiveButton(button);
    },

    ventSelect: function(button) {
        this.setActiveButton(button);
    },

    passDriverSelect: function(button) {
        this.toggleButton(button);
    },

    acSelect: function(button) {
        this.toggleButton(button);
    },

    defrostSelect: function(button) {
        this.toggleButton(button);
    },

    circulateSelect: function(button) {
        this.toggleButton(button);
    },
    
    autoSelect: function(button) {
    	this.toggleButton(button);
    }
});