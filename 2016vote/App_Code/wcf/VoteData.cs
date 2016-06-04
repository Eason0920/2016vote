using System;
using System.Collections.Generic;
using System.Web;

namespace EbcVote2016
{
    /// <summary>
    /// VoteData 的摘要描述
    /// </summary>
    public class VoteData
    {
        //static Dictionary<string, int> dictVoteData = new Dictionary<string, int>();

        //除非: 重啟網站、重啟IIS、網站更新了特定的檔案、網站發生太多錯誤，這個記憶體中的 static 變數才會被清空
        static List<String> list = new List<String>();

        public VoteData() //建構函數
        {
            //list.Add(0);
            //list.Add(0);
            //list.Add(0);
            //list.Add(0);
            //list.Add(0);
            //list.Add(0);
            //list.Add(0);
            //list.Add(0);
            //list.Add(0);
        }

        //取得記憶體中的 static 動態陣列 List
        public static List<String> getVoteData()
        {
            //開票狀態Json 類別
            //BallotCountingStatus bcs = new BallotCountingStatus()
            //{
            //    //全國五大區總統得票數
            //    president_country = list.ToArray(),
            //};

            return list;
        }

        //設定記憶體中的 static List 動態陣列
        public static void setVoteData(String vote1, String vote2, String vote3, String vote4, String vote5, String vote6)
        {
            //若第一次執行，List 雖已經 new，但還沒有存任何內容
            if (list.Count == 0)
            {
                list.Add("");//投票預測活動查詢Json
                list.Add("");//開票狀態Json
                list.Add("");//取得各區總統得票數
                list.Add("");//取得各區立委得票數
                list.Add("");//要求各區總統得票數
                list.Add("");//要求各區立委得票數
            }

            //替九個元素給值
            list[0] = vote1;//投票預測活動查詢Json
            list[1] = vote2;//開票狀態Json
            list[2] = vote3;//取得各區總統得票數
            list[3] = vote4;//取得各區立委得票數
            list[4] = vote5;//要求各區總統得票數
            list[5] = vote6;//要求各區立委得票數
        }

        public static void cleanVoteData()
        {
            //dictVoteData.Clear(); //這樣寫會刪除九個元素，會有問題

            //替九個元素給值0
            list[0] = "";
            list[1] = "";
            list[2] = "";
            list[3] = "";
            list[4] = "";
            list[5] = "";
        }
    }
}
