using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

//using EbcVote2016;  //自訂namespace
using System.ServiceModel;

public partial class TimerGetDataFromWCF : System.Web.UI.Page
{    
    WebReference.Service ws = new WebReference.Service();

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) //以下這段，只在頁面第一次進來時，執行一次
        {
            this.callFunctionOfWCF();
        }
    }

    //計時器 AJAX 控制項，每 20 秒會自動重新整理一次頁面
    protected void Timer1_Tick(object sender, EventArgs e)
    {
        this.callFunctionOfWCF();
    }

    //呼叫 WCF (Web Service) 上的 get 函數，取得 AP Server 上記憶體裡(List 動態陣列變數) 的資料
    private void callFunctionOfWCF()
    {
        ltlTimeNow.Text = "本頁最後重新整理時間 (每 20 秒自動重新整理一次): " + DateTime.Now.ToString() + "<br /><br />";

        //String ss = "";
        String vote1 = "";
        String vote2 = "";
        String vote3 = "";
        String vote4 = "";
        String vote5 = "";
        String vote6 = "";
        try
        {
            //WebReference.Service ws = new WebReference.Service();
            vote1 = ws.getActiveDataFromApServer();   //呼叫 WCF (Web Service) 上的 get 函數
            //將呼叫 WCF (Web Service) 上的 get 函數，透過 setVoteData() 函數，寫入網站的記憶體 static 動態陣列 List
            EbcVote2016.VoteData.setVoteData(vote1, vote2, vote3, vote4, vote5, vote6);
        }
        catch (FaultException ex)     //WCF裡自訂的錯誤類別
        {
            lblError.Visible = true;
            lblError.Text = "WCF發生錯誤：" + ex.ToString();
        }
        catch (Exception ex)
        {
            lblError.Visible = true;
            lblError.Text = "WCF發生錯誤：" + ex.ToString();
        }
        //catch (FaultException<FaultInfo> fault)     //WCF裡自訂的錯誤類別
        //{
        //    Response.Write(fault.Detail.Reason);    //WCF裡自訂的錯誤訊息
        //}
        
        

        //新(List):
        //Response.Write("JSON資料:" + ss);
        //:{"type":0,"youtube_src":null,"president_vote_rate":0.0,"legislator_vote_rate":0.0,"president_country":[],"legislator_country":null,"president_vote":null} 
        //return;        

        //舊(Dictionary):
        //{"Name":"Jeffrey","UpdatedTime":"0001-01-01T00:00:00","Value":199,"Rate":[1024,9999,32767]}
        //{"Name":"Jeffrey","UpdatedTime":"2015-10-01T11:10:13","Value":199,"Rate":[1024,9999,32767]}

        //JObject jo = new JObject();

        //JSON字串還原回JObject，動態存取
        //JObject restoredObject = JsonConvert.DeserializeObject<JObject>(ss);

        ////要等 server 上的 TimerGetDataFromDB.aspx 至少執行過一次，這裡才會有資料。
        ////但即使沒執行過，也不會出錯，只是沒資料。
        //int[] records = ((JArray)restoredObject.Property("president_country").Value).Select(o => (int)o).ToArray();
        ////Response.Write("<li>president_country = " + string.Join(",", records.Select(o => o.ToString()).ToArray()));
        ////lblResult.Text = string.Join(",", records.Select(o => o.ToString()).ToArray());
        //lblResult.Text = "以下為從 AP Server (每 20 秒會自動更新一次資料) 得到的資料 (以下數字每 20 秒會自動更新)<br />";
        //lblResult.Text += "國民黨北部得票數：" + records[0].ToString() + "<br />";
        //lblResult.Text += "民進黨北部得票數：" + records[1].ToString() + "<br />";
        //lblResult.Text += "親民黨北部得票數：" + records[2].ToString() + "<br />";
        //lblResult.Text += "國民黨中部得票數：" + records[3].ToString() + "<br />";
        //lblResult.Text += "民進黨中部得票數：" + records[4].ToString() + "<br />";
        //lblResult.Text += "親民黨中部得票數：" + records[5].ToString() + "<br />";
        //lblResult.Text += "國民黨南部得票數：" + records[6].ToString() + "<br />";
        //lblResult.Text += "民進黨南部得票數：" + records[7].ToString() + "<br />";
        //lblResult.Text += "親民黨南部得票數：" + records[8].ToString() + "<br />";

        ////JObject可使用LINQ方式存取
        //var q = from p in restoredObject.Properties()
        //        where p.Name == "ID"
        //        select p;
        //Response.Write("<li>ID = " + (int)q.First().Value);

        ////非LINQ方式
        //Response.Write("<li>Name = " + (string)restoredObject.Property("Name").Value);

        //Response.Write("<li>Polnm = " + (string)restoredObject.Property("Polnm").Value);

        //double[] records = ((JArray)restoredObject.Property("VotesRate").Value).Select(o => (double)o).ToArray();
        //Response.Write("<li>VotesRate = " + string.Join(",", records.Select(o => o.ToString()).ToArray()));
    }

    
}