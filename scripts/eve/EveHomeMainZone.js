
var EveHomeMainZone = MainZoneLayout.extend({
    id: 'eveHomeMainZone',

    initialize: function() {
        this.userInfo = Controllers.User.getUser();
        this.clockView = new ClockView({title: 'TEMP'});
        var homeModel = new EveModel();
        homeModel.set('greeting', 'hi ' + this.userInfo.get('firstName'));
        homeModel.set('userImage', this.userInfo.get('userImage'));
        homeModel.set('score', this.userInfo.get('score'));
        homeModel.set('improveMessage', this.userInfo.get('improveMessage'));
        this.contentLeftView = new EveHomeMainZoneLeftView({model: homeModel});
        this.contentRightView = new EveHomeMainZoneRightView({model: homeModel});
    },

    onShow: function() {
        this.clock.show(this.clockView);
        this.contentLeft.show(this.contentLeftView);
        this.contentRight.show(this.contentRightView);
    }

});
