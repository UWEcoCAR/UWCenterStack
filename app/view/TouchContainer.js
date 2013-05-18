Ext.define('UWCenterStack.view.TouchContainer', {
    extend : 'Ext.Container',
    xtype  : 'touchcontainer',

    initialize : function() {
        this.callParent();

        this.element.on({
            scope    : this,
            touchstart : 'onTouchStart',
            touchend : 'onTouchEnd'
        });
    },

    onTouchEnd : function(e) {
        this.fireEvent('touchend', this, e);
    },
    
    onTouchStart : function(e) {
        this.fireEvent('touchStart', this, e);
    }
}); 