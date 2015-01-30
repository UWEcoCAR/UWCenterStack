# Include npm bin to path. This may not be necessary, but sometimes is an issue.
export PATH=$PATH:/usr/local/share/npm/bin

if [ $(uname) = Darwin ]; then

  # Prepares the repo for running on Mac
  alias uwcs-init='uwcs-global-modules ; uwcs ; sudo npm install'

else

  # Prepares the repo for running on Linux (Ubuntu 13.10)
  alias uwcs-init='uwcs-global-modules ; uwcs-native-modules ; uwcs ; sudo npm install ; ln -s /lib/x86_64-linux-gnu/libudev.so.1 $NW_HOME/libudev.so.0'

  export NW_HOME=$UWCENTERSTACK_HOME/nw

fi

# uwcs - Changes the current directory to the UWCenterStack repo directory
alias uwcs='cd $UWCENTERSTACK_HOME'

# uwcs-global-modules - Installs any npm modules that we want to be globally accessible
alias uwcs-global-modules='uwcs ; sudo npm i -g nw-gyp && sudo npm i -g grunt-cli && sudo npm i -g grunt'

# uwcs-run - Runs the node-webkit vehicle apps in development mode with file watchers
alias uwcs-run='uwcs ; grunt --nodeEnv=development'

uwcs-native-modules() {
    uwcs
    _uwcs-native-modules
}

_uwcs-native-modules() {
    if [ -s node_modules ]; then
        cd node_modules
        for module in `ls`;
        do
            cd $module
            if [ -s binding.gyp ]; then
                nw-gyp rebuild --target=0.8.5
            fi
            _uwcs-native-modules
            cd ..
        done
        cd ..
    fi
}

# uwcs-build - Builds the executable node-webkit vehicle apps
alias uws-build='uwcs ; grunt build'
