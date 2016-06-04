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