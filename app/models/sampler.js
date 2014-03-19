var samplerModule = angular.module("samplerModel", ['parstangular', 'ParseServices', 'ExternalDataServices']);
samplerModule.config(function ($httpProvider) {

    var parseAppId = '5Md6MIrUHZl05WPqUaBOiIrWaD7HUtCRSdpR1CoU';
    var parseApiKey = 'u5hZVTcAKnjef8lxrD9pfoIJWtBuV3u4RPa3O4n8';

    $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = parseAppId;
    $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = parseApiKey;
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
});

samplerModule.factory("sampleData", function ($http, parseApi, parseClasses) {

    var factory = {};


    //        [
    //        {name: "hp"},
    //        {name: "lenovo"},
    //        {name: "canon"},
    //        {name: "lexmark"},
    //        {name: "ricoh"},
    //        {name: "other"}
    //    ];

    factory.brand = '';
    factory.scanData = '';
    factory.notes = '';
    factory.serial = '';
    factory.productCode = '';
    factory.barcodeFormat = '';
    factory.brands = '';

    factory.getBrands = function () {

        //var objBrand = parseApi.parseObject('Brand');
        //factory.brands = objBrand.getList().$object;

        //	var Brand = Parse.Object.extendAngular({
        //		className:"Brand",
        //		setName: function(name) {
        //			this.set('name',name);
        //			return this;
        //		},
        //
        //		getName: function(name) {
        //			return this.get('name');
        //		},
        //
        //		destroyParse:function(){
        //			return ParseQueryAngular(this,{functionToCall:"destroy"});
        //		}
        // });

        //var Brands = new Parse.Query(Brand).find().

                var brandPromise = parseClasses.all('Brand').getList({
                 "order": "name"
             });

             factory.brands = brandPromise.$object;
             return brandPromise;


    };

    factory.save = function () {
        //        $http.defaults.headers.common['X-Parse-Application-Id'] = '5Md6MIrUHZl05WPqUaBOiIrWaD7HUtCRSdpR1CoU';
        //        $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'u5hZVTcAKnjef8lxrD9pfoIJWtBuV3u4RPa3O4n8';
        $http.defaults.headers.post['Content-Type'] = 'application/json';


        var sampleData = {};
        sampleData.brand = factory.brand.name ? factory.brand.name : factory.brand;
        sampleData.scanData = factory.scanData ? factory.scanData : null;
        sampleData.serial = factory.serial ? factory.serial : null;
        sampleData.notes = factory.notes ? factory.notes : null;
        sampleData.productCode = factory.productCode ? factory.productCode : null;
        sampleData.barcodeFormat = factory.barcodeFormat ? factory.barcodeFormat : null;

        return parseClasses.all('SampleData').post(sampleData); //$http.post('https://api.parse.com/1/classes/SampleData', getSaveData());
    };

    factory.clearData = function () {
        factory.brand = '';
        factory.scanData = '';
        factory.notes = '';
        factory.serial = '';
        factory.productCode = '';
        factory.barcodeFormat = '';
    };
    return factory;
});