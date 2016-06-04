//票數更新特效
app.directive('textEffects', [function () {
    var obj = {};

    obj.restrict = 'A';
    obj.scope = {
        textEffects: '='
    }

    obj.link = function ($scope, $element, $attr) {
        $scope.$watch('textEffects', function (newVal, oldVal) {
            $element.fadeOut(200).fadeIn(200);
        });
    }

    return obj;
}]);

//自動將畫面移動至使用者所選擇的城市位置
app.directive('autoFocusCity', ['appService', '$timeout', function (appService, $timeout) {
    var focusElement;
    var obj = {};

    obj.restrict = 'A';
    obj.link = function ($scope, $element, $attr) {
        var selectCityNo = appService.getUrlParams().c;     //取得選擇的城市代碼
        var currentCityId = $scope.$eval($attr.autoFocusCity).city_id       //取得每一筆城市開票資料的城市編號

        if (angular.equals(String(selectCityNo), String(currentCityId))) {
            focusElement = $element;
        }

        if ($scope.$last) {     //等待 ng-repeat 完成後再執行移動
            if (focusElement) {
                $timeout(function () {
                    angular.element('html, body').animate({
                        scrollTop: focusElement.offset().top
                    }, 2000, 'easeOutCubic');
                }, 700);
            }
        }
    }

    return obj;
}]);