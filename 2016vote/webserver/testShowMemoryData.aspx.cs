using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

/*
 *  說明: 測試網頁，讀記憶體中 JSON、解析 JSON 內容
 *  
 *  修改日期: 2015/12/10
 *  修改人員: 吳宇澤
 *  修改內容: 只改註解。候選人是否宣佈自行當選、中選會是否宣佈當選，判斷方式由 _FLAG='1' 改為 _FLAG='Y'
 * 
 *  修改日期: 2015/12/07
 *  修改人員: 吳宇澤
 *  修改內容: Block3 「六大政黨取得立委席次數據」(有 6 筆)，加入「時代力量」、「無黨團結聯盟」，變成八大政黨 (有 8 筆)
 * 
 *  修改日期: 2015/12/02
 *  修改人員: 吳宇澤
 *  修改內容: Block6 「區域立委(含原住民)」所有的候選人全撈；「不分區立委」只撈出中選會宣佈「已當選」的候選人
 * 
 *  修改日期: 2015/11/23、2015/11/25、2015/11/30
 *  修改人員: 吳宇澤
 *  修改內容: 加入「立委」、「六大政黨」開票資料
 *  
 *  修改日期: 2015/11/17
 *  修改人員: 吳宇澤
 *  修改內容: 總統各縣市得票，加入「self_flag: 自行宣布當選」
 *  
 *  修改日期: 2015/11/16
 *  修改人員: 吳宇澤
 *  修改內容: 加入「總統各縣市得票」
 *  
 *  建立日期: 2015/11/09
 *  建立人員: 吳宇澤
 */

