using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

/*
 *  說明: 傳遞 Block6 (6.各區立委得票數) 的 vote_info 資料時，所需要的欄位
 *  
 *  修改日期: 2015/11/25、2015/11/30
 *  修改人員: 吳宇澤
 *  修改內容:   
 *  
 *  建立日期: 2015/11/25
 *  建立人員: 吳宇澤
 */

//Block6 - 各區立委得票數
namespace com.ebc.WebServer.wcf.Block6
{
    /// <summary>
    /// 傳遞 Block6 (6.各區立委得票數) 的 vote_info 資料時，所需要的欄位
    /// </summary>
    public class Cvote_info
    {
        public Cvote_info() {}

        /// <summary>
        /// 區域代號 part_id: (1:北部, 2:中部, 3:南部, 4:東部, 5:離島, 6:原住民, 7:不分區)
        /// </summary>
        [JsonProperty("TLC_AREA_NO")]
        public string TLC_AREA_NO { get; set; }

        /// <summary>
        /// city_no: 縣市代號
        /// </summary>
        [JsonProperty("TLC_CITY_NO")]
        public string TLC_CITY_NO { get; set; }

        /// <summary>
        /// city_nm: 縣市名稱
        /// </summary>
        [JsonProperty("TLC_CITY_NM")]
        public string TLC_CITY_NM { get; set; }

        /// <summary>
        /// section_no: 選區代號
        /// </summary>
        [JsonProperty("TLC_SECTION_NO")]
        public string TLC_SECTION_NO { get; set; }

        /// <summary>
        /// section_nm: 選區名稱
        /// </summary>
        [JsonProperty("TLC_SECTION_NM")]
        public string TLC_SECTION_NM { get; set; }

        /// <summary>
        /// data - name: 候選人名稱
        /// </summary>
        [JsonProperty("TLC_NAME")]
        public string TLC_NAME { get; set; }

        /// <summary>
        /// data - legislator_id: 候選人登記編號(籤號)
        /// </summary>
        [JsonProperty("TLC_LEGISLATOR_ID")]
        public string TLC_LEGISLATOR_ID { get; set; }

        /// <summary>
        /// 得票數
        /// </summary>
        [JsonProperty("TLC_VOTE_COUNT")]
        public string TLC_VOTE_COUNT { get; set; }

        /// <summary>
        /// 得票數 (萬位)
        /// </summary>
        [JsonProperty("TLC_VOTE_TT")]
        public string TLC_VOTE_TT { get; set; }

        /// <summary>
        /// 得票數 (千位)
        /// </summary>
        [JsonProperty("TLC_VOTE_TH")]
        public string TLC_VOTE_TH { get; set; }

        ///// <summary>
        ///// 得票率%
        ///// </summary>
        //[JsonProperty("TLC_VOTE_RATE")]
        //public string TLC_VOTE_RATE { get; set; }

        /// <summary>
        /// 候選人圖檔路徑 (立委為政黨圖示) (已無用)
        /// </summary>
        [JsonProperty("TLC_POLIMG")]
        public string TLC_POLIMG { get; set; }

        /// <summary>
        /// 候選人所屬政黨編號
        /// </summary>
        [JsonProperty("TLC_POLNO")]
        public string TLC_POLNO { get; set; }

        /// <summary>
        /// 中選會宣布當選 (0 –否、1–是)
        /// </summary>
        [JsonProperty("TLC_ELEC_FLAG")]
        public string TLC_ELEC_FLAG { get; set; }

        /// <summary>
        /// 自行宣布當選 (0 –否、1–是)
        /// </summary>
        [JsonProperty("TLC_SELF_FLAG")]
        public string TLC_SELF_FLAG { get; set; }
    }
}