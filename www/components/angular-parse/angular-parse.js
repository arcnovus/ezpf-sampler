angular.module('ParseServices',[])

.factory('ParseQueryAngular', ['$q', '$timeout',
    function ($q, $timeout) {


        // we use $timeout 0 as a trick to bring resolved promises into the Angular digest
        var angularWrapper = $timeout;

        return function (query, options) {

            // if unspecified, the default function to call is 'find'
            var functionToCall = "find";
            if (!_.isUndefined(options) && !_.isUndefined(options.functionToCall)) {
                functionToCall = options.functionToCall;
            }

            // create a promise to return
            var defer = $q.defer();

            // this is the boilerplate stuff that you would normally have to write for every Parse call
            var defaultParams = [{
                success: function (data) {

                    /* We're using $timeout as an "angular wrapper" that will force a digest
                     * and kind of bring back the data in Angular realm.
                     * You could use the classic $scope.$apply as well but here we don't need
                     * to pass any $scope as a parameter.
                     * Another trick is to inject $rootScope and use $apply on it, but well, $timeout is sexy.
                     */
                    angularWrapper(function () {
                        defer.resolve(data);
                    });
                },
                error: function (data, err) {
                    angularWrapper(function () {
                        defer.reject(err);
                    });
                }
      }];
            // Pass custom params if needed.
            if (options && options.params) {
                defaultParams = options.params.concat(defaultParams);
            }
            if (options && options.mergeParams) {
                defaultParams[0] = _.extend(defaultParams[0], options.mergeParams);
            }

            // this is where the async call is made outside the Angular digest
            query[functionToCall].apply(query, defaultParams);

            return defer.promise;

        };

}]);


angular.module('ExternalDataServices', [])

.factory('ParseAbstractService', ['ParseQueryAngular',
    function (ParseQueryAngular) {
        /********
		This service provides an enhanced Parse.Object and Parse.Collection
		So we can call load and saveParse from any extending Class and have that wrapped
		within ParseQueryAngular
	**********/


        var object = function (originalClass) {
            originalClass.prototype = _.extend(originalClass.prototype, {
                load: function () {
                    return ParseQueryAngular(this, {
                        functionToCall: "fetch"
                    });
                },
                saveParse: function (data) {
                    if (data && typeof data == "object") this.set(data);
                    return ParseQueryAngular(this, {
                        functionToCall: "save",
                        params: [null]
                    });
                }
            });
            return originalClass;
        };

        var collection = function (originalClass) {
            originalClass.prototype = _.extend(originalClass.prototype, {
                load: function () {
                    return ParseQueryAngular(this, {
                        functionToCall: "fetch"
                    });
                }
            });
            return originalClass;
        };


        return {
            EnhanceObject: object,
            EnhanceCollection: collection
        };

}]);



angular.module('ParseServices')

.factory('ExtendParseSDK', ['ParseAbstractService',
    function (ParseAbstractService) {

        Parse.Object.extendAngular = function (options) {
            return ParseAbstractService.EnhanceObject(Parse.Object.extend(options));
        };

        Parse.Collection.extendAngular = function (options) {
            return ParseAbstractService.EnhanceCollection(Parse.Collection.extend(options));
        };

}])

angular.module('ParseServices')
.factory('ParseSDK', function () {

// pro-tip: swap these keys out for PROD keys automatically on deploy using grunt-replace
Parse.initialize("5Md6MIrUHZl05WPqUaBOiIrWaD7HUtCRSdpR1CoU", "u5hZVTcAKnjef8lxrD9pfoIJWtBuV3u4RPa3O4n8");

// FACEBOOK init
//  window.fbPromise.then(function() {
//
//    Parse.FacebookUtils.init({
//
//      // pro-tip: swap App ID out for PROD App ID automatically on deploy using grunt-replace
//      appId: 481650395275919, // Facebook App ID
//      channelUrl: 'http://brandid.github.io/parse-angular-demo/channel.html', // Channel File
//      cookie: true, // enable cookies to allow Parse to access the session
//      xfbml: true, // parse XFBML
//      frictionlessRequests: true // recommended
//
//    });

//});

});



angular.module('ParseServices')

.factory('ParseCloudCodeAngular', ['$q', '$timeout', 'ParseQueryAngular',
    function ($q, $timeout, ParseQueryAngular) {
        return function (name, params) {
            return ParseQueryAngular(Parse.Cloud, {
                functionToCall: "run",
                params: [name, params]
            });
        }
}]);