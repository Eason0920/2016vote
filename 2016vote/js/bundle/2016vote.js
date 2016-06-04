///#source 1 1 /js/public/jquery.mousewheel-3.0.6.pack.js
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function(d){function e(a){var b=a||window.event,c=[].slice.call(arguments,1),f=0,e=0,g=0,a=d.event.fix(b);a.type="mousewheel";b.wheelDelta&&(f=b.wheelDelta/120);b.detail&&(f=-b.detail/3);g=f;b.axis!==void 0&&b.axis===b.HORIZONTAL_AXIS&&(g=0,e=-1*f);b.wheelDeltaY!==void 0&&(g=b.wheelDeltaY/120);b.wheelDeltaX!==void 0&&(e=-1*b.wheelDeltaX/120);c.unshift(a,f,e,g);return(d.event.dispatch||d.event.handle).apply(this,c)}var c=["DOMMouseScroll","mousewheel"];if(d.event.fixHooks)for(var h=c.length;h;)d.event.fixHooks[c[--h]]=
d.event.mouseHooks;d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=c.length;a;)this.addEventListener(c[--a],e,false);else this.onmousewheel=e},teardown:function(){if(this.removeEventListener)for(var a=c.length;a;)this.removeEventListener(c[--a],e,false);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);
///#source 1 1 /js/public/public-tools.js
//XML物件轉字串
var xmlToString = function (xmlObject) {
    var xmlString;
    if (window.ActiveXObject) { // for IE
        xmlString = xmlObject.xml;
        if (!xmlString) {       //for IE9
            xmlString = (new XMLSerializer()).serializeToString(xmlObject);
        }
    } else {
        xmlString = (new XMLSerializer()).serializeToString(xmlObject);
    }
    return xmlString;
}

//強制關閉視窗
var windowClose = function () {
    window.open('', '_self');
    window.close();
}

//取得網站主機名稱
var getWebsiteDomain = function () {
    return top.window.location.protocol + '//' + top.window.location.host;
}

//轉址到第一層根目錄(會保留前一頁的歷史紀錄)
var redirectToRoot = function () {
    top.window.location.href = top.window.location.protocol + '//' + top.window.location.host;
}

//轉址到第一層根目錄(不會保留前一頁的歷史紀錄)
var redirectReplaceToRoot = function () {
    top.window.location.replace(top.window.location.protocol + '//' + top.window.location.host);
}

//利用UserAgent來判斷是否為行動裝置
var isMobileDevice = function () {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4));
}

//檢測IE版本
var detectIEVersion = function (ver) {
    return navigator.appVersion.indexOf('MSIE ' + ver + '.') > -1;
}

//檢視主控台自訂的除錯記錄
//可傳入要查看的物件或使用格式字元傳入多參數(格式字元, 參數)
var watch = function () {
    if (arguments.length > 1) {
        console.debug.apply(console, arguments);
    } else {
        console.debug(arguments[0]);
    }
}

//檢測傳入的物件是否存在並且判斷長度是否大於0或等於傳入物件
var detectObjAndLength = function (obj, content) {
    if (obj) {
        if (content) {
            return (obj == content);
        } else {
            return (obj.length > 0);
        }
    }
    return false;
}

//Line分享資訊至手機
//shareText：要分享的文字
//useOpen：是否使用另開視窗
var lineShare = function (shareText, useOpen) {
    var url = 'http://line.me/R/msg/text/?' + lineShare;
    if (useOpen) {
        top.window.open(url);
    } else {
        top.window.location.href = url;
    }
}

//監聽輸入按鍵是否為數字鍵
var isNumberKeyCode = function (e) {
    if (!((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) ||
        (e.keyCode == 8) || (e.keyCode >= 37 && e.keyCode <= 40))) {
        return false;
    }
    return true;
}
///#source 1 1 /js/public/public-angular-directive.js
var uiDirective = angular.module('uiDirective', []);

/** 
* @description 倒數計時器
* @requires 需先載入 countdown.js 主檔
* @example Html - <div id="myCountdown" countdown="{lastTime: 剩餘秒數, isShow: 是否顯示, src: JS檔路徑,
*                  width: 寬度, height: 高度, completeCallBack: 倒數結束回呼函式}"></div>
*          Json - $scope.countdownParams = {
                        isShow: function () {
                            return return (!tool.checkIEVersion(8)) && ($scope.initJson.vote_second > 0);
                        },
                        params: {
                            lastTime: $scope.initJson.vote_second,
                            width: 320,
                            height: 80,
                            textColor: '#FF0000',
                            startRange: 'hours',
                            completeCallBack: function () {        //倒數計時秒數完成
                                angular.element('#countdownWrap').slideUp();
                            }
                        }
                    }
*/
uiDirective.directive('countdown', [function () {
    var obj = {};
    obj.restrict = 'A';
    obj.scope = {
        countdown: '='
    };
    obj.link = function ($scope, $element, $attr) {
        if ($scope.countdown) {
            if ($scope.countdown.isShow()) {
                new Countdown({
                    time: $scope.countdown.params.lastTime,
                    width: $scope.countdown.params.width,
                    height: $scope.countdown.params.height,
                    rangeHi: $scope.countdown.params.startRange,
                    style: 'flip',
                    target: $attr.id,
                    onComplete: $scope.countdown.params.completeCallBack,
                    labels: {
                        color: $scope.countdown.params.textColor
                    }
                });
            }
        }
    };

    return obj;
}]);

/**
 * @description 使用一般 js 方式開啟 fancybox 燈箱效果
 * @requires 需先載入 fancybox.js 主檔
 * @example html - <input type="button" fancybox="fancyboxParams" value="fancyBox測試" />
 *          json - $scope.fancyboxParams = {
                                    isFile: true,
                                    html: '/html/vote.html',
                                    params: {
                                        type: 'iframe',     //inline or iframe
                                        helpers: {
                                            overlay: {
                                                closeClick: false
                                            }
                                    }
                                        }
                   }
 */
uiDirective.directive('generalFancybox', ['ajax', function (ajax) {
    var obj = {};

    obj.restrict = 'A';
    obj.scope = {
        generalFancybox: '='
    }

    obj.link = function ($scope, $element, $attr) {
        var openBox = function () {
            if (angular.equals($scope.generalFancybox.params.type, 'iframe')) {        //iframe模式，載入指定的外部html檔案後開啟
                $.fancybox($scope.generalFancybox.html, $scope.generalFancybox.params);
            } else if (angular.equals($scope.generalFancybox.params.type, 'inline')) {     //inline模式
                if ($scope.generalFancybox.isFile) {       //指定來源為外部檔案，以非同步方式取得指定的外部html檔案內容後開啟
                    ajax.get($scope.generalFancybox.html).then(function (response) {
                        if (response.status === 200) {
                            $.fancybox(response.data, $scope.generalFancybox.params);
                        }
                    });
                } else {        //指定來源為html字串，直接使用
                    $.fancybox($scope.generalFancybox.html, $scope.generalFancybox.params);
                }
            }
        }

        $element.on('click', openBox);
    }

    return obj;
}]);

/**
 * @description 使用 a 標籤簡易方式開啟 fancybox 燈箱效果
 * @requires 需先載入 fancybox.js 主檔
 * @example html - <a class="fancybox.iframe (fancybox open mode)" href="link (file or http link)" easy-fancybox="params (fancybox config params)"></a>
 *          json - $scope.fancyboxParams = {
                        isOpen: true,
                        params: {
                            helpers: {
                                overlay: {
                                    closeClick: false
                                }
                            }
                        }
                    }
 */
uiDirective.directive('easyFancybox', [function () {
    var obj = {};

    obj.restrict = 'A';
    obj.scope = {
        easyFancybox: '='
    }

    obj.link = function ($scope, $element, $attr) {
        if (angular.isObject($scope.easyFancybox)) {
            if ($scope.easyFancybox.enable && $attr.ngHref) {
                $element.fancybox($scope.easyFancybox.params);
            }
        }
    }

    return obj;
}]);

/**
 * @description Jquery ProgressBar 進度條
 * @requires 需先載入 Jquery ProgressBar UI 主檔
 * @example Html - <div progress-bar="progressValue" progress-style="progressStyle"></div>
            Json - $scope.progressValue = 88        //進度條值
                   $scope.progressStyle = {     //樣式
                        outer: {
                            background: 'none',
                            border: 'none',
                            height: '50px',
                            width: 'auto'
                        },
                        inner: {
                            background: '#af0000',
                            border: 'none',
                            margin: '0'
                        }
    }
 */
uiDirective.directive('progressBar', [function () {
    var obj = {};

    obj.restrict = 'A';
    obj.scope = {
        progressBar: '=',
        progressStyle: '='
    }

    obj.link = function ($scope, $element, $attr) {
        $element.progressbar({
            value: $scope.progressBar,
            max: 100
        }).css($scope.progressStyle.outer)      //外層樣式
            .find('div').css($scope.progressStyle.inner);       //內層樣式

        $scope.$watch('progressBar', function (newVal, oldVal) {
            if (newVal) {
                $element.progressbar('option', 'value', parseInt(newVal, 10));
            }
        });
    }

    return obj;
}]);

/**
 * @description - 讀取程序動畫特效
 * @example - 1. <loader-progress-type2 is-show="true or false" anim-type="1 or 2"></loader-progress-type2>
 *            2. <div loader-progress-type2 is-show="true or false" anim-type="1 or 2"></div>
 * @requires - public-loader-animate.css (css動畫主檔)
 */
uiDirective.directive('loaderProgress', [function () {
    var obj = {}

    obj.restrict = 'AE';
    obj.template = '<div>Loading ...</div>';
    obj.scope = {
        isShow: '=',
        animType: '@'
    }
    obj.link = function ($scope, $element, $attr) {
        $element.find('div').eq(0).addClass('anim-loader-type-' + $scope.animType);
        $scope.$watch('isShow', function (newVal, oldVal) {
            if (newVal) {
                $element.show();
            } else {
                $element.hide();
            }
        });
    }

    return obj;
}]);

var generalDirective = angular.module('generalDirective', []);

/**
* @description - 關注當前目標元素
* @example - <input type="text" focus-me="是否關注(布林值)" />
*/
generalDirective.directive('focusMe', ['$timeout', 'tool', function ($timeout, tool) {
    var obj = {};
    obj.restrict = 'A';
    obj.scope = { focusMe: '=' }
    obj.link = function ($scope, $element, $attr) {
        var checkFocus = function (sw) {
            if (sw) {
                $timeout(function () {
                    $element.focus();
                });
            }
        }

        $scope.$watch('focusMe', checkFocus);
    }

    return obj;
}]);

/**
 * @description - URL網址返回
 * @example - 1. <div url-back hidden-mode="none or hidden"></div>
 *            2. <url-back hidden-mode="none or hidden" />
 */
generalDirective.directive('urlBack', ['$window', '$location', function ($window, $location) {
    var obj = {};
    obj.restrict = 'AE';
    obj.link = function ($scope, $element, $attr) {

        //監聽目前位置若為根目錄，則隱藏返回功能
        $scope.location = $location;
        $scope.$watch('location.url()', function (newVal, oldVal) {

            //判斷隱藏功能是以 display none 或者 visibility hidden 進行隱藏
            if (angular.equals(angular.lowercase($attr.hiddenMode), 'none')) {
                if (angular.equals(newVal, '/')) {
                    $element.hide();
                } else {
                    $element.show();
                }
            } else {
                $element.css('visibility', ((angular.equals(newVal, '/')) ? 'hidden' : 'visible'));
            }
        });

        //點擊返回上一頁
        $element.on('click', function () {
            $window.history.back();
        });
    }

    return obj;
}]);

/**
 * @description - 限制當元素內部捲動時，關閉視窗捲動功能
 */
generalDirective.directive('limitInnerScroll', [function () {
    var obj = {};

    obj.link = function ($scope, $element, $attr) {
        $element.on('mouseover', function () {
            if ($element[0].clientHeight != $element[0].scrollHeight) {
                angular.element('body').css('overflow', 'hidden');
            }
        }).on('mouseout', function (e) {
            angular.element('body').css('overflow', 'auto');
        });
    }

    return obj;
}]);
///#source 1 1 /js/public/public-angular-service.js
//工具service模組
var toolsService = angular.module('toolsService', []);

//HTTP AJAX
toolsService.factory('ajax', ['$http', function ($http) {
    var obj = {};

    obj.get = function (url, params) {
        params = params || {};
        return $http.get(url, { params: params, cache: false }).then(function (response) {
            //成功 response 內容範例：{data: "1", status: 200, config: Object, statusText: "OK"}
            return response;
        }, function (error) {
            //404 error 物件內容範例：{data: Object, status: 404, config: Object, statusText: "Not Found"}
            return error;
        });
    }

    obj.post = function (url, params) {
        return $http.post(url, params, { cache: false }).then(function (response) {
            //成功 response 內容範例：{data: "1", status: 200, config: Object, statusText: "OK"}
            return response;
        }, function (error) {
            //404 error 物件內容範例：{data: Object, status: 404, config: Object, statusText: "Not Found"}
            return error;
        });
    }

    obj.jsonp = function (url, params) {
        params = params || {};
        return $http.jsonp(url, { params: params, cache: false }).then(function (response) {
            //成功 response 內容範例：{data: "1", status: 200, config: Object, statusText: "OK"}
            return response;
        }, function (error) {
            //404 error 物件內容範例：{data: Object, status: 404, config: Object, statusText: "Not Found"}
            return error;
        });
    }

    return obj;
}]);

//一般工具
toolsService.factory('tool', ['$location', '$window', '$rootScope', function ($location, $window, $rootScope) {
    var obj = {};

    //指定 ngRoute 設定的路由路徑
    obj.toRouteUrl = function (path) {
        $location.path(path);
    }

    //Xml 物件轉字串
    obj.xmlToString = function (xmlObject) {
        var xmlString;
        if (window.ActiveXObject) { // for IE
            xmlString = xmlObject.xml;
            if (!xmlString) {       //for IE9
                xmlString = (new XMLSerializer()).serializeToString(xmlObject);
            }
        } else {
            xmlString = (new XMLSerializer()).serializeToString(xmlObject);
        }
        return xmlString;
    }

    //關閉當前視窗
    obj.closeSelfWindow = function () {
        top.window.open('', '_self');
        top.window.close();
    }

    //瀏覽器 Url 處理
    obj.urlHandle = {

        //取得 Url 資訊
        getInfo: {
            absUrl: function () { return $location.absUrl(); },
            protocol: function () { return $location.protocol(); },
            host: function () { return $location.host(); },
            port: function () { return $location.port(); },
            path: function () { return $location.path(); },
            pathAndParams: function () { return $location.url(); },
            params: function () { return $location.search(); },
            domain: function () { return $location.protocol() + '://' + $location.host() + ':' + $location.port(); }
        },

        //設定 Url 路徑與傳送參數(不會觸發Server端)
        setPathWithParams: function (path, params) {
            if (path && params) {
                $location.url(path) + $location.search(params);
            } else if (path) {
                $location.url(path);
            } else if (params) {
                $location.search(params);
            }
        },

        /** 導回第一層根目錄(會觸發Server端)
         * useReplace： true-不會留下歷史紀錄、false-使用一般轉址
         */
        redirectToRoot: function (useReplace) {
            useReplace = ((useReplace) ? useReplace : false);
            if (useReplace) {
                top.window.location.replace(this.getInfo.domain());
            } else {
                top.window.location.href = this.getInfo.domain();
            }
        }
    }

    obj.isMobileDevice = function () {
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4));
    }

    obj.checkIEVersion = function (ver) {
        return navigator.appVersion.indexOf('MSIE ' + ver + '.') > -1;
    }

    //將所要查看的資訊顯示在主控台
    obj.watch = function () {
        if (arguments.length > 1) {
            console.debug.apply(console, arguments);
        } else {
            console.debug(arguments[0]);
        }
    }

    //Line分享資訊至手機
    obj.lineShare = function (shareText, useOpen) {
        var url = 'http://line.me/R/msg/text/?' + lineShare;
        if (useOpen) {
            top.window.open(url);
        } else {
            top.window.location.href = url;
        }
    }

    //監聽輸入按鍵是否為數字鍵
    obj.isNumberKeyCode = function (e) {
        return ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) ||
        (e.keyCode == 8) || (e.keyCode >= 37 && e.keyCode <= 40));
    }

    /**
     * @description - 檢測視窗寬度
     * @returns - 視窗寬度
     */
    obj.detectWindowWidth = function () {
        return $window.innerWidth;
    }

    return obj;
}]);

/**
 * @description 時區處理服務
 */
toolsService.factory('timeZone', ['ajax', '$q', function (ajax, $q) {

    //此key目前使用自己的帳號
    var timeZoneDBApi = { key: 'F6G3G8A2Q4LJ', url: 'http://api.timezonedb.com' }

    /**
     * @description 取得世界各地時區 (使用 https://timezonedb.com/ API)
     * @param zone - 城市所屬時區代碼
     * @param format - 資料回傳格式 (xml or json)
     * @returns 時區資訊物件
     */
    var getTimeZoneInfo = function (zone, format) {
        var defer = $q.defer();

        ajax.jsonp(timeZoneDBApi.url + '?callback=JSON_CALLBACK', {
            zone: zone,
            format: format,
            key: timeZoneDBApi.key
        }).then(function (response) {
            if (angular.equals(response.status, 200) && angular.equals(angular.lowercase(response.data.status), 'ok')) {
                defer.resolve(response.data);
            } else {
                watch(response);
                defer.reject(null);
            }
        });

        return defer.promise;
    }

    return {
        getTimeZoneInfo: getTimeZoneInfo
    }
}]);

