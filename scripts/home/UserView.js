var UserView = Backbone.Marionette.ItemView.extend({
    className: 'userView',

    template: function() {
        if (Controllers.User.getUser().has('firstName')) {
            return 'welcome, ' + Controllers.User.getUser().get('firstName');
        } else {
            return '';
        }
    },

    initialize: function() {
        this.listenTo(Controllers.User, 'change', function() {
            this.render();
        });
    }
});