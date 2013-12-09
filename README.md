Installation Instructions:
1. Install node.js from http://nodejs.org/

2. Install nodemon:
sudo npm install -g nodemon

3. Install sass: http://sass-lang.com/install

4. Add to .bash_profile: 
export UWCENTERSTACK_HOME=path/to/UWCenterStack
export PATH=$PATH:/usr/local/share/npm/bin
alias uwcs='cd $UWCENTERSTACK_HOME'
alias uwcs-init='uwcs ; npm install ; uwcs-scss ; uwcs-compile-native-library'
alias uwcs-run='uwcs ; npm start'
alias uwcs-debug='uwcs ; nodemon'
alias uwcs-scss='uwcs ; sass public/sass/main.scss >> public/css/main.css'
alias uwcs-compile-native-library='uwcs ; gcc -c -o multiply.o multiply.c ; gcc -dynamiclib -o multiply.dylib multiply.o ; gcc -shared -o multiply.so multiply.o'

5. In a new terminal window, run uwcs-init

Running Webserver:
Run uwcs-run to run the webserver
Run uwcs-debug to run the webserver and have it detect changes to server.js
Run uwcs-scss to compile the sass
Run uwcs-compile-native-library to compile the c files into a library that node can use

Setup in IntelliJ:
Node.js: http://www.jetbrains.com/idea/webhelp/running-and-debugging-node-js.html
SCSS compiling: http://www.jetbrains.com/idea/webhelp/transpiling-sass-less-and-scss-to-css.html
