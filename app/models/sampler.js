

var samplerModule = angular.module("samplerModel",[]);

samplerModule.factory("sampleData",function($http){

    var factory = {};
    var parseAppId = '5Md6MIrUHZl05WPqUaBOiIrWaD7HUtCRSdpR1CoU';
    var parseApiKey = 'u5hZVTcAKnjef8lxrD9pfoIJWtBuV3u4RPa3O4n8';
    
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
    
    factory.getBrands = function(){
        
        $http.defaults.headers.common['X-Parse-Application-Id'] = '5Md6MIrUHZl05WPqUaBOiIrWaD7HUtCRSdpR1CoU'; 
        $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'u5hZVTcAKnjef8lxrD9pfoIJWtBuV3u4RPa3O4n8'; 
        return $http.get('https://api.parse.com/1/classes/Brand');
        
    };
    
    factory.save=function(){
        $http.defaults.headers.common['X-Parse-Application-Id'] = '5Md6MIrUHZl05WPqUaBOiIrWaD7HUtCRSdpR1CoU';
        $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'u5hZVTcAKnjef8lxrD9pfoIJWtBuV3u4RPa3O4n8';    
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        
        return $http.post('https://api.parse.com/1/classes/SampleData',getSaveData());
    };
    
    var getSaveData = function(){
        var savedata = "";

        savedata = '{';
        savedata += '"brand":';
        savedata += '"';
        if(factory.brand.name){
        savedata += factory.brand.name;
        }else{
        savedata += factory.brand;
        }
        savedata += '"';
        savedata += ',"scanData":';
        savedata += '"';
        savedata += factory.scanData;
        savedata += '"';
        savedata += ',"barcodeFormat":';
        savedata += '"';
        savedata += factory.barcodeFormat;
        savedata += '"';        
        if(factory.serial != ''){
            savedata += ',"serial":';
            savedata += '"';
            savedata += factory.serial;
            savedata += '"';
        }
                if(factory.productCode != ''){
            savedata += ',"productCode":';
            savedata += '"';
            savedata += factory.productCode;
            savedata += '"';
        }
        if(factory.notes != ''){
            savedata += ',"notes":';
            savedata += '"';
            savedata += factory.notes;
            savedata += '"';
        }

        savedata += '}';
        
        return savedata;
    }
    
    factory.clearData = function(){
        factory.brand = '';
        factory.scanData = '';
        factory.notes = '';
        factory.serial = '';
        factory.productCode = '';
        factory.barcodeFormat = '';
    };
    return factory;
});
