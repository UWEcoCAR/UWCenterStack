/**
 * View for music home screen
 */
MusicHomeScreen = ScreenLayout.extend({

    initialize: function() {

        var self = this;

        window.model = this.model;
        
        // back/home button defaults
        this.backButtonView = new BackButtonView();
        this.homeButtonView = new HomeButtonView();
        
        // volume slider
        this.volumeSliderView = new VolumeSliderView();
        
        // driver/passenger and defrost choices
        this.inputZone1View = new SliderButtonsView({
            eventId: 'inputZone1',
            labelLeft: 'USB',
            eventCatcher: '#inputZone1EventCatcher',
            viewId: '',
            vent: this.vent
        });

        this.inputZone2View = new SliderButtonsView({
            eventId: 'inputZone2',
            labelLeft: 'ANALOG',
            eventCatcher: "#inputZone2EventCatcher",
            viewId: '',
            vent: this.vent
        });

        this.inputZone3View = new SliderButtonsView({
            eventId: 'inputZone3',
            labelLeft: 'FUZZ',
            eventCatcher: "#inputZone3EventCatcher",
            viewId: '',
            vent: this.vent
        });

        this.inputZone4View = new SliderView({});
        this.inputZone5View = new SliderView({});

        // default main zone view of music home
        this.renderedMainZoneView = this.mainZoneView = new MusicMainZone({ model: this.model });

        this.vent.on('inputZone1:clickLeft', function() {
            Backbone.history.navigate('musicUSB', { trigger: true});
        }, this);

    },

    onRender: function() {
        this.renderedMainZoneView ? this.mainZoneContent.show(this.renderedMainZoneView) : this.mainZoneContent.close();
        this.backButtonZoneContent.show(this.backButtonView);
        this.homeButtonZoneContent.show(this.homeButtonView);
        this.volumeSliderZoneContent.show(this.volumeSliderView);

        this.inputZone1Content.show(this.inputZone1View);
        this.inputZone2Content.show(this.inputZone2View);
        this.inputZone3Content.show(this.inputZone3View);
        this.inputZone4Content.show(this.inputZone4View);
        this.inputZone5Content.show(this.inputZone5View);
        
    },

    onClose: function() {
        this.vent.off(null, null, this);
    }

});



