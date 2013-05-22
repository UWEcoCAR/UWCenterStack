Ext.define('UWCenterStack.config.Config', { 
    singleton : true,
    config : {
        iconSize : '',
    },

    constructor: function(config) {
        this.initConfig(config);

        if(navigator.platform === 'MacIntel' || navigator.platform === 'BlackBerry') {
        	this.setIconSize(113);
        }

        return this;
    }

})  