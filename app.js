//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'feel-your-way': 'app'
});
//</debug>

Ext.application({
    name: 'feel-your-way',
    views: ['Main', 'Dial', 'DialSelector', 'SelectorList', 'CircleButton', 'MusicMain', 'MusicPlayer', 'CircleSlider', 'MultiDial', 'ClimateMain'],
    stores: ['Songs'],
    models: ['Song'],
    controllers: ['AppControl', 'MusicControl', 'SelectControl', 'ClimateControl'],
    requires: ['Ext.Audio', 'Ext.NavigationView'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var view = Ext.create('Ext.NavigationView', {
            id: 'view',
            fullscreen: true,
            showAnimation: 'fadeIn',
            hideAnimation: 'fadeOut',
            navigationBar: false,

            items: [
                {
                    xtype: 'audio',
                    id: 'audio',
                    enableControls: false,
                    hidden: true,
                    volume: .5
                },
                {
                    xtype: 'mainView',
                    id: 'appContainer'
                }
            ],

            control: {
                'button[iconCls="home"]': {
                    tap: 'popTop'
                }
            },

            popTop: function (button, event) {
                console.log('HEEY');
                this.pop(1);
            }
        });
    }
});
