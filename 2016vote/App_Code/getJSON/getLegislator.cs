using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

/// <summary>
/// 從記憶體讀資料立委票數,並回傳一個JObject的物件
/// </summary>
/// <param naem="area">傳入區域的定義值</param>
/// <param naem="city">傳入縣市的定義值</param>
/// <return>回傳JObject的物件</return>
public class getLegislator
{
	public getLegislator(){}
    public JObject getLegislatorJSON(String type, String area, String city, String section_id)
    {

        string error_code = "-1";
        JObject jo = new JObject();
        try
        {
            //if (area != "0" && city != "0" && section_id != "0")
            if (city != "0" && section_id != "0")
            {
                jo.Add(new JProperty("vote_info", getFromMemoryInputArea(area, city, section_id)));//6.	取得立委得票數 (區域頁面)
                error_code = "1";
            }
            //if (type == "4" && area == "0" && city == "0" && section_id == "0")
            if (type == "4" && city == "0" && section_id == "0")
            {
                jo.Add(new JProperty("vote_info", getFromMemory()));//7.	取得不分區立委席次統計
                error_code = "1";
            }
            //if (type == "3" && area == "0" && city == "0" && section_id == "0")
            if (type == "3" && city == "0" && section_id == "0")
            {
                jo.Add(new JProperty("vote_info", getFromMemoryNopartition()));//8.	取得不分區立委名單
                error_code = "1";
            }
        }
        catch (Exception ex)
        {
            error_code = "-1";
            com.ebc.utility.Utility.writeErrorLog("VoteApiController.aspx.cs 的 getJSON/getLegislator()，發生錯誤", ex);
            //com.ebc.WebServer.utility.MailSender.sendMailToAdmin(ex.Message);
        }
        jo.Add(new JProperty("error_code", error_code));

        return jo;
    }

    /// <summary>
    /// 從記憶體取得立委得票數 (區域頁面),並回傳一個JObject的物件
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
            JArray JArraystrJSON = JsonConvert.DeserializeObject<JArray>(JObjectstrJSON.Property("Block6_vote_info").Value.ToString());

            JObject joinfo = null;

            JArray jadata = new JArray();//data
            JObject joSub = null;
            String strcity = "", prestcity = "", strcityNO = "", areaNM = "", preareaNM = "", section = "", presection = "";

