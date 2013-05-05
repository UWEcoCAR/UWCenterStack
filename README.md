## Setup Sencha Cmd
* Copy ```Dropbox/ProgrammingResources/Sencha Cmd/sencha``` to ```/bin```
* Install Sencha Cmd using the installer located at ```Dropbox/ProgrammingResources/Sencha Cmd/SenchaCmd-3.1.1.274-osx```

##Setup Ant
* Show the Ant view in Eclipse (Window->Show View->Ant)
* Add the build file (click the +ant icon and select ```UWCenterStack/build.xml```
* Add jsch jar to class path
	* Right-click on UWCenterStack in the Ant view
	* "Run As"
	* "External Tool Configurations..."
	* Go to the "Classpath" tab
	* Click "Add JARs..." button
	* Select "UWCenterStack/lib/jsch-0.1.49.jar"

##Setup simlinks
Good app for Mac: http://www.macupdate.com/app/mac/10433/symboliclinker
Create the following symlinks:
* ```{DropboxFolder}/ProgrammingResources/.sencha -> {GitHubFolder}/UWCenterStack/```
* ```{DropboxFolder}/ProgrammingResources/touch -> {GitHubFolder}/UWCenterStack/```
* ```{DropboxFolder}/ProgrammingResources/lib -> {GitHubFolder}/UWCenterStack/```
* ```{DropboxFolder}/Graphics/FeelYourWay -> {GitHubFolder}/UWCenterStack/resources/icons/ RENAME FellYourWay to graphics```

##Setup SASS
* Install SASS: 
```sudo gem install sass```
* Install Compass: 
```sudo gem install compass```
####Auto-compile SASS to CSS
* ```cd {GitHubFolder}/UWCenterStack/resources/sass/```
* ```compass watch app.scss```
####SASS documentation
http://sass-lang.com/tutorial.html