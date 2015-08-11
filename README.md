Potobox
=========

Get started:
------------

* install Git
* Clone repo : `git clone git@github.com:LucasCharrier/potobox.git` (make sure your account has an SSH keyair, otherwise use HTTPS. More info here: https://help.github.com/articles/which-remote-url-should-i-use)

* install node/npm:
```
install node.js : https://nodejs.org/, will install nodejs and npm to manage node package, but nodejs is not used as server

Then, install the latest Cordova and Ionic : npm install -g cordova ionic

Then follow the Android (http://cordova.apache.org/docs/en/3.3.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide) or Ios (http://cordova.apache.org/docs/en/3.3.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide) to install platform dependencies.

For iOS to use simulator do :  sudo npm -g install ios-sim

sudo gem install compass
npm install
npm install -g bower
bower update
npm install
bower install
```

Sublime Text Setup
--------------------------------------------

* install jshint : sudo npm install -g jshint
* install sublime text 3
* install package manager
* install "sublimelinter"
* install the following linters:
  * "sublimelinter-jshint"
  * "sublimelinter-pylint"
  * "sublimelinter-contrib-scss-lint"
* (for each of them you need to install the related system package in addition to the sublime package)
* override default settings to use 4 spaces indent, and mention usual global vars
(
* create a .jshintrc file in your home folder "/home/<username>":
  * copy paste the one at https://github.com/jshint/jshint/blob/master/examples/.jshintrc
  * change the following lines:
      `"node" : true,
       "jquery" : true,
       "globals"       : {
          "angular" : true
        }`
)


* other sublime packages:
  * "jsFormat" : automatically reformat javascript files
  * "SassBeautify" : automatically reformat scss files
  *  "syntax highlight for sass"