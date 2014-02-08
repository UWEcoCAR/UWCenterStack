# Include npm bin to path. This may not be necessary, but sometimes is an issue.
export PATH=$PATH:/usr/local/share/npm/bin
export UWCENTERSTACK_NW=$UWCENTERSTACK_HOME/nw
export UWCENTERSTACK_VEHICLEAPPS=$UWCENTERSTACK_HOME/vehicleApps
export UWCENTERSTACK_CAN=$UWCENTERSTACK_VEHICLEAPPS/scripts/can

# uwcs - Changes the current directory to the UWCenterStack repo directory
alias uwcs='cd $UWCENTERSTACK_HOME'

# uwcs-vehicleApps - Changes the current directory to the vehiclesApps directory
alias uwcs-vehicleApps='cd $UWCENTERSTACK_VEHICLEAPPS'

# uwcs-nw - Changes the current directory to the nw directory
alias uwcs-nw='cd $UWCENTERSTACK_NW'

# uwcs-can - Changes the current directory to the vehiclesApps/scripts/nw directory
alias uwcs-can='cd $UWCENTERSTACK_CAN'

# uwcs-global-modules - Installs any npm modules that we want to be globally accessable 
alias uwcs-global-modules='uwcs-vehicleApps ; sudo npm i -g nw-gyp && sudo npm i -g grunt-cli && sudo npm i -g grunt'

# uwcs-init-mac - Prepares the repo for running on Mac 
alias uwcs-init-mac='uwcs-global-modules ; uwcs-vehicleApps ; sudo npm install'

# uwcs-init-linux - Prepares the repo for running on Linux (Ubuntu 13.10)
alias uwcs-init-linux='uwcs-global-modules ; uwcs-canInterface ; uwcs-vehicleApps ; sudo npm install ; uwcs ; ln -s /lib/x86_64-linux-gnu/libudev.so.1 ./nw/libudev.so.0'

# uwcs-run - Runs the node-webkit vehicle apps in development mode with file watchers
alias uwcs-run='uwcs-vehicleApps ; export NODE_ENV=development ; grunt'

# uwcs-run-can - Runs the canTest app in development mode
alias uwcs-run-can='uwcs-vehicleApps ; export NODE_ENV=development ; node scripts/can/canTest.js'

# uwcs-build - Builds the executable node-webkit vehicle apps
alias uwcs-build='uwcs-vehicleApps ; grunt build'

# uwcs-canInterface - Compiles the canInterface.c and copies the .so file to can directory
alias uwcs-canInterface='uwcs-can ; cp -fr canInterface.c $CANLIB_HOME ; make -C $CANLIB_HOME ; cp -fr $CANLIB_HOME/libcanlib.so $UWCENTERSTACK_CAN'
