﻿var voteRegionInfo = [
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


