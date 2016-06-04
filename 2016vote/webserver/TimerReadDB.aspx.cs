using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using com.ebc.WebServer.utility;
using com.ebc.WebServer.wcf;

/*
 *  說明: 此為 2016 大選的「定時撈資料」網頁排程，每 20 秒自動執行一次。
 * 
 *  修改日期: 2015/12/29、2015/12/30
 *  修改人員: 吳宇澤
 *  修改內容: 八大政黨的立委席次、六大政黨的不分區立委當選名單，改讀自竤洋提供的預估值(資料庫函數)
 * 
 *  修改日期: 2015/12/10、2015/12/11、2015/12/24
 *  修改人員: 吳宇澤
 *  修改內容: Block6 撈「立委候選人」資料，不分區只撈中選會已宣佈得選者，T-SQL 判斷方式由 TLC_ELEC_FLAG='1' 改為 TLC_ELEC_FLAG='Y'
 *  修改內容: 八大政黨立委席次、六大政黨不分區立委名單，可讀自竤洋的預估值
 * 
 *  修改日期: 2015/12/07
 *  修改人員: 吳宇澤
 *  修改內容: Block3 「六大政黨取得立委席次數據」(有 6 筆)，加入「時代力量」、「無黨團結聯盟」，變成八大政黨 (有 8 筆)
 * 
 *  修改日期: 2015/12/02
 *  修改人員: 吳宇澤
 *  修改內容: Block6 「區域立委(含原住民)」所有的候選人全撈；「不分區立委」只撈出中選會宣佈「已當選」的候選人
 * 
 *  修改日期: 2015/11/23、2015/11/25、2015//11/30
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

public partial class webserver_TimerReadDB : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)    //這個區塊，只在頁面第一次進來時，執行一次
        {
            //排程是否持續讀取資料庫。 排程網頁過了 1/17 凌晨，是否仍每 20 秒讀取資料庫
            this.lblTCS_TIMER_READ_DB.Text = "Y";   //給預設值Y(持續讀取)

            this.checkIsInDatetimeSection();
        }
    }

    //計時器(Timer) AJAX 控制項，每 20 秒自動執行一次
    protected void Timer1_Tick(object sender, EventArgs e)
    {
        this.checkIsInDatetimeSection();
    }

    /******************************************************** 開票資料 *************************************************************/

    //依資料表 TVOTE_COUNTING_STATUS 的 TCS_TIMER_READ_DB 欄位，決定要不要撈資料庫。
    //
    //若 TCS_TIMER_READ_DB = 'Y'，每 20 秒撈資料庫； 
    //若 TCS_TIMER_READ_DB = 'N'，每 20 秒檢查記憶體是否仍有值。若沒值才去撈資料庫，若有值則不做任何事。
    private void checkIsInDatetimeSection()
    {
        #region
        ltlTimeNow.Text = "本頁最後更新時間 (定時器 Timer 每 20 秒會自動更新一次): " + DateTime.Now.ToString();        

        //是否要每 20 秒撈資料庫
        if (this.lblTCS_TIMER_READ_DB.Text == "Y") //是
        {
            lblTip.Text = "目前每 20 秒會撈一次資料庫。";

            //撈資料庫，並把撈到的值，透過 setVoteDataInMemory() 函數，寫入網站的記憶體 static 字串變數 (內容為 JSON)
            this.getDataFromDB();
        }
        else if (this.lblTCS_TIMER_READ_DB.Text == "N") //否
        {
            lblTip.Text = "目前每 20 秒檢查一次記憶體。 若記憶體沒值，才會撈資料庫；若記憶體有值，則不做任何事。";

            //檢查記憶體是否仍有值，若沒值才去撈資料庫
            if (string.IsNullOrEmpty(com.ebc.WebServer.wcf.DataInMemory.getDataInMemory()))
            {
                //撈資料庫，並把撈到的值，透過 setDataInMemory() 函數，寫入網站的記憶體 static 字串變數 (內容為 JSON)
                this.getDataFromDB();
            }
        }

        #region 依「日期、時間」來決定，是否要撈資料庫 (舊做法，已註解掉)

        //「開票」的「日期時間」區間。只有在這段區間，才每 20 秒撈資料庫；若不在這段區間，每 20 秒檢查記憶體是否仍有值，若沒值才去撈資料庫
        //DateTime dateEarlyLimit_Vote = new DateTime(2015, 11, 1, 15, 50, 0);    //「開票」的日期區間 - 起 (年月日時分秒)。 正式上線時的設定值：2016, 1, 16, 15, 50, 0

        //DateTime dateLaterLimit_Vote = new DateTime(2016, 1, 16, 23, 59, 59);   //「開票」的日期區間 - 迄 (年月日時分秒)
        //if ((DateTime.Compare(dateEarlyLimit_Vote, DateTime.Now) <= 0) && (DateTime.Compare(dateLaterLimit_Vote, DateTime.Now) >= 0)) //目前的日期時間，在「日期時間」區間內 (正在開票)


        //if ((DateTime.Compare(dateEarlyLimit_Vote, DateTime.Now) <= 0) && (this.lblTCS_TIMER_READ_DB.Text == "Y")) //目前的日期時間，在「日期時間」區間內 (正在開票)
        //{
        //    lblTip.Text = "目前的日期時間 (" + DateTime.Now.ToString() + ")，<br />正在「開票」的「日期時間」區間內，<br />每 20 秒會撈一次資料庫。";
        //        //dateEarlyLimit_Vote.Year + "年" + dateEarlyLimit_Vote.Month + "月" + dateEarlyLimit_Vote.Day + "日," +
        //        //dateEarlyLimit_Vote.Hour + "點:" + dateEarlyLimit_Vote.Minute + "分:" + dateEarlyLimit_Vote.Second + "秒 ~ " +
        //        //dateLaterLimit_Vote.Year + "年" + dateLaterLimit_Vote.Month + "月" + dateLaterLimit_Vote.Day + "日," +
        //        //dateLaterLimit_Vote.Hour + "點:" + dateLaterLimit_Vote.Minute + "分:" + dateLaterLimit_Vote.Second + "秒)，<br />每 20 秒會撈一次資料庫。";

        //    //撈資料庫，並把撈到的值，透過 setVoteDataInMemory() 函數，寫入網站的記憶體 static 字串變數 (內容為 JSON)
        //    this.getDataFromDB();
        //}
        //else //目前的日期時間，不在「日期時間」區間內 (尚未開票或已開完票)
        //{
        //    lblTip.Text = "目前的日期時間 (" + DateTime.Now.ToString() + ")，<br />不在「開票」的「日期時間」區間內，<br />每 20 秒檢查一次記憶體，若記憶體沒值，才會撈一次資料庫。";
        //        //dateEarlyLimit_Vote.Year + "年" + dateEarlyLimit_Vote.Month + "月" + dateEarlyLimit_Vote.Day + "日," +
        //        //dateEarlyLimit_Vote.Hour + "點:" + dateEarlyLimit_Vote.Minute + "分:" + dateEarlyLimit_Vote.Second + "秒 ~ " +
        //        //dateLaterLimit_Vote.Year + "年" + dateLaterLimit_Vote.Month + "月" + dateLaterLimit_Vote.Day + "日" +
        //        //dateLaterLimit_Vote.Hour + "點:" + dateLaterLimit_Vote.Minute + "分:" + dateLaterLimit_Vote.Second + "秒)，<br />每 20 秒檢查一次記憶體，若記憶體沒值，才去撈資料庫。";

        //    //檢查記憶體是否仍有值，若沒值才去撈資料庫
        //    if (string.IsNullOrEmpty(com.ebc.WebServer.wcf.DataInMemory.getDataInMemory()))
        //    {
        //        //撈資料庫，並把撈到的值，透過 setDataInMemory() 函數，寫入網站的記憶體 static 字串變數 (內容為 JSON)
        //        this.getDataFromDB();
        //    }
        //}
        #endregion

        #endregion
    } //end of "checkIsInDatetimeSection()"

    //撈資料庫，並把撈到「開票資料」內容，透過 setDataInMemory() 函數，寫入網站記憶體的 static 字串變數 (內容為 JSON)
    private void getDataFromDB()
    {
        #region
        SqlConnection conn = null;
        SqlCommand cmd1 = null;
        SqlDataReader dr = null;

        //Block2 - 開票狀態(總統), 共 3 筆
        List<com.ebc.WebServer.wcf.Block2.Cpresident_vote> listBlock2_president_vote = new List<com.ebc.WebServer.wcf.Block2.Cpresident_vote>();   //自訂類別 Cpresident_vote

        string strBlock2_president_vote_rate = "0";     //總統開票率% (竤洋 16:30 開始才會提供此值)
        //string strBlock3_legislator_vote_rate = "0";  //立委開票率% (竤洋 16:30 開始才會提供此值)
        //string strTCS_IS_LEGISLATOR_ENDING = "N";     //八大政黨立委席次、六大政黨不分區立委名單，讀自竤洋的預估值 TLC_NONAREA_CALC_FLAG 欄位 (N)，或
                                                        //讀自中選會宣布當選的 TLC_ELEC_FLAG 欄位 (Y)

        //Block5 - 各區(各縣市)總統得票數, 共 66 筆
        List<com.ebc.WebServer.wcf.Block5.Cvote_info> listBlock5_vote_info = new List<com.ebc.WebServer.wcf.Block5.Cvote_info>();   //自訂類別 Cvote_info

        //Block3 - 六大政黨取得立委席次數據, 共 6 筆
        List<com.ebc.WebServer.wcf.Block3.Clegislator_seat> listBlock3_legislator_seat = new List<com.ebc.WebServer.wcf.Block3.Clegislator_seat>();   //自訂類別 Clegislator_seat

        //Block6 - 各選區立委得票數, 共數百筆
        List<com.ebc.WebServer.wcf.Block6.Cvote_info> listBlock6_vote_info = new List<com.ebc.WebServer.wcf.Block6.Cvote_info>();   //自訂類別 Cvote_info

        JObject jo = null;

        try
        {
            conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnStr_ELECTION2016"].ToString());           //東森 or 遠傳 (視 web.config 而定)

            conn.Open();
            if (conn.State == ConnectionState.Open)
            {
                cmd1 = new SqlCommand();
                cmd1.Connection = conn;
                cmd1.CommandTimeout = 120;  //30秒加大為120秒

                /*********** Block2、Block3 - 總統開票率、立委開票率 ***********/

                //Block2、Block3 - 撈「總統開票率、立委開票率、排程是否持續讀取資料庫」(只有 1 筆)
                //cmd1.CommandText = "SELECT TOP 1 TCS_PRESIDENT_COUNTING_RATE, TCS_LEGISLATOR_COUNTING_RATE, TCS_TIMER_READ_DB FROM dbo.TVOTE_COUNTING_STATUS (NOLOCK)";

                //Block2、Block3 - 撈「總統開票率、排程是否持續讀取資料庫」(只有 1 筆)
                cmd1.CommandText = "SELECT TOP 1 TCS_PRESIDENT_COUNTING_RATE, TCS_TIMER_READ_DB FROM dbo.TVOTE_COUNTING_STATUS (NOLOCK)";
                
                dr = cmd1.ExecuteReader(CommandBehavior.SingleRow); //只撈 1 筆
                if (dr.HasRows)
                {
                    if (dr.Read())
                    {
                        strBlock2_president_vote_rate = dr.GetDecimal(0).ToString();    //總統開票率%
                        //strBlock3_legislator_vote_rate = dr.GetDecimal(1).ToString(); //立委開票率%
                        this.lblTCS_TIMER_READ_DB.Text = dr.GetString(1);               //排程是否持續讀取資料庫
                        //strTCS_IS_LEGISLATOR_ENDING = dr.GetString(2);                //八大政黨立委席次、六大政黨不分區立委名單，讀自竤洋的預估值 TLC_NONAREA_CALC_FLAG 欄位 (N)，或
                                                                                        //讀自中選會宣布當選的 TLC_ELEC_FLAG 欄位 (Y)
                    }
                }

                if (dr.IsClosed == false)
                    dr.Close();

                /*********** Block2 - 開票狀態(總統) ***********/

                //Block2 (2.開票狀態-總統) - 撈「president_vote 總統得票資料」(有 3 筆)。
                //
                //排序方式說明: 籤號:由小到大。(開始計票後，要改票數由大到小排序，改由前端另行處理)
                cmd1.CommandText = "SELECT TPC_CANNO, TPC_PRESIDENT_ID, TPC_PRESIDENT_ID_IMG, TPC_NAME, TPC_POLNO, TPC_IMG, TPC_SELF_FLAG, TPC_ELEC_FLAG, " +
                                   "TPC_VOTE_COUNT, TPC_VOTE_TT, TPC_VOTE_TH, TPC_VOTE_RATE FROM TVOTE_PRESIDENT_CANDIDATE (NOLOCK) " +
                                   "ORDER BY TPC_PRESIDENT_ID ASC";
                
                dr = cmd1.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        listBlock2_president_vote.Add(new com.ebc.WebServer.wcf.Block2.Cpresident_vote
                        {
                            TPC_CANNO = dr.GetString(0),                    //候選人編號 (系統用,匯入竑洋的資料用)
                            TPC_PRESIDENT_ID = dr.GetDecimal(1).ToString(), //候選人號碼 (中選會抽籤的號碼)
                            TPC_PRESIDENT_ID_IMG = dr.GetString(2),         //候選人登記編號的圖檔名
                            TPC_NAME = dr.GetString(3),                     //候選人姓名
                            TPC_POLNO = dr.GetString(4),                    //候選人所屬政黨編號
                            //TPC_POLNM = dr.GetString(4),                  //候選人所屬政黨名稱
                            TPC_IMG = dr.GetString(5),                      //候選人大頭照的圖檔名
                            TPC_SELF_FLAG = dr.GetString(6),                //自行宣布當選 (N:否、Y:是)
                            TPC_ELEC_FLAG = dr.GetString(7),                //中選會宣布當選 (N:否、Y:是)
                            TPC_VOTE_COUNT = dr.GetInt32(8).ToString(),     //得票數
                            TPC_VOTE_TT = dr.GetInt16(9).ToString(),        //得票數 (萬位)
                            TPC_VOTE_TH = dr.GetInt16(10).ToString(),       //得票數 (千位)
                            TPC_VOTE_RATE = dr.GetDecimal(11).ToString(),   //得票率%
                            //TPC_POINTER_RATE = dr.GetDecimal(12).ToString() //天玉里得票率%
                        });
                    }
                }

                if (dr.IsClosed == false)
                    dr.Close();

                /*********** Block5 - 各區(各縣市)總統得票數 ***********/

                //Block5 (5.各區總統得票數) - 撈「vote_info」(有 66 筆, 22個縣市*3個候選人)。
                //
                //排序方式說明:
                //1-各縣市:由小到大、2-籤號:由小到大。(開始計票後，要改票數由大到小排序，改由前端另行處理)
                cmd1.CommandText = "SELECT v.TPRV_AREA_NO, v.TPRV_CITY_NM, v.TPRV_NAME, v.TPRV_VOTE_COUNT, v.TPRV_VOTE_TT, v.TPRV_VOTE_TH, v.TPRV_VOTE_RATE, " +
                                   "c.TPC_IMG, c.TPC_ELEC_FLAG, c.TPC_SELF_FLAG, c.TPC_PRESIDENT_ID, c.TPC_POLNO " +
                                   "FROM TVOTE_PRESIDENT_REGION_VOTE v (NOLOCK) JOIN TVOTE_PRESIDENT_CANDIDATE c (NOLOCK) ON v.TPRV_PRESIDENT_ID = c.TPC_PRESIDENT_ID " +
                                   "ORDER BY v.TPRV_CITY_NO ASC, v.TPRV_PRESIDENT_ID ASC";
                dr = cmd1.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        listBlock5_vote_info.Add(new com.ebc.WebServer.wcf.Block5.Cvote_info
                        {
                            TPRV_AREA_NO = dr.GetString(0),                     //part_id: (1–北部、2–中部、3–南部、4–東部、5–離島)
                            TPRV_CITY_NM = dr.GetString(1),                     //city: 縣市名稱
                            TPRV_NAME = dr.GetString(2),                        //data - name: 候選人名稱
                            TPRV_VOTE_COUNT = dr.GetInt32(3).ToString(),        //得票數
                            TPRV_VOTE_TT = dr.GetInt16(4).ToString(),           //得票數 (萬位)
                            TPRV_VOTE_TH = dr.GetInt16(5).ToString(),           //得票數 (千位)
                            TPRV_VOTE_RATE = dr.GetDecimal(6).ToString(),       //得票率%
                            TPC_IMG = dr.GetString(7),                          //候選人圖檔路徑 (總統為大頭照)
                            TPC_ELEC_FLAG = dr.GetString(8),                    //中選會宣布當選 (N –否、Y–是)
                            TPC_SELF_FLAG = dr.GetString(9),                    //自行宣布當選 (N –否、Y–是)
                            TPC_PRESIDENT_ID = dr.GetDecimal(10).ToString(),    //候選人籤號
                            TPC_POLNO = dr.GetString(11)                        //候選人所屬政黨編號
                        });
                    }
                }

                if (dr.IsClosed == false)
                    dr.Close();

                /*********** Block3 - 開票狀態(立委) ***********/

                //Block3 (3.開票狀態-立委) - 撈「legislator_seat 八大政黨取得立委席次數據」(有 8 筆, 竤洋預估值)。
                cmd1.CommandText = "SELECT TP_POLNM, TP_IMG, TP_AREA_SEAT, TP_NON_AREA_SEAT, TP_TOTAL_SEAT AS TOTAL_SEAT " + 
                                   "FROM TVOTE_POLITICAL (NOLOCK) WHERE TP_POLNO IN ('01','02','03','04','05','08','16') " +  
                                   "UNION ALL " +
                                   "SELECT '其他' AS TP_POLNM, '' AS TP_IMG, TP_AREA_SEAT, TP_NON_AREA_SEAT, TP_TOTAL_SEAT AS TOTAL_SEAT " + 
                                   "FROM TVOTE_POLITICAL (NOLOCK) WHERE TP_POLNO = 'OT'";
                //cmd1.CommandText = "SELECT TP_POLNM, TP_IMG, (TP_AREA_SEAT + TP_ABORIGINE_SEAT) AS TP_AREA_SEAT, TP_NON_AREA_SEAT, (TP_AREA_SEAT + TP_ABORIGINE_SEAT + TP_NON_AREA_SEAT) AS TOTAL_SEAT " +
                //      "FROM TVOTE_POLITICAL (NOLOCK) WHERE TP_POLNO IN ('01','02','03','04','05','08','16') " + 
                //      "UNION ALL " +
                //      "SELECT '其他' AS TP_POLNM, '' AS TP_IMG, SUM((TP_AREA_SEAT + TP_ABORIGINE_SEAT)) AS TP_AREA_SEAT, SUM(TP_NON_AREA_SEAT) AS TP_NON_AREA_SEAT, SUM((TP_AREA_SEAT + TP_ABORIGINE_SEAT + TP_NON_AREA_SEAT)) AS TOTAL_SEAT " +
                //      "FROM TVOTE_POLITICAL (NOLOCK) WHERE TP_POLNO NOT IN ('01','02','03','04','05','08','16') ";
                dr = cmd1.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        listBlock3_legislator_seat.Add(new com.ebc.WebServer.wcf.Block3.Clegislator_seat
                        {
                            TP_POLNM = dr.GetString(0),                         //polnm: 政黨名稱
                            TP_IMG = dr.GetString(1),                           //img: 政黨圖檔
                            TP_AREA_SEAT = dr.GetInt16(2).ToString(),           //area_seat: 區域立委席次
                            //TP_AREA_RATE = dr.GetDecimal(3).ToString(),       //area_rate: 區域立委得票率 (已無用)
                            TP_NON_AREA_SEAT = dr.GetInt16(3).ToString(),       //non_area_seat: 不分區立委席次
                            //TP_POLNM_VOTE_RATE = dr.GetDecimal(5).ToString(), //polnm_rate: 政黨得票率 (已無用)
                            TOTAL_SEAT = dr.GetInt16(4).ToString()              //total_seat: 總席次
                        });
                    }
                }

                if (dr.IsClosed == false)
                    dr.Close();

                //Block6 (6.各區立委得票數) - 撈「vote_info」(有數百筆, 75個選區 * n個候選人)。
                //「區域立委(含原住民)」所有的候選人全撈；「不分區立委」只撈出中選會宣佈「已當選」的候選人(TLC_ELEC_FLAG='Y'。該欄位亦為開票期間，竤洋預估的不分區立委各黨當選人)
                //
                //排序方式說明:
                // (目前暫時照:「選區、籤號」由小到大排序)
                cmd1.CommandText = "SELECT TLC_NAME, TLC_POLNO, TLC_AREA_NO, TLC_CITY_NO, TLC_CITY_NM, TLC_SECTION_NO, TLC_SECTION_NM, TLC_LEGISLATOR_ID, TLC_VOTE_COUNT, TLC_VOTE_TT, TLC_VOTE_TH, TLC_SELF_FLAG, TLC_ELEC_FLAG " +
                    "FROM TVOTE_LEGISLATOR_CANDIDATE (NOLOCK) WHERE TLC_CITY_NO < 25 AND TLC_ISON='Y' " + 
                    "UNION ALL " + 
                    "SELECT TLC_NAME, TLC_POLNO, TLC_AREA_NO, TLC_CITY_NO, TLC_CITY_NM, TLC_SECTION_NO, TLC_SECTION_NM, TLC_LEGISLATOR_ID, TLC_VOTE_COUNT, TLC_VOTE_TT, TLC_VOTE_TH, TLC_SELF_FLAG, TLC_ELEC_FLAG " + 
                    "FROM TVOTE_LEGISLATOR_CANDIDATE (NOLOCK) WHERE TLC_CITY_NO = 25 AND TLC_ELEC_FLAG='Y' AND TLC_ISON='Y'";

                //上方 SQL 句子，若 WHERE TLC_CITY_NO = 25 表示只撈「不分區」立委 
                //TLC_CITY_NO 欄位: 1:基隆市, 2:台北市, 3:新北市, ..., 20:澎湖縣, 21:金門縣, 22:連江縣, 23:平地原住民, 24:山地原住民, 25:不分區"

                dr = cmd1.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        listBlock6_vote_info.Add(new com.ebc.WebServer.wcf.Block6.Cvote_info
                        {
                            TLC_NAME = dr.GetString(0),                         //候選人名稱
                            //TLC_POLIMG = dr.GetString(1),                     //候選人圖檔路徑 (立委為政黨圖示)
                            TLC_POLNO = dr.GetString(1),                        //候選人所屬政黨編號
                            TLC_AREA_NO = dr.GetString(2),                      //區域代號 (part_id)
                            TLC_CITY_NO = dr.GetDecimal(3).ToString(),          //縣市代號
                            TLC_CITY_NM = dr.GetString(4),                      //縣市名稱
                            TLC_SECTION_NO = dr.GetString(5),                   //選區代號
                            TLC_SECTION_NM = dr.GetString(6),                   //選區名稱
                            TLC_LEGISLATOR_ID = dr.GetDecimal(7).ToString(),    //legislator_id: 立委登記編號 (候選人籤號)
                            TLC_VOTE_COUNT = dr.GetInt32(8).ToString(),         //得票數 (總票數)
                            TLC_VOTE_TT = dr.GetInt16(9).ToString(),            //得票數 (萬位)
                            TLC_VOTE_TH = dr.GetInt16(10).ToString(),           //得票數 (千位)
                            TLC_SELF_FLAG = dr.GetString(11),                   //自行宣布當選 (N –否、Y–是)
                            TLC_ELEC_FLAG = dr.GetString(12)                    //中選會宣布當選 (N –否、Y–是)
                        });
                    }
                }

            }
        }
        catch (Exception ex)
        {
            com.ebc.utility.Utility.writeErrorLog("TimerReadDB.aspx.cs 的 getDataFromDB()，在撈資料庫時發生錯誤", ex);
            com.ebc.WebServer.utility.MailSender.sendMailToAdmin(ex.Message);

            lblError.Visible = true;
            lblError.Text += "<br /><br />從資料庫撈資料時發生錯誤：" + ex.ToString() + "，<br />發生時間：" + DateTime.Now.ToString() + "<br /><br />";
        }
        finally
        {
            if (dr != null)
            {
                if (dr.IsClosed == false)
                    dr.Close();
                dr.Dispose();
            }
            if (cmd1 != null)
            {
                cmd1.Cancel();
                cmd1.Dispose();
            }
            if (conn != null)
            {
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                conn.Dispose();
            }
        }

        /************************* 至此，資料庫的連結已關閉 *************************/

        try
        {
            //把從資料庫撈到的資料，指派給 JObject，接著再序列化成一個 JSON 字串

            jo = new JObject(
                /*********** Block2、Block3 - 總統開票率、立委開票率, 單一值 ***********/                
                new JProperty("Block2_president_vote_rate", strBlock2_president_vote_rate),     //總統開票率% (竤洋 16:30 開始才會提供此值)
                //new JProperty("Block3_legislator_vote_rate", strBlock3_legislator_vote_rate),   //立委開票率% (竤洋 16:30 開始才會提供此值)

                /*********** Block2 - 開票狀態(總統), 有 3 筆 ***********/                
                new JProperty("Block2_president_vote",  //總統得票資料
                    new JArray(
                        from p2 in listBlock2_president_vote
                        select new JObject(
                            new JProperty("TPC_CANNO", p2.TPC_CANNO),                        //候選人編號 (系統用,匯入竑洋的資料用)
                            new JProperty("TPC_PRESIDENT_ID", p2.TPC_PRESIDENT_ID),          //候選人號碼 (中選會抽籤的號碼)
                            new JProperty("TPC_PRESIDENT_ID_IMG", p2.TPC_PRESIDENT_ID_IMG),  //候選人登記編號的圖檔名
                            new JProperty("TPC_NAME", p2.TPC_NAME),                          //候選人姓名
                            new JProperty("TPC_POLNO", p2.TPC_POLNO),                        //候選人所屬政黨編號
                            //new JProperty("TPC_POLNM", p2.TPC_POLNM),                      //候選人所屬政黨名稱
                            new JProperty("TPC_IMG", p2.TPC_IMG),                            //候選人大頭照的圖檔名
                            new JProperty("TPC_SELF_FLAG", p2.TPC_SELF_FLAG),                //自行宣布當選 (N:否、Y:是)
                            new JProperty("TPC_ELEC_FLAG", p2.TPC_ELEC_FLAG),                //中選會宣布當選 (N:否、Y:是)
                            new JProperty("TPC_VOTE_COUNT", p2.TPC_VOTE_COUNT),              //得票數
                            new JProperty("TPC_VOTE_TT", p2.TPC_VOTE_TT),                    //得票數 (萬位)
                            new JProperty("TPC_VOTE_TH", p2.TPC_VOTE_TH),                    //得票數 (千位)
                            new JProperty("TPC_VOTE_RATE", p2.TPC_VOTE_RATE)                 //得票率%
                            //new JProperty("TPC_POINTER_RATE", p2.TPC_POINTER_RATE)         //天玉里得票率%
                        )
                    )
                ),
                /*********** Block5 - 各區(各縣市)總統得票數, 有 66 筆 ***********/
                //new JProperty("Block5_vote_type", "1"),    //1-總統、2-立委
                new JProperty("Block5_vote_info",
                    new JArray(
                        from p5 in listBlock5_vote_info
                        select new JObject(
                            new JProperty("TPRV_AREA_NO", p5.TPRV_AREA_NO),                  //區域代號 part_id: (1–北部、2–中部、3–南部、4–東部、5–離島)
                            new JProperty("TPRV_CITY_NM", p5.TPRV_CITY_NM),                  //city: 縣市名稱
                            new JProperty("TPRV_NAME", p5.TPRV_NAME),                        //data - name: 候選人名稱
                            new JProperty("TPRV_VOTE_COUNT", p5.TPRV_VOTE_COUNT),            //得票數
                            new JProperty("TPRV_VOTE_TT", p5.TPRV_VOTE_TT),                  //得票數 (萬位)
                            new JProperty("TPRV_VOTE_TH", p5.TPRV_VOTE_TH),                  //得票數 (千位)
                            new JProperty("TPRV_VOTE_RATE", p5.TPRV_VOTE_RATE),              //得票率%
                            new JProperty("TPC_IMG", p5.TPC_IMG),                            //候選人圖檔路徑 (總統為大頭照)
                            new JProperty("TPC_ELEC_FLAG", p5.TPC_ELEC_FLAG),                //中選會宣布當選 (N –否、Y–是)
                            new JProperty("TPC_SELF_FLAG", p5.TPC_SELF_FLAG),                //自行宣布當選 (N –否、Y–是)
                            new JProperty("TPC_PRESIDENT_ID", p5.TPC_PRESIDENT_ID),          //data - can_id: 候選人籤號
                            new JProperty("TPC_POLNO", p5.TPC_POLNO)                         //候選人所屬政黨編號
                        )
                    )
                ),
                /*********** Block3 - 開票狀態(立委)-八大政黨取得立委席次數據, 有 8 筆 ***********/
                new JProperty("Block3_legislator_seat",
                    new JArray(
                        from p3 in listBlock3_legislator_seat
                        select new JObject(
                            new JProperty("TP_POLNM", p3.TP_POLNM),                          //polnm: 政黨名稱
                            new JProperty("TP_IMG", p3.TP_IMG),                              //img: 政黨圖檔
                            new JProperty("TP_AREA_SEAT", p3.TP_AREA_SEAT),                  //area_seat: 區域立委席次
                            //new JProperty("TP_AREA_RATE", p3.TP_AREA_RATE),                //area_rate: 區域立委得票率 (已無用)
                            new JProperty("TP_NON_AREA_SEAT", p3.TP_NON_AREA_SEAT),          //non_area_seat: 不分區立委席次
                            //new JProperty("TP_POLNM_VOTE_RATE", p3.TP_POLNM_VOTE_RATE),    //polnm_rate: 政黨得票率 (已無用)
                            new JProperty("TOTAL_SEAT", p3.TOTAL_SEAT)                       //total_seat: 總席次
                        )
                    )
                ),
                /********************* Block6 - 各選區立委得票數, 有數百筆 (目前暫時照:「選區、籤號」排序) ***********************/
                new JProperty("Block6_vote_info",
                    new JArray(
                        from p6 in listBlock6_vote_info
                        select new JObject(
                            new JProperty("TLC_NAME", p6.TLC_NAME),                          //候選人名稱
                            //new JProperty("TLC_POLIMG", p6.TLC_POLIMG),                    //候選人圖檔路徑 (立委為政黨圖示)
                            new JProperty("TLC_POLNO", p6.TLC_POLNO),                        //候選人所屬政黨編號
                            new JProperty("TLC_AREA_NO", p6.TLC_AREA_NO),                    //區域代號 (part_id)
                            new JProperty("TLC_CITY_NO", p6.TLC_CITY_NO),                    //縣市代號
                            new JProperty("TLC_CITY_NM", p6.TLC_CITY_NM),                    //縣市名稱
                            new JProperty("TLC_SECTION_NO", p6.TLC_SECTION_NO),              //選區代號
                            new JProperty("TLC_SECTION_NM", p6.TLC_SECTION_NM),              //選區名稱
                            new JProperty("TLC_LEGISLATOR_ID", p6.TLC_LEGISLATOR_ID),        //legislator_id: 立委登記編號 (候選人籤號)
                            new JProperty("TLC_VOTE_COUNT", p6.TLC_VOTE_COUNT),              //得票數 (總票數)
                            new JProperty("TLC_VOTE_TT", p6.TLC_VOTE_TT),                    //得票數 (萬位)
                            new JProperty("TLC_VOTE_TH", p6.TLC_VOTE_TH),                    //得票數 (千位)
                            new JProperty("TLC_SELF_FLAG", p6.TLC_SELF_FLAG),                //自行宣布當選 (N –否、Y–是)
                            new JProperty("TLC_ELEC_FLAG", p6.TLC_ELEC_FLAG)                 //中選會宣布當選 (N –否、Y–是)
                        )
                    )
                )

            );

            //把資料序列化成一個 JSON 字串，並寫入本機 Web Server 記憶體裡的 static 字串變數
            com.ebc.WebServer.wcf.DataInMemory.setDataInMemory(JsonConvert.SerializeObject(jo));
        }
        catch (Exception ex)
        {
            com.ebc.utility.Utility.writeErrorLog("TimerReadDB.aspx.cs 的 getDataFromDB()，組 JSON 字串(預測活動Active)、序列化時發生錯誤", ex);
            com.ebc.WebServer.utility.MailSender.sendMailToAdmin(ex.Message);

            lblError.Visible = true;
            lblError.Text += "<br /><br />組 JSON 字串、序列化時發生錯誤：" + ex.ToString() + "，<br />發生時間：" + DateTime.Now.ToString() + "<br /><br />";
        }

        #endregion
    } //end of "getDataFromDB()"
}