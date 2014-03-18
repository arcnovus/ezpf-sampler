app.controller("ctrlBrandSelect", function ($scope, $log, sampleData) {
    $log.debug("Entering ctrlBrandSelect");
    init();

    function init() {
        $log.debug("Initializing ctrlBrandSelect");
        $log.debug("Assigning sampleData model to current scope");
        $scope.model = sampleData;
        $log.debug("sampleData model assigned to current scope");
        $log.debug("Loading brand list async");
        //$scope.model.brands = $scope.model.getBrands();

        $scope.model.getBrands().then(function (result) {
            $scope.selectMessage = "--Select the device's brand--";
        }, function () {});

        $scope.selectMessage = '--Loading brands.--';
        $scope.showOther = false;
        $scope.disableButton = true;
        //        $scope.model.getBrands().success(function (response) {
        //            $scope.model.brands = response.results;
        //            document.getElementById("ddBrand").options[0].innerHTML = "--Select the device's brand--";
        //            $log.debug("Brand list loaded");
        //        });
        $log.debug("ctrlBrandSelect Initialized");
    };


    $scope.onBrandSelect = function () {
        selectedItem = $scope.model.brand.name;
        if (selectedItem == "other") {
            $scope.model.brand = '';
            $scope.showOther = true;
            $scope.disableButton = true;
        } else if (selectedItem != '') {
            $scope.showOther = false;
            $scope.disableButton = false;
        } else {
            $scope.showOther = false;
            $scope.model.brand = '';
        }
    };

    $scope.onEnterOther = function () {
        if ($scope.model.brand != '') {
            $scope.disableButton = false;
        } else {
            $scope.disableButton = true;
        }

    };

    $scope.onScanTap = function () {
        window.cordova.plugins.barcodeScanner.scan(function (result) {
                if (result.cancelled) {
                    //alert("Scan cancelled.");
                } else {
                    //$scope.scanData = "aaa";
                    $scope.model.scanData = result.text;
                    $scope.model.barcodeFormat = result.format;
                    $scope.model.save().then(function (d) {
                        alert('success!');
                        alert(d);
                        $scope.model.clearData();
                    }, function () {
                        alert('save failed!');
                    });
                }
            },
            function () {
                alert("scanner fail!")
            })
    };

});