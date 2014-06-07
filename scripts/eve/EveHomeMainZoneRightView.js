var EveHomeMainZoneRightView = Backbone.Marionette.ItemView.extend({
    template: '#eveHomeScreenRightTemplate',


    onRender: function() {
        this.$el.find('.mpge .value').text(Controllers.BackendUser ? Math.round(Controllers.BackendUser.getMPGe()) : '');
    }
});