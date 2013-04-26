Setup Sencha Cmd
- Copy ```Dropbox/ProgrammingResources/Sencha Cmd/sencha``` to ```/bin```
- Install Sencha Cmd using the installer located at ```Dropbox/ProgrammingResources/Sencha Cmd/SenchaCmd-3.1.1.274-osx```

Setup Ant
- Show the Ant view in Eclipse (Window->Show View->Ant)
- Add the build file (click the +ant icon and select ```UWCenterStack/build.xml```
- Go to the External Tool Configurations (Right-click on UWCenterStack->Run As->External Tool Configurations...)
- Add jsch jar to class path (Classpath tab->Add JARs...->UWCenterStack/lib/jsch-0.1.49.jar)

Setup simlinks (Good app for Mac: http://www.macupdate.com/app/mac/10433/symboliclinker)
- Symlink the ```.sencha, touch, lib``` files located in ```Dropbox/ProgrammingResources/``` to the root of the app