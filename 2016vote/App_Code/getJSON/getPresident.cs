using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;

/// <summary>
/// 從記憶體讀資料總統票數,並回傳一個JObject的物件
/// </summary>
/// <param naem="area">傳入區域的定義值</param>
/// <param naem="city">傳入縣市的定義值</param>
/// <return>回傳JObject的物件</return>
public class getPresident
{
	public getPresident(){}
    public JObject getPresidentJSON(String area, String city, String section_id)
    {
        
        string error_code = "-1";
        JObject jo = new JObject();
        try
        {
            if (area == "0" && city == "0" && section_id == "0")
            {
                jo.Add(new JProperty("vote_info", getFromMemory()));//3.	取得總統得票數 (基本頁面)
                error_code = "1";
            }
            if (area == "99" && city == "99" && section_id == "0")
            {
                jo.Add(new JProperty("vote_info", getFromMemoryInputArea(area, city, section_id)));//3.	取得總統得票數 (基本頁面)
                error_code = "1";
            }
        }
        catch (Exception ex)
        {
            error_code = "-1";
            com.ebc.utility.Utility.writeErrorLog("VoteApiController.aspx.cs 的 getJSON/getPresident()，發生錯誤", ex);
            //com.ebc.WebServer.utility.MailSender.sendMailToAdmin(ex.Message);
        }
        jo.Add(new JProperty("error_code", error_code));

        return jo;
    }

    /// <summary>
    /// 從記憶體取得各區總統票數,並回傳一個JObject的物件
    /// </summary>
    /// <param naem="area">傳入區域的定義值</param>
    /// <param naem="city">傳入縣市的定義值</param>
    /// <return>回傳JObject的物件</return>
    private JArray getFromMemoryInputArea(String area, String city, String section_id)
    {
        JArray joinfoArray = new JArray();

        string strJSON = com.ebc.WebServer.wcf.DataInMemory.getDataInMemory();//取得記憶體中的 static 字串變數 - 開票資料，格式為 JSON
        //throw new Exception("");
        if (!string.IsNullOrEmpty(strJSON))
        {
            JObject JObjectstrJSON = JsonConvert.DeserializeObject<JObject>(strJSON);
            JArray JArraystrJSON = JsonConvert.DeserializeObject<JArray>(JObjectstrJSON.Property("Block5_vote_info").Value.ToString());

            JObject joinfo = null;

            JArray jadata = new JArray();//data
            JObject joSub = new JObject();
            String strcityNM = "", prestcityNM = "", strcity = "", prestcity = "";
            foreach (JObject Jobj in JArraystrJSON)
            {
                //String strCity = Jobj["TPRV_CITY_NO"].ToString();//待記憶體欄位新增
              
                joSub = new JObject();//data第一筆資料
                strcityNM = Jobj["TPRV_CITY_NM"].ToString();

                #region 縣市代碼轉換
                switch (strcityNM)//此段mark
                    {
                        case "基隆市":
                            strcity = "1";
                            break;
                        case "臺北市":
                            strcity = "2";
                            break;
                        case "新北市":
                            strcity = "3";
                            break;
                        case "桃園縣":
                            strcity = "4";
                            break;
                        case "桃園市":
                            strcity = "4";
                            break;
                        case "新竹縣":
                            strcity = "5";
                            break;
                        case "新竹市":
                            strcity = "6";
                            break;
                        case "苗栗縣":
                            strcity = "7";
                            break;
                        case "臺中市":
                            strcity = "8";
                            break;
                        case "彰化縣":
                            strcity = "9";
                            break;
                        case "南投縣":
                            strcity = "10";
                            break;
                        case "雲林縣":
                            strcity = "11";
                            break;
                        case "嘉義縣":
                            strcity = "12";
                            break;
                        case "嘉義市":
                            strcity = "13";
                            break;
                        case "臺南市":
                            strcity = "14";
                            break;
                        case "高雄市":
                            strcity = "15";
                            break;
                        case "屏東縣":
                            strcity = "16";
                            break;
                        case "宜蘭縣":
                            strcity = "17";
                            break;
                        case "花蓮縣":
                            strcity = "18";
                            break;
                        case "台東縣":
                            strcity = "19";
                            break;
                        case "澎湖縣":
                            strcity = "20";
                            break;
                        case "金門縣":
                            strcity = "21";
                            break;
                        case "連江縣":
                            strcity = "22";
                            break;
                    }//end此段mark
                #endregion 縣市代碼轉換

                if (prestcityNM != strcityNM && prestcityNM != "")//為不同縣市
                {
                    joinfo = new JObject();
                    joinfo.Add(new JProperty("city_id", prestcity));//縣市ID
                    joinfo.Add(new JProperty("data", jadata));//總統各區得票數
                    joinfoArray.Add(joinfo);
                    jadata = new JArray();
                }
                prestcityNM = strcityNM;
                prestcity = strcity;
                joSub.Add(new JProperty("can_id", Jobj["TPC_PRESIDENT_ID"].ToString()));//總統候選人登記編號
                joSub.Add(new JProperty("polnm_id", Jobj["TPC_POLNO"].ToString()));//政黨編號
                joSub.Add(new JProperty("name", Jobj["TPRV_NAME"].ToString()));//候選人名稱
                joSub.Add(new JProperty("vote_tt", Jobj["TPRV_VOTE_TT"].ToString()));//得票數 (萬位)
                joSub.Add(new JProperty("vote_th", Jobj["TPRV_VOTE_TH"].ToString()));//得票數 (千位)
                joSub.Add(new JProperty("img", Jobj["TPC_IMG"].ToString())); //候選人圖檔路徑 (總統為大頭照)
                joSub.Add(new JProperty("vote_rate", Jobj["TPRV_VOTE_RATE"].ToString()));//得票率%
                joSub.Add(new JProperty("elec_flag", Jobj["TPC_ELEC_FLAG"].ToString()));//中選會宣布當選 (N –否、Y–是)
                joSub.Add(new JProperty("self_flag", Jobj["TPC_SELF_FLAG"].ToString()));//自行宣布當選 (N –否、Y–是)
                joSub.Add(new JProperty("vote_tal", Path.Combine(Jobj["TPRV_VOTE_TT"].ToString() + String.Format("{0:0000}", Convert.ToInt16(Jobj["TPRV_VOTE_TH"].ToString())))));//總票數(排序用)
                //joSub.Add(new JProperty("vote_tal", String.Format("{0:0000}", Convert.ToInt16("123"))));//總票數(排序用)
                jadata.Add(joSub);

                    
            }
            joinfo = new JObject();
            joinfo.Add(new JProperty("city_id", prestcity));//縣市ID
            joinfo.Add(new JProperty("data", jadata));//總統各區得票數
            joinfoArray.Add(joinfo);
        }
        else
        {
            throw new Exception("IsNullOrEmpty");
        }
        
        return joinfoArray;
    }


