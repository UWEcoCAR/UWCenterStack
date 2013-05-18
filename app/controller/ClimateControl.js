Ext.define('UWCenterStack.controller.ClimateControl', {
	extend: 'Ext.app.Controller',

	config: {
		control: {
            climateApp: {
                initialize: 'restoreState'
            },
			controls: {
				itemtap: 'select'
			},
            homeButton: {
            	tap: 'goHome'
            },
            leftNav: {
            	touchend: 'leftNavSelect'
            },
            rightNav: {
            	touchend: 'rightNavSelect'
            }
//            tempButton: {
//                tap: 'tempSelect'
//            },
//            fanButton: {
//                tap: 'fanSelect'
//            },
//            seatButton: {
//                tap: 'seatSelect'
//            },
//            ventButton: {
//                tap: 'ventSelect'
//            },
//            passDriverButton: {
//                tap: 'passDriverSelect',
//            },
//            acButton: {
//                tap: 'acSelect',
//            },
//            defrostButton: {
//                tap: 'defrostSelect',
//            },
//            circulateButton: {
//                tap: 'circulateSelect',
//            },
//            autoButton: {
//                tap: 'autoSelect',
//            }

		},

		refs: {
            climateApp: 'climatemain[id="climateContainer"]',
            audio: 'audio[id="audio"]',
            controls: 'dialselector[id="climate"]',
			list: 'selectorlist[id="selectorList"]',
            dial: 'dial[id="dial"]',
            timeSlider: '#dial-outer-slider',
            volumeSlider: '#dial-inner-slider',
            // climate controls
            tempButton: 'button[id="tempButton"]',
            fanButton: 'button[id="fanButton"]',
            seatButton: 'button[id="seatButton"]',
            ventButton: 'button[id="ventButton"]',
            passDriverButton: 'button[id="passDriverSwitch"]',
            acButton: 'button[id="acButton"]',
            defrostButton: 'button[id="defrostButton"]',
            circulateButton: 'button[id="circulateButton"]',
            autoButton: 'button[id="autoButton"]',

            leftNav: 'container[id="leftNavClimate"]',
            rightNav: 'container[id="rightNavClimate"]',
            
            // non music controls
            homeButton: 'button[id="climateHomeButton"]'
		},

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

    goHome: function() {
        Ext.getCmp('view').pop(1);
    },

    leftNavSelect : function(obj, mouse) {
    	var x = mouse.browserEvent.clientX;
    	var y = mouse.browserEvent.clientY;
    	var button;
    	if (x < 130) {
    		if (y > 3 && y < 116) {
    			this.goHome();
    		} else if (y > 119 && y < 232) {
    			button = Ext.ComponentQuery.query("#tempButton")[0];
    			this.tempSelect(button);
    		} else if (y > 245 && y < 358) {
    			button = Ext.ComponentQuery.query("#fanButton")[0];
    			this.fanSelect(button);
    		} else if (y > 361 && y < 474) {
    			button = Ext.ComponentQuery.query("#seatButton")[0];
    			this.seatSelect(button);
    		} else if (y > 477 && y < 591) {
    			button = Ext.ComponentQuery.query("#ventButton")[0];
    			this.ventSelect(button);
    		}
    	}
    },

    rightNavSelect : function(obj, mouse) {
    	//disregard x on right for now, no other clickable areas so not a big deal
    	var y = mouse.browserEvent.clientY;
    	var button;
		if (y > 3 && y < 116) {
			button = Ext.ComponentQuery.query("#passDriverSwitch")[0];
			this.passDriverSelect(button);
		} else if (y > 119 && y < 232) {
			button = Ext.ComponentQuery.query("#acButton")[0];
			this.acSelect(button);
		} else if (y > 245 && y < 358) {
			button = Ext.ComponentQuery.query("#defrostButton")[0];
			this.defrostSelect(button);
		} else if (y > 361 && y < 474) {
			button = Ext.ComponentQuery.query("#circulateButton")[0];
			this.circulateSelect(button);
		} else if (y > 477 && y < 591) {
			button = Ext.ComponentQuery.query("#autoButton")[0];
			this.autoSelect(button);
		}
    },
    
    restoreState: function() {
        this.tempSelect(this.getTempButton());
        this.getList().setStore(Ext.getStore('Climates'));
    },

    setActiveButton: function(button) {
        var buttons = Ext.ComponentQuery.query('button');
        for (var i = buttons.length - 1; i >= 0; i--) {
            buttons[i].removeCls('clickedButton');
        };
        button.addCls('clickedButton');

        // reset toggled buttons -TODO
        var toggled = this.getToggledButtons();
       if (toggled.driver) {
             this.getPassDriverButton().addCls('clickedButton');
       }
       if (toggled.circulate) {
             this.getCirculateButton().addCls('clickedButton');
       }
       if (toggled.auto){
            this.getAutoButton().addCls('clickedButton');
       }
       if (toggled.ac){
            this.getAcButton().addCls('clickedButton');
       }
       if (toggled.defrost){
            this.getDefrostButton().addCls('clickedButton');
       }
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
    	var store = Ext.StoreManager.get('Climates');
        this.getList().setItemTpl('<div>{title}</div>');
    	store.loadData('temp');
    },

    fanSelect: function(button) {
        this.setActiveButton(button);
    	var store = Ext.StoreManager.get('Climates');
        this.getList().setItemTpl('<div>{title}</div>');
    	store.loadData('fan');
    },
   
    seatSelect: function(button) {
        this.setActiveButton(button);
    	var store = Ext.StoreManager.get('Climates');
        this.getList().setItemTpl('<div>{title}</div>');
    	store.loadData('seat');
    },

    ventSelect: function(button) {
        this.setActiveButton(button);
    	var store = Ext.StoreManager.get('Climates');
    	this.getList().setItemTpl('<div id="{title}"></div>');
    	store.loadData('vent');
    },

    // need to track separate toggles for passenger/driver?
    // no, i dont think so...
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