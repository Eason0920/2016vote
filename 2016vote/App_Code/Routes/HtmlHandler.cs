using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Text;
using System.Web;
using util = com.ebc.utility.Utility;

/// <summary>
/// Html文件處理類別
/// </summary>
public class HtmlHandler : IHttpHandler {

    private HttpContext context { get; set; }
    private string apiUrl { get; set; }
    private static string indexHtmlTemplate = null;        //儲存首頁index內容範本

    private static readonly string JSON_VALUE_KEY = "$#JSON$#";
    private static readonly string API_VALUE_KEY = "$#API$#";
    private static readonly string VOTE_SATRT_DT = "2016-01-16 16:00:00";
    private static readonly string YOUTUBE_SRC = "jMN4cxyhJjk";
    private static readonly string BANNER_IMG = "01-1_01.jpg";
    private static readonly string API_URL_SIMPLE = "/content/VotePresident.json";      //簡易版資料要求來源

    public void ProcessRequest(HttpContext context) {
        this.context = context;
        this.apiUrl = string.Format("{0}://{1}/{2}", context.Request.Url.Scheme, context.Request.Url.Authority, Resources.Public.ApiPath);

        string pageName = context.Request.RequestContext.RouteData.Values["page"].ToString().ToLowerInvariant();
        pageName = "index";     //目前先強制只使用index頁面

        indexHtmlTemplate = ((string.IsNullOrEmpty(indexHtmlTemplate)) ? htmlFileReader(pageName) : indexHtmlTemplate);        //判斷是否已有儲存首頁index內容
        string html = string.Copy(indexHtmlTemplate);       //複製html範本資料輸出至client用

        if ((!string.IsNullOrEmpty(html))) {
            //string jsonString = util.stringToBase64(requestInitJson(), Encoding.UTF8);       //向WebApi要求初始化json資料並進行base64編碼
            string jsonString = util.stringToBase64(initJsonProcess(), Encoding.UTF8);       //產生初始化json資料並進行base64編碼
            string apiUUrlJson = util.stringToBase64(createApiUrlJson(), Encoding.UTF8);       //前端要求資料來源api位址資料

            //將初始化資料與api資料存入html隱藏欄位
            html = html.Replace(JSON_VALUE_KEY, jsonString);
            html = html.Replace(API_VALUE_KEY, apiUUrlJson);
        }

        context.Response.ContentType = "text/html; charset=utf8";
        context.Response.Write(html);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

    /// <summary>
    /// 產生前端要求API的資料來源Json
    /// </summary>
    /// <returns></returns>
    private string createApiUrlJson() {
        JObject jObj = new JObject() { 
            {"general", this.apiUrl},
            {"simple", API_URL_SIMPLE}
        };

        return JsonConvert.SerializeObject(jObj);
    }

    /// <summary>
    /// 產生第一次Json資料
    /// </summary>
    /// <returns></returns>
    private string initJsonProcess() {
        JObject jObj = null;

        try {
            jObj = new JObject() { 
                {"type", 3},
                {"vote_second", getVoteLastSeconds()},
                {"youtube_src", YOUTUBE_SRC},
                {"banner_img", BANNER_IMG},
                {"error_code", 1}
            };
        } catch (Exception) {
            jObj = new JObject() { 
                {"error_code", -1}
            };
        }

        return JsonConvert.SerializeObject(jObj);
    }

    /// <summary>
    /// 取得目前至選舉開票當日的剩餘秒數
    /// </summary>
    /// <returns></returns>
    private int getVoteLastSeconds() {
        DateTime startDT = DateTime.Now;        //起始日
        DateTime endDT = Convert.ToDateTime(VOTE_SATRT_DT);     //結束日期時間
        TimeSpan totalSeconds = endDT.Subtract(startDT);       //日期相減
        return Convert.ToInt32(totalSeconds.TotalSeconds);
    }

    /// <summary>
    /// 讀取HTML檔案並回傳HTML字串
    /// </summary>
    /// <param name="context">HttpContext</param>
    /// <param name="fileName">Html檔案名稱</param>
    /// <returns>string</returns>
    private string htmlFileReader(string fileName) {
        string outPut = null;
        string filePath = this.context.Server.MapPath(string.Format("~/html/{0}.html", fileName));
        if (File.Exists(filePath)) {
            using (StreamReader streamReader = new StreamReader(filePath, Encoding.UTF8)) {
                outPut = streamReader.ReadToEnd();
            }
        }
        return outPut;
    }

    ///// <summary>
    ///// 要求API取得Json
    ///// </summary>
    ///// <param name="pageName">Html檔案名稱</param>
    ///// <returns>string</returns>
    //private string requestJson(string pageName) {
    //    string outPut = null;
    //    WebClient webClient = new WebClient();
    //    webClient.Encoding = Encoding.UTF8;

    //    switch (pageName) {
    //        case "index":
    //            try {
    //                outPut = webClient.DownloadString(apiUrl);
    //            } catch (System.Exception) {
    //                outPut = webClient.DownloadString(apiUrl);
    //            }

    //            break;
    //    }
    //    return outPut;
    //}

    ///// <summary>
    ///// 要求API取得初始化Json資料
    ///// </summary>
    ///// <returns>string</returns>
    //private string requestInitJson() {
    //    string outPut = null;

    //    HttpWebRequest request = HttpWebRequest.Create(this.apiUrl) as HttpWebRequest;
    //    request.Method = WebRequestMethods.Http.Get;
    //    request.ContentType = "text/plain";
    //    request.Timeout = 3000;

    //    using (HttpWebResponse response = request.GetResponse() as HttpWebResponse) {
    //        using (StreamReader reader = new StreamReader(response.GetResponseStream())) {
    //            outPut = reader.ReadToEnd();
    //        }
    //    }

    //    return outPut;
    //}

}