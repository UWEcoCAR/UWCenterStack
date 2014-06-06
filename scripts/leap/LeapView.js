var LeapView = Backbone.Marionette.ItemView.extend({

    className: 'leapView',
    template: '#leapTemplate',

    initialize: function() {
        this.listenTo(Controllers.Leap, 'enterState:INSIDE_ACTIVE_ZONE', function() {
            this.render();
            Controllers.Gradient.redraw();
            this.$el.find('.dot').addClass('fadeIn');
            this.$el.addClass('fadeIn');
        });
        this.listenTo(Controllers.Leap, 'enterState:GESTURE_MODE', function() {
            this.$el.find('.dot').addClass('active');
        });
        this.listenTo(Controllers.Leap, 'enterState:OUTSIDE_ACTIVE_ZONE', function() {
            this.$el.removeClass('fadeIn');
            this.$el.find('.dot').removeClass('fadeIn').removeClass('active');
        });
        this.listenTo(Controllers.Leap, 'position', function(position) {
            this.$el.find('.dot').css('-webkit-transform', 'translateX(' + position.x * 200 + 'px) translateY(' + -position.y * 200 + 'px) scale(' + (1 + position.z * 0.5) + ')');
        });
        this.listenTo(Controllers.Leap, 'gesture:right', function() {
            if (Controllers.Music.isPlaying()) {
                Controllers.Music.next();
            }
        });
        this.listenTo(Controllers.Leap, 'gesture:left', function() {
            if (Controllers.Music.isPlaying()) {
                Controllers.Music.previous();
            }
        });
        this.listenTo(Controllers.Leap, 'gesture:up', function() {
            console.log('up');
            Controllers.Gradient.toggle();
            console.log('toggle');
//            if (Controllers.Music.isPlaying()) {
//                Controllers.Music.setVolume(Controllers.Music.getVolume() + 0.25);
//            }
        });
        this.listenTo(Controllers.Leap, 'gesture:down', function() {
            if (Controllers.Music.canPause()) {
                Controllers.Music.pause();
            } else if (Controllers.Music.canPlay()) {
                Controllers.Music.play();
            }
//            if (Controllers.Music.isPlaying()) {
//                Controllers.Music.setVolume(Controllers.Music.getVolume() - 0.25);
//            }
        });
    },

    onRender: function() {

        this.$el.find('.iconLeft').html('');
        this.$el.find('.iconRight').html('');
        if (Controllers.Music.isPlaying()) {
            if (Controllers.Music.hasPrevious()) {
                this.$el.find('.iconLeft').copyIn('#previousIcon');
            }
            this.$el.find('.iconRight').copyIn('#nextIcon');
        }

        if (Controllers.Music.canPlay()) {
            this.$el.find('.iconBottom').copyIn('#playIcon');
        } else if (Controllers.Music.canPause()) {
            this.$el.find('.iconBottom').copyIn('#pauseIcon');
        } else {
            this.$el.find('.iconBottom').html('');
        }

        this.$el.find('.iconTop').copyIn('#leafIcon');
    }
});