    /// <summary>
    /// 從記憶體取得總統開票狀態,並回傳一個JObject的物件
    /// </summary>
    /// <return>回傳JObject的物件</return>
    private JObject getFromMemory()
    {
        JObject jo = new JObject();
        string strJSON = com.ebc.WebServer.wcf.DataInMemory.getDataInMemory();//取得記憶體中的 static 字串變數 - 開票資料，格式為 JSON
        //throw new Exception("");
        if (!string.IsNullOrEmpty(strJSON))
        {
            JObject JObjectstrJSON = JsonConvert.DeserializeObject<JObject>(strJSON);
            jo.Add(new JProperty("vote_rate", (string)JObjectstrJSON.Property("Block2_president_vote_rate").Value));//總統開票率%

            JArray ja = new JArray();//總統資料
            JArray array = JsonConvert.DeserializeObject<JArray>(JObjectstrJSON.Property("Block2_president_vote").Value.ToString());
            JObject joSub = new JObject();
            foreach (JObject Jobj in array)
            {
                joSub = new JObject();
                joSub.Add(new JProperty("can_id", Jobj["TPC_PRESIDENT_ID"].ToString()));//總統候選人登記編號
                //joSub.Add(new JProperty("president_id_img", Jobj["TPC_PRESIDENT_ID_IMG"].ToString()));//總統候選人登記編號所屬圖檔名 (1104追加)
                joSub.Add(new JProperty("name", Jobj["TPC_NAME"].ToString()));//候選人名稱
                joSub.Add(new JProperty("polnm_id", Jobj["TPC_POLNO"].ToString()));//政黨編號
                joSub.Add(new JProperty("img", Jobj["TPC_IMG"].ToString()));//總統大頭照路徑
                joSub.Add(new JProperty("self_flag", Jobj["TPC_SELF_FLAG"].ToString()));//自行宣布當選 (N –否、Y–是)
                joSub.Add(new JProperty("elec_flag", Jobj["TPC_ELEC_FLAG"].ToString()));//中選會宣布當選 (N –否、Y–是)
                joSub.Add(new JProperty("vote_tt", Jobj["TPC_VOTE_TT"].ToString()));//得票數 (萬位)
                joSub.Add(new JProperty("vote_th", Jobj["TPC_VOTE_TH"].ToString()));//得票數 (千位)
                joSub.Add(new JProperty("vote_rate", Jobj["TPC_VOTE_RATE"].ToString()));//得票率%
                joSub.Add(new JProperty("vote_tal", Path.Combine(Jobj["TPC_VOTE_TT"].ToString() + String.Format("{0:0000}", Convert.ToInt16(Jobj["TPC_VOTE_TH"].ToString())))));//總票數(排序用)
                //joSub.Add(new JProperty("vote_pointer_rate", Jobj["TPC_POINTER_RATE"].ToString()));//天玉里得票率%
                ja.Add(joSub);
            }
            jo.Add(new JProperty("data", ja));//總統得票資料
        }
        else {
            throw new Exception("IsNullOrEmpty");
        }
        return jo;
    }


}