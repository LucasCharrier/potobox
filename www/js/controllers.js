'use strict';

angular.module('starter.controllers', ['pbComponents'])
.controller('DashCtrl', [
    '$scope',
    'SynologyFileStation',
    'FileUploader',
    '$localStorage',
    'pbConstants',
    function(
    $scope,
    SynologyFileStation,
    FileUploader,
    $localStorage,
    pbConstants
    ) {

    var synologyFileStation = new SynologyFileStation();
    synologyFileStation.$info(function(data){
      console.log('success info');
      console.log(data);
    },function(){
      console.log('error info');
    });

    ////// THE UPLOADERS ///////

    //1) angular-file-upload
    var uploader = $scope.uploader = new FileUploader({
        url : pbConstants.baseUrl+ '/FileStation/api_upload.cgi',
        autoUpload:true,
        formData : [
            {api: 'SYNO.FileStation.Upload'},
            {'version': 1},
            {'method': 'upload'},
            {'create_parents': true},
            {'dest_folder_path': '/photo'},
            {'_sid': $localStorage.token}
        ]
    });

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    //2) cordova file upload
    var win = function (r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    };

    var fail = function (error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    };



    ///// CAPTURE ///////////////
    var captureSuccess = function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            var ft = new FileTransfer();
            var options = new FileUploadOptions();
            var params = {
                api: 'SYNO.FileStation.Upload',
                'version': 1,
                'method': 'upload',
                'create_parents': true,
                'dest_folder_path': '/photo',
                '_sid': $localStorage.token
            };
            options.params = params;

            ft.upload(path, encodeURI(pbConstants.baseUrl+ '/FileStation/api_upload.cgi'), win, fail, options);
            //uploader.addToQueue();
            console.log(path);
            // do something interesting with the file
        }
    };

    // capture error callback
    var captureError = function(error) {
      alert('error');
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    $scope.test = function(){
    // start audio capture
      alert('kikou');
      navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:10});
    };

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
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
