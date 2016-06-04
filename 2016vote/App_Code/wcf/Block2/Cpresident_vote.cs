using System;
//using System.Collections.Generic;
//using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

/*
 *  說明: 傳遞 Block2 (2.開票狀態_總統) 的 president_vote (總統得票資料) 資料時，所需要的欄位
 *  
 *  修改日期: 2015/11/13
 *  修改人員: 吳宇澤
 *  修改內容:   
 *  建立日期: 2015/11/09
 *  建立人員: 吳宇澤
 */

//Block2 - 開票狀態(總統)
namespace com.ebc.WebServer.wcf.Block2
{
    /// <summary>
    /// 傳遞 Block2 (2.開票狀態_總統) 的 president_vote (總統得票資料) 資料時，所需要的欄位
    /// </summary>
    public class Cpresident_vote
    {
        public Cpresident_vote() { }

        /// <summary>
        /// 候選人編號 (系統用,李經理匯資料用)
        /// </summary>
        [JsonProperty("TPC_CANNO")]
        public string TPC_CANNO { get; set; }

        /// <summary>
        /// 候選人號碼 (中選會抽籤的號碼)
        /// </summary>
        [JsonProperty("TPC_PRESIDENT_ID")]
        public string TPC_PRESIDENT_ID { get; set; }

        /// <summary>
        /// 候選人登記編號的圖檔名
        /// </summary>
        [JsonProperty("TPC_PRESIDENT_ID_IMG")]
        public string TPC_PRESIDENT_ID_IMG { get; set; }

        /// <summary>
        /// 候選人姓名
        /// </summary>
        [JsonProperty("TPC_NAME")]
        public string TPC_NAME { get; set; }

        /// <summary>
        /// 候選人所屬政黨編號
        /// </summary>
        [JsonProperty("TPC_POLNO")]
        public string TPC_POLNO { get; set; }

        /// <summary>
        /// 候選人所屬政黨名稱 (已無用)
        /// </summary>
        [JsonProperty("TPC_POLNM")]
        public string TPC_POLNM { get; set; }

        /// <summary>
        /// 候選人大頭照的圖檔名
        /// </summary>
        [JsonProperty("TPC_IMG")]
        public string TPC_IMG { get; set; }

        /// <summary>
        /// 自行宣布當選 (0:否、1:是)
        /// </summary>
        [JsonProperty("TPC_SELF_FLAG")]
        public string TPC_SELF_FLAG { get; set; }

        /// <summary>
        /// 中選會宣布當選 (0:否、1:是)
        /// </summary>
        [JsonProperty("TPC_ELEC_FLAG")]
        public string TPC_ELEC_FLAG { get; set; }

        /// <summary>
        /// 得票數
        /// </summary>
        [JsonProperty("TPC_VOTE_COUNT")]
        public string TPC_VOTE_COUNT { get; set; }

        /// <summary>
        /// 得票數 (萬位)
        /// </summary>
        [JsonProperty("TPC_VOTE_TT")]
        public string TPC_VOTE_TT { get; set; }

        /// <summary>
        /// 得票數 (千位)
        /// </summary>
        [JsonProperty("TPC_VOTE_TH")]
        public string TPC_VOTE_TH { get; set; }

        /// <summary>
        /// 得票率%
        /// </summary>
        [JsonProperty("TPC_VOTE_RATE")]
        public string TPC_VOTE_RATE { get; set; }

        ///// <summary>
        ///// 天玉里得票率%
        ///// </summary>
        //[JsonProperty("TPC_POINTER_RATE")]
        //public string TPC_POINTER_RATE { get; set; }
    }
}
