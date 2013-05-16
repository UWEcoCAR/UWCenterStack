//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'UWCenterStack': 'app'
});
//</debug>

Ext.application({
    name: 'UWCenterStack',
    views: ['Main', 'Dial', 'DialSelector', 'SelectorList', 'CircleButton', 'MusicMain', 'MusicPlayer', 'CircleSlider', 'MultiDial', 'ClimateMain'],
    stores: ['Songs', 'Climates'],
    models: ['Song', 'Climate'],
    controllers: ['AppControl', 'MusicControl', 'SelectControl', 'ClimateControl'],
    requires: ['Ext.Audio', 'Ext.NavigationView'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var view = Ext.create('Ext.NavigationView', {
            id: 'view',
            fullscreen: true,
            showAnimation: 'pop',
            hideAnimation: 'pop',
            navigationBar: false,

            layout: {
                type: 'card',
                animation: {
                    type: 'fade',
                    duration: 300,
                    easing: 'ease',
                }
            },

            items: [
                {
                    xtype: 'audio',
                    id: 'audio',
                    enableControls: false,
                    hidden: true,
                    volume: .5,
                },
                {
                    xtype: 'mainView',
                    id: 'appContainer'
                }
             ],
            control: {
                'button[name="goHome"]': {
                    tap: 'popTop'
                }
            },
            // popTop: function (button, event) {
            //     this.pop(1);
            // }
        });
        
        // http://stackoverflow.com/questions/9602371/periodic-task-execution-in-sencha-touch
        Ext.apply(Ext.util, {  
            repeat: function(taskName, fn, millis, zeroDayExecution) {
               this.tasks = this.tasks || {};  
               if (zeroDayExecution)  
                  fn();  
               return this.tasks[taskName] = window.setInterval(fn, millis);  
           },  
           cancelRepeatingTask: function(taskName) {  
            if (this.tasks) {
              var id = this.tasks[taskName];  
              if (!Ext.isEmpty(id)) {  
                 window.clearInterval(id);  
                 delete this.tasks[taskName];  
              }
            }
           },  
           cancelAllRepeatingTasks: function() {  
            if (this.tasks)  
               Object.keys(this.tasks).forEach(function(key) { 
                                               this.cancelRepeatingTask(key); }, 
                                               this);         
           }  
         });
        
        Ext.define('feel-your-way.view.Container', {
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
        
    },
    
    monthString: function(month) {
        var possible = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return possible[month];
    },
    
    dayString: function(day) {
        var possible = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return possible[day];
    }
});
