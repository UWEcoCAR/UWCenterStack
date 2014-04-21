centerStack.TopDownListView = Marionette.CollectionView.extend({

    initialize: function(options) {
        // add options as properties
        _.defaults(this, options);

        // add listeners
        this.listenTo(this.leftList, 'change:selected', this.addOne);
        this.listenTo(this.data, 'all', this.render);
        //this.listenTo(this.leftList, 'change:selected', this.render);

        // customize dom
        this.$el
            .addClass('list')
            .append(
                $('<div>').addClass('listScroller')
            );
    },

    render: function() {
        return this;
    },

    //Add items at the beginning of the list
    addOne: function(listItem) {
        // create new view and force it to render, then add it to dom
        var view = new centerStack.ListItemView({model: listItem}).render();
        view.$el.addClass('selected');
        this.$el.find('.listScroller').prepend(view.$el);
    },

    clear: function() {
        this.$el.find('.listScroller').empty();
    }
}); 