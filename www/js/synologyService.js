'use strict';
angular.module('synologyServices', ['ngResource'])

.factory('File', ['$resource', function($resource) {
    // var Synology = function(options) {
    //     var syno = this;

    //     // Default options
    //     syno.options = {
    //         host    : 'localhost',
    //         port    : 5000,
    //         secure  : false,
    //         user    : 'admin',
    //         password: 'admin'
    //     };
    // };
     return $resource(''+ 'video/:videoId/:action/', {
        format: 'json'
    }, {
        remove: {
            method: "DELETE",
            params: {
                videoId: "@id"
            }
        },
        import: {
            method: "POST",
            params: {
                action: "import"
            }
        },
        update: {
            method: "PUT",
            params: {
                videoId: "@id"
            }
        },
        delete_picture: {
            method: "DELETE",
            params: {
                videoId: "@id",
                action: "upload_cta_thumbnail"
            }
        },
        get_embed: {
            method: "GET",
            params: {
                videoId: "@id",
                action: "get_embed"
            }
        },
        get_metadata_for_video:{
            method: "GET",
            params: {
                action: "get_metadata_for_video"
            }
        }
    });
}]);
