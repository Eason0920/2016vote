using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

/*
 *  說明: 傳遞 Block5 (5.各區總統得票數) 的 vote_info 資料時，所需要的欄位
 *  
 *  修改日期: 2015/11/30
 *  修改人員: 吳宇澤
 *  修改內容: 新增「候選人籤號(籤號)」、「候選人登記編號的圖檔名」兩個欄位
 *  
 *  修改日期: 2015/11/16
 *  修改人員: 吳宇澤
 *  修改內容:   
 *  
 *  建立日期: 2015/11/12
 *  建立人員: 吳宇澤
 */

//Block5 - 各區(各縣市)總統得票數
namespace com.ebc.WebServer.wcf.Block5
{
    /// <summary>
    /// 傳遞 Block5 (5.各區總統得票數) 的 vote_info 資料時，所需要的欄位
    /// </summary>
    public class Cvote_info
    {
        public Cvote_info() {}

        /// <summary>
        /// 區域代號 part_id: (1–北部、2–中部、3–南部、4–東部、5–離島)
        /// </summary>
        [JsonProperty("TPRV_AREA_NO")]
        public string TPRV_AREA_NO { get; set; }

        /// <summary>
        /// city: 縣市名稱
        /// </summary>
        [JsonProperty("TPRV_CITY_NM")]
        public string TPRV_CITY_NM { get; set; }

        /// <summary>
        /// data - name: 候選人名稱
        /// </summary>
        [JsonProperty("TPRV_NAME")]
        public string TPRV_NAME { get; set; }

        /// <summary>
        /// 得票數
        /// </summary>
        [JsonProperty("TPRV_VOTE_COUNT")]
        public string TPRV_VOTE_COUNT { get; set; }

        /// <summary>
        /// 得票數 (萬位)
        /// </summary>
        [JsonProperty("TPRV_VOTE_TT")]
        public string TPRV_VOTE_TT { get; set; }

        /// <summary>
        /// 得票數 (千位)
        /// </summary>
        [JsonProperty("TPRV_VOTE_TH")]
        public string TPRV_VOTE_TH { get; set; }

        /// <summary>
        /// 得票率%
        /// </summary>
        [JsonProperty("TPRV_VOTE_RATE")]
        public string TPRV_VOTE_RATE { get; set; }

        /// <summary>
        /// 候選人圖檔路徑 (總統為大頭照)
        /// </summary>
        [JsonProperty("TPC_IMG")]
        public string TPC_IMG { get; set; }

        /// <summary>
        /// 中選會宣布當選 (0 –否、1–是)
        /// </summary>
        [JsonProperty("TPC_ELEC_FLAG")]
        public string TPC_ELEC_FLAG { get; set; }

        /// <summary>
        /// 自行宣布當選 (0 –否、1–是)
        /// </summary>
        [JsonProperty("TPC_SELF_FLAG")]
        public string TPC_SELF_FLAG { get; set; }

        /// <summary>
        /// 候選人籤號
        /// </summary>
        [JsonProperty("TPC_PRESIDENT_ID")]
        public string TPC_PRESIDENT_ID { get; set; }

        /// <summary>
        /// 候選人所屬政黨編號
        /// </summary>
        [JsonProperty("TPC_POLNO")]
        public string TPC_POLNO { get; set; }
    }
}