steroids.view.navigationBar.show("EZPF SAMPLER");

var appDependencies = [];
appDependencies.push("hmTouchEvents");
appDependencies.push("restangular");
appDependencies.push('parstangular');
appDependencies.push("samplerModel");
//appDependencies.push("parseAngular");


var app = angular.module("ezpfSamplerApp", appDependencies);

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    checkConnection();
    //    var deviceInfo = [];
    //    deviceInfo.push(window.device.model);
    //    deviceInfo.push(window.device.uuid);
    //    alert(deviceInfo);
}

function checkConnection() {
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
        alert('Please connect to the interwebs!');
    }

    //
    //    var states = {};
    //    states[Connection.UNKNOWN] = 'Unknown connection';
    //    states[Connection.ETHERNET] = 'Ethernet connection';
    //    states[Connection.WIFI] = 'WiFi connection';
    //    states[Connection.CELL_2G] = 'Cell 2G connection';
    //    states[Connection.CELL_3G] = 'Cell 3G connection';
    //    states[Connection.CELL_4G] = 'Cell 4G connection';
    //    states[Connection.CELL] = 'Cell generic connection';
    //    states[Connection.NONE] = 'No network connection';
    //
    //    alert('Connection type: ' + states[networkState]);
}