public partial class webserver_testShowMemoryData : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string strJSON = com.ebc.WebServer.wcf.DataInMemory.getDataInMemory();

        lblOriginalJSON.Text = "JSON 內容 (未解析, 所有內容串接在一個字串變數中)：<br /><br />" + strJSON;

        /*******************************************************************/

        lblDeserializedJSON.Text = "JSON 內容 (已解析)：<br /><br />";

        //若網頁排程有正常運作、有正常從資料庫撈到資料後存在記憶體
        if (!string.IsNullOrEmpty(strJSON))
        {
            //解析 JSON 內容
            JObject jo = JsonConvert.DeserializeObject<JObject>(strJSON);

            /*********** Block2、Block3 - 總統開票率、立委開票率 ***********/

            //單一值 (總統開票率、立委開票率) (竤洋 16:30 開始才會提供此值)
            lblDeserializedJSON.Text += "Block2_president_vote_rate (總統開票率%)：" + (string)jo.Property("Block2_president_vote_rate").Value + "<br />";
            //lblDeserializedJSON.Text += "Block3_legislator_vote_rate (立委開票率%)：" + (string)jo.Property("Block3_legislator_vote_rate").Value + "<br /><br />";

            /*********** Block2 - 開票狀態(總統) ***********/

            //二維陣列 (總統得票資料, 有 3 筆資料)
            JArray jaBlock2_president_vote = ((JArray)jo.Property("Block2_president_vote").Value);

            lblDeserializedJSON.Text += "Block2_president_vote (總統得票資料, 有 3 筆資料)：<br />";

            //foreach (JToken jt in jas)
            for (int j = 0; j < jaBlock2_president_vote.Count; j++)
            {
                JObject item = (JObject)jaBlock2_president_vote[j];
                lblDeserializedJSON.Text += 
                    "TPC_CANNO：" + item["TPC_CANNO"].ToString() +                           //候選人編號 (系統用,匯入竑洋的資料用)
                    ", TPC_PRESIDENT_ID：" + item["TPC_PRESIDENT_ID"].ToString() +           //候選人號碼 (中選會抽籤的號碼)
                    ", TPC_PRESIDENT_ID_IMG：" + item["TPC_PRESIDENT_ID_IMG"].ToString() +   //候選人登記編號的圖檔名
                    ", TPC_NAME：" + item["TPC_NAME"].ToString() +                           //候選人姓名
                    ", TPC_POLNO：" + item["TPC_POLNO"].ToString() +                         //候選人所屬政黨編號
                    //", TPC_POLNM：" + item["TPC_POLNM"].ToString() +                       //候選人所屬政黨名稱
                    ", TPC_IMG：" + item["TPC_IMG"].ToString() +                             //候選人大頭照的圖檔名
                    ", TPC_SELF_FLAG：" + item["TPC_SELF_FLAG"].ToString() +                 //自行宣布當選 (N:否、Y:是)
                    ", TPC_ELEC_FLAG：" + item["TPC_ELEC_FLAG"].ToString() +                 //中選會宣布當選 (N:否、Y:是)
                    ", TPC_VOTE_COUNT：" + item["TPC_VOTE_COUNT"].ToString() +               //得票數
                    ", TPC_VOTE_TT：" + item["TPC_VOTE_TT"].ToString() +                     //得票數 (萬位)
                    ", TPC_VOTE_TH：" + item["TPC_VOTE_TH"].ToString() +                     //得票數 (千位)
                    ", TPC_VOTE_RATE：" + item["TPC_VOTE_RATE"].ToString() +                 //得票率%
                    //", TPC_POINTER_RATE：" + item["TPC_POINTER_RATE"].ToString() +         //天玉里得票率%
                    "<br />";
            }

            lblDeserializedJSON.Text += "<br /><br />";

            /*********** Block5 - 各區(各縣市)總統得票數 ***********/

            //單一值 (1-總統、2-立委)
            //lblDeserializedJSON.Text += "Block5_vote_type (1-總統、2-立委)：" + (string)jo.Property("Block5_vote_type").Value + "<br /><br />";   //1-總統

            //二維陣列 (各區總統得票數, 有 66 筆資料, 22個縣市*3個候選人)
            JArray jaBlock5_vote_info = ((JArray)jo.Property("Block5_vote_info").Value);

            lblDeserializedJSON.Text += "Block5_vote_info (各區總統得票數, 有 66 筆資料, 22個縣市*3個候選人)：<br />";

            for (int j = 0; j < jaBlock5_vote_info.Count; j++)
            {
                JObject item = (JObject)jaBlock5_vote_info[j];
                lblDeserializedJSON.Text += 
                    "TPRV_AREA_NO (part_id)：" + item["TPRV_AREA_NO"].ToString() +                   //part_id: (1–北部、2–中部、3–南部、4–東部、5–離島)
                    ", TPRV_CITY_NM (city)：" + item["TPRV_CITY_NM"].ToString() +                    //city: 縣市名稱
                    ", TPRV_NAME (data - name)：" + item["TPRV_NAME"].ToString() +                   //data - name: 候選人名稱
                    ", TPRV_VOTE_COUNT (得票數)：" + item["TPRV_VOTE_COUNT"].ToString() +            //得票數
                    ", TPRV_VOTE_TT (data - vote_tt)：" + item["TPRV_VOTE_TT"].ToString() +          //data - vote_tt: 得票數 (萬位)
                    ", TPRV_VOTE_TH (data - vote_th)：" + item["TPRV_VOTE_TH"].ToString() +          //data - vote_th: 得票數 (千位)
                    ", TPRV_VOTE_RATE (data - vote_rage)：" + item["TPRV_VOTE_RATE"].ToString() +    //data - vote_rate: 得票率%
                    ", TPC_IMG (data - img)：" + item["TPC_IMG"].ToString() +                        //data - img: 候選人圖檔路徑 (總統為大頭照)
                    ", TPC_ELEC_FLAG (data - elec_flag)：" + item["TPC_ELEC_FLAG"].ToString() +      //data - elec_flag: 中選會宣布當選 (N –否、Y–是)
                    ", TPC_SELF_FLAG (data - self_flag)：" + item["TPC_SELF_FLAG"].ToString() +      //data - self_flag: 自行宣布當選 (N –否、Y–是)
                    ", TPC_PRESIDENT_ID (data - can_id)：" + item["TPC_PRESIDENT_ID"].ToString() +   //data - can_id: 候選人籤號
                    ", TPC_POLNO：" + item["TPC_POLNO"].ToString() +                                 //候選人所屬政黨編號
                    "<br />";
            }

            lblDeserializedJSON.Text += "<br /><br />";

            /*********** Block3 - 開票狀態(立委)-八大政黨取得立委席次數據 ***********/

            //二維陣列 (八大政黨取得立委席次數據, 有 8 筆資料)
            JArray jaBlock3_legislator_seat = ((JArray)jo.Property("Block3_legislator_seat").Value);

            lblDeserializedJSON.Text += "Block3_legislator_seat (八大政黨取得立委席次數據, 有 8 筆資料)：<br />";

            for (int j = 0; j < jaBlock3_legislator_seat.Count; j++)
            {
                JObject item = (JObject)jaBlock3_legislator_seat[j];
                lblDeserializedJSON.Text +=
                    "TP_POLNM (polnm)：" + item["TP_POLNM"].ToString() +                             //polnm: 政黨名稱
                    ", TP_IMG (img)：" + item["TP_IMG"].ToString() +                                 //img: 政黨圖檔
                    ", TP_AREA_SEAT (area_seat)：" + item["TP_AREA_SEAT"].ToString() +               //area_seat: 區域立委席次
                    //", TP_AREA_RATE (area_rate)：" + item["TP_AREA_RATE"].ToString() +             //area_rate: 區域立委得票率 (已無用)
                    ", TP_NON_AREA_SEAT (non_area_seat)：" + item["TP_NON_AREA_SEAT"].ToString() +   //non_area_seat: 不分區立委席次
                    //", TP_POLNM_VOTE_RATE (polnm_rate)：" + item["TP_POLNM_VOTE_RATE"].ToString() +  //polnm_rate: 政黨得票率 (已無用)
                    ", TOTAL_SEAT (total_seat)：" + item["TOTAL_SEAT"].ToString() +                  //total_seat: 總席次
                    "<br />";
            }

            lblDeserializedJSON.Text += "<br /><br />";

            /*************** Block6 - 各選區立委得票數, 有數百筆 (目前暫時照:「選區代號、籤號」由小到大排序) *****************/

            //二維陣列 (各選區立委得票數, 有數百筆資料)
            JArray jaBlock6_vote_info = ((JArray)jo.Property("Block6_vote_info").Value);

            lblDeserializedJSON.Text += "Block6_vote_info (各選區立委得票數, 有數百筆資料. 目前暫時照:「選區代號、籤號」由小到大排序)：<br />";

            for (int j = 0; j < jaBlock6_vote_info.Count; j++)
            {
                JObject item = (JObject)jaBlock6_vote_info[j];
                lblDeserializedJSON.Text +=
                    "TLC_NAME (name)：" + item["TLC_NAME"].ToString() +                              //候選人名稱
                    //", TLC_POLIMG (img)：" + item["TLC_POLIMG"].ToString() +                       //候選人圖檔路徑 (立委為政黨圖示)
                    ", TLC_POLNO：" + item["TLC_POLNO"].ToString() +                                 //候選人所屬政黨編號
                    ", TLC_AREA_NO (part_id)：" + item["TLC_AREA_NO"].ToString() +                   //區域代號 (part_id)
                    ", TLC_CITY_NO：" + item["TLC_CITY_NO"].ToString() +                             //縣市代號
                    ", TLC_CITY_NM：" + item["TLC_CITY_NM"].ToString() +                             //縣市名稱
                    ", TLC_SECTION_NO：" + item["TLC_SECTION_NO"].ToString() +                       //選區代號
                    ", TLC_SECTION_NM：" + item["TLC_SECTION_NM"].ToString() +                       //選區名稱
                    ", TLC_LEGISLATOR_ID：" + item["TLC_LEGISLATOR_ID"].ToString() +                 //legislator_id: 立委登記編號 (候選人籤號)
                    ", TLC_VOTE_COUNT (vote_tal)：" + item["TLC_VOTE_COUNT"].ToString() +            //得票數 (總票數)
                    ", TLC_VOTE_TT：" + item["TLC_VOTE_TT"].ToString() +                             //得票數 (萬位)
                    ", TLC_VOTE_TH：" + item["TLC_VOTE_TH"].ToString() +                             //得票數 (千位)
                    ", TLC_SELF_FLAG：" + item["TLC_SELF_FLAG"].ToString() +                         //自行宣布當選 (N –否、Y–是)
                    ", TLC_ELEC_FLAG：" + item["TLC_ELEC_FLAG"].ToString() +                         //中選會宣布當選 (N –否、Y–是)
                    "<br />";
            }

            //上方 Block6 :
            //「區域立委(含原住民)」所有的候選人全撈；「不分區立委」只撈出中選會宣佈「已當選」的候選人(TLC_ELEC_FLAG='1')

        } //end of "if (!string.IsNullOrEmpty(strJSON))"

    } //end of "protected void Page_Load()"
}