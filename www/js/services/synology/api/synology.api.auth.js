'use strict';

angular.module('synology.api',['ngStorage','pbComponents'])
    .factory('SynologyApiAuth', ['$http', '$localStorage', 'pbConstants', function($http, $localStorage, pbConstants){
        var baseUrl = pbConstants.baseUrl;
        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();

        return {
            save: function(data, success, error) {
                $http.post(
                    baseUrl + '/signin',
                    data)
                .success(success)
                .error(error);
            },
            login: function(data, success, error) {
                $http({
                    url : baseUrl + '/auth.cgi',
                    method : 'GET',
                    params : {
                        api : 'SYNO.API.Auth',
                        version : 3,
                        method : 'login',
                        account : data.account,
                        passwd : data.passwd,
                        session : 'test',
                        format : 'sid'
                    }
                }).success(success).error(error);
            },
            me: function(success, error) {
                $http.get(baseUrl + '/me').success(success).error(error);
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                success();
            }
        };
    }
]);