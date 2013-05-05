//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'feel-your-way': 'app'
});
//</debug>

Ext.application({
    name: 'feel-your-way',
    views: ['Main', 'Dial', 'DialSelector', 'SelectorList', 'CircleButton', 'MusicMain', 'MusicPlayer', 'CircleSlider', 'MultiDial', 'ClimateMain'],
    stores: ['Songs', 'Climates'],
    models: ['Song', 'Climate'],
    controllers: ['AppControl', 'MusicControl', 'SelectControl', 'ClimateControl'],
    requires: ['Ext.Audio', 'Ext.NavigationView'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var view = Ext.create('Ext.NavigationView', {
            id: 'view',
            fullscreen: true,
            showAnimation: 'pop',
            hideAnimation: 'pop',
            navigationBar: false,

            layout: {
                type: 'card',
                animation: {
                    type: 'fade',
                    duration: 300,
                    easing: 'ease',
                }
            },

            items: [
                {
                    xtype: 'audio',
                    id: 'audio',
                    enableControls: false,
                    hidden: true,
                    volume: .5,
                },
                {
                    xtype: 'mainView',
                    id: 'appContainer'
                }
             ],

            // control: {
            //     'button[id="musicHomeButton"]': {
            //         tap: 'popTop'
            //     },
            //     'button[id="climateHomeButton"]': {
            //         tap: 'popTop'
            //     }
            // },

            // popTop: function (button, event) {
            //     this.pop(1);
            // }
        });
    }
});
