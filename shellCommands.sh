# Include npm bin to path. This may not be necessary, but sometimes is an issue.
export PATH=$PATH:/usr/local/share/npm/bin
export UWCENTERSTACK_NW=$UWCENTERSTACK_HOME/nw

# uwcs - Changes the current directory to the UWCenterStack repo directory
alias uwcs='cd $UWCENTERSTACK_HOME'

# uwcs-nw - Changes the current directory to the nw directory
alias uwcs-nw='cd $UWCENTERSTACK_NW'

# uwcs-global-modules - Installs any npm modules that we want to be globally accessible
alias uwcs-global-modules='uwcs ; sudo npm i -g nw-gyp && sudo npm i -g grunt-cli && sudo npm i -g grunt'

# uwcs-init-mac - Prepares the repo for running on Mac
alias uwcs-init-mac='uwcs-global-modules ; uwcs ; sudo npm install'

# uwcs-init-linux - Prepares the repo for running on Linux (x86_64 Ubuntu 13.10)
alias uwcs-init-linux='uwcs-global-modules ; uwcs ; sudo npm install ; uwcs ; ln -s /lib/x86_64-linux-gnu/libudev.so.1 ./nw/libudev.so.0'

# uwcs-run - Runs the node-webkit vehicle apps in development mode with file watchers
alias uwcs-run='uwcs ; grunt --node_env=development'

# uwcs-run-with-leap - Runs the node-webkit vehicle apps with Leap Motion functions enabled
alias uwcs-run-with-leap='uwcs ; grunt --leap=true --node_env=development'

# uwcs-build - Builds the executable node-webkit vehicle apps
alias uwcs-build='uwcs ; grunt build'

uwcs-native-modules() {
    uwcs
    for module in `ls node_modules`;
    do
        uwcs
        cd node_modules/$module
        if [ -s binding.gyp ]; then
            nw-gyp rebuild --target=0.8.5
        fi
    done
    uwcs
}