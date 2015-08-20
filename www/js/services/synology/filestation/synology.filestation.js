'use strict';

angular.module('synology.filestation',['ngStorage'])
.factory('SynologyFileStation', ['$resource','pbConstants','$localStorage',
    function($resource, pbConstants,$localStorage){
        return $resource(pbConstants.baseUrl+'/FileStation/info.cgi', {
            format:'json'
        }, {
        info: {
            method:'GET',
            params:{
                api:'SYNO.FileStation.Info',
                version: 1,
                method: 'getinfo',
                _sid: $localStorage.token
            }
        },
        list:{
            method:'GET',
            params:{
                api:'SYNO.FileStation.List',
                version: 1,
                method:'list_share'
            }
        }
    });
  }]).service('upload',['FileUploader',function(FileUploader){
    var uploader = $scope.uploader = new FileUploader({
        url : '/webapi/FileStation/api_upload.cgi',
        formData : {
            api: 'SYNO.FileStation.Upload',
            version: 1,
            method: 'upload',
            create_parents: true,
            dest_folder_path: '/upload/test',
            _sid: $localStorage.token
        }
    });
  }]);