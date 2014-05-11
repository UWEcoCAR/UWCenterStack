IconListItemView = Backbone.Marionette.ItemView.extend({
    template: '#iconListItemTemplate',
    className: 'iconListItem',

    onRender: function() {
        this.$el.copyIn(this.model.get('selector'));
    }
});