export PATH=$PATH:/usr/local/share/npm/bin
alias uwcs='cd $UWCENTERSTACK_HOME'
alias uwcs-vehicleApps='cd $UWCENTERSTACK_HOME/vehicleApps'
alias uwcs-init-global-modules='uwcs-vehicleApps ; sudo npm i -g nw-gyp && sudo npm i -g grunt-cli && sudo npm i -g grunt && sudo npm install'
alias uwcs-init-mac='uwcs-init-global-modules'
alias uwcs-init-linux='uwcs-init-global-modules ; uwcs ; ln -s /lib/x86_64-linux-gnu/libudev.so.1 ./nw/libudev.so.0'
alias uwcs-run='uwcs-vehicleApps ; export NODE_ENV=development ; grunt'
alias uwcs-run-can='uwcs-vehicleApps ; export NODE_ENV=development ; node scripts/can/canTest.js'
alias uwcs-build='uwcs-vehicleApps ; grunt build'
