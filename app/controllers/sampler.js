
app.controller("ctrlBrandSelect", function($scope, sampleData){
    
    init();
    
    function init(){
        $scope.model = sampleData;
        $scope.model.getBrands().success(function(response) {
            $scope.model.brands = response.results;
            //return response.results;
        });
    };
    
    
    
    $scope.onBrandSelect = function(){
        selectedItem = $scope.model.brand.name;
        if(selectedItem == "other"){
            $scope.model.brand ='';
            document.getElementById("otherGroup").style.display="block";
            document.getElementById("btnScan").disabled = true;
        } else if (selectedItem != '') {
            document.getElementById("btnScan").disabled = false;
            document.getElementById("otherGroup").style.display="none";
        } else {
            document.getElementById("otherGroup").style.display="none";
        }
    };
    
    $scope.onEnterOther = function(){
        if($scope.model.brand != '') {
            document.getElementById("btnScan").disabled = false;
        }
        else
        {
            document.getElementById("btnScan").disabled = true;
        }
    
    };
    
    $scope.onScanTap = function(){
    
        window.cordova.plugins.barcodeScanner.scan(function(result) {
        if (result.cancelled) {
          alert("Scan cancelled.");
        } else {
            //$scope.scanData = "aaa";
            $scope.model.scanData = result.text;
            $scope.model.barcodeFormat = result.format;
            $scope.model.save().
            success(function(response){
                alert("success!!");
                $scope.model.clearData();
                }).
            error(function(problem){alert("save fail!");});
        }
      }, function(){alert("fail!")})
    };
    
});