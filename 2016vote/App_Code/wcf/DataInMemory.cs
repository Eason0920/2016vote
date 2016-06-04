using System;
using System.Collections.Generic;
using System.Web;

/*
 *  說明: 暫存在本機(Web Server)記憶體中的開票資料
 *  
 *  修改日期: 2015/11/10
 *  修改人員: 吳宇澤
 *  修改內容:   
 *  建立日期: 2015/11/09
 *  建立人員: 吳宇澤
 */

namespace com.ebc.WebServer.wcf
{
    /// <summary>
    /// 暫存在本機(Web Server)記憶體中的資料
    /// </summary>
    public class DataInMemory
    {
        /// <summary>
        /// 暫存在本機(Web Server)記憶體中的字串變數，內容為:開票資料，格式為 JSON。 
        /// </summary>
        static string strJSON = "";

        //會造成上面這個記憶體中的 static 變數，被清空的原因:
        //1、更新網站底下，App_ 開頭的資料夾，或 Bin 資料夾內的「任一個」檔案。
        //2、更新網站底下的 web.config 檔案。
        //3、網站底下的檔案，累計更新，達到 15 個 (預設值)。
        //4、手動在 IIS 回收「應用程式集區」，或手動重新啟動 IIS，或伺服器重開機。
        //5、其他，如：記憶體不足、程式發生的錯誤過多...等。

        public DataInMemory(){} //建構函數

        /// <summary>
        /// 取得記憶體中的 static 字串變數 - 開票資料，格式為 JSON
        /// </summary>
        /// <returns></returns>
        public static string getDataInMemory()
        {
            return strJSON;
        }
        /// <summary>
        /// 設定記憶體中的 static 字串變數 - 開票資料，格式為 JSON
        /// </summary>
        /// <param name="setVoteJSON"></param>
        public static void setDataInMemory(string setJSON)
        {
            strJSON = setJSON;
        }
                
        /// <summary>
        /// 清空記憶體中的 static 字串變數 - 開票資料
        /// </summary>
        public static void cleanDataInMemory()
        {
            strJSON = "";
        }

    } //end of class
}
