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