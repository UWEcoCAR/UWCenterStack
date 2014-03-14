CenterStack.RouteMapping = Backbone.Marionette.AppRouter.extend({
    
    homeApp : null,
    sliderView : null,
    listView : null,

    routes: {
        ""                   : "index",
        "music/"             : "music",
        "music/artist/*args" : "artist",
        "music/album/*args"  : "album",
        "music/song/*args"   : "song"
    },

    index: function() {
        console.log("index");
        this.artist();
    },

    music: function() {
        console.log("index");
        this.artist();
    },

    artist: function(args) {
        console.log("creating Artist", args);
        this.clearApp();
        sliderModel = new SliderModel({
            value : 0
        });

        this.sliderView = new SliderView({
            model: sliderModel,
            equation: function(x) {return Math.pow(Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + 0.5, 1.5);}
        });


        var listCollection = new ListItemCollection();
        this.listView = new CenterStack.WindowListView({
            data: listCollection,
            slider: sliderModel
        });

        listCollection.set([
            {text: "Avenged Sevenfold"},
            {text: "Avicii"},
            {text: "The Black Eyed Peas"},
            {text: "Blackalicious"},
            {text: "Bon Jovi"},
            {text: "Boston"},
            {text: "Bryan Adams"},
            {text: "Cidinho & Doca"},
            {text: "The Clash"},
            {text: "Coldplay"},
            {text: "Daft Punk"},
            {text: "Dire Straits"},
            {text: "Disturbed"},
            {text: "Dobie Gray"},
            {text: "Dr. Dre"},
            {text: "Earth, Wind & Fire"},
            {text: "Elton John"},
            {text: "Eminem"},
            {text: "Europe"},
            {text: "Fat Joe"},
            {text: "Fat Joe featuring Lil' Wayne"},
            {text: "Finger Eleven"},
            {text: "Flobots"},
            {text: "The Fray"},
            {text: "Freestylers"},
            {text: "Game"},
            {text: "Gary Hoey"},
            {text: "George Thorogood & The Destroyers"},
            {text: "Gorillaz"},
            {text: "Gotye"},
            {text: "Grits"},
            {text: "The Hit Crew"},
            {text: "Incubus"},
            {text: "JAY Z"},
            {text: "Johnny Cash, June Carter & Merle Kilgore"},
            {text: "Journey"},
            {text: "Kenny Wayne Shepherd"},
            {text: "Lenny Kravitz"},
            {text: "Macklemore & Ryan Lewis"},
            {text: "Maino"},
            {text: "Marilyn Manson"},
            {text: "Nelly"},
            {text: "Noiseshaper"},
            {text: "Otis Taylor"},
            {text: "Parov Stellar"},
            {text: "Passenger"},
            {text: "Rage Against the Machine"},
            {text: "Red Hot Chili Peppers"},
            {text: "Rise Against"},
            {text: "RJD2"},
            {text: "Royal Crown Revue"},
            {text: "Seasons After"},
            {text: "Shinedown"},
            {text: "Sister Hazel"},
            {text: "Stephen Colbert"},
            {text: "Stone Sour"},
            {text: "Streetlight Manifesto"},
            {text: "Taylor Swift"}
        ]);

///////////
        var sliderModel2 = new SliderModel({
            value : 0
        });

        var sliderView2 = new SliderView({
            model: sliderModel2,
            equation: function(x) {return Math.pow(Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + 0.5, 1.5);}
        });


        var listCollection2 = new ListItemCollection();
        var listView2 = new CenterStack.WindowListView({
            data: listCollection2,
            slider: sliderModel2 
        });

        listCollection2.set([
            {text: "Album 1"},
            {text: "Album 2"},
            {text: "Album 3"},
            {text: "Album 4"}
        ]);

////////

        var me = this;

        // var whichSlider = new CenterStack.SliderPicker({
        //     sliderEquation: function(x) {return Math.pow(Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + 0.5, 1.5);},
        //     numSliders: 5,
        //     sliderHeight: 69,
        //     sliderGap: 17,
        //     sliders: [{
        //         sliderView: me.sliderView,
        //         listView: me.listView
        //     }]
        // });

        var homeModel = new AppModel({
            open: true,
            lists: [{
                listView: me.listView,
                slider: me.sliderView
            }, {
                listView: listView2,
                slider: sliderView2
            }]
        });//contentLeft: this.listView,  sliderPicker: whichSlider, inputZone1: this.sliderView});
        this.homeApp = new CenterStack.AppView({
            model: homeModel,
        });

        $('#appContainer').append(this.homeApp.render().el);
    },

    album: function(args) {
        var artist = args.split("=")[1];

        $('#contentRight').prepend('<br />' + artist);

        /*
        console.log("creating Album", args);
        this.clearApp();
        // create slider
        sliderModel = new SliderModel({
            value : 0
        });

        var sliderView = new SliderView({
            model: sliderModel,
            equation: function(x) {return Math.pow(Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + 0.5, 1.5);}
        });


        var listCollection = new ListItemCollection();
        var listView = new CenterStack.WindowListView({
            data: listCollection,
            slider: sliderModel
        });

        listCollection.set([
            {text: "Album 1"},
            {text: "Album 2"}
        ]);


        var homeModel = new AppModel({open: true, contentLeft: listView,  inputZone2: sliderView});
        this.homeApp = new AppView({model: homeModel, id: '#home'});

        $('#appContainer').append(this.homeApp.render().el);
    },

    song: function(args) {
        console.log("creating Song", args);
        this.clearApp();
        sliderModel = new SliderModel({
            value : 0
        });

        var sliderView = new SliderView({
            model: sliderModel,
            equation: function(x) {return Math.pow(Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + 0.5, 1.5);}
        });


        var listCollection = new ListItemCollection();
        var listView = new CenterStack.WindowListView({
            data: listCollection,
            slider: sliderModel
        });

        listCollection.set([
            {text: "Song 1"},
            {text: "Song 2"}
        ]);


        var homeModel = new AppModel({open: true, contentLeft: listView,  inputZone3: sliderView});
        this.homeApp = new AppView({model: homeModel, id: '#home'});

        $('#appContainer').append(this.homeApp.render().el);
        */
    },

    clearApp: function() {
        if (this.sliderView) {
            this.sliderView.close();
        }
        if (this.listView) {
            this.listView.close();
        }
        if (this.homeApp) {
            this.homeApp.close();
        }
        $('#appContainer').empty();
    }
});