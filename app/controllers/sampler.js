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
            document.getElementById("ddBrand").options[0].innerHTML = "--Select the device's brand--";
        }, function () {});

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
            document.getElementById("otherGroup").style.display = "block";
            document.getElementById("btnScan").disabled = true;
        } else if (selectedItem != '') {
            document.getElementById("btnScan").disabled = false;
            document.getElementById("otherGroup").style.display = "none";
        } else {
            document.getElementById("otherGroup").style.display = "none";
        }
    };

    $scope.onEnterOther = function () {
        if ($scope.model.brand != '') {
            document.getElementById("btnScan").disabled = false;
        } else {
            document.getElementById("btnScan").disabled = true;
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