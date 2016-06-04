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