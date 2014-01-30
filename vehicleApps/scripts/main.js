global.$ = global.jQuery = $;
global._ = _;
global.Backbone = Backbone;


var homeModel = new AppModel();
var homeApp = new AppView({model: homeModel, id: '#home'});

$('#appContainer').append(homeApp.render().el);