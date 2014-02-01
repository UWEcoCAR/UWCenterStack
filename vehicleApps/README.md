Vehicle Apps
============

This is the heart and soul of the center stack project. We are using node-webkit to run these apps as a standalone application.

We are in the process of developing Music, Climate Control, and EVE (driver feedback) apps.

Setup
-----

1. Install node.js from http://nodejs.org/ or if you have brew: brew install node
2. Install sass: http://sass-lang.com/install
3. Download node-webkit: https://github.com/rogerwang/node-webkit and place the node-webkit application in your Applications folder.
4. Add to `~/.bash_profile`:
```
export UWCENTERSTACK_HOME=path/to/UWCenterStack <-- REPLACE WITH CORRECT PATH!!!
export PATH=$PATH:/usr/local/share/npm/bin
alias uwcs='cd $UWCENTERSTACK_HOME'
alias uwcs-vehicleApps='cd $UWCENTERSTACK_HOME/vehicleApps'
alias uwcs-init='uwcs-vehicleApps ; npm install'
alias uwcs-run='uwcs-vehicleApps ; export NODE_ENV=development ; grunt'
alias uwcs-build='uwcs-vehicleApps ; grunt build'
```
5. In a new terminal window, run:
```
uwcs-init
```

Running Apps
------------

Run `uwcs-init` to install all node dependencies.
Run `uwcs-run` to open the vehicle apps in a new node-webkit window (with file watchers).
Run `uwcs-build` to build a standalone node-webkit production app.

Developer Notes
---------------

###Organization

The node-webkit entry point is `html/index.html`. Any scripts in the window context should be loaded here.

Everything in `css` should be either generated from sass or be downloaded css that does not need editing.

`sass/main.scss` is the sass file that includes all of the other sass files. Styles for common components should go an a separate file for each component in the `common` folder. Styles specific to each app should go in the respective app's folder. Utility mixins should go in `_mixins.scss`.

The `scripts` folder is setup to mirror the `sass` folder. `main.js` is the Javascript entry point, each app has its own folder, common models and views are in `common`, downloaded dependencies are in `external`, and other modules (such as can and audio) should also have their own folder.

###Contexts
Anything that directly interacts with the DOM should be in the window context and loaded as a script tag in index.html.
Anything that interacts with hardware (the file system, audio, CAN) should be in the Node context and loaded through require().


