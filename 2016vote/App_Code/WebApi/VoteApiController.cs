using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;

public class VoteApiController : ApiController
{
    //1.	取得第一次資料Json
    // GET api/VoteApi/
    //public HttpResponseMessage Get()
    //{
    //    String json = "";
    //    string error_code = "-1";
    //    JObject jo = new JObject();
    //    String typeFlag = "3";//1-為呈現活動頁面、2-為呈現開票前狀態畫面、3-為呈現開票中狀態畫面
    //    List<String> list = new List<String>();
    //    try
    //    {
    //        //jo = new JObject();
    //        //throw new Exception();
    //        jo.Add(new JProperty("type", typeFlag));
    //        #region 至投票日剩餘秒數
    //        DateTime STime = Convert.ToDateTime(DateTime.Now);//起始日
    //        DateTime ETime = DateTime.Parse("2016-01-16 00:00:00"); //結束日
    //        TimeSpan Total = ETime.Subtract(STime); //日期相減

    //        #endregion 至投票日剩餘秒數
    //        jo.Add(new JProperty("vote_second", (int)Total.TotalSeconds));//至投票日剩餘秒數

    //        jo.Add(new JProperty("youtube_src", "Giw92W9xkys"));//直播youtube代碼

    //        jo.Add(new JProperty("banner_img", "01-1_01.jpg"));//標題圖檔路徑
    //        error_code = "1";
    //        //json = JsonConvert.SerializeObject(jo);
    //    }
    //    catch (Exception ex)
    //    {
    //        //json = "-1";
    //        error_code = "-1";
    //        //json = ex.ToString();
    //        //com.ebc.utility.Utility.writeErrorLog("VoteApiController.aspx.cs 的 取得第一次資料Json，在撈資料庫時發生錯誤", ex);
    //        //com.ebc.WebServer.utility.MailSender.sendMailToAdmin(ex.Message);
    //    }

    //    jo.Add(new JProperty("error_code", error_code));
    //    json = JsonConvert.SerializeObject(jo);
    //    return createJsonContentResponse(json);
    //}

    //2.	開票狀態(總統) Json
    // Post api/VoteApi/(1–總統、2–立委)
    //public HttpResponseMessage Get(string vote_type, string part_id, string city_id, string section_id)
    //public HttpResponseMessage Post(PartSourceModel value)
    public HttpResponseMessage Get([FromUri] PartSourceModel value)
    {
        string json = "";
        JObject jo = new JObject();

        //string type = vote_type;//(1–總統、2–立委)
        //string area = part_id;//區域
        //string city = city_id;//縣市
        //string sectionid = section_id;//選區
        string type = value.vote_type;//(1–總統、2–立委)
        string area = value.part_id;//區域
        string city = value.city_id;//縣市
        string section_id = value.section_id;//選區
        //string township = value.township_id;//鄉鎮市區
        //string _in = value.in_id;//里

        switch (type)
        {
            case "1":
                jo = new getPresident().getPresidentJSON(area, city, section_id);//1–總統
                break;
            case "2":
                jo = new getLegislator().getLegislatorJSON(type, area, city, section_id);//2–立委
                break;
            case "3":
                jo = new getLegislator().getLegislatorJSON(type, area, city, section_id);//3-不分區立委名單
                break;
            case "4":
                jo = new getLegislator().getLegislatorJSON(type, area, city, section_id);//4-不分區立委席次
                break;
        }

        jo.Add(new JProperty("vote_type", type));
        jo.Add(new JProperty("part_id", area));//區域
        jo.Add(new JProperty("city_id", city));//縣市
        jo.Add(new JProperty("section_id", section_id));//選區
        
        json = JsonConvert.SerializeObject(jo);
        return createJsonContentResponse(json);
    }

    #region *** 建立JSON內容的HttpResponseMessage物件 ***

    /// <summary>
    /// 建立JSON內容的HttpResponseMessage物件
    /// </summary>
    /// <param name="json">json</param>
    /// <returns>HttpResponseMessage</returns>
    private HttpResponseMessage createJsonContentResponse(String json)
    {
        HttpResponseMessage response = new HttpResponseMessage();

        //回傳格式為JSON
        response.Content = new StringContent(json, Encoding.UTF8, "application/json");

        //以下改由 Web.config 設定
        ////允許回應跨網域存取的Domain
        //response.Content.Headers.Add("Access-Control-Allow-Origin", "*");

        ////允許回應的 HttpMethod
        //response.Content.Headers.Add("Access-Control-Allow-Methods", "GET");

        return response;
    }

    #endregion


    public class PartSourceModel
    {
        public string vote_type { get; set; }//(1–總統、2–立委)
        public string part_id { get; set; }//區域
        public string city_id { get; set; }//縣市
        public string section_id { get; set; }//選區
        //public string township_id { get; set; }//鄉鎮市區
        //public string in_id { get; set; }//里
    }
}
