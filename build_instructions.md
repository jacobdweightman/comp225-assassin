# How to build to ios :O

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

---

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

_After that works, ask paul for help getting it on actual device!!!_

# How to build to android :|
