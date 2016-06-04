using System;
//using System.Collections.Generic;
//using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

/*
 *  說明: 傳遞 Block3 (3.開票狀態_立委) 的 legislator_seat (六大政黨取得立委席次數據) 資料時，所需要的欄位
 *  
 *  修改日期: 2015/11/23、2015/11/30
 *  修改人員: 吳宇澤
 *  修改內容:   
 *  
 *  建立日期: 2015/11/23
 *  建立人員: 吳宇澤
 */

//Block3 - 六大政黨取得立委席次數據
namespace com.ebc.WebServer.wcf.Block3
{
    /// <summary>
    /// Clegislator_seat 的摘要描述
    /// </summary>
    public class Clegislator_seat
    {
        public Clegislator_seat() { }

        /// <summary>
        /// 政黨名稱
        /// </summary>
        [JsonProperty("TP_POLNM")]
        public string TP_POLNM { get; set; }

        /// <summary>
        /// 政黨圖檔
        /// </summary>
        [JsonProperty("TP_IMG")]
        public string TP_IMG { get; set; }

        /// <summary>
        /// 區域立委席次
        /// </summary>
        [JsonProperty("TP_AREA_SEAT")]
        public string TP_AREA_SEAT { get; set; }

        /// <summary>
        /// 區域立委得票率 (已無用)
        /// </summary>
        [JsonProperty("TP_AREA_RATE")]
        public string TP_AREA_RATE { get; set; }

        /// <summary>
        /// 不分區立委席次
        /// </summary>
        [JsonProperty("TP_NON_AREA_SEAT")]
        public string TP_NON_AREA_SEAT { get; set; }

        /// <summary>
        /// 政黨得票率 (已無用)
        /// </summary>
        [JsonProperty("TP_POLNM_VOTE_RATE")]
        public string TP_POLNM_VOTE_RATE { get; set; }

        /// <summary>
        /// 總席次
        /// </summary>
        [JsonProperty("TOTAL_SEAT")]
        public string TOTAL_SEAT { get; set; }
    }
}
