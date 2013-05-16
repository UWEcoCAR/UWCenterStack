Ext.define('UWCenterStack.config.Config', { 
    singleton : true,
    config : {
        iconSize : '',
    },

    constructor: function(config) {
        this.initConfig(config);

        if(navigator.platform === 'MacIntel') {
        	this.setIconSize(113);
        }

        return this;
    }




})  