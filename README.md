UWCenterStack
========

The University of Washinton EcoCAR 2 team is competing in the EcoCAR 2 competition a 3 year project to convert a 2013 Chevy Malibu into an advanced hybrid electric vehicle. Part of this project is to completely redesign the touchscreen interface in the car. The UW EcoCAR 2 team has four goals for our center stack:

1. Safe - Touch screens are designed to be looked at while operated. This is unsafe for a driver. Therefore we seek to create interface that minimizes time with eyes off the road.
2. Appealing - Many center stack interfaces lack a certain level of pazazz. We hope to achieve an interface that people will look at and say "Wow, I want that in my car!"
3. Intuitive - A fancy system is useless if the driver cannot figure out how to use it. We are striving to create an interface as easy to pickup as an iPad.
4. Green - EcoCAR 2 is focused on creating a more efficient vehicle. We also want to create more efficient drivers. EVE will help drivers operate the vehicle as efficiently as possible.

This is the heart and soul of the center stack project. We are using node-webkit to run these apps as a standalone application.

We are in the process of developing Music, Climate Control, and EVE (driver feedback) apps.

Setup
-----

1. Install node.js from http://nodejs.org/ or if you have brew: brew install node
2. Install sass: http://sass-lang.com/install
3. Download node-webkit: https://github.com/rogerwang/node-webkit and place the node-webkit binary. For mac move the node-webkit applicaiton into your Applications folder. On Linux, create a nw directory in UWCenterStack and extract the contents of the downloaded package to this new folder.
4. Add to `~/.bash_profile` (Mac) or `~/.bashrc` (Linux):
```
export UWCENTERSTACK_HOME=path/to/UWCenterStack <-- REPLACE WITH CORRECT PATH!!!
export CANLIB_HOME=path/to/canlib <-- LINUX ONLY!!! REPLACE WITH CORRECT PATH!!!
source $UWCENTERSTACK_HOME/shellCommands.sh
```
5. In a new terminal window, run:
```
uwcs-init-mac
```
or
```
uwcs-init-linux
```

If there are additional environment variables you would like to set to be available in node-webkit scope on a Mac,
add them following the instructions [here](http://stackoverflow.com/questions/135688/setting-environment-variables-in-os-x).

Shell Commands
--------------

After the setup, you should be able to run the following commands:

`uwcs` - Changes the current directory to the UWCenterStack repo directory

`uwcs-vehicleApps` - Changes the current directory to the vehiclesApps directory

`uwcs-nw` - Changes the current directory to the nw directory

`uwcs-can` - Changes the current directory to the vehiclesApps/scripts/nw directory

`uwcs-global-modules` - Installs any npm modules that we want to be globally accessable

`uwcs-init-mac` - Prepares the repo for running on Mac 

`uwcs-init-linux` - Prepares the repo for running on Linux (Ubuntu 13.10)

`uwcs-run` - Runs the node-webkit vehicle apps in development mode with file watchers

`uwcs-run-can` - Runs the canTest app in development mode

`uwcs-build` - Builds the executable node-webkit vehicle apps

`uwcs-canInterface` - Compiles the canInterface.c and copies the .so file to can directory

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

###Configuration
You should create a file ```config/development.json``` that includes configuration properties for the application.

Some common configuration properties that should be set include:
```
    MEDIA_PATH,
    CAN_LOGS_DRIVE,
    FEED_TOKEN,
    FEED_SECRET,
    FEED_CLIENT
```