//地圖service模組
var mapService = angular.module('mapService', []);

//地理位置資訊service
mapService.factory('geoInfo', ['$q', function ($q) {
    var obj = {};

    /**
     * @description 取得使用者地理位址緯經度資訊
     * @returns 成功 - 回傳緯經度Json資料
     *          失敗 - 0：瀏覽器要求緯經度發生錯誤、-1：瀏覽器不支援地理位置API
     */
    obj.getGeoLatLng = function () {
        var defer = $q.defer();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                defer.resolve({
                    lat: position.coords.latitude,      //緯度
                    lng: position.coords.longitude      //經度
                });
            }, function (error) {
                defer.reject(0);        //瀏覽器要求緯經度發生錯誤(使用者取消)
            });
        } else {
            defer.reject(-1);       //瀏覽器不支援地理位置API
        }

        return defer.promise;
    }

    /**
     * @description 利用緯經度取得使用者地理位址詳細資訊，頁面需先引用 Google Map API
     * @param lat：緯度
     *        lng：經度
     * @returns 成功 - 回傳地理位置Json資料
     *          失敗 - -1：緯經度要求資料發生錯誤
     */
    obj.getGeoCode = function (lat, lng) {
        var defer = $q.defer();
        var geoCoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);
        var geoCodeCallBack = function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                defer.resolve(results);
            } else {
                defer.reject(-1);
            }
        }

        geoCoder.geocode({ latLng: latlng }, geoCodeCallBack);
        return defer.promise;
    }

    return obj;
}]);

//Google Analytics 模組
var gaService = angular.module('gaService', []);

////Google Analytics 服務
gaService.factory('ga', ['$rootScope', '$window', '$location', function ($rootScope, $window, $location) {

    /**
     * @description - 開啟Google Analytics追蹤功能
     * @param trackNo - 追蹤編號
     */
    var openTracking = function (trackNo) {

        //加入Google Analytics主程式，並依據追蹤編號開始追蹤
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName('head')[0]; a.async = 1; a.src = g; m.appendChild(a);
            a.onload = function () {
                $window.ga('create', trackNo, 'auto');
                $window.ga('require', 'linkid', 'linkid.js');       //追蹤自訂事件
                $window.ga('require', 'displayfeatures');       //追蹤客層與興趣報表
                $window.ga('send', 'pageview', {
                    page: $location.path()
                });
            }
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        //監聽路由改變事件並提供路由路徑給Google Analytics進行記錄
        $rootScope.$on('$routeChangeSuccess', function () {
            if ($window.ga) {
                $window.ga('send', 'pageview', {
                    page: $location.path()
                });
            }
        });
    }

    return {
        openTracking: openTracking
    }
}]);
///#source 1 1 /js/public/angular-utf8-base64.js
'use strict';

angular.module('ab-base64',[]).constant('base64', (function() {

    /*
     * Encapsulation of Vassilis Petroulias's base64.js library for AngularJS
     * Original notice included below
     */

    /*
     Copyright Vassilis Petroulias [DRDigit]

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
     */
    var B64 = {
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        lookup: null,
        ie: /MSIE /.test(navigator.userAgent),
        ieo: /MSIE [67]/.test(navigator.userAgent),
        encode: function (s) {
            /* jshint bitwise:false */
            var buffer = B64.toUtf8(s),
                position = -1,
                result,
                len = buffer.length,
                nan0, nan1, nan2, enc = [, , , ];
            
            if (B64.ie) {
                result = [];
                while (++position < len) {
                    nan0 = buffer[position];
                    nan1 = buffer[++position];
                    enc[0] = nan0 >> 2;
                    enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
                    if (isNaN(nan1))
                        enc[2] = enc[3] = 64;
                    else {
                        nan2 = buffer[++position];
                        enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
                        enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
                    }
                    result.push(B64.alphabet.charAt(enc[0]), B64.alphabet.charAt(enc[1]), B64.alphabet.charAt(enc[2]), B64.alphabet.charAt(enc[3]));
                }
                return result.join('');
            } else {
                result = '';
                while (++position < len) {
                    nan0 = buffer[position];
                    nan1 = buffer[++position];
                    enc[0] = nan0 >> 2;
                    enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
                    if (isNaN(nan1))
                        enc[2] = enc[3] = 64;
                    else {
                        nan2 = buffer[++position];
                        enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
                        enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
                    }
                    result += B64.alphabet[enc[0]] + B64.alphabet[enc[1]] + B64.alphabet[enc[2]] + B64.alphabet[enc[3]];
                }
                return result;
            }
        },
        decode: function (s) {
            /* jshint bitwise:false */
            s = s.replace(/\s/g, '');
            if (s.length % 4)
                throw new Error('InvalidLengthError: decode failed: The string to be decoded is not the correct length for a base64 encoded string.');
            if(/[^A-Za-z0-9+\/=\s]/g.test(s))
                throw new Error('InvalidCharacterError: decode failed: The string contains characters invalid in a base64 encoded string.');

            var buffer = B64.fromUtf8(s),
                position = 0,
                result,
                len = buffer.length;

            if (B64.ieo) {
                result = [];
                while (position < len) {
                    if (buffer[position] < 128)
                        result.push(String.fromCharCode(buffer[position++]));
                    else if (buffer[position] > 191 && buffer[position] < 224)
                        result.push(String.fromCharCode(((buffer[position++] & 31) << 6) | (buffer[position++] & 63)));
                    else
                        result.push(String.fromCharCode(((buffer[position++] & 15) << 12) | ((buffer[position++] & 63) << 6) | (buffer[position++] & 63)));
                }
                return result.join('');
            } else {
                result = '';
                while (position < len) {
                    if (buffer[position] < 128)
                        result += String.fromCharCode(buffer[position++]);
                    else if (buffer[position] > 191 && buffer[position] < 224)
                        result += String.fromCharCode(((buffer[position++] & 31) << 6) | (buffer[position++] & 63));
                    else
                        result += String.fromCharCode(((buffer[position++] & 15) << 12) | ((buffer[position++] & 63) << 6) | (buffer[position++] & 63));
                }
                return result;
            }
        },
        toUtf8: function (s) {
            /* jshint bitwise:false */
            var position = -1,
                len = s.length,
                chr, buffer = [];
            if (/^[\x00-\x7f]*$/.test(s)) while (++position < len)
                buffer.push(s.charCodeAt(position));
            else while (++position < len) {
                chr = s.charCodeAt(position);
                if (chr < 128)
                    buffer.push(chr);
                else if (chr < 2048)
                    buffer.push((chr >> 6) | 192, (chr & 63) | 128);
                else
                    buffer.push((chr >> 12) | 224, ((chr >> 6) & 63) | 128, (chr & 63) | 128);
            }
            return buffer;
        },
        fromUtf8: function (s) {
            /* jshint bitwise:false */
            var position = -1,
                len, buffer = [],
                enc = [, , , ];
            if (!B64.lookup) {
                len = B64.alphabet.length;
                B64.lookup = {};
                while (++position < len)
                    B64.lookup[B64.alphabet.charAt(position)] = position;
                position = -1;
            }
            len = s.length;
            while (++position < len) {
                enc[0] = B64.lookup[s.charAt(position)];
                enc[1] = B64.lookup[s.charAt(++position)];
                buffer.push((enc[0] << 2) | (enc[1] >> 4));
                enc[2] = B64.lookup[s.charAt(++position)];
                if (enc[2] === 64)
                    break;
                buffer.push(((enc[1] & 15) << 4) | (enc[2] >> 2));
                enc[3] = B64.lookup[s.charAt(++position)];
                if (enc[3] === 64)
                    break;
                buffer.push(((enc[2] & 3) << 6) | enc[3]);
            }
            return buffer;
        }
    };

    var B64url = {
        decode: function(input) {
            // Replace non-url compatible chars with base64 standard chars
            input = input
                .replace(/-/g, '+')
                .replace(/_/g, '/');

            // Pad out with standard base64 required padding characters
            var pad = input.length % 4;
            if(pad) {
              if(pad === 1) {
                throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
              }
              input += new Array(5-pad).join('=');
            }

            return B64.decode(input);
        },

        encode: function(input) {
            var output = B64.encode(input);
            return output
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .split('=', 1)[0];
        }
    };

    return {
        decode: B64.decode,
        encode: B64.encode,
        urldecode: B64url.decode,
        urlencode: B64url.encode,
    };
})());


