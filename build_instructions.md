# How to Download the App on Android / iOS

## How to build to iOS 🍎
https://docs.expo.io/versions/latest/expokit/expokit/

Notes:
You need an expo account
You also need XCode downloaded

make ios Bundle identifier, must be different for each team member

Analeidi's used on Ellen's expo account:
edu.macalester.assassin.analeidi

ejecting created
\\android\\
and
\\ios\\

along with changing package lock and all that junk


we'll need to install cocoapods, package manager for ios

on ios use gem install with admin
```
sudo gem install cocoapods
pod install
```

When pod install broke,

```
brew install git-lfs
git lfs install
pod update
```

At this point Analeidi's computer ran out of space


When we get it on xcode, run it on simulator

__After that works, ask paul for help getting it on actual device!!!__

## How to build to Android 🤖
For more help see https://docs.expo.io/versions/v32.0.0/distribution/building-standalone-apps/

1) Navigate to the project directory and run

		expo build:android
	You will need to be signed in to build. To signin use
	
		expo signin

	and enter your credentials

2) The first time you build it will ask if you wish to upload a keystore or have one generated. Select to have one generated.

	If you encounter the error [Error: connect ECONNREFUSED 127.0.0.1:19001](https://github.com/expo/expo/issues/2115) run
	- ```expo start```
	-  Ctrl + c
	- and try ```expo build:android``` again

3. Expo should then build your app. It will output a URL where you can monitor the progress of the build. When it is done you should see a message like"*Successfully built standalone app: link-to-your-app*"
4. If you plan on submitting the app to the Play Store be sure to save the keystore by doing

		expo fetch:android:keystore
		
	All future updates will need to be signed with this keystore.
	
5. To see your project on Expo go to: [https://expo.io/@username/project-name](https://expo.io/@coreyjpieper/elcoanja) and click on 'builds'. From here you should see a history of all your compelted builds.

