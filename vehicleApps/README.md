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
alias uwcs-run='uwcs-vehicleApps ; grunt'
alias uwcs-build='uwcs-vehicleApps ; grunt build'
```
5. In a new terminal window, run:
```
uwcs-init
```

Running Apps
------------

Run `uwcs-init` to install all node dependencies
Run `uwcs-run` to open the vehicle apps in a new node-webkit window (with file watchers)
Run `uwcs-build` to build a standalone node-webkit production app
