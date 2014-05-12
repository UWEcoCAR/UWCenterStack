var UserController = Marionette.Controller.extend({
    initialize: function() {
        this.model = new Backbone.Model({});
    },

    setUser: function(user) {
        this.model = new Backbone.Model({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        });
        this.trigger('change', this.model);
    },

    getUser: function() {
        return this.model;
    }
});