            foreach (JObject Jobj in JArraystrJSON)
            {
                String strArea = Jobj["TLC_AREA_NO"].ToString();
                strcityNO = Jobj["TLC_CITY_NO"].ToString();
                section = Jobj["TLC_SECTION_NO"].ToString();

                //if (strArea == area && strcityNO == city && section == section_id)
                if (strcityNO == city && section == section_id)
                {
                    joSub = new JObject();
                    
                    strcity = Jobj["TLC_CITY_NM"].ToString();

                    //prestcity = strcity;
                    section = Jobj["TLC_SECTION_NM"].ToString();

                    //if (preareaNM != areaNM && preareaNM != "")//若為不同選區,表示之後都不需要的資料
                    //{
                    //    break;
                    //}

                    joSub.Add(new JProperty("can_id", Jobj["TLC_LEGISLATOR_ID"].ToString()));//立委登記編號
                    joSub.Add(new JProperty("name", Jobj["TLC_NAME"].ToString()));//候選人名稱
                    joSub.Add(new JProperty("vote_tt", Jobj["TLC_VOTE_TT"].ToString()));//得票數 (萬位)
                    joSub.Add(new JProperty("vote_th", Jobj["TLC_VOTE_TH"].ToString()));//得票數 (千位)

                    String Polnmid = Jobj["TLC_POLNO"].ToString();
                    Polnmid = (Polnmid != "01" && Polnmid != "02" && Polnmid != "03" && Polnmid != "04" && Polnmid != "05" && Polnmid != "08" && Polnmid != "16") ? "00" : Jobj["TLC_POLNO"].ToString();
                    joSub.Add(new JProperty("polnm_id", Polnmid));//候選人所屬政黨編號

                    joSub.Add(new JProperty("elec_flag", Jobj["TLC_ELEC_FLAG"].ToString()));//中選會宣布當選 (N –否、Y–是)
                    joSub.Add(new JProperty("self_flag", Jobj["TLC_SELF_FLAG"].ToString()));//自行宣布當選 (N –否、Y–是)
                    joSub.Add(new JProperty("vote_tal", Path.Combine(Jobj["TLC_VOTE_TT"].ToString() + String.Format("{0:0000}", Convert.ToInt16(Jobj["TLC_VOTE_TH"].ToString())))));//總票數(排序用)
                    joinfoArray.Add(joSub);
                    preareaNM = section;
                }
                if (presection != section && presection != "")//若為不同選區,表示之後都不需要的資料
                {
                    break;
                }
                //if (prestcity != strcity && prestcity != "")//若為不同縣市,表示之後都不需要的資料
                //{
                //    break;
                //}
                //preareaNM = areaNM;
            }
            if (joSub == null || joinfoArray.Count == 0)
            {
                throw new Exception("IsNullOrEmpty");
            }
            //joinfo = new JObject();
            //joinfo.Add(new JProperty("area", presection));//區域名稱
            //joinfo.Add(new JProperty("data", jadata));//立委各區得票數
            //joinfoArray.Add(joinfo);
        }
        else
        {
            throw new Exception("IsNullOrEmpty");
        }

        return joinfoArray;
    }


    /// <summary>
    /// 從記憶體取得不分區立委席次統計,並回傳一個JObject的物件
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

            JArray ja = new JArray();//各政黨取得立委席次數據
            JArray array = JsonConvert.DeserializeObject<JArray>(JObjectstrJSON.Property("Block3_legislator_seat").Value.ToString());
            JObject joSub = null;
            String showflag = "0";
            foreach (JObject Jobj in array)
            {
                joSub = new JObject();

                joSub.Add(new JProperty("polnm_id", getPolnmid(Jobj["TP_POLNM"].ToString())));//政黨編號
                joSub.Add(new JProperty("area_seat", Jobj["TP_AREA_SEAT"].ToString()));//區域立委席次
                joSub.Add(new JProperty("non_area_seat", Jobj["TP_NON_AREA_SEAT"].ToString()));//不分區立委席次
                joSub.Add(new JProperty("total_seat", Jobj["TOTAL_SEAT"].ToString()));//總席次
                ja.Add(joSub);
            }
            if (joSub == null || ja.Count == 0)
            {
                //throw new Exception("IsNullOrEmpty");
                showflag = "0";
            }
            else {
                showflag = "1";
            }
            jo.Add(new JProperty("is_show", showflag));//是否顯示立委席次資料
            jo.Add(new JProperty("data", ja));//各政黨取得立委席次數據
        }
        else
        {
            throw new Exception("IsNullOrEmpty");
        }
        return jo;
    }

    /// <summary>
    /// 從記憶體取得不分區立委名單,並回傳一個JObject的物件
    /// </summary>
    /// <return>回傳JObject的物件</return>
    private JObject getFromMemoryNopartition()
    {
        JObject jo = new JObject();
        string strJSON = com.ebc.WebServer.wcf.DataInMemory.getDataInMemory();//取得記憶體中的 static 字串變數 - 開票資料，格式為 JSON
        String section = "", presection = "";
        //throw new Exception("");
        if (!string.IsNullOrEmpty(strJSON))
        {
            JObject JObjectstrJSON = JsonConvert.DeserializeObject<JObject>(strJSON);
            
            JArray ja = new JArray();//各政黨取得立委席次數據
            JArray array = JsonConvert.DeserializeObject<JArray>(JObjectstrJSON.Property("Block6_vote_info").Value.ToString());
            JObject joSub = null;
            String showflag = "0";
            foreach (JObject Jobj in array)
            {
                joSub = new JObject();

                section = Jobj["TLC_CITY_NO"].ToString();
                if (section == "25")
                {
                    String Polnmid = Jobj["TLC_POLNO"].ToString();
                    Polnmid = (Polnmid != "01" && Polnmid != "02" && Polnmid != "03" && Polnmid != "04" && Polnmid != "05" && Polnmid != "08" && Polnmid != "16") ? "00" : Jobj["TLC_POLNO"].ToString();
                    //joSub.Add(new JProperty("polnm_id", getPolnmid(Jobj["TLC_SECTION_NM"].ToString().Replace("不分區-", ""))));//政黨編號
                    joSub.Add(new JProperty("polnm_id", Polnmid));//政黨編號
                    joSub.Add(new JProperty("name", Jobj["TLC_NAME"].ToString()));//候選人名稱
                    ja.Add(joSub);
                    presection = section;
                }
                if (presection != section && presection != "")//若為不同選區,表示之後都不需要的資料
                {
                    break;
                }
            }
            if (joSub == null || ja.Count == 0)
            {
                //throw new Exception("IsNullOrEmpty");
                showflag = "0";
            }
            else {
                showflag = "1";//中選會宣佈當選者,才顯示席次
            }
            jo.Add(new JProperty("is_show", showflag));//是否顯示立委席次資料
            jo.Add(new JProperty("data", ja));//各政黨取得立委席次數據
        }
        else
        {
            throw new Exception("IsNullOrEmpty");
        }
        return jo;
    }

    #region 政黨名稱轉換ID
    /// <summary>
    /// 政黨名稱轉換ID,並回傳一個String的物件
    /// </summary>
    /// <param naem="area">傳入政黨名稱</param>
    /// <return>回傳String的物件</return>
    private String getPolnmid(String polnmNM)
    {

        String tmpPolnm_id = "";
        switch (polnmNM)
        {
            case "中國國民黨":
                tmpPolnm_id = "01";
                break;
            case "民主進步黨":
                tmpPolnm_id = "02";
                break;
            case "親民黨":
                tmpPolnm_id = "03";
                break;
            case "台灣團結聯盟":
                tmpPolnm_id = "04";
                break;
            case "無黨團結聯盟":
                tmpPolnm_id = "05";
                break;
            case "新黨":
                tmpPolnm_id = "08";
                break;
            case "時代力量":
                tmpPolnm_id = "16";
                break;
            default://其他
                tmpPolnm_id = "00";
                break;
        }
        return tmpPolnm_id;
    }
    #endregion 政黨名稱轉換ID
}