///#source 1 1 /js/ui/fancybox2/jquery.fancybox.js
/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
	"use strict";

	var H = $("html"),
		W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		IE =  navigator.userAgent.match(/msie/i),
		didUpdate	= null,
		isTouch		= document.createTouch !== undefined,

		isQuery	= function(obj) {
			return obj && obj.hasOwnProperty && obj instanceof $;
		},
		isString = function(str) {
			return str && $.type(str) === "string";
		},
		isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		},
		isScrollable = function(el) {
			return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
		},
		getScalar = function(orig, dim) {
			var value = parseInt(orig, 10) || 0;

			if (dim && isPercentage(orig)) {
				value = F.getViewport()[ dim ] / 100 * value;
			}

			return Math.ceil(value);
		},
		getValue = function(value, dim) {
			return getScalar(value, dim) + 'px';
		};

	$.extend(F, {
		// The current version of fancyBox
		version: '2.1.5',

		defaults: {
			padding : 15,
			margin  : 20,

			width     : 800,
			height    : 600,
			minWidth  : 100,
			minHeight : 100,
			maxWidth  : 9999,
			maxHeight : 9999,
			pixelRatio: 1, // Set to 2 for retina display support

			autoSize   : true,
			autoHeight : false,
			autoWidth  : false,

			autoResize  : true,
			autoCenter  : !isTouch,
			fitToView   : true,
			aspectRatio : false,
			topRatio    : 0.5,
			leftRatio   : 0.5,

			scrolling : 'auto', // 'auto', 'yes' or 'no'
			wrapCSS   : '',

			arrows     : true,
			closeBtn   : true,
			closeClick : false,
			nextClick  : false,
			mouseWheel : true,
			autoPlay   : false,
			playSpeed  : 3000,
			preload    : 3,
			modal      : false,
			loop       : true,

			ajax  : {
				dataType : 'html',
				headers  : { 'X-fancyBox': true }
			},
			iframe : {
				scrolling : 'auto',
				preload   : true
			},
			swf : {
				wmode: 'transparent',
				allowfullscreen   : 'true',
				allowscriptaccess : 'always'
			},

			keys  : {
				next : {
					13 : 'left', // enter
					34 : 'up',   // page down
					39 : 'left', // right arrow
					40 : 'up'    // down arrow
				},
				prev : {
					8  : 'right',  // backspace
					33 : 'down',   // page up
					37 : 'right',  // left arrow
					38 : 'down'    // up arrow
				},
				close  : [27], // escape key
				play   : [32], // space - start/stop slideshow
				toggle : [70]  // letter "f" - toggle fullscreen
			},

			direction : {
				next : 'left',
				prev : 'right'
			},

			scrollOutside  : true,

			// Override some properties
			index   : 0,
			type    : null,
			href    : null,
			content : null,
			title   : null,

			// HTML templates
			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image    : '<img class="fancybox-image" src="{href}" alt="" />',
				iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
				error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect  : 'fade', // 'elastic', 'fade' or 'none'
			openSpeed   : 250,
			openEasing  : 'swing',
			openOpacity : true,
			openMethod  : 'zoomIn',

			// Closing fancyBox
			closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed   : 250,
			closeEasing  : 'swing',
			closeOpacity : true,
			closeMethod  : 'zoomOut',

			// Changing next gallery item
			nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
			nextSpeed  : 250,
			nextEasing : 'swing',
			nextMethod : 'changeIn',

			// Changing previous gallery item
			prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
			prevSpeed  : 250,
			prevEasing : 'swing',
			prevMethod : 'changeOut',

			// Enable default helpers
			helpers : {
				overlay : true,
				title   : true
			},

			// Callbacks
			onCancel     : $.noop, // If canceling
			beforeLoad   : $.noop, // Before loading
			afterLoad    : $.noop, // After loading
			beforeShow   : $.noop, // Before changing in current item
			afterShow    : $.noop, // After opening
			beforeChange : $.noop, // Before changing gallery item
			beforeClose  : $.noop, // Before closing
			afterClose   : $.noop  // After closing
		},

		//Current state
		group    : {}, // Selected group
		opts     : {}, // Group options
		previous : null,  // Previous element
		coming   : null,  // Element being loaded
		current  : null,  // Currently loaded element
		isActive : false, // Is activated
		isOpen   : false, // Is currently open
		isOpened : false, // Have been fully opened at least once

		wrap  : null,
		skin  : null,
		outer : null,
		inner : null,

		player : {
			timer    : null,
			isActive : false
		},

		// Loaders
		ajaxLoad   : null,
		imgPreload : null,

		// Some collections
		transitions : {},
		helpers     : {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			if (!group) {
				return;
			}

			if (!$.isPlainObject(opts)) {
				opts = {};
			}

			// Close if already active
			if (false === F.close(true)) {
				return;
			}

			// Normalize group
			if (!$.isArray(group)) {
				group = isQuery(group) ? $(group).get() : [group];
			}

			// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
			$.each(group, function(i, element) {
				var obj = {},
					href,
					title,
					content,
					type,
					rez,
					hrefParts,
					selector;

				if ($.type(element) === "object") {
					// Check if is DOM element
					if (element.nodeType) {
						element = $(element);
					}

					if (isQuery(element)) {
						obj = {
							href    : element.data('fancybox-href') || element.attr('href'),
							title   : element.data('fancybox-title') || element.attr('title'),
							isDom   : true,
							element : element
						};

						if ($.metadata) {
							$.extend(true, obj, element.metadata());
						}

					} else {
						obj = element;
					}
				}

				href  = opts.href  || obj.href || (isString(element) ? element : null);
				title = opts.title !== undefined ? opts.title : obj.title || '';

				content = opts.content || obj.content;
				type    = content ? 'html' : (opts.type  || obj.type);

				if (!type && obj.isDom) {
					type = element.data('fancybox-type');

					if (!type) {
						rez  = element.prop('class').match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (isString(href)) {
					// Try to guess the content type
					if (!type) {
						if (F.isImage(href)) {
							type = 'image';

						} else if (F.isSWF(href)) {
							type = 'swf';

						} else if (href.charAt(0) === '#') {
							type = 'inline';

						} else if (isString(element)) {
							type    = 'html';
							content = element;
						}
					}

					// Split url into two pieces with source url and content selector, e.g,
					// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
					if (type === 'ajax') {
						hrefParts = href.split(/\s+/, 2);
						href      = hrefParts.shift();
						selector  = hrefParts.shift();
					}
				}

				if (!content) {
					if (type === 'inline') {
						if (href) {
							content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

						} else if (obj.isDom) {
							content = element;
						}

					} else if (type === 'html') {
						content = href;

					} else if (!type && !href && obj.isDom) {
						type    = 'inline';
						content = element;
					}
				}

				$.extend(obj, {
					href     : href,
					type     : type,
					content  : content,
					title    : title,
					selector : selector
				});

				group[ i ] = obj;
			});

			// Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			// All options are merged recursive except keys
			if (opts.keys !== undefined) {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			return F._start(F.opts.index);
		},

		// Cancel image loading or abort ajax request
		cancel: function () {
			var coming = F.coming;

			if (!coming || false === F.trigger('onCancel')) {
				return;
			}

			F.hideLoading();

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onerror = null;
			}

			if (coming.wrap) {
				coming.wrap.stop(true, true).trigger('onReset').remove();
			}

			F.coming = null;

			// If the first item has been canceled, then clear everything
			if (!F.current) {
				F._afterZoomOut( coming );
			}
		},

		// Start closing animation if is open; remove immediately if opening/closing
		close: function (event) {
			F.cancel();

			if (false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			if (!F.isActive) {
				return;
			}

			if (!F.isOpen || event === true) {
				$('.fancybox-wrap').stop(true).trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;
				F.isClosing = true;

				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true, true).removeClass('fancybox-opened');

				F.transitions[ F.current.closeMethod ]();
			}
		},

		// Manage slideshow:
		//   $.fancybox.play(); - toggle slideshow
		//   $.fancybox.play( true ); - start
		//   $.fancybox.play( false ); - stop
		play: function ( action ) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					D.unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						D.bind({
							'onCancel.player beforeClose.player' : stop,
							'onUpdate.player'   : set,
							'beforeLoad.player' : clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (action === true || (!F.player.isActive && action !== false)) {
				start();
			} else {
				stop();
			}
		},

		// Navigate to next gallery item
		next: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.next;
				}

				F.jumpto(current.index + 1, direction, 'next');
			}
		},

		// Navigate to previous gallery item
		prev: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.prev;
				}

				F.jumpto(current.index - 1, direction, 'prev');
			}
		},

		// Navigate to gallery item by index
		jumpto: function ( index, direction, router ) {
			var current = F.current;

			if (!current) {
				return;
			}

			index = getScalar(index);

			F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
			F.router    = router || 'jumpto';

			if (current.loop) {
				if (index < 0) {
					index = current.group.length + (index % current.group.length);
				}

				index = index % current.group.length;
			}

			if (current.group[ index ] !== undefined) {
				F.cancel();

				F._start(index);
			}
		},

		// Center inside viewport and toggle position type to fixed or absolute if needed
		reposition: function (e, onlyAbsolute) {
			var current = F.current,
				wrap    = current ? current.wrap : null,
				pos;

			if (wrap) {
				pos = F._getPosition(onlyAbsolute);

				if (e && e.type === 'scroll') {
					delete pos.position;

					wrap.stop(true, true).animate(pos, 200);

				} else {
					wrap.css(pos);

					current.pos = $.extend({}, current.dim, pos);
				}
			}
		},

		update: function (e) {
			var type = (e && e.type),
				anyway = !type || type === 'orientationchange';

			if (anyway) {
				clearTimeout(didUpdate);

				didUpdate = null;
			}

			if (!F.isOpen || didUpdate) {
				return;
			}

			didUpdate = setTimeout(function() {
				var current = F.current;

				if (!current || F.isClosing) {
					return;
				}

				F.wrap.removeClass('fancybox-tmp');

				if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
					F._setDimension();
				}

				if (!(type === 'scroll' && current.canShrink)) {
					F.reposition(e);
				}

				F.trigger('onUpdate');

				didUpdate = null;

			}, (anyway && !isTouch ? 0 : 300));
		},

		// Shrink content to fit inside viewport or restore if resized
		toggle: function ( action ) {
			if (F.isOpen) {
				F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

				// Help browser to restore document dimensions
				if (isTouch) {
					F.wrap.removeAttr('style').addClass('fancybox-tmp');

					F.trigger('onUpdate');
				}

				F.update();
			}
		},

		hideLoading: function () {
			D.unbind('.loading');

			$('#fancybox-loading').remove();
		},

		showLoading: function () {
			var el, viewport;

			F.hideLoading();

			el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

			// If user will press the escape-button, the request will be canceled
			D.bind('keydown.loading', function(e) {
				if ((e.which || e.keyCode) === 27) {
					e.preventDefault();

					F.cancel();
				}
			});

			if (!F.defaults.fixed) {
				viewport = F.getViewport();

				el.css({
					position : 'absolute',
					top  : (viewport.h * 0.5) + viewport.y,
					left : (viewport.w * 0.5) + viewport.x
				});
			}
		},

		getViewport: function () {
			var locked = (F.current && F.current.locked) || false,
				rez    = {
					x: W.scrollLeft(),
					y: W.scrollTop()
				};

			if (locked) {
				rez.w = locked[0].clientWidth;
				rez.h = locked[0].clientHeight;

			} else {
				// See http://bugs.jquery.com/ticket/6724
				rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
				rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
			}

			return rez;
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap && isQuery(F.wrap)) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys;

			if (!current) {
				return;
			}

			// Changing document height on iOS devices triggers a 'resize' event,
			// that can change document height... repeating infinitely
			W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

			keys = current.keys;

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code   = e.which || e.keyCode,
						target = e.target || e.srcElement;

					// Skip esc key if loading, because showLoading will cancel preloading
					if (code === 27 && F.coming) {
						return false;
					}

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
						$.each(keys, function(i, val) {
							if (current.group.length > 1 && val[ code ] !== undefined) {
								F[ i ]( val[ code ] );

								e.preventDefault();
								return false;
							}

							if ($.inArray(code, val) > -1) {
								F[ i ] ();

								e.preventDefault();
								return false;
							}
						});
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel) {
				F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
					var target = e.target || null,
						parent = $(target),
						canScroll = false;

					while (parent.length) {
						if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
							break;
						}

						canScroll = isScrollable( parent[0] );
						parent    = $(parent).parent();
					}

					if (delta !== 0 && !canScroll) {
						if (F.group.length > 1 && !current.canShrink) {
							if (deltaY > 0 || deltaX > 0) {
								F.prev( deltaY > 0 ? 'down' : 'left' );

							} else if (deltaY < 0 || deltaX < 0) {
								F.next( deltaY < 0 ? 'up' : 'right' );
							}

							e.preventDefault();
						}
					}
				});
			}
		},

		trigger: function (event, o) {
			var ret, obj = o || F.coming || F.current;

			if (!obj) {
				return;
			}

			if ($.isFunction( obj[event] )) {
				ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
			}

			if (ret === false) {
				return false;
			}

			if (obj.helpers) {
				$.each(obj.helpers, function (helper, opts) {
					if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
						F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
					}
				});
			}

			D.trigger(event);
		},

		isImage: function (str) {
			return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
		},

		isSWF: function (str) {
			return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				obj,
				href,
				type,
				margin,
				padding;

			index = getScalar( index );
			obj   = F.group[ index ] || null;

			if (!obj) {
				return false;
			}

			coming = $.extend(true, {}, F.opts, obj);

			// Convert margin and padding properties to array - top, right, bottom, left
			margin  = coming.margin;
			padding = coming.padding;

			if ($.type(margin) === 'number') {
				coming.margin = [margin, margin, margin, margin];
			}

			if ($.type(padding) === 'number') {
				coming.padding = [padding, padding, padding, padding];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn   : false,
					closeClick : false,
					nextClick  : false,
					arrows     : false,
					mouseWheel : false,
					keys       : null,
					helpers: {
						overlay : {
							closeClick : false
						}
					}
				});
			}

			// 'autoSize' property is a shortcut, too
			if (coming.autoSize) {
				coming.autoWidth = coming.autoHeight = true;
			}

			if (coming.width === 'auto') {
				coming.autoWidth = true;
			}

			if (coming.height === 'auto') {
				coming.autoHeight = true;
			}

			/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */

			coming.group  = F.group;
			coming.index  = index;

			// Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;

				return;
			}

			type = coming.type;
			href = coming.href;

			if (!type) {
				F.coming = null;

				//If we can not determine content type then drop silently or display next/prev item if looping through gallery
				if (F.current && F.router && F.router !== 'jumpto') {
					F.current.index = index;

					return F[ F.router ]( F.direction );
				}

				return false;
			}

			F.isActive = true;

			if (type === 'image' || type === 'swf') {
				coming.autoHeight = coming.autoWidth = false;
				coming.scrolling  = 'visible';
			}

			if (type === 'image') {
				coming.aspectRatio = true;
			}

			if (type === 'iframe' && isTouch) {
				coming.scrolling = 'scroll';
			}

			// Build the neccessary markup
			coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

			$.extend(coming, {
				skin  : $('.fancybox-skin',  coming.wrap),
				outer : $('.fancybox-outer', coming.wrap),
				inner : $('.fancybox-inner', coming.wrap)
			});

			$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
				coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
			});

			F.trigger('onReady');

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content || !coming.content.length) {
					return F._error( 'content' );
				}

			} else if (!href) {
				return F._error( 'href' );
			}

			if (type === 'image') {
				F._loadImage();

			} else if (type === 'ajax') {
				F._loadAjax();

			} else if (type === 'iframe') {
				F._loadIframe();

			} else {
				F._afterLoad();
			}
		},

		_error: function ( type ) {
			$.extend(F.coming, {
				type       : 'html',
				autoWidth  : true,
				autoHeight : true,
				minWidth   : 0,
				minHeight  : 0,
				scrolling  : 'no',
				hasError   : type,
				content    : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			var img = F.imgPreload = new Image();

			img.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width  = this.width / F.opts.pixelRatio;
				F.coming.height = this.height / F.opts.pixelRatio;

				F._afterLoad();
			};

			img.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			img.src = F.coming.href;

			if (img.complete !== true) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			var coming = F.coming;

			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
				url: coming.href,
				error: function (jqXHR, textStatus) {
					if (F.coming && textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_loadIframe: function() {
			var coming = F.coming,
				iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
					.attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
					.attr('src', coming.href);

			// This helps IE
			$(coming.wrap).bind('onReset', function () {
				try {
					$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
				} catch (e) {}
			});

			if (coming.iframe.preload) {
				F.showLoading();

				iframe.one('load', function() {
					$(this).data('ready', 1);

					// iOS will lose scrolling if we resize
					if (!isTouch) {
						$(this).bind('load.fb', F.update);
					}

					// Without this trick:
					//   - iframe won't scroll on iOS devices
					//   - IE7 sometimes displays empty iframe
					$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

					F._afterLoad();
				});
			}

			coming.content = iframe.appendTo( coming.inner );

			if (!coming.iframe.preload) {
				F._afterLoad();
			}
		},

		_preloadImages: function() {
			var group   = F.group,
				current = F.current,
				len     = group.length,
				cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
				item,
				i;

			for (i = 1; i <= cnt; i += 1) {
				item = group[ (current.index + i ) % len ];

				if (item.type === 'image' && item.href) {
					new Image().src = item.href;
				}
			}
		},

		_afterLoad: function () {
			var coming   = F.coming,
				previous = F.current,
				placeholder = 'fancybox-placeholder',
				current,
				content,
				type,
				scrolling,
				href,
				embed;

			F.hideLoading();

			if (!coming || F.isActive === false) {
				return;
			}

			if (false === F.trigger('afterLoad', coming, previous)) {
				coming.wrap.stop(true).trigger('onReset').remove();

				F.coming = null;

				return;
			}

			if (previous) {
				F.trigger('beforeChange', previous);

				previous.wrap.stop(true).removeClass('fancybox-opened')
					.find('.fancybox-item, .fancybox-nav')
					.remove();
			}

			F.unbindEvents();

			current   = coming;
			content   = coming.content;
			type      = coming.type;
			scrolling = coming.scrolling;

			$.extend(F, {
				wrap  : current.wrap,
				skin  : current.skin,
				outer : current.outer,
				inner : current.inner,
				current  : current,
				previous : previous
			});

			href = current.href;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					if (current.selector) {
						content = $('<div>').html(content).find(current.selector);

					} else if (isQuery(content)) {
						if (!content.data(placeholder)) {
							content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
						}

						content = content.show().detach();

						current.wrap.bind('onReset', function () {
							if ($(this).find(content).length) {
								content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
							}
						});
					}
				break;

				case 'image':
					content = current.tpl.image.replace('{href}', href);
				break;

				case 'swf':
					content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
					embed   = '';

					$.each(current.swf, function(name, val) {
						content += '<param name="' + name + '" value="' + val + '"></param>';
						embed   += ' ' + name + '="' + val + '"';
					});

					content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
				break;
			}

			if (!(isQuery(content) && content.parent().is(current.inner))) {
				current.inner.append( content );
			}

			// Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			// Set scrolling before calculating dimensions
			current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			// Set initial dimensions and start position
			F._setDimension();

			F.reposition();

			F.isOpen = false;
			F.coming = null;

			F.bindEvents();

			if (!F.isOpened) {
				$('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

			} else if (previous.prevMethod) {
				F.transitions[ previous.prevMethod ]();
			}

			F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

			F._preloadImages();
		},

		_setDimension: function () {
			var viewport   = F.getViewport(),
				steps      = 0,
				canShrink  = false,
				canExpand  = false,
				wrap       = F.wrap,
				skin       = F.skin,
				inner      = F.inner,
				current    = F.current,
				width      = current.width,
				height     = current.height,
				minWidth   = current.minWidth,
				minHeight  = current.minHeight,
				maxWidth   = current.maxWidth,
				maxHeight  = current.maxHeight,
				scrolling  = current.scrolling,
				scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
				margin     = current.margin,
				wMargin    = getScalar(margin[1] + margin[3]),
				hMargin    = getScalar(margin[0] + margin[2]),
				wPadding,
				hPadding,
				wSpace,
				hSpace,
				origWidth,
				origHeight,
				origMaxWidth,
				origMaxHeight,
				ratio,
				width_,
				height_,
				maxWidth_,
				maxHeight_,
				iframe,
				body;

			// Reset dimensions so we could re-check actual size
			wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

			wPadding = getScalar(skin.outerWidth(true)  - skin.width());
			hPadding = getScalar(skin.outerHeight(true) - skin.height());

			// Any space between content and viewport (margin, padding, border, title)
			wSpace = wMargin + wPadding;
			hSpace = hMargin + hPadding;

			origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
			origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

			if (current.type === 'iframe') {
				iframe = current.content;

				if (current.autoHeight && iframe.data('ready') === 1) {
					try {
						if (iframe[0].contentWindow.document.location) {
							inner.width( origWidth ).height(9999);

							body = iframe.contents().find('body');

							if (scrollOut) {
								body.css('overflow-x', 'hidden');
							}

							origHeight = body.outerHeight(true);
						}

					} catch (e) {}
				}

			} else if (current.autoWidth || current.autoHeight) {
				inner.addClass( 'fancybox-tmp' );

				// Set width or height in case we need to calculate only one dimension
				if (!current.autoWidth) {
					inner.width( origWidth );
				}

				if (!current.autoHeight) {
					inner.height( origHeight );
				}

				if (current.autoWidth) {
					origWidth = inner.width();
				}

				if (current.autoHeight) {
					origHeight = inner.height();
				}

				inner.removeClass( 'fancybox-tmp' );
			}

			width  = getScalar( origWidth );
			height = getScalar( origHeight );

			ratio  = origWidth / origHeight;

			// Calculations for the content
			minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
			maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

			minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
			maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

			// These will be used to determine if wrap can fit in the viewport
			origMaxWidth  = maxWidth;
			origMaxHeight = maxHeight;

			if (current.fitToView) {
				maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
				maxHeight = Math.min(viewport.h - hSpace, maxHeight);
			}

			maxWidth_  = viewport.w - wMargin;
			maxHeight_ = viewport.h - hMargin;

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width  = maxWidth;
					height = getScalar(width / ratio);
				}

				if (height > maxHeight) {
					height = maxHeight;
					width  = getScalar(height * ratio);
				}

				if (width < minWidth) {
					width  = minWidth;
					height = getScalar(width / ratio);
				}

				if (height < minHeight) {
					height = minHeight;
					width  = getScalar(height * ratio);
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));

				if (current.autoHeight && current.type !== 'iframe') {
					inner.width( width );

					height = inner.height();
				}

				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			// Try to fit inside viewport (including the title)
			if (current.fitToView) {
				inner.width( width ).height( height );

				wrap.width( width + wPadding );

				// Real wrap dimensions
				width_  = wrap.width();
				height_ = wrap.height();

				if (current.aspectRatio) {
					while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
						if (steps++ > 19) {
							break;
						}

						height = Math.max(minHeight, Math.min(maxHeight, height - 10));
						width  = getScalar(height * ratio);

						if (width < minWidth) {
							width  = minWidth;
							height = getScalar(width / ratio);
						}

						if (width > maxWidth) {
							width  = maxWidth;
							height = getScalar(width / ratio);
						}

						inner.width( width ).height( height );

						wrap.width( width + wPadding );

						width_  = wrap.width();
						height_ = wrap.height();
					}

				} else {
					width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
					height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
				}
			}

			if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
				width += scrollOut;
			}

			inner.width( width ).height( height );

			wrap.width( width + wPadding );

			width_  = wrap.width();
			height_ = wrap.height();

			canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
			canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

			$.extend(current, {
				dim : {
					width	: getValue( width_ ),
					height	: getValue( height_ )
				},
				origWidth  : origWidth,
				origHeight : origHeight,
				canShrink  : canShrink,
				canExpand  : canExpand,
				wPadding   : wPadding,
				hPadding   : hPadding,
				wrapSpace  : height_ - skin.outerHeight(true),
				skinSpace  : skin.height() - height
			});

			if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
				inner.height('auto');
			}
		},

		_getPosition: function (onlyAbsolute) {
			var current  = F.current,
				viewport = F.getViewport(),
				margin   = current.margin,
				width    = F.wrap.width()  + margin[1] + margin[3],
				height   = F.wrap.height() + margin[0] + margin[2],
				rez      = {
					position: 'absolute',
					top  : margin[0],
					left : margin[3]
				};

			if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
				rez.position = 'fixed';

			} else if (!current.locked) {
				rez.top  += viewport.y;
				rez.left += viewport.x;
			}

			rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
			rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current;

			if (!current) {
				return;
			}

			F.isOpen = F.isOpened = true;

			F.wrap.css('overflow', 'visible').addClass('fancybox-opened');

			F.update();

			// Assign a click event
			if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
				F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
					if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
						e.preventDefault();

						F[ current.closeClick ? 'close' : 'next' ]();
					}
				});
			}

			// Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
					e.preventDefault();

					F.close();
				});
			}

			// Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
				}
			}

			F.trigger('afterShow');

			// Stop the slideshow if this is the last item
			if (!current.loop && current.index === current.group.length - 1) {
				F.play( false );

			} else if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play();
			}
		},

		_afterZoomOut: function ( obj ) {
			obj = obj || F.current;

			$('.fancybox-wrap').trigger('onReset').remove();

			$.extend(F, {
				group  : {},
				opts   : {},
				router : false,
				current   : null,
				isActive  : false,
				isOpened  : false,
				isOpen    : false,
				isClosing : false,
				wrap   : null,
				skin   : null,
				outer  : null,
				inner  : null
			});

			F.trigger('afterClose', obj);
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current  = F.current,
				element  = current.element,
				orig     = current.orig,
				pos      = {},
				width    = 50,
				height   = 50,
				hPadding = current.hPadding,
				wPadding = current.wPadding,
				viewport = F.getViewport();

			if (!orig && current.isDom && element.is(':visible')) {
				orig = element.find('img:first');

				if (!orig.length) {
					orig = element;
				}
			}

			if (isQuery(orig)) {
				pos = orig.offset();

				if (orig.is('img')) {
					width  = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
				pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
			}

			if (F.wrap.css('position') === 'fixed' || current.locked) {
				pos.top  -= viewport.y;
				pos.left -= viewport.x;
			}

			pos = {
				top     : getValue(pos.top  - hPadding * current.topRatio),
				left    : getValue(pos.left - wPadding * current.leftRatio),
				width   : getValue(width  + wPadding),
				height  : getValue(height + hPadding)
			};

			return pos;
		},

		step: function (now, fx) {
			var ratio,
				padding,
				value,
				prop       = fx.prop,
				current    = F.current,
				wrapSpace  = current.wrapSpace,
				skinSpace  = current.skinSpace;

			if (prop === 'width' || prop === 'height') {
				ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

				if (F.isClosing) {
					ratio = 1 - ratio;
				}

				padding = prop === 'width' ? current.wPadding : current.hPadding;
				value   = now - padding;

				F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
				F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
			}
		},

		zoomIn: function () {
			var current  = F.current,
				startPos = current.pos,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				endPos   = $.extend({opacity : 1}, startPos);

			// Remove "position" property that breaks older IE
			delete endPos.position;

			if (elastic) {
				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0.1;
				}

			} else if (effect === 'fade') {
				startPos.opacity = 0.1;
			}

			F.wrap.css(startPos).animate(endPos, {
				duration : effect === 'none' ? 0 : current.openSpeed,
				easing   : current.openEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomIn
			});
		},

		zoomOut: function () {
			var current  = F.current,
				effect   = current.closeEffect,
				elastic  = effect === 'elastic',
				endPos   = {opacity : 0.1};

			if (elastic) {
				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0.1;
				}
			}

			F.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.closeSpeed,
				easing   : current.closeEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomOut
			});
		},

		changeIn: function () {
			var current   = F.current,
				effect    = current.nextEffect,
				startPos  = current.pos,
				endPos    = { opacity : 1 },
				direction = F.direction,
				distance  = 200,
				field;

			startPos.opacity = 0.1;

			if (effect === 'elastic') {
				field = direction === 'down' || direction === 'up' ? 'top' : 'left';

				if (direction === 'down' || direction === 'right') {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
					endPos[ field ]   = '+=' + distance + 'px';

				} else {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
					endPos[ field ]   = '-=' + distance + 'px';
				}
			}

			// Workaround for http://bugs.jquery.com/ticket/12273
			if (effect === 'none') {
				F._afterZoomIn();

			} else {
				F.wrap.css(startPos).animate(endPos, {
					duration : current.nextSpeed,
					easing   : current.nextEasing,
					complete : F._afterZoomIn
				});
			}
		},

		changeOut: function () {
			var previous  = F.previous,
				effect    = previous.prevEffect,
				endPos    = { opacity : 0.1 },
				direction = F.direction,
				distance  = 200;

			if (effect === 'elastic') {
				endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
			}

			previous.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : previous.prevSpeed,
				easing   : previous.prevEasing,
				complete : function () {
					$(this).trigger('onReset').remove();
				}
			});
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		defaults : {
			closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
			speedOut   : 200,       // duration of fadeOut animation
			showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
			css        : {},        // custom CSS properties
			locked     : !isTouch,  // if true, the content will be locked into overlay
			fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
		},

		overlay : null,      // current handle
		fixed   : false,     // indicates if the overlay has position "fixed"
		el      : $('html'), // element that contains "the lock"

		// Public methods
		create : function(opts) {
			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.close();
			}

			this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( F.coming ? F.coming.parent : opts.parent );
			this.fixed   = false;

			if (opts.fixed && F.defaults.fixed) {
				this.overlay.addClass('fancybox-overlay-fixed');

				this.fixed = true;
			}
		},

		open : function(opts) {
			var that = this;

			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.overlay.unbind('.overlay').width('auto').height('auto');

			} else {
				this.create(opts);
			}

			if (!this.fixed) {
				W.bind('resize.overlay', $.proxy( this.update, this) );

				this.update();
			}

			if (opts.closeClick) {
				this.overlay.bind('click.overlay', function(e) {
					if ($(e.target).hasClass('fancybox-overlay')) {
						if (F.isActive) {
							F.close();
						} else {
							that.close();
						}

						return false;
					}
				});
			}

			this.overlay.css( opts.css ).show();
		},

		close : function() {
			var scrollV, scrollH;

			W.unbind('resize.overlay');

			if (this.el.hasClass('fancybox-lock')) {
				$('.fancybox-margin').removeClass('fancybox-margin');

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.removeClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			$('.fancybox-overlay').remove().hide();

			$.extend(this, {
				overlay : null,
				fixed   : false
			});
		},

		// Private, callbacks

		update : function () {
			var width = '100%', offsetWidth;

			// Reset width/height so it will not mess
			this.overlay.width(width).height('100%');

			// jQuery does not return reliable result for IE
			if (IE) {
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				if (D.width() > offsetWidth) {
					width = D.width();
				}

			} else if (D.width() > W.width()) {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		// This is where we can manipulate DOM, because later it would cause iframes to reload
		onReady : function (opts, obj) {
			var overlay = this.overlay;

			$('.fancybox-overlay').stop(true, true);

			if (!overlay) {
				this.create(opts);
			}

			if (opts.locked && this.fixed && obj.fixed) {
				if (!overlay) {
					this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
				}

				obj.locked = this.overlay.append( obj.wrap );
				obj.fixed  = false;
			}

			if (opts.showEarly === true) {
				this.beforeShow.apply(this, arguments);
			}
		},

		beforeShow : function(opts, obj) {
			var scrollV, scrollH;

			if (obj.locked) {
				if (this.margin !== false) {
					$('*').filter(function(){
						return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
					}).addClass('fancybox-margin');

					this.el.addClass('fancybox-margin');
				}

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.addClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			this.open(opts);
		},

		onUpdate : function() {
			if (!this.fixed) {
				this.update();
			}
		},

		afterClose: function (opts) {
			// Remove overlay if exists and fancyBox is not opening
			// (e.g., it is not being open using afterClose callback)
			//if (this.overlay && !F.isActive) {
			if (this.overlay && !F.coming) {
				this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
			}
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		defaults : {
			type     : 'float', // 'float', 'inside', 'outside' or 'over',
			position : 'bottom' // 'top' or 'bottom'
		},

		beforeShow: function (opts) {
			var current = F.current,
				text    = current.title,
				type    = opts.type,
				title,
				target;

			if ($.isFunction(text)) {
				text = text.call(current.element, current);
			}

			if (!isString(text) || $.trim(text) === '') {
				return;
			}

			title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

			switch (type) {
				case 'inside':
					target = F.skin;
				break;

				case 'outside':
					target = F.wrap;
				break;

				case 'over':
					target = F.inner;
				break;

				default: // 'float'
					target = F.skin;

					title.appendTo('body');

					if (IE) {
						title.width( title.width() );
					}

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
				break;
			}

			title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var index,
			that     = $(this),
			selector = this.selector || '',
			run      = function(e) {
				var what = $(this).blur(), idx = index, relType, relVal;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
					relType = options.groupAttr || 'data-fancybox-group';
					relVal  = what.attr(relType);

					if (!relVal) {
						relType = 'rel';
						relVal  = what.get(0)[ relType ];
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx  = what.index(this);
					}

					options.index = idx;

					// Stop an event from bubbling if everything is fine
					if (F.open(what, options) !== false) {
						e.preventDefault();
					}
				}
			};

		options = options || {};
		index   = options.index || 0;

		if (!selector || options.live === false) {
			that.unbind('click.fb-start').bind('click.fb-start', run);

		} else {
			D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
		}

		this.filter('[data-fancybox-start=1]').trigger('click');

		return this;
	};

	// Tests that need a body at doc ready
	D.ready(function() {
		var w1, w2;

		if ( $.scrollbarWidth === undefined ) {
			// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
			$.scrollbarWidth = function() {
				var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
					child  = parent.children(),
					width  = child.innerWidth() - child.height( 99 ).innerWidth();

				parent.remove();

				return width;
			};
		}

		if ( $.support.fixedPosition === undefined ) {
			$.support.fixedPosition = (function() {
				var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
					fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

				elem.remove();

				return fixed;
			}());
		}

		$.extend(F.defaults, {
			scrollbarWidth : $.scrollbarWidth(),
			fixed  : $.support.fixedPosition,
			parent : $('body')
		});

		//Get real width of page scroll-bar
		w1 = $(window).width();

		H.addClass('fancybox-lock-test');

		w2 = $(window).width();

		H.removeClass('fancybox-lock-test');

		$("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
	});

}(window, document, jQuery));
///#source 1 1 /js/project/app-vote-base-info-json.js
var voteRegionInfo = [
    {
        //開票區域對照表
        type: 'part',
        data: [
            { no: 1, name: '北區' },
            { no: 2, name: '中區' },
            { no: 3, name: '南區' },
            { no: 4, name: '東區' },
            { no: 5, name: '離島' },
            { no: 6, name: '原住民' }
        ]
    },
    {
        //開票城市對照表
        type: 'city',
        data: [
            { no: 1, has_section: 0, name: '基隆市', part_no: 1, google_name: '基隆市' },
            { no: 2, has_section: 1, name: '臺北市', part_no: 1, google_name: '台北市' },
            { no: 3, has_section: 1, name: '新北市', part_no: 1, google_name: '新北市' },
            { no: 4, has_section: 1, name: '桃園市', part_no: 1, google_name: '桃園市' },
            { no: 5, has_section: 0, name: '新竹縣', part_no: 1, google_name: '新竹縣' },
            { no: 6, has_section: 0, name: '新竹市', part_no: 1, google_name: '新竹市' },
            { no: 7, has_section: 1, name: '苗栗縣', part_no: 2, google_name: '苗栗縣' },
            { no: 8, has_section: 1, name: '臺中市', part_no: 2, google_name: '台中市' },
            { no: 9, has_section: 1, name: '彰化縣', part_no: 2, google_name: '彰化縣' },
            { no: 10, has_section: 1, name: '南投縣', part_no: 2, google_name: '南投縣' },
            { no: 11, has_section: 1, name: '雲林縣', part_no: 3, google_name: '雲林縣' },
            { no: 12, has_section: 1, name: '嘉義縣', part_no: 3, google_name: '嘉義縣' },
            { no: 13, has_section: 0, name: '嘉義市', part_no: 3, google_name: '嘉義市' },
            { no: 14, has_section: 1, name: '臺南市', part_no: 3, google_name: '台南市' },
            { no: 15, has_section: 1, name: '高雄市', part_no: 3, google_name: '高雄市' },
            { no: 16, has_section: 1, name: '屏東縣', part_no: 3, google_name: '屏東縣' },
            { no: 17, has_section: 0, name: '宜蘭縣', part_no: 4, google_name: '宜蘭縣' },
            { no: 18, has_section: 0, name: '花蓮縣', part_no: 4, google_name: '花蓮縣' },
            { no: 19, has_section: 0, name: '台東縣', part_no: 4, google_name: '台東縣' },
            { no: 20, has_section: 0, name: '澎湖縣', part_no: 5, google_name: '澎湖縣' },
            { no: 21, has_section: 0, name: '金門縣', part_no: 5, google_name: '金門縣' },
            { no: 22, has_section: 0, name: '連江縣', part_no: 5, google_name: '連江縣' },
            { no: 23, has_section: 0, name: '平地原住民', part_no: 6, google_name: '平地原住民' },
            { no: 24, has_section: 0, name: '山地原住民', part_no: 6, google_name: '山地原住民' }
        ]
    },
    {
        //開票選舉區對照表
        type: 'section',
        data: [
            { no: '1.1', seq: 1, name: '基隆市選舉區', part_no: 1, city_no: 1, web_desc: '', mobile_desc: '' },
            { no: '2.1', seq: 1, name: '臺北市第一選舉區', part_no: 1, city_no: 2, web_desc: '北投區、士林區天母里等13里{蘭雅、天母}', mobile_desc: '北投區、士林區天母里等13里{蘭雅、天母}' },
            { no: '2.2', seq: 2, name: '臺北市第二選舉區', part_no: 1, city_no: 2, web_desc: '大同區、士林區仁勇里等38里{社子、後港、街上、芝山、陽明山}', mobile_desc: '大同區、士林區仁勇里等38里{社子、後港、街上、芝山、陽明山}' },
            { no: '2.3', seq: 3, name: '臺北市第三選舉區', part_no: 1, city_no: 2, web_desc: '中山區、松山區精忠里等20里{東社、三民}', mobile_desc: '中山區、松山區精忠里等20里{東社、三民}' },
            { no: '2.4', seq: 4, name: '臺北市第四選舉區', part_no: 1, city_no: 2, web_desc: '內湖區、南港區', mobile_desc: '內湖區、南港區' },
            { no: '2.5', seq: 5, name: '臺北市第五選舉區', part_no: 1, city_no: 2, web_desc: '萬華區、中正區南門里等21里{城內、東門、南門、崁頂}', mobile_desc: '萬華區、中正區南門里等21里{城內、東門、南門、崁頂}' },
            { no: '2.6', seq: 6, name: '臺北市第六選舉區', part_no: 1, city_no: 2, web_desc: '大安區', mobile_desc: '大安區' },
            { no: '2.7', seq: 7, name: '臺北市第七選舉區', part_no: 1, city_no: 2, web_desc: '信義區、松山區慈祐里等13里{中崙、本鎮}', mobile_desc: '信義區、松山區慈祐里等13里{中崙、本鎮}' },
            { no: '2.8', seq: 8, name: '臺北市第八選舉區', part_no: 1, city_no: 2, web_desc: '文山區、中正區水源里等10里{古亭、公館}', mobile_desc: '文山區、中正區水源里等10里{古亭、公館}' },
            { no: '3.1', seq: 1, name: '新北市第一選舉區', part_no: 1, city_no: 3, web_desc: '石門區、三芝區、淡水區、八里區、林口區、泰山區', mobile_desc: '石門區、三芝區、淡水區、八里區、林口區、泰山區' },
            { no: '3.2', seq: 2, name: '新北市第二選舉區', part_no: 1, city_no: 3, web_desc: '五股區、蘆洲區、三重區富貴里等16里{東區16里}', mobile_desc: '五股區、蘆洲區、三重區富貴里等16里{東區16里}' },
            { no: '3.3', seq: 3, name: '新北市第三選舉區', part_no: 1, city_no: 3, web_desc: '三重區二重里等103里{西區、南區、北區、中區、東區10里}', mobile_desc: '三重區二重里等103里{西區、南區、北區、中區、東區10里}' },
            { no: '3.4', seq: 4, name: '新北市第四選舉區', part_no: 1, city_no: 3, web_desc: '新莊區中平里等75里{興直、頭前、中港、福營}', mobile_desc: '新莊區中平里等75里{興直、頭前、中港、福營}' },
            { no: '3.5', seq: 5, name: '新北市第五選舉區', part_no: 1, city_no: 3, web_desc: '樹林區、鶯歌區、新莊區民安里等9里{西盛}', mobile_desc: '樹林區、鶯歌區、新莊區民安里等9里{西盛}' },
            { no: '3.6', seq: 6, name: '新北市第六選舉區', part_no: 1, city_no: 3, web_desc: '板橋區中正里等65里{社後、湳仔、新埔、江翠}', mobile_desc: '板橋區中正里等65里{社後、湳仔、新埔、江翠}' },
            { no: '3.7', seq: 7, name: '新北市第七選舉區', part_no: 1, city_no: 3, web_desc: '板橋區九如里等61里{埔墘、後埔、浮洲、溪崑}', mobile_desc: '板橋區九如里等61里{埔墘、後埔、浮洲、溪崑}' },
            { no: '3.8', seq: 8, name: '新北市第八選舉區', part_no: 1, city_no: 3, web_desc: '中和區力行里等76里', mobile_desc: '中和區力行里等76里' },
            { no: '3.9', seq: 9, name: '新北市第九選舉區', part_no: 1, city_no: 3, web_desc: '永和區、中和區泰安里等17里{秀安}', mobile_desc: '永和區、中和區泰安里等17里{秀安}' },
            { no: '3.10', seq: 10, name: '新北市第十選舉區', part_no: 1, city_no: 3, web_desc: '土城區、三峽區', mobile_desc: '土城區、三峽區' },
            { no: '3.11', seq: 11, name: '新北市第十一選舉區', part_no: 1, city_no: 3, web_desc: '新店區、深坑區、石碇區、坪林區、烏來區', mobile_desc: '新店區、深坑區、石碇區、坪林區、烏來區' },
            { no: '3.12', seq: 12, name: '新北市第十二選舉區', part_no: 1, city_no: 3, web_desc: '金山區、萬里區、汐止區、平溪區、瑞芳區、雙溪區、貢寮區', mobile_desc: '金山區、萬里區、汐止區、平溪區、瑞芳區、雙溪區、貢寮區' },
            { no: '4.1', seq: 1, name: '桃園市第一選舉區', part_no: 1, city_no: 4, web_desc: '蘆竹鄉、龜山鄉、桃園市汴洲里等11里{大會稽}', mobile_desc: '蘆竹鄉、龜山鄉、桃園市汴洲里等11里{大會稽}' },
            { no: '4.2', seq: 2, name: '桃園市第二選舉區', part_no: 1, city_no: 4, web_desc: '大園鄉、觀音鄉、新屋鄉、楊梅市', mobile_desc: '大園鄉、觀音鄉、新屋鄉、楊梅市' },
            { no: '4.3', seq: 3, name: '桃園市第三選舉區', part_no: 1, city_no: 4, web_desc: '中壢市石頭里等73里{過嶺、大崙、青埔、龍崗}', mobile_desc: '中壢市石頭里等73里{過嶺、大崙、青埔、龍崗}' },
            { no: '4.4', seq: 4, name: '桃園市第四選舉區', part_no: 1, city_no: 4, web_desc: '桃園市中路里等65里{大樹林、市中、中路、埔子}', mobile_desc: '桃園市中路里等65里{大樹林、市中、中路、埔子}' },
            { no: '4.5', seq: 5, name: '桃園市第五選舉區', part_no: 1, city_no: 4, web_desc: '平鎮市、龍潭鄉', mobile_desc: '平鎮市、龍潭鄉' },
            { no: '4.6', seq: 6, name: '桃園市第六選舉區', part_no: 1, city_no: 4, web_desc: '八德市、大溪鎮、復興鄉、中壢市興仁里等12里{內壢}', mobile_desc: '八德市、大溪鎮、復興鄉、中壢市興仁里等12里{內壢}' },
            { no: '5.1', seq: 1, name: '新竹縣選舉區', part_no: 1, city_no: 5, web_desc: '', mobile_desc: '' },
            { no: '6.1', seq: 1, name: '新竹市選舉區', part_no: 1, city_no: 6, web_desc: '', mobile_desc: '' },
            { no: '7.1', seq: 1, name: '苗栗縣第一選舉區', part_no: 2, city_no: 7, web_desc: '竹南鎮、造橋鄉、後龍鎮、西湖鄉、通霄鎮、銅鑼鄉、苑裡鎮、三義鄉', mobile_desc: '竹南鎮、造橋鄉、後龍鎮、西湖鄉、通霄鎮、銅鑼鄉、苑裡鎮、三義鄉' },
            { no: '7.2', seq: 2, name: '苗栗縣第二選舉區', part_no: 2, city_no: 7, web_desc: '頭份鎮、三灣鄉、南莊鄉、苗栗市、頭屋鄉、獅潭鄉、公館鄉、大湖鄉、泰安鄉、卓蘭鎮', mobile_desc: '頭份鎮、三灣鄉、南莊鄉、苗栗市、頭屋鄉、獅潭鄉、公館鄉、大湖鄉、泰安鄉、卓蘭鎮' },
            { no: '8.1', seq: 1, name: '臺中市第一選舉區', part_no: 2, city_no: 8, web_desc: '大甲區、大安區、外埔區、清水區、梧棲區', mobile_desc: '大甲區、大安區、外埔區、清水區、梧棲區' },
            { no: '8.2', seq: 2, name: '臺中市第二選舉區', part_no: 2, city_no: 8, web_desc: '沙鹿區、龍井區、大肚區、烏日區、霧峰區、大里區東湖里等2里', mobile_desc: '沙鹿區、龍井區、大肚區、烏日區、霧峰區、大里區東湖里等2里' },
            { no: '8.3', seq: 3, name: '臺中市第三選舉區', part_no: 2, city_no: 8, web_desc: '后里區、神岡區、大雅區、潭子區', mobile_desc: '后里區、神岡區、大雅區、潭子區' },
            { no: '8.4', seq: 4, name: '臺中市第四選舉區', part_no: 2, city_no: 8, web_desc: '西屯區、南屯區', mobile_desc: '西屯區、南屯區' },
            { no: '8.5', seq: 5, name: '臺中市第五選舉區', part_no: 2, city_no: 8, web_desc: '北屯區、北區', mobile_desc: '北屯區、北區' },
            { no: '8.6', seq: 6, name: '臺中市第六選舉區', part_no: 2, city_no: 8, web_desc: '西區、中區、東區、南區', mobile_desc: '西區、中區、東區、南區' },
            { no: '8.7', seq: 7, name: '臺中市第七選舉區', part_no: 2, city_no: 8, web_desc: '太平區、大里區大里里等25里', mobile_desc: '太平區、大里區大里里等25里' },
            { no: '8.8', seq: 8, name: '臺中市第八選舉區', part_no: 2, city_no: 8, web_desc: '豐原區、石岡區、新社區、東勢區、和平區', mobile_desc: '豐原區、石岡區、新社區、東勢區、和平區' },
            { no: '9.1', seq: 1, name: '彰化縣第一選舉區', part_no: 2, city_no: 9, web_desc: '伸港鄉、線西鄉、和美鎮、鹿港鎮、福興鄉、秀水鄉', mobile_desc: '伸港鄉、線西鄉、和美鎮、鹿港鎮、福興鄉、秀水鄉' },
            { no: '9.2', seq: 2, name: '彰化縣第二選舉區', part_no: 2, city_no: 9, web_desc: '彰化市、花壇鄉、芬園鄉', mobile_desc: '彰化市、花壇鄉、芬園鄉' },
            { no: '9.3', seq: 3, name: '彰化縣第三選舉區', part_no: 2, city_no: 9, web_desc: '芳苑鄉、二林鎮、埔鹽鄉、溪湖鎮、埔心鄉、大城鄉、竹塘鄉、埤頭鄉、北斗鎮、溪州鄉', mobile_desc: '芳苑鄉、二林鎮、埔鹽鄉、溪湖鎮、埔心鄉、大城鄉、竹塘鄉、埤頭鄉、北斗鎮、溪州鄉' },
            { no: '9.4', seq: 4, name: '彰化縣第四選舉區', part_no: 2, city_no: 9, web_desc: '大村鄉、員林鎮、永靖鄉、社頭鄉、田尾鄉、田中鎮、二水鄉', mobile_desc: '大村鄉、員林鎮、永靖鄉、社頭鄉、田尾鄉、田中鎮、二水鄉' },
            { no: '10.1', seq: 1, name: '南投縣第一選舉區', part_no: 2, city_no: 10, web_desc: '草屯鎮、國姓鄉、埔里鎮、仁愛鄉、中寮鄉、魚池鄉', mobile_desc: '草屯鎮、國姓鄉、埔里鎮、仁愛鄉、中寮鄉、魚池鄉' },
            { no: '10.2', seq: 2, name: '南投縣第二選舉區', part_no: 2, city_no: 10, web_desc: '南投市、名間鄉、集集鎮、竹山鎮、鹿谷鄉、水里鄉、信義鄉', mobile_desc: '南投市、名間鄉、集集鎮、竹山鎮、鹿谷鄉、水里鄉、信義鄉' },
            { no: '11.1', seq: 1, name: '雲林縣第一選舉區', part_no: 3, city_no: 11, web_desc: '麥寮鄉、臺西鄉、東勢鄉、褒忠鄉、土庫鎮、虎尾鎮、四湖鄉、元長鄉、口湖鄉、水林鄉、北港鎮', mobile_desc: '麥寮鄉、臺西鄉、東勢鄉、褒忠鄉、土庫鎮、虎尾鎮、四湖鄉、元長鄉、口湖鄉、水林鄉、北港鎮' },
            { no: '11.2', seq: 2, name: '雲林縣第二選舉區', part_no: 3, city_no: 11, web_desc: '崙背鄉、二崙鄉、西螺鎮、莿桐鄉、林內鄉、斗六市、大埤鄉、斗南鎮、古坑鄉', mobile_desc: '崙背鄉、二崙鄉、西螺鎮、莿桐鄉、林內鄉、斗六市、大埤鄉、斗南鎮、古坑鄉' },
            { no: '12.1', seq: 1, name: '嘉義縣第一選舉區', part_no: 3, city_no: 12, web_desc: '六腳鄉、東石鄉、朴子市、太保市、布袋鎮、義竹鄉、鹿草鄉、水上鄉', mobile_desc: '六腳鄉、東石鄉、朴子市、太保市、布袋鎮、義竹鄉、鹿草鄉、水上鄉' },
            { no: '12.2', seq: 2, name: '嘉義縣第二選舉區', part_no: 3, city_no: 12, web_desc: '溪口鄉、大林鎮、梅山鄉、新港鄉、民雄鄉、竹崎鄉、中埔鄉、番路鄉、阿里山鄉、大埔鄉', mobile_desc: '溪口鄉、大林鎮、梅山鄉、新港鄉、民雄鄉、竹崎鄉、中埔鄉、番路鄉、阿里山鄉、大埔鄉' },
            { no: '13.1', seq: 1, name: '嘉義市選舉區', part_no: 3, city_no: 13, web_desc: '', mobile_desc: '' },
            { no: '14.1', seq: 1, name: '台南市第一選舉區', part_no: 3, city_no: 14, web_desc: '後壁區、白河區、北門區、學甲區、鹽水區、新營區、柳營區、東山區、將軍區、下營區、六甲區、官田區', mobile_desc: '後壁區、白河區、北門區、學甲區、鹽水區、新營區、柳營區、東山區、將軍區、下營區、六甲區、官田區' },
            { no: '14.2', seq: 2, name: '台南市第二選舉區', part_no: 3, city_no: 14, web_desc: '七股區、佳里區、麻豆區、善化區、大內區、玉井區、楠西區、西港區、安定區、新市區、山上區、新化區、左鎮區、南化區', mobile_desc: '七股區、佳里區、麻豆區、善化區、大內區、玉井區、楠西區、西港區、安定區、新市區、山上區、新化區、左鎮區、南化區' },
            { no: '14.3', seq: 3, name: '台南市第三選舉區', part_no: 3, city_no: 14, web_desc: '安南區、北區、中西區', mobile_desc: '安南區、北區、中西區' },
            { no: '14.4', seq: 4, name: '台南市第四選舉區', part_no: 3, city_no: 14, web_desc: '安平區、南區、東區', mobile_desc: '安平區、南區、東區' },
            { no: '14.5', seq: 5, name: '台南市第五選舉區', part_no: 3, city_no: 14, web_desc: '永康區、仁德區、歸仁區、關廟區、龍崎區', mobile_desc: '永康區、仁德區、歸仁區、關廟區、龍崎區' },
            { no: '15.1', seq: 1, name: '高雄市第一選舉區', part_no: 3, city_no: 15, web_desc: '桃源區、那瑪夏區、甲仙區、內門區、杉林區、六龜區、阿蓮區、田寮區、旗山區、美濃區、茂林區、燕巢區、大社區、大樹區', mobile_desc: '桃源區、那瑪夏區、甲仙區、內門區、杉林區、六龜區、阿蓮區、田寮區、旗山區、美濃區、茂林區、燕巢區、大社區、大樹區' },
            { no: '15.2', seq: 2, name: '高雄市第二選舉區', part_no: 3, city_no: 15, web_desc: '茄萣區、湖內區、路竹區、永安區、岡山區、彌陀區、梓官區、橋頭區', mobile_desc: '茄萣區、湖內區、路竹區、永安區、岡山區、彌陀區、梓官區、橋頭區' },
            { no: '15.3', seq: 3, name: '高雄市第三選舉區', part_no: 3, city_no: 15, web_desc: '楠梓區、左營區', mobile_desc: '楠梓區、左營區' },
            { no: '15.4', seq: 4, name: '高雄市第四選舉區', part_no: 3, city_no: 15, web_desc: '仁武區、鳥松區、大寮區、林園區', mobile_desc: '仁武區、鳥松區、大寮區、林園區' },
            { no: '15.5', seq: 5, name: '高雄市第五選舉區', part_no: 3, city_no: 15, web_desc: '鼓山區、鹽埕區、旗津區、三民區川東里等41里{三塊厝、大港19里}', mobile_desc: '鼓山區、鹽埕區、旗津區、三民區川東里等41里{三塊厝、大港19里}' },
            { no: '15.6', seq: 6, name: '高雄市第六選舉區', part_no: 3, city_no: 15, web_desc: '三民區鼎金里等45里{覆鼎金、本館、寶珠、獅頭、灣仔內、大港6里}', mobile_desc: '三民區鼎金里等45里{覆鼎金、本館、寶珠、獅頭、灣仔內、大港6里}' },
            { no: '15.7', seq: 7, name: '高雄市第七選舉區', part_no: 3, city_no: 15, web_desc: '前金區、新興區、苓雅區、前鎮區復國里等8里{籬仔內}', mobile_desc: '前金區、新興區、苓雅區、前鎮區復國里等8里{籬仔內}' },
            { no: '15.8', seq: 8, name: '高雄市第八選舉區', part_no: 3, city_no: 15, web_desc: '鳳山區', mobile_desc: '鳳山區' },
            { no: '15.9', seq: 9, name: '高雄市第九選舉區', part_no: 3, city_no: 15, web_desc: '小港區、前鎮區草衙里等51里{前鎮、草衙、佛公、獅甲、崗山仔}', mobile_desc: '小港區、前鎮區草衙里等51里{前鎮、草衙、佛公、獅甲、崗山仔}' },
            { no: '16.1', seq: 1, name: '屏東縣第一選舉區', part_no: 3, city_no: 16, web_desc: '里港鄉、高樹鄉、三地門鄉、霧臺鄉、九如鄉、鹽埔鄉、長治鄉、內埔鄉、瑪家鄉、泰武鄉、竹田鄉、萬巒鄉、潮州鎮', mobile_desc: '里港鄉、高樹鄉、三地門鄉、霧臺鄉、九如鄉、鹽埔鄉、長治鄉、內埔鄉、瑪家鄉、泰武鄉、竹田鄉、萬巒鄉、潮州鎮' },
            { no: '16.2', seq: 2, name: '屏東縣第二選舉區', part_no: 3, city_no: 16, web_desc: '屏東市、麟洛鄉、萬丹鄉', mobile_desc: '屏東市、麟洛鄉、萬丹鄉' },
            { no: '16.3', seq: 3, name: '屏東縣第三選舉區', part_no: 3, city_no: 16, web_desc: '新園鄉、崁頂鄉、南州鄉、新埤鄉、來義鄉、東港鎮、林邊鄉、佳冬鄉、枋寮鄉、春日鄉、枋山鄉、獅子鄉、牡丹鄉、車城鄉、滿州鄉、恆春鎮、琉球鄉', mobile_desc: '新園鄉、崁頂鄉、南州鄉、新埤鄉、來義鄉、東港鎮、林邊鄉、佳冬鄉、枋寮鄉、春日鄉、枋山鄉、獅子鄉、牡丹鄉、車城鄉、滿州鄉、恆春鎮、琉球鄉' },
            { no: '17.1', seq: 1, name: '宜蘭縣選舉區', part_no: 4, city_no: 17, web_desc: '', mobile_desc: '' },
            { no: '18.1', seq: 1, name: '花蓮縣選舉區', part_no: 4, city_no: 18, web_desc: '', mobile_desc: '' },
            { no: '19.1', seq: 1, name: '台東縣選舉區', part_no: 4, city_no: 19, web_desc: '', mobile_desc: '' },
            { no: '20.1', seq: 1, name: '澎湖縣選舉區', part_no: 5, city_no: 20, web_desc: '', mobile_desc: '' },
            { no: '21.1', seq: 1, name: '金門縣選舉區', part_no: 5, city_no: 21, web_desc: '', mobile_desc: '' },
            { no: '22.1', seq: 1, name: '連江縣選舉區', part_no: 5, city_no: 22, web_desc: '', mobile_desc: '' },
            { no: '23.1', seq: 1, name: '平地原住民', part_no: 6, city_no: 23, web_desc: '', mobile_desc: '' },
            { no: '24.1', seq: 1, name: '山地原住民', part_no: 6, city_no: 24, web_desc: '', mobile_desc: '' }
        ]
    },
    {
        //開票政黨對照表
        type: 'polnm',
        data: [
            { no: '00', name: '其他' },
            { no: '01', name: '中國國民黨' },
            { no: '02', name: '民主進步黨' },
            { no: '03', name: '親民黨' },
            { no: '04', name: '台灣團結聯盟' },
            { no: '05', name: '無黨團結聯盟' },
            { no: '06', name: '民國黨' },
            { no: '07', name: '綠黨社會民主黨聯盟' },
            { no: '08', name: '新黨' },
            { no: '09', name: '健保免費聯盟' },
            { no: '10', name: '台灣人權聯盟' },
            { no: '11', name: '樹黨' },
            { no: '12', name: '中華統一促進黨' },
            { no: '13', name: '人民民主陣線' },
            { no: '14', name: '中華民國機車黨' },
            { no: '15', name: '軍公教聯盟黨' },
            { no: '16', name: '時代力量' },
            { no: '17', name: '自由台灣黨' },
            { no: '18', name: '台灣獨立黨' },
            { no: '19', name: '社會福利黨' },
            { no: '20', name: '信心希望聯盟' },
            { no: '21', name: '人民最大黨' },
            { no: '22', name: '中華民國臺灣基本法連線' },
            { no: '23', name: '台灣國民會議' },
            { no: '24', name: '台灣主義黨' },
            { no: '99', name: '無黨籍' }
        ]
    }
];



///#source 1 1 /js/project/app-shared.js
$(function () {
    scrollUpInit();
});

//回最上層按鈕初始化
function scrollUpInit() {
    //回最上層按鈕淡入淡出效果
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    //回最上層按鈕點擊後移動至最上層
    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
}

// 說明 ：用 Javascript 實現錨點(Anchor)間平滑跳轉 
// 來源 ：ThickBox 2.1 
// 整理 ：Yanfu Xie [xieyanfu@yahoo.com.cn] 
// 日期 ：07.01.17 
// 轉換為數字 
function intval(v) {
    v = parseInt(v);
    return isNaN(v) ? 0 : v;
}

// 獲取元素信息 
function getPos(e) {
    var l = 0;
    var t = 0;
    var w = intval(e.style.width);
    var h = intval(e.style.height);
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent) {
        l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
        t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
        e = e.offsetParent;
    }
    l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
    t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
    return { x: l, y: t, w: w, h: h, wb: wb, hb: hb };
}

// 獲取滾動條信息 
function getScroll() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return { t: t, l: l, w: w, h: h };
}

// 錨點(Anchor)間平滑跳轉 
function scroller(el, duration) {
    if (typeof el != 'object') { el = document.getElementById(el); }
    if (!el) return;
    var z = this;
    z.el = el;
    z.p = getPos(el);
    z.s = getScroll();
    z.clear = function () { window.clearInterval(z.timer); z.timer = null };
    z.t = (new Date).getTime();
    z.step = function () {
        var t = (new Date).getTime();
        var p = (t - z.t) / duration;
        if (t >= duration + z.t) {
            z.clear();
            window.setTimeout(function () { z.scroll(z.p.y, z.p.x) }, 13);
        } else {
            st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;
            sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;
            z.scroll(st, sl);
        }
    };
    z.scroll = function (t, l) { window.scrollTo(l, t) };
    z.timer = window.setInterval(function () { z.step(); }, 13);
}
///#source 1 1 /js/project/app.js
var app = angular.module('app', ['ngRoute', 'toolsService', 'uiDirective', 'generalDirective',
                         'ab-base64', 'mapService', 'ngAnimate', 'gaService']);

//模組全域公用常數
app.constant('APP_CONSTANT', {
    SYSTEM_NETWORK_ERROR: '很抱歉，系統發生網路連線的錯誤\r\n請稍後再拜訪本網站，謝謝',
    SYSTEM_DATA_NOTFOUND: '很抱歉，系統發生來源資料的錯誤\r\n請稍後再拜訪本網站，謝謝',
    IMAGE_FOLDER: '/images/',
    YOUTUBE_PREFIX_EMBED: 'https://www.youtube.com/embed/',
    YOUTUBE_PREFIX_GENERAL: 'https://www.youtube.com/watch?v=',
    UPDATE_INTERVAL: 20000,     //更新資料間隔時間(毫秒)

    //伺服器資料要求代碼 (1：總統、2：立委、3：不分區立委名單、4：不分區立委席次)
    REQ_VOTE_CODE: { PRESIDENT: 1, LEGISLATOR: 2, NON_AREA_LEGISLATOR_LIST: 3, NON_AREA_LEGISLATOR_SEAT: 4 },

    //要求頁面代碼 (1：首頁、2：總統總票數頁面、3：總統各城市開票頁面、4：城市選擇頁面(總統)、5：城市選擇頁面(立委)、6：選舉區選擇頁面(立委)、7：立委選舉區開票頁面、8：不分區立委名單頁面、9：不分區立委席次頁面)
    PAGE_TYPE_CODE: {
        INDEX: 1, PRESIDENT_TOTAL_VOTE: 2, PRESIDENT_CITYS_VOTE: 3, CITYS_SELECT_PRESIDENT: 4, CITYS_SELECT_LEGISLATOR: 5,
        SECTIONS_SELECT_LEGISLATOR: 6, LEGISLATOR_SECTION_VOTE: 7, NON_AREA_LEGISLATOR_LIST: 8, NON_AREA_LEGISLATOR_SEAT: 9
    },
    IS_DETECT_USER_POSITION: false,     //是否偵測使用者所在位置開關
    GA_TRACK_NO: 'UA-56932758-2',       //Google Analytics 追蹤編號
    CITYS_PAGE_SELECT_TYPE: { PRESIDENT: 1, LEGISLATOR: 2 },        //城市選擇頁面類型代碼
    MOBILE_WINDOW_WIDTH: 849,        //行動裝置螢幕寬度基準值
    IS_SIMPLE_VOTE_MODE: false,      //是否為簡易版開票網站

    //簡易版開票資料類型代碼(1：總統總票數)
    SIMPLE_VOTE_TYPE_CODE: { PRESIDENT_TOTAL_VOTE: 1 }
});

//模組設定區
app.config(['$routeProvider', function ($routeProvider) {
    //設定路由
    $routeProvider.when('/', {      //首頁
        templateUrl: '/html/president.html',
        controller: 'presidentCtrl',
        //reloadOnSearch: false
    }).when('/president', {      //總統大選頁面
        templateUrl: '/html/president.html',
        controller: 'presidentCtrl',
        //reloadOnSearch: false
    }).when('/president/city', {       //總統各城市開票頁面
        templateUrl: '/html/president-city.html',
        controller: 'presidentCityCtrl',
        //reloadOnSearch: false
    }).when('/legislator/section', {       //立委各選舉區開票頁面
        templateUrl: '/html/legislator-section.html',
        controller: 'legislatorSectionCtrl',
        //reloadOnSearch: false
    }).when('/legislator/list', {       //不分區立委名單頁面
        templateUrl: '/html/non-area-legislator-list.html',
        controller: 'nonAreaLegislatorListCtrl',
        //reloadOnSearch: false
    }).when('/legislator/seat', {       //不分區立委席次頁面
        templateUrl: '/html/non-area-legislator-seat.html',
        controller: 'nonAreaLegislatorSeatCtrl',
        //reloadOnSearch: false
    }).when('/citys', {       //總統、立委城市選單頁面
        templateUrl: '/html/citys.html',
        controller: 'citysSelectCtrl',
        //reloadOnSearch: false
    }).when('/sections', {       //立委選舉區選單頁面
        templateUrl: '/html/sections.html',
        controller: 'sectionsSelectCtrl',
        //reloadOnSearch: false
    }).otherwise({      //預設
        redirectTo: '/'
    });
}]);

//模組啟動初始化區
app.run(['$rootScope', 'APP_CONSTANT', 'appService', 'ga', '$window', 'tool',
    function ($rootScope, APP_CONSTANT, appService, ga, $window, tool) {

        //#region *** 應用程式頁面共用變數 ***

        $rootScope.voteReqPath = appService.getHiddenData('ha', true);      //網站資料來源api物件
        $rootScope.mobileWindowWidth = APP_CONSTANT.MOBILE_WINDOW_WIDTH;        //行動裝置視窗寬度
        $rootScope.currentReqVoteCode = 0;       //儲存目前要求伺服器的開票類型代碼
        $rootScope.currentPageTypeCode = 0;     //儲存目前頁面代碼
        $rootScope.imageFolder = APP_CONSTANT.IMAGE_FOLDER;     //圖檔資料夾
        $rootScope.isShowBanner = false;     //是否顯示Banner主圖
        $rootScope.isShowCountDownSection = false;      //是否顯示開票倒數區塊
        $rootScope.isShowPresidentTitle = false;        //是否顯示總統大選標題
        $rootScope.isShowPresidentCitysBtn = false;     //是否顯示總統城市選票按鈕
        $rootScope.isShowLoadAnimation = false;     //是否顯示讀取資料動畫特效
        $rootScope.voteFuncSwitch = {      //開票網站各項功能開關
            president_total_vote: true, citys_select_legislator: true, non_area_legislator_list: true,
            open_youtube_fancybox: true, open_youtube_href: true
        },

        //#endregion

        //#region *** 應用程式啟動預先執行程序 ***

        //啟動Google Analytics追蹤功能
        ga.openTracking(APP_CONSTANT.GA_TRACK_NO);

        //路由切換開始事件
        $rootScope.$on('$routeChangeStart', function () {

            //將畫面移至最上方
            angular.element('html, body').animate({
                scrollTop: 0
            }, 0);
        });

        //路由切換完成事件
        $rootScope.$on('$routeChangeSuccess', function () {

            //啟動讀取資料動畫特效
            $rootScope.isShowLoadAnimation = true;

            //取得載入的路由路徑決定頁面上各區塊是否顯示
            switch (angular.lowercase(tool.urlHandle.getInfo.path())) {
                case '/':       //首頁
                    //開啟線上即時開票、倒數計時區塊
                    $rootScope.isShowBanner = true;
                    $rootScope.isShowCountDownSection = true;

                    //隱藏總統大選標題、總統縣市票按鈕
                    $rootScope.isShowPresidentTitle = false;
                    $rootScope.isShowPresidentCitysBtn = false;

                    break;
                case '/president':      //總統大選頁
                    //隱藏線上即時開票、倒數計時區塊
                    $rootScope.isShowBanner = false;
                    $rootScope.isShowCountDownSection = false;

                    //顯示總統大選標題、總統縣市票按鈕
                    $rootScope.isShowPresidentTitle = true;
                    $rootScope.isShowPresidentCitysBtn = true;

                    break;
                default:        //其他頁
                    //隱藏線上即時開票、倒數計時區塊、總統大選標題、總統縣市票按鈕
                    $rootScope.isShowBanner = false;
                    $rootScope.isShowCountDownSection = false;
                    $rootScope.isShowPresidentTitle = false;
                    $rootScope.isShowPresidentCitysBtn = false;
            }
        });

        //即時檢測目前視窗大小
        $rootScope.currentWindowWidth = $window.innerWidth;
        angular.element(window).resize(function () {
            $rootScope.currentWindowWidth = $window.innerWidth;
        });

        //判斷若為簡易版開票網站，將網站各功能開關關閉
        if (APP_CONSTANT.IS_SIMPLE_VOTE_MODE) {
            for (var key in $rootScope.voteFuncSwitch) {
                $rootScope.voteFuncSwitch[key] = false;
            }
        }

        //#endregion

        //#region *** 應用程式頁面共用函式 ***

        //開票總票數int轉換
        $rootScope.totalVoteParse = function (data) {
            var outPut;
            if (data.hasOwnProperty('vote_tal')) {
                outPut = parseInt(data.vote_tal, 10);
            }
            return outPut;
        }

        //前往不分區立委總席次頁面
        $rootScope.toLegislatorSeatPage = function () {
            appService.getVoteView(APP_CONSTANT.PAGE_TYPE_CODE.NON_AREA_LEGISLATOR_SEAT);
        }

        //#endregion
    }]);

//#region *** 模組公用過濾器 ***

/**
 * @description - 依據app-vote-base-info-json.js檔案的各項開票資訊代碼與名稱轉換器
 * @param code - 要轉換的代碼
 * @param type - 要轉換的代碼類型 (part：區域、city：城市 ...)
 * @example - {part_id | voteInfoConvert:'part'}
 * @returns - 依據代碼轉換後的中文名稱
 */
app.filter('voteInfoConvert', ['appService', function (appService) {
    return function (code, type) {
        var outPut;
        var regionDataAry = appService.getVoteRegionData(type);

        if (regionDataAry.length > 0) {
            for (var idx in regionDataAry) {
                if (regionDataAry[idx].no == code) {
                    outPut = regionDataAry[idx].name;
                    break;
                }
            }
        }

        return outPut;
    }
}]);

/**
 * @description - 依據政黨代碼轉換為對應的css類別名稱轉換器
 * @param polId - 要轉換的代碼
 * @param cssType - 要轉換的css類型
 * @example - {polnm_id | cssClassByPolConvert: 3}
 * @returns - 依據代碼轉換後的css名稱
 */
app.filter('cssClassByPolConvert', [function () {
    return function (polId, cssType) {
        var cssClass;
        switch (cssType) {
            case 1:     //政黨背景區塊顏色
                var classList = {
                    '01': 'kt',
                    '02': 'mt',
                    '03': 'pfp'
                }
                cssClass = classList[polId];
                break;
            case 2:     //立委所屬政黨邊框色
                var classList = {
                    '01': 'legislator-kmt-box',
                    '02': 'legislator-dpp-box',
                    '03': 'legislator-pfp-box',
                    '04': 'legislator-tsu-box',
                    '05': 'legislator-npsu-box',
                    '08': 'legislator-np-box',
                    '16': 'legislator-npp-box',
                    '00': 'legislator-else-box'
                }
                cssClass = classList[polId];
                break;
            case 3:     //立委名稱所屬政黨背景色
                var classList = {
                    '01': 'lname-kmt',
                    '02': 'lname-dpp',
                    '03': 'lname-pfp',
                    '04': 'lname-tsu',
                    '05': 'lname-npsu',
                    '08': 'lname-np',
                    '16': 'lname-npp',
                    '00': 'lname-else'
                }
                cssClass = classList[polId];
                break;

        }

        return cssClass;
    }
}]);

//#endregion
///#source 1 1 /js/project/app-service.js
//專案共用服務
app.factory('appService', ['$location', 'base64', '$interval', '$rootScope', 'ajax', '$q', '$timeout', 'geoInfo', 'APP_CONSTANT', 'tool', '$route', '$window', '$filter', 
    function ($location, base64, $interval, $rootScope, ajax, $q, $timeout, geoInfo, APP_CONSTANT, tool, $route, $window, $filter) {

        //#region *** 設定或讀取使用者所選擇的開票城市 ***

        var selectCityObj = {};
        var userSelectCity = {
            set: function (cityObj) {
                selectCityObj = cityObj;
            },
            get: function () {
                return selectCityObj;
            }
        }

        //#endregion

        //#region *** 設定或讀取使用者所選擇的選舉區 ***

        var selectSectionObj = {};
        var userSelectSection = {
            set: function (sectionObj) {
                selectSectionObj = sectionObj;
            },
            get: function () {
                return selectSectionObj;
            }
        }

        //#endregion

        //#region *** 要求開票資料Json參數 ***

        var reqVoteJsonParam = {
            vote_type: 0,
            part_id: 0,
            city_id: 0,
            section_id: 0
        }

        var reqVoteJson = {
            get: function () {
                return angular.copy(reqVoteJsonParam);
            },
            set: function (vote_type, part_id, city_id, section_id) {
                reqVoteJsonParam.vote_type = ((angular.isDefined(vote_type) && vote_type != null) ? vote_type : reqVoteJsonParam.vote_type);
                reqVoteJsonParam.part_id = ((angular.isDefined(part_id) && part_id != null) ? part_id : reqVoteJsonParam.part_id);
                reqVoteJsonParam.city_id = ((angular.isDefined(city_id) && city_id != null) ? city_id : reqVoteJsonParam.city_id);
                reqVoteJsonParam.section_id = ((angular.isDefined(section_id) && section_id != null) ? section_id : reqVoteJsonParam.section_id);
            }
        }

        //#endregion

        //#region *** 設定或讀取使用者所在城市名稱 ***

        var userCityName;
        var userCity = {
            set: function (city) {
                userCityName = city;
            },
            get: function () {
                return userCityName;
            }
        }

        //#endregion

        //#region *** 取得隱藏欄位資料 ***

        var getHiddenData = function (elementId, isJson) {
            var data = angular.element('#' + elementId).val();
            try {
                data = base64.decode(data);
                if (isJson) {
                    data = angular.fromJson(data);
                }
            } catch (e) { }
            return data;
        }

        //#endregion

        //#region *** 依據頁面代碼開啟route設定路徑頁面 ***

        //1：首頁、2：總統總票數頁面、3：總統各城市開票頁面、4：城市選擇頁面(總統)、5：城市選擇頁面(立委)、6：選舉區選擇頁面(立委)、7：立委選舉區開票頁面、8：不分區立委名單頁面、9：不分區立委席次頁面
        var getVoteView = function (pageTypeCode, params) {
            switch (parseInt(pageTypeCode, 10)) {
                case 1:
                    $location.url('/') + ((params) ? $location.search(params) : null);
                    break;
                case 2:
                    $location.url('/president') + ((params) ? $location.search(params) : null);
                    break;
                case 3:
                    $location.url('/president/city') + ((params) ? $location.search(params) : null);
                    break;
                case 4:
                case 5:     //城市選單頁面(因總統、立委共用一個頁面，連續輸入兩次同樣route會無作用，故使用重新整理route方法)
                    //if (angular.equals(angular.lowercase($location.url()), '/citys')) {
                    //    $route.reload();
                    //} else {
                    //    $location.url('/citys') + ((params) ? $location.search(params) : null);
                    //}

                    //因route有設定reloadOnSearch: true，當參數改變時會自動reload，可不需使用上面判斷
                    $location.url('/citys') + ((params) ? $location.search(params) : null);
                    break;
                case 6:
                    $location.url('/sections') + ((params) ? $location.search(params) : null);
                    break;
                case 7:
                    $location.url('/legislator/section') + ((params) ? $location.search(params) : null);
                    break;
                case 8:
                    $location.url('/legislator/list') + ((params) ? $location.search(params) : null);
                    break;
                case 9:
                    $location.url('/legislator/seat') + ((params) ? $location.search(params) : null);
                    break;
            }
        }

        //#endregion

        //#region *** 改變網址路徑並帶入參數

        var setPathWithParams = function (path, params) {
            tool.urlHandle.setPathWithParams(path, params);
        }

        //#endregion

        //#region *** 取得網址參數

        var getUrlParams = function () {
            return $location.search();
        }

        //#endregion

        //#region *** 取得指定的Html檔案路徑 ***

        var getHtml = function (voteType) {
            var html = null;
            switch (parseInt(voteType, 10)) {
                case 1:
                    html = '/html/president.html';
                    break;
                case 2:
                    html = '/html/legislator.html';
                    break;

            }
            return html;
        }

        //#endregion

        //#region *** 依據要求類型取得對應開票基礎資料陣列 ***

        var getVoteRegionData = function (type) {
            for (var info in voteRegionInfo) {
                if (voteRegionInfo[info].type === type) {
                    return voteRegionInfo[info].data;
                    break;
                }
            }
        }

        //#endregion

        //#region *** 取得使用者所在位置緯經度轉城市資料 ***

        var getUserCity = function () {
            var deferred = $q.defer();
            var userCityInfo = userCity.get();

            if (userCityInfo) {
                deferred.resolve(userCityInfo);
            } else {
                geoInfo.getGeoLatLng().then(function (obj) {
                    var lat = obj.lat;
                    var lng = obj.lng;

                    geoInfo.getGeoCode(lat, lng).then(function (result) {
                        if (angular.isArray(result)) {
                            if (result.length > 0) {
                                var firstResult = result[0];
                                if (firstResult.hasOwnProperty('address_components') && firstResult.address_components.length > 0) {
                                    var addrInfoAry = firstResult.address_components;
                                    for (var idx in addrInfoAry) {
                                        if (addrInfoAry[idx].hasOwnProperty('types') && addrInfoAry[idx].types.length > 0) {
                                            if (addrInfoAry[idx].types[0] === 'administrative_area_level_1') {
                                                userCity.set(addrInfoAry[idx].long_name);
                                                deferred.resolve(userCity.get());
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }, function (errCode) {
                        deferred.reject(null);
                    });
                }, function (errCode) {
                    deferred.reject(null);
                });
            }

            return deferred.promise;
        }

        //#endregion

        //#region *** 依據城市名稱取出對應的地區與城市資料物件 ***

        var getPartAndCityObject = function (city) {
            var obj = {};
            if (angular.isString(city)) {
                var cityData = getVoteRegionData('city');

                //取出使用者所在的城市物件
                for (var i in cityData) {
                    if (angular.equals(cityData[i].google_name, city)) {
                        var part_no = cityData[i].part_no;

                        //利用城市物件取得所對應的區域物件
                        var partData = getVoteRegionData('part');
                        for (var j in partData) {
                            if (angular.equals(partData[j].no, part_no)) {
                                obj.part = partData[j],
                                obj.city = cityData[i]
                            }
                        }
                    }
                }
            }

            return obj;
        }

        //#region *** 簡易版開票網站資料格式轉換 ***

        var presidentBaseDataObj = {
            name: { 1: '朱立倫', 2: '蔡英文', 3: '宋楚瑜' },
            polnm_id: { 1: '01', 2: '02', 3: '03' },
            img: { 1: '01-1_02.jpg', 2: '01-1_03.jpg', 3: '01-1_04.jpg' }
        }
        var simpleVoteJsonConvert = function (convertType, data) {
            var obj = {};
            switch (convertType) {
                case APP_CONSTANT.SIMPLE_VOTE_TYPE_CODE.PRESIDENT_TOTAL_VOTE:     //總統總票數資料轉換
                    var presidentAry = [];
                    var presidentInfoObj = {};
                    presidentInfoObj.vote_rate = data.CountingRate;      //總統開票率

                    for (var i = 1; i <= 3; i++) {
                        if (data.hasOwnProperty('VoteCountNo' + i)) {
                            var presidentObj = {};
                            presidentObj.can_id = i;        //總統候選人登記編號
                            presidentObj.img = presidentBaseDataObj.img[i];     //總統候選人圖檔名
                            presidentObj.name = presidentBaseDataObj.name[i];        //候選人名稱
                            presidentObj.polnm_id = presidentBaseDataObj.polnm_id[i];        //政黨編號
                            presidentObj.self_flag = data['SelfFlagNo' + i];       //自行宣布當選 (N –否、Y–是)
                            presidentObj.elec_flag = data['ElecFlagNo' + i];       //中選會宣布當選 (N –否、Y–是)
                            presidentObj.vote_th = data['VoteCountNo' + i].substring(data['VoteCountNo' + i].length - 4);       //得票數 (千位)
                            presidentObj.vote_tt = data['VoteCountNo' + i].replace(presidentObj.vote_th, '');       //得票數 (萬位)
                            presidentObj.vote_rate = data['VoteRateNo' + i];        //得票率
                            presidentObj.vote_tal = data['VoteCountNo' + i];        //總票數
                            presidentAry.push(presidentObj);
                        }
                    }

                    presidentInfoObj.data = presidentAry;
                    obj.vote_info = presidentInfoObj;

                    break;

            }

            return obj;
        }

        //#endregion

        //#region *** 重複要求各項開票資訊 ***

        var reqVoteInterval;      //要求各項票數資料 interval

        /**
         * @description 重複要求各項開票資訊
         * @param isUseInterval - 是否重複要求資料
         * @param paramObj - 要求資料參數
         * @param callBack - 回傳資料函式
         */
        var requestVoteData = function (isUseInterval, paramObj, callBack) {

            $rootScope.$watch('currentPageTypeCode', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    cancelInterval(reqVoteInterval);
                }
            });

            //網站資料來源路徑(判斷是否為簡易版網站)
            var apiUrl = ((APP_CONSTANT.IS_SIMPLE_VOTE_MODE) ? $rootScope.voteReqPath.simple : $rootScope.voteReqPath.general);

            //中斷重複間隔函式
            var cancelInterval = function () {
                for (var i = 0; i < arguments.length; i++) {
                    if (angular.isDefined(arguments[i]) || arguments[i] != null) {
                        $interval.cancel(arguments[i]);
                        arguments[i] = null;
                    }
                }
            }

            //傳送各頁面的ajax要求資訊至google analytics
            var sendAjaxEventToGa = function (isAjaxSuccess, param) {
                var websiteType = ((!APP_CONSTANT.IS_SIMPLE_VOTE_MODE) ? 'general: ' : 'simple: ');        //網站類型
                websiteType += ((isAjaxSuccess) ? 'success' : 'failure');      //是否成功
                var message;

                if (isAjaxSuccess && (!APP_CONSTANT.IS_SIMPLE_VOTE_MODE)) {        //ajax成功 - 一般版開票網站
                    switch (param.vote_type) {
                        case 1:
                            message = ((angular.equals(param.part_id, 0)) ? '總統總票數' : '總統各城市票數');
                            break;
                        case 2:
                            message = '立委選舉區票數';
                            break;
                        case 3:
                            message = '不分區立委名單';
                            break;
                        case 4:
                            message = '立委總席次';
                            break;

                    }
                    
                } else if (isAjaxSuccess && APP_CONSTANT.IS_SIMPLE_VOTE_MODE) {        //ajax成功 - 簡易版開票網站
                    message = '總統總票數';
                } else {        //ajax失敗
                    message = param;
                }
                
                //傳送至ga
                if ($window.ga) {
                    $window.ga('send', 'event', 'ajax', websiteType, message);
                }
            }

            //要求開票資料AJAX函式
            var ajaxVoteData = function (reqType) {
                var defer = $q.defer();

                if (apiUrl.length > 0) {
                    if (APP_CONSTANT.IS_SIMPLE_VOTE_MODE) {     //簡易版開票網站
                        ajax.get(apiUrl).then(function (response) {
                            if (response.status === 200) {      //網路回應狀態成功
                                if (!angular.isObject(response.data)) {     //要求簡易版開票 json 物件失敗
                                    defer.reject(APP_CONSTANT.SYSTEM_DATA_NOTFOUND + '\r\nreq: ' + reqType);
                                } else {        //要求簡易版開票 json 物件成功
                                    defer.resolve(response.data);
                                }
                            } else {        //網路回應狀態失敗
                                defer.reject(APP_CONSTANT.SYSTEM_NETWORK_ERROR + '\r\nreq: ' + reqType + ': ' + response.status);
                            }
                        });
                    } else {        //一般正常版開票網站
                        ajax.get(apiUrl, paramObj).then(function (response) {
                            if (response.status === 200) {      //網路回應狀態成功
                                if (response.data.error_code != 1) {      //WebApi 資料處理失敗
                                    defer.reject(APP_CONSTANT.SYSTEM_DATA_NOTFOUND + '\r\nreq: ' + reqType + ': ' + response.data.error_code);
                                } else {        //WebApi 資料處理成功
                                    defer.resolve(response.data);
                                }
                            } else {        //網路回應狀態失敗
                                defer.reject(APP_CONSTANT.SYSTEM_NETWORK_ERROR + '\r\nreq: ' + reqType + ': ' + response.status);
                            }
                        });
                    }
                } else {
                    defer.reject(APP_CONSTANT.SYSTEM_DATA_NOTFOUND + '\r\nreq: ' + reqType + ': ' + 'api address lost');
                }

                return defer.promise;
            }

            //開始要求伺服器開票資料
            $timeout(function () {

                //先停止要求前一次的重複排程
                if (angular.isDefined(reqVoteInterval) || reqVoteInterval != null) {
                    cancelInterval(reqVoteInterval);
                }

                //先執行要求資料一次後再開始重複要求資料
                ajaxVoteData($rootScope.currentPageTypeCode).then(function (data) {
                    callBack(data);
                    sendAjaxEventToGa(true, paramObj);

                    if (isUseInterval) {
                        reqVoteInterval = $interval(function () {
                            ajaxVoteData($rootScope.currentPageTypeCode).then(function (data) {
                                callBack(data);
                                sendAjaxEventToGa(true, paramObj);
                            }, function (errMsg) {
                                cancelInterval(reqVoteInterval);
                                //alert(errMsg);
                                console.error($filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss') + ': ' + errMsg);
                                sendAjaxEventToGa(false, errMsg);

                            })
                        }, APP_CONSTANT.UPDATE_INTERVAL);
                    }

                }, function (errMsg) {
                    //alert(errMsg);
                    console.error($filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss') + ': ' + errMsg);
                    sendAjaxEventToGa(false, errMsg);
                });

            }, 200);
        }

        //#endregion

        //#region *** appService公開方法 ***

        return {
            userSelectCity: userSelectCity,
            userSelectSection: userSelectSection,
            reqVoteJson: reqVoteJson,
            userCity: userCity,
            getHiddenData: getHiddenData,
            getVoteView: getVoteView,
            setPathWithParams: setPathWithParams,
            getUrlParams: getUrlParams,
            getHtml: getHtml,
            getVoteRegionData: getVoteRegionData,
            getUserCity: getUserCity,
            getPartAndCityObject: getPartAndCityObject,
            simpleVoteJsonConvert: simpleVoteJsonConvert,
            requestVoteData: requestVoteData,
        };

        //#endregion

    }]);
///#source 1 1 /js/project/app-directive.js
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
///#source 1 1 /js/project/app-controller.js
//外層框架控制器
app.controller('indexCtrl', ['$scope', '$rootScope', 'appService', 'APP_CONSTANT', 'tool', '$filter', '$window',
    function ($scope, $rootScope, appService, APP_CONSTANT, tool, $filter, $window) {

        $scope.initJson = appService.getHiddenData('hi', true);

        if ($scope.initJson.error_code == 1) {

            $scope.pageTypeCode = APP_CONSTANT.PAGE_TYPE_CODE;      //要求頁面代碼物件(下方按鈕選單用)

            //fancybox使用youtube網址
            $scope.youtubeLinkForFancybox = APP_CONSTANT.YOUTUBE_PREFIX_EMBED + $scope.initJson.youtube_src;

            //fancybox使用參數
            $scope.fancyboxParams = {
                enable: $rootScope.voteFuncSwitch.open_youtube_fancybox,       //是否使用fancybox功能
                params: {
                    helpers: {
                        overlay: {
                            closeClick: false
                        }
                    }
                }
            }

            //判斷若關閉fancybox開啟youtube功能，則取消a標籤預設開啟超連結功能
            $scope.fancyboxClick = function ($event, source) {
                if (!$rootScope.voteFuncSwitch.open_youtube_fancybox) {     //簡易版
                    $event.preventDefault();
                } else {        //一般版，send play youtube ga
                    if ($window.ga) {
                        $window.ga('send', 'event', 'youtube', 'open', source);
                    }
                }
            }

            //countdown 參數
            $scope.countdownParams = {
                isShow: function () {
                    return (!tool.checkIEVersion(8)) && ($scope.initJson.vote_second > 0) && ($rootScope.isShowCountDownSection);
                },
                params: {
                    lastTime: $scope.initJson.vote_second,
                    width: 250,
                    height: 70,
                    textColor: '#ffffff',
                    startRange: 'hour',
                    completeCallBack: function () {        //倒數計時秒數完成
                        angular.element('#countdownWrap').slideUp();
                    }
                }
            }

            ////網址連結至Youtube線上即時開票(開啟youtube皆改為使用fancybox開啟)
            //$scope.youtubeLinkForPage = function () {
            //    if ($rootScope.voteFuncSwitch.open_youtube_href) {
            //        top.window.location.href = APP_CONSTANT.YOUTUBE_PREFIX_GENERAL + $scope.initJson.youtube_src;
            //    }
            //}

            //回到首頁
            $scope.toWebsiteIndex = function () {
                //appService.getVoteView(APP_CONSTANT.PAGE_TYPE_CODE.INDEX);
                if (!angular.equals(tool.urlHandle.getInfo.path(), '/')) {
                    tool.urlHandle.redirectToRoot();
                }
            }

            //要求開票類型改變事件
            $scope.voteTypeChangeEvent = function (selectPageTypeCode) {

                //載入相對應的頁面
                if (!angular.equals($rootScope.currentPageTypeCode, selectPageTypeCode)) {

                    switch (selectPageTypeCode) {
                        case APP_CONSTANT.PAGE_TYPE_CODE.PRESIDENT_TOTAL_VOTE:     //總統大選頁面
                            if ($rootScope.voteFuncSwitch.president_total_vote) {
                                appService.getVoteView(selectPageTypeCode);
                            } else {
                                return;
                            }

                            break;
                        case APP_CONSTANT.PAGE_TYPE_CODE.CITYS_SELECT_LEGISLATOR:      //立委城市選單頁面
                            if ($rootScope.voteFuncSwitch.citys_select_legislator) {
                                appService.getVoteView(selectPageTypeCode,
                                { t: String(APP_CONSTANT.CITYS_PAGE_SELECT_TYPE.LEGISLATOR) });
                            } else {
                                return;
                            }

                            break;
                        case APP_CONSTANT.PAGE_TYPE_CODE.NON_AREA_LEGISLATOR_LIST:     //不分區立委名單頁面
                            if ($rootScope.voteFuncSwitch.non_area_legislator_list) {
                                appService.getVoteView(selectPageTypeCode);
                            } else {
                                return;
                            }

                            break;
                    }
                }
            }

            //#region *** 外層框架 onload ***

            //載入預設頁面(首頁)
            //$scope.toWebsiteIndex();

            //#endregion

        } else {
            //alert(APP_CONSTANT.SYSTEM_DATA_NOTFOUND + '\r\nreq: init: ' + $scope.initJson.error_code);
            console.error($filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss') + ': ' + APP_CONSTANT.SYSTEM_DATA_NOTFOUND + '\r\nreq: init: ' + $scope.initJson.error_code);
        }
    }]);

//總統總票數頁面控制器
app.controller('presidentCtrl', ['$scope', '$rootScope', 'appService', 'APP_CONSTANT', 'tool',
    function ($scope, $rootScope, appService, APP_CONSTANT, tool) {

        //接收回傳總統總票數資料
        var presidentTotalVoteCallBack = function (data) {
            if (angular.isObject(data)) {

                //判斷是否為簡易版網站
                if (!APP_CONSTANT.IS_SIMPLE_VOTE_MODE) {        //一般

                    //test animation
                    //data.vote_info.data[0].vote_tal = ((Math.random() * 999999)).toString();
                    //data.vote_info.data[1].vote_tal = ((Math.random() * 999999)).toString();
                    //data.vote_info.data[2].vote_tal = ((Math.random() * 999999)).toString();

                    //data.vote_info.data[0].elec_flag = 'N';
                    //data.vote_info.data[1].elec_flag = 'N';
                    //data.vote_info.data[2].elec_flag = 'N';

                    //$scope.presidentJson = data;

                    //setTimeout(function () {
                    //    $scope.$apply(function () {
                    //        $scope.presidentJson.vote_info.data[0].elec_flag = 'Y';
                    //        $scope.presidentJson.vote_info.data[1].elec_flag = 'Y';
                    //        $scope.presidentJson.vote_info.data[2].elec_flag = 'Y';
                    //    });
                    //}, 5000);

                    //setTimeout(function () {
                    //    $scope.$apply(function () {
                    //        $scope.presidentJson.vote_info.data[0].self_flag = 'Y';
                    //        $scope.presidentJson.vote_info.data[1].self_flag = 'Y';
                    //        $scope.presidentJson.vote_info.data[2].self_flag = 'Y';
                    //    });
                    //}, 8000);

                    $scope.presidentJson = data;

                } else {        //簡易

                    //先將取得的json文件資料轉換為相符格式
                    $scope.presidentJson = appService.simpleVoteJsonConvert(APP_CONSTANT.SIMPLE_VOTE_TYPE_CODE.PRESIDENT_TOTAL_VOTE, data);
                }

                //關閉讀取資料動畫特效
                if ($rootScope.isShowLoadAnimation) {
                    $rootScope.isShowLoadAnimation = false;
                }
            }
        }

        //前往城市選擇頁面
        $scope.toCitySelectPage = function () {
            appService.getVoteView(APP_CONSTANT.PAGE_TYPE_CODE.CITYS_SELECT_PRESIDENT,
                { t: String(APP_CONSTANT.CITYS_PAGE_SELECT_TYPE.PRESIDENT) });
        }

        //總統開票率進度條樣式
        $scope.progressStyle = {
            outer: {
                background: 'none',
                border: '1px solid #af0000',
                height: '50px',
                width: 'auto'
            },
            inner: {
                background: '#af0000',
                border: 'none',
                margin: '0'
            }
        }

        //#region *** 總統總票數頁面 onload ***

        //因首頁與總統大選頁面共用相同controller，故判斷路由路徑決定頁面代碼(1：首頁、2：總統大選頁)
        var currentRoutePath = angular.lowercase(tool.urlHandle.getInfo.path());
        if (angular.equals(currentRoutePath, '/')) {
            $rootScope.currentPageTypeCode = APP_CONSTANT.PAGE_TYPE_CODE.INDEX;
        } else if (angular.equals(currentRoutePath, '/president')) {
            $rootScope.currentPageTypeCode = APP_CONSTANT.PAGE_TYPE_CODE.PRESIDENT_TOTAL_VOTE;
        }

        //設定伺服器要求參數類型為總統
        appService.reqVoteJson.set(APP_CONSTANT.REQ_VOTE_CODE.PRESIDENT, 0, 0, 0);      //初始化總統要求資料Json參數
        appService.requestVoteData(true, appService.reqVoteJson.get(), presidentTotalVoteCallBack);

        //#endregion

    }]);

//立委選舉區開票資料頁面控制器
app.controller('legislatorSectionCtrl', ['$scope', '$rootScope', 'appService', 'APP_CONSTANT',
    function ($scope, $rootScope, appService, APP_CONSTANT) {

        //接收回傳立委選舉區資料
        var legislatorSectionCallBack = function (data) {
            if (angular.isObject(data)) {
                //test animation
                //for (var i in data.vote_info) {
                //    data.vote_info[i].vote_tal = ((Math.random() * 999999)).toString();
                //}

                //for (var i in data.vote_info) {
                //    data.vote_info[i].elec_flag = 'N';
                //}

                //$scope.legislatorSectionJson = data;

                //setTimeout(function () {
                //    $scope.$apply(function () {
                //        for (var i in data.vote_info) {
                //            $scope.legislatorSectionJson.vote_info[i].elec_flag = 'Y';
                //        }
                //    });
                //}, 5000);

                $scope.legislatorSectionJson = data;

                //關閉讀取資料動畫特效
                if ($rootScope.isShowLoadAnimation) {
                    $rootScope.isShowLoadAnimation = false;
                }

                //預防使用IE瀏覽器在候選人名單太長在低解析度螢幕下無法完整瀏覽名單，故加入外層框架最小高度，發生原因不明待查？
                $scope.outerMinHeightStyleForIE = function () {
                    var minHeightStyle;

                    //桌機版才需加入此條件，手機版不需要
                    if ($rootScope.currentWindowWidth > $rootScope.mobileWindowWidth) {
                        if ($scope.legislatorSectionJson.vote_info.length > 9) {
                            minHeightStyle = '850px';
                        }
                    }

                    return minHeightStyle;
                }
            }
        }

        //#region *** 立委頁面 onload ***

        //設定頁面代碼
        $rootScope.currentPageTypeCode = APP_CONSTANT.PAGE_TYPE_CODE.LEGISLATOR_SECTION_VOTE;

        //取得使用者選擇的選舉區資料
        var selectParams = appService.getUrlParams();
        var sectionsDataAry = appService.getVoteRegionData('section');
        for (var idx in sectionsDataAry) {
            var sectionObj = sectionsDataAry[idx];
            if (angular.equals(String(sectionObj.no), String(selectParams.s))) {
                $scope.sectionName = sectionObj.name;      //選舉區名稱
                $scope.sectionDesc = sectionObj.web_desc;      //選舉區描述文字
                appService.reqVoteJson.set(APP_CONSTANT.REQ_VOTE_CODE.LEGISLATOR, sectionObj.part_no, sectionObj.city_no, sectionObj.no);

                //向伺服器要求立委選舉區資料
                appService.requestVoteData(true, appService.reqVoteJson.get(), legislatorSectionCallBack);

                break;
            }
        }

        //#endregion

    }]);

//總統、立委城市選擇頁面控制器
app.controller('citysSelectCtrl', ['$scope', '$rootScope', 'appService', 'APP_CONSTANT', '$timeout',
    function ($scope, $rootScope, appService, APP_CONSTANT, $timeout) {

        //使用者選擇城市
        $scope.selectCityEvent = function (cityObj) {

            if (angular.equals(String($scope.citysTypeCode), String(APP_CONSTANT.CITYS_PAGE_SELECT_TYPE.PRESIDENT))) {      //轉至總統各城市票數頁面

                //設定選擇的城市代碼網址參數
                appService.getVoteView(APP_CONSTANT.PAGE_TYPE_CODE.PRESIDENT_CITYS_VOTE,
                    { c: String(cityObj.no) });

            } else if (angular.equals(String($scope.citysTypeCode), String(APP_CONSTANT.CITYS_PAGE_SELECT_TYPE.LEGISLATOR))) {       //轉至立委選舉區頁面

                //判斷選擇的城市是否有一個以上選舉區
                if (angular.equals(cityObj.has_section, 1)) {       //選擇的城市有多個選舉區

                    //設定選擇的城市代碼網址參數
                    appService.getVoteView(APP_CONSTANT.PAGE_TYPE_CODE.SECTIONS_SELECT_LEGISLATOR,
                        { c: String(cityObj.no) });

                } else {        //選擇的城市只有一個選舉區

                    //利用城市編號取得單一選舉區資料
                    var sectionsDataAry = appService.getVoteRegionData('section');
                    for (var idx in sectionsDataAry) {
                        var sectionObj = sectionsDataAry[idx];
                        if (angular.equals(sectionObj.city_no, cityObj.no)) {

                            //設定選擇的區域與城市、選舉區代碼網址參數
                            appService.getVoteView(APP_CONSTANT.PAGE_TYPE_CODE.LEGISLATOR_SECTION_VOTE,
                                { s: String(sectionObj.no) });

                            break;
                        }
                    }
                }
            }
        }

        //#region *** 城市選單頁面 onload ***

        //城市選單類型 (1: 總統、2: 立委)
        $scope.citysTypeCode = appService.getUrlParams().t;

        //儲存頁面代碼與判斷城市選單為總統或立委
        if (angular.equals(String($scope.citysTypeCode), String(APP_CONSTANT.CITYS_PAGE_SELECT_TYPE.PRESIDENT))) {      //開啟城市選單來源為總統
            $rootScope.currentPageTypeCode = APP_CONSTANT.PAGE_TYPE_CODE.CITYS_SELECT_PRESIDENT;
        } else if (angular.equals(String($scope.citysTypeCode), String(APP_CONSTANT.CITYS_PAGE_SELECT_TYPE.LEGISLATOR))) {       //開啟城市選單來源為立委
            $rootScope.currentPageTypeCode = APP_CONSTANT.PAGE_TYPE_CODE.CITYS_SELECT_LEGISLATOR;
        }

        //城市選單資料(動畫效果，延遲載入)
        $timeout(function () {
            $scope.citysDataAry = appService.getVoteRegionData('city');
        }, 500);

        //關閉讀取資料動畫特效
        if ($rootScope.isShowLoadAnimation) {
            $rootScope.isShowLoadAnimation = false;
        }

        //#endregion

    }]);

//總統各城市票數頁面控制器
app.controller('presidentCityCtrl', ['$scope', '$rootScope', 'appService', 'APP_CONSTANT',
    function ($scope, $rootScope, appService, APP_CONSTANT) {

        //接收回傳總統各城市票數資料
        var presidentCityVoteCallBack = function (data) {
            if (angular.isObject(data)) {
                //test animation
                //data.vote_info[0].data[0].vote_tal = ((Math.random() * 999999)).toString();
                //data.vote_info[0].data[1].vote_tal = ((Math.random() * 999999)).toString();
                //data.vote_info[0].data[2].vote_tal = ((Math.random() * 999999)).toString();
                //data.vote_info[1].data[0].vote_tal = ((Math.random() * 999999)).toString();
                //data.vote_info[1].data[1].vote_tal = ((Math.random() * 999999)).toString();
                //data.vote_info[1].data[2].vote_tal = ((Math.random() * 999999)).toString();
                //data.vote_info[2].data[0].vote_tal = ((Math.random() * 999999)).toString();
                //data.vote_info[2].data[1].vote_tal = ((Math.random() * 999999)).toString();
                //data.vote_info[2].data[2].vote_tal = ((Math.random() * 999999)).toString();

                //data.vote_info[0].data[0].elec_flag = 'N';
                //data.vote_info[0].data[1].elec_flag = 'N';
                //data.vote_info[0].data[2].elec_flag = 'N';

                //$scope.presidentCityJson = data;

                //setTimeout(function () {
                //    $scope.$apply(function () {
                //        $scope.presidentCityJson.vote_info[0].data[0].elec_flag = 'Y';
                //        $scope.presidentCityJson.vote_info[0].data[1].elec_flag = 'Y';
                //        $scope.presidentCityJson.vote_info[0].data[2].elec_flag = 'Y';
                //    });
                //}, 5000);

                //setTimeout(function () {
                //    $scope.$apply(function () {
                //        $scope.presidentCityJson.vote_info[0].data[0].self_flag = 'Y';
                //        $scope.presidentCityJson.vote_info[0].data[1].self_flag = 'Y';
                //        $scope.presidentCityJson.vote_info[0].data[2].self_flag = 'Y';
                //    });
                //}, 8000);

                $scope.presidentCityJson = data;

                //關閉讀取資料動畫特效
                if ($rootScope.isShowLoadAnimation) {
                    $rootScope.isShowLoadAnimation = false;
                }
            }
        }

        //#region *** 總統各城市票數頁面 onload ***

        //設定頁面代碼
        $rootScope.currentPageTypeCode = APP_CONSTANT.PAGE_TYPE_CODE.PRESIDENT_CITYS_VOTE;

        //頁面載入就向Server要求總統各城市得票數
        appService.reqVoteJson.set(APP_CONSTANT.REQ_VOTE_CODE.PRESIDENT, 99, 99, 0);        //設定要求總統全部城市開票資料參數
        appService.requestVoteData(true, appService.reqVoteJson.get(), presidentCityVoteCallBack);

        //endregion
    }]);

//立委選舉區選擇頁面控制器
app.controller('sectionsSelectCtrl', ['$scope', '$rootScope', 'appService', 'APP_CONSTANT',
    function ($scope, $rootScope, appService, APP_CONSTANT) {

        $scope.selectSectionEvent = function (sectionObj) {

            //設定選擇的區域與城市、選舉區代碼網址參數
            appService.getVoteView(APP_CONSTANT.PAGE_TYPE_CODE.LEGISLATOR_SECTION_VOTE,
                { s: String(sectionObj.no) });
        }

        //#region *** 選舉區頁面 onload ***

        //設定頁面代碼
        $rootScope.currentPageTypeCode = APP_CONSTANT.PAGE_TYPE_CODE.SECTIONS_SELECT_LEGISLATOR;

        //取得前一頁面選擇的城市資料帶入相對應的選舉區資料
        var citysDataAry = appService.getVoteRegionData('city');
        var sectionsDataAry = appService.getVoteRegionData('section');
        var selectParams = appService.getUrlParams();
        $scope.sectionsDataAry = [];

        //依據使用者選擇的城市編號取出城市名稱
        for (var idx in citysDataAry) {
            if (angular.equals(String(citysDataAry[idx].no), String(selectParams.c))) {
                $scope.selectCityName = citysDataAry[idx].name;
                break;
            }
        }

        //依據使用者選擇的城市編號取出所屬的選舉區資料
        for (var idx in sectionsDataAry) {
            if (angular.equals(String(sectionsDataAry[idx].city_no), String(selectParams.c))) {
                $scope.sectionsDataAry.push(sectionsDataAry[idx]);
            }
        }

        //關閉讀取資料動畫特效
        if ($rootScope.isShowLoadAnimation) {
            $rootScope.isShowLoadAnimation = false;
        }

        //endregion
    }]);

//不分區立委名單頁面控制器
app.controller('nonAreaLegislatorListCtrl', ['$scope', '$rootScope', 'appService', 'APP_CONSTANT',
    function ($scope, $rootScope, appService, APP_CONSTANT) {

        ////處理不分區立委相同政黨群組資料與人數
        var polGroupProcess = function (data) {
            var nonAreaLegislatorGroupObj = {};
            var nonAreaLegislatorGroupAry = [];

            //產生不分區立委資料物件
            for (var idx in data) {
                var polnm_id = data[idx].polnm_id;      //政黨編號
                var nonAreaLegislatorObj = data[idx];       //不分區立委資料

                //判斷物件是否有目前政黨編號資料，有則新增，沒有則建立新政黨資料，並加入同一政黨不分區名單人數與政黨編號
                if (nonAreaLegislatorGroupObj.hasOwnProperty(polnm_id)) {
                    nonAreaLegislatorGroupObj[polnm_id].data.push(nonAreaLegislatorObj);
                    nonAreaLegislatorGroupObj[polnm_id].count++;
                } else {
                    nonAreaLegislatorGroupObj[polnm_id] = {
                        polnm_id: nonAreaLegislatorObj.polnm_id,
                        data: [nonAreaLegislatorObj],
                        count: 1
                    }
                }
            }

            //將不分區立委資料物件轉陣列
            for (var key in nonAreaLegislatorGroupObj) {
                nonAreaLegislatorGroupAry.push(nonAreaLegislatorGroupObj[key]);
            }

            return nonAreaLegislatorGroupAry;
        }

        //接收回傳不分區立委名單資料
        var nonAreaLegislatorListCallBack = function (data) {
            if (angular.isObject(data)) {
                $scope.nonAreaLegislatorListJson = polGroupProcess(data.vote_info.data);
                $scope.isShowList = Number(data.vote_info.is_show);

                //test animation
                //setTimeout(function () {
                //    $scope.$apply(function () {
                //        for (var i = 0; i < 20; i++) {
                //            data.vote_info.data.push({ name: 'Eason', polnm_id: '01' });
                //            data.vote_info.data.push({ name: 'Eason', polnm_id: '03' });
                //            data.vote_info.data.push({ name: 'Eason', polnm_id: '16' });
                //            data.vote_info.data.push({ name: 'Eason', polnm_id: '05' });
                //        }

                //        $scope.nonAreaLegislatorListJson = polGroupProcess(data.vote_info.data);
                //    });

                //}, 3000);

                //關閉讀取資料動畫特效
                if ($rootScope.isShowLoadAnimation) {
                    $rootScope.isShowLoadAnimation = false;
                }
            }
        }

        //#region *** 選舉區頁面 onload ***

        //設定頁面代碼
        $rootScope.currentPageTypeCode = APP_CONSTANT.PAGE_TYPE_CODE.NON_AREA_LEGISLATOR_LIST;

        //初始化是否顯示名單註記
        $scope.isShowList = 0;

        //設定伺服器要求參數類型為不分區立委名單
        appService.reqVoteJson.set(APP_CONSTANT.REQ_VOTE_CODE.NON_AREA_LEGISLATOR_LIST, 0, 0, 0);
        appService.requestVoteData(true, appService.reqVoteJson.get(), nonAreaLegislatorListCallBack);

        //endregion
    }]);

//不分區立委席次頁面控制器
app.controller('nonAreaLegislatorSeatCtrl', ['$scope', '$rootScope', 'appService', 'APP_CONSTANT',
    function ($scope, $rootScope, appService, APP_CONSTANT) {

        //接收回傳不分區立委席次資料
        var nonAreaLegislatorSeatCallBack = function (data) {
            if (angular.isObject(data)) {
                //test animation
                //data.vote_info.data[0].total_seat = (Math.round(Math.random() * 99)).toString();
                //data.vote_info.data[1].total_seat = (Math.round(Math.random() * 99)).toString();
                //data.vote_info.data[2].total_seat = (Math.round(Math.random() * 99)).toString();
                //data.vote_info.data[3].total_seat = (Math.round(Math.random() * 99)).toString();
                //data.vote_info.data[4].total_seat = (Math.round(Math.random() * 99)).toString();
                //data.vote_info.data[5].total_seat = (Math.round(Math.random() * 99)).toString();
                //data.vote_info.data[6].total_seat = (Math.round(Math.random() * 99)).toString();
                //data.vote_info.data[7].total_seat = (Math.round(Math.random() * 99)).toString();

                $scope.isShowSeat = Number(data.vote_info.is_show);
                $scope.nonAreaLegislatorSeatJson = data;

                //加總所有政黨總席次(頁面直接顯示總席次113席，不需自動加總，20160114)
                //$scope.sumTotalSeat = function () {
                //    var total = 0;
                //    var seatDataAry = data.vote_info.data;
                //    for (var idx in seatDataAry) {
                //        if (seatDataAry[idx].hasOwnProperty('total_seat')) {
                //            total += parseInt(seatDataAry[idx].total_seat, 10);
                //        }
                //    }

                //    return total;
                //}

                //關閉讀取資料動畫特效
                if ($rootScope.isShowLoadAnimation) {
                    $rootScope.isShowLoadAnimation = false;
                }
            }
        }

        //不分區立委總席次int轉換
        $scope.totalSeatParse = function (data) {
            var outPut;
            if (data.hasOwnProperty('total_seat')) {
                outPut = parseInt(data.total_seat, 10);
            }
            return outPut;
        }

        //#region *** 選舉區頁面 onload ***

        //設定頁面代碼
        $rootScope.currentPageTypeCode = APP_CONSTANT.PAGE_TYPE_CODE.NON_AREA_LEGISLATOR_SEAT;

        //初始化是否顯示總席次資料註記
        $scope.isShowSeat = 0;

        //本次立委選舉總席次
        $scope.legislatorTotalSeat = 113;

        //設定伺服器要求參數類型為不分區立委名單
        appService.reqVoteJson.set(APP_CONSTANT.REQ_VOTE_CODE.NON_AREA_LEGISLATOR_SEAT, 0, 0, 0);
        appService.requestVoteData(true, appService.reqVoteJson.get(), nonAreaLegislatorSeatCallBack);

        //endregion
    }]);
