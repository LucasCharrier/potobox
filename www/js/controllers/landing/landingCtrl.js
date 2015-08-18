'use strict';

/* Controllers */

angular.module('starter')
    .controller('LandingCtrl', [
        '$rootScope',
        '$scope',
        '$location',
        '$localStorage',
        'SynologyApiAuth',
        '$state',
        function(
            $rootScope,
            $scope,
            $location,
            $localStorage,
            SynologyApiAuth,
            $state) {

        SynologyApiAuth.info({},function(){
            console.log('success');
        },function(){
            console.log('error');
        });

        $scope.signin = function() {
            console.log('signin');
            var formData = {
                account: $scope.email,
                passwd: $scope.password
            };

            SynologyApiAuth.login(formData, function(res) {
                console.log(res);
                if (res.type === false) {
                } else {
                    $localStorage.token = res.data.sid;
                    $state.go('tab.dash');
                    console.log($localStorage.token);
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            });
        };

        $scope.signup = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            SynologyApiAuth.save(formData, function(res) {
                if (res.type === false) {
                    alert(res.data);
                } else {
                    $localStorage.token = res.data.token;
                    window.location = '/';
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            });
        };

        $scope.me = function() {
            SynologyApiAuth.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            });
        };

        $scope.logout = function() {
            SynologyApiAuth.logout(function() {
                window.location = '/';
            }, function() {
                alert('Failed to logout!');
            });
        };
        $scope.token = $localStorage.token;
        if($scope.token){
            $state.go('tab.dash');
        }
    }]);