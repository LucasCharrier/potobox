'use strict';

angular.module('synology.filestation',['ngStorage'])
.factory('SynologyFileStation', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);