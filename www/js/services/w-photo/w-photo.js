'use strict';

angular.module('pbComponents', [])
    .directive('wPhoto', [
        '$ionicModal',
        '$state',
        '$localStorage',
        '$ionicActionSheet',
        '$cordovaCamera',
        '$cordovaImagePicker',
        '$rootScope',
        function (
            $ionicModal,
            $state,
            $localStorage,
            $ionicActionSheet,
            $cordovaCamera,
            $cordovaImagePicker,
            $rootScope) {
        return {
            // replace: true,
            // scope:{
            //     horseData : '=wHorseData'
            // },
            link: function postLink($scope, element, attrs) {

              $rootScope.$storage = $localStorage;

                 $scope.showLibrary = function() {
               // Show the action sheet
                var hideSheet = $ionicActionSheet.show({
                    destructiveText: 'Supprimer la photo',
                     buttons: [
                           { text: 'Prendre une photo' },
                           { text: 'Choisir une photo' }
                         ],
                         titleText: 'Modifier la photo de profile',
                         cancelText: 'Annuler',
                         cancel: function() {
                              // add cancel code..
                            },
                        buttonClicked: function(index) {
                            if(index === 0){
                                $scope.takePicture();
                            }else{
                                $scope.getPictureFromGallery();
                            }
                           return true;
                        }
               });
            };


                /*/////////// FUNCTION RELATIVE TO MODAL ////////*/
                $ionicModal.fromTemplateUrl('js/services/w-photo/w-photo.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    $scope.modal = modal;
                });

                $scope.openModal = function() {
                    console.log('kikou');
                    $scope.modal.show();
                };
                $scope.closeModal = function() {
                    $scope.modal.hide();
                };
                //Cleanup the modal when we're done with it!
                $scope.$on('$destroy', function() {
                    $scope.modal.remove();
                });
                // Execute action on hide modal
                $scope.$on('modal.hidden', function() {
                // Execute action
                });
                // Execute action on remove modal
                $scope.$on('modal.removed', function() {
                    // Execute action
                });

                $scope.convertImgToBase64URL = function(url, callback, outputFormat){
                    var canvas = document.createElement('CANVAS'),
                        ctx = canvas.getContext('2d'),
                        img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.onload = function(){
                        var dataURL;
                        canvas.height = img.height;
                        canvas.width = img.width;
                        ctx.drawImage(img, 0, 0);
                        dataURL = canvas.toDataURL(outputFormat);
                        callback(dataURL);
                        canvas = null;
                    };
                    img.src = url;
                };

                $scope.getPictureFromGallery = function(){
                    var options = {
                      maximumImagesCount: 1,
                       quality: 80
                    };
                    $cordovaImagePicker.getPictures(options).then(function(results) {
                        var img = convertImgToBase64URL(results[0]);
                        $scope.imgURI = img;
                        $rootScope.$storage.user['picture'] = img;
                      }, function(error) {
                        // error getting photos
                    });
                };

                $scope.takePicture = function() {
                   var options = {
                    quality : 75,
                    destinationType : Camera.DestinationType.DATA_URL,
                    sourceType : Camera.PictureSourceType.CAMERA,
                    allowEdit : true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                  };

                  $cordovaCamera.getPicture(options).then(function(imageData) {
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    $rootScope.$storage.user['picture'] = $scope.imgURI;
                  }, function(err) {
                    // An error occured. Show a message to the user
                  });

                    // Camera.Camera.getPicture().then(function(imageURI) {
                    //   console.log(imageURI);
                    // }, function(err) {
                    //   console.err(err);
                    // });
                };

          }
        };
      }]);
