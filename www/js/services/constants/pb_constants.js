'use strict';
angular.module('pbComponents',[])
.factory('pbConstants', ['$rootScope', '$location', '$timeout',
    function ($rootScope, $location, $timeout) {
        // ENVIRONEMENT ***************************************/

        /// Calculate API host depending on current url

        // RETURN ***************************************/
        return {
            baseUrl : 'API'
        };
    }
]);
