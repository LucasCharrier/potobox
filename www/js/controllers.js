'use strict';
angular.module('starter.controllers', ['synologyServices'])

.controller('DashCtrl', [
  '$scope',
  'File',
  function(
    $scope,
    SynologyService) {

    var Synology = SynologyService.createSynology({
    });
    console.log(Synology);
    Synology.upload({
        file: 'http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg',
        dest_folder_path: '/home'
      }, function(err, data) {
        if (err) throw err;
        console.log(data);
      });
  // $cordovaFile.createFile(cordova.file.dataDirectory, "new_file.txt", true)
  //   .then(function (success) {

  //   console.log('kikou');
  //  }, function (error) {
  //   console.log('error');
  // });
}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
