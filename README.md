# COMP225 Assassin

__A project by:__
* _Analeidi Barrera_
* _Ellen Graham_
* _Corey Pieper_
* _Jacob Weightman_



## Description

Our app is for the real life game Assassin where people try to eliminate one another in the pursuit to be the last one standing. For more information about the game click [here](https://en.wikipedia.org/wiki/Assassin_(game)). Our app is designed to help the game host give the players their target and keep track of who is still in the game. It also facilitates how players declare that they have eliminated their target. An android build can be found [here](https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40egraham2/elcoanja-207dae5dbde141e98c8e589864ba08c4-signed.apk).

## Getting Started

### To build our project to Android:

1. Navigate to the project directory and sign in using:
```
expo signin
```

2. Tell expo to build the project to android using:
```
expo build:android
```

3. The first time you build it will ask if you wish to upload a keystore or have one generated. Select to have one generated. If you encounter the error [Error: connect ECONNREFUSED 127.0.0.1:19001](https://github.com/expo/expo/issues/2115) run `expo start`, Ctrl + c, and then try `expo build:android` again.

4. Expo should then build your app. It will output a URL where you can monitor the progress of the build. When it is done you should see a message like: *Successfully built standalone app: link-to-your-app*
5. If you plan on submitting the app to the Play Store be sure to save the keystore by running `expo fetch:android:keystore`. All future updates will need to be signed with this keystore.

6. To see your project on Expo go to: [https://expo.io/@username/project-name](https://expo.io/@coreyjpieper/elcoanja) and click on 'builds'. From here you should see a history of all your compelted builds.

### To build our project to iOS:
