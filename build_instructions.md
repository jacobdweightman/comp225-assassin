<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>build_instructions</title>
  <link rel="stylesheet" href="https://stackedit.io/style.css" />
</head>

<body class="stackedit">
  <div class="stackedit__html"><h1 id="how-to-download-the-app-on-android--ios">How to Download the App on Android / iOS</h1>
<h2 id="how-to-build-to-ios-🍎">How to build to iOS 🍎</h2>
<p><a href="https://docs.expo.io/versions/latest/expokit/expokit/">https://docs.expo.io/versions/latest/expokit/expokit/</a></p>
<p>Notes:<br>
You need an expo account<br>
You also need XCode downloaded</p>
<p>make ios Bundle identifier, must be different for each team member</p>
<p>Analeidi’s used on Ellen’s expo account:<br>
edu.macalester.assassin.analeidi</p>
<p>ejecting created<br>
\android\<br>
and<br>
\ios\</p>
<p>along with changing package lock and all that junk</p>
<p>we’ll need to install cocoapods, package manager for ios</p>
<p>on ios use gem install with admin</p>
<pre><code>sudo gem install cocoapods
pod install
</code></pre>
<p>When pod install broke,</p>
<pre><code>brew install git-lfs
git lfs install
pod update
</code></pre>
<p>At this point Analeidi’s computer ran out of space</p>
<p>When we get it on xcode, run it on simulator</p>
<p><strong>After that works, ask paul for help getting it on actual device!!!</strong></p>
<h2 id="how-to-build-to-android-🤖">How to build to Android 🤖</h2>
<ol>
<li>
<p>Navigate to the project directory and run</p>
<pre><code> expo build:android
</code></pre>
<p>You will need to be signed in to build. To signin use</p>
<pre><code> expo signin
</code></pre>
<p>and enter your credentials</p>
</li>
<li>
<p>The first time you build it will ask if you wish to upload a keystore or have one generated. Select to have one generated.</p>
<p>If you encounter the error <a href="https://github.com/expo/expo/issues/2115">Error: connect ECONNREFUSED 127.0.0.1:19001</a> run</p>
<ul>
<li><code>expo start</code></li>
<li>Ctrl + c</li>
<li>and try <code>expo build:android</code> again</li>
</ul>
</li>
</ol>
<ol start="3">
<li>Expo should then build your app. It will output a URL where you can monitor the progress of the build. When it is done you should see a message like"<em>Successfully built standalone app: link-to-your-app</em>"</li>
<li>To see your project on Expo go to: <a href="https://expo.io/@coreyjpieper/elcoanja">https://expo.io/@username/project-name</a> and click on ‘builds’. From here you should see a history of all your compelted builds.</li>
</ol>
</div>
</body>

</html>
