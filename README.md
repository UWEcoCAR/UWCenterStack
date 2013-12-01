Install node.js from http://nodejs.org/

Install nodemon:
sudo npm install -g nodemon

Add to .bash_profile: 
export UWCENTERSTACK_HOME=path/to/UWCenterStack
export PATH=$PATH:/usr/local/share/npm/bin
alias uwcs='cd $UWCENTERSTACK_HOME'
alias uwcs-init='uwcs ; npm install ; uwcs-scss ; uwcs-compile-native-library'
alias uwcs-run='uwcs ; npm start'
alias uwcs-debug='uwcs ; nodemon'
alias uwcs-scss='uwcs ; sass public/sass/main.scss >> public/css/main.css'
alias uwcs-compile-native-library='uwcs ; gcc -dynamiclib -o multiply.dylib multiply.o ; gcc -c -o multiply.o multiply.c'

