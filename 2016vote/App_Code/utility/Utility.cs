﻿using System;
//using System.Collections.Generic;
using System.Web;
//以下為額外引用的 Namespace
using System.IO;                //寫 Log 用
using System.Data.SqlClient;    //寫 Log 用
using System.Net;
using System.Text;
using System.Text.RegularExpressions;   //捉 Server IP 用

/*
 *  說明: 網站共用的功能
 *  
 *  修改日期: 
 *  修改人員: 
 *  修改內容: 
 *  
 *  建立日期: 2015/06/22
 *  建立人員: 吳宇澤
 */
namespace com.ebc.utility {
    /// <summary>
    /// 網站共用的功能
    /// </summary>
    public class Utility {
        public Utility() { }

        #region ****** 判斷字串的內容是否為數值 (函數x2) ******

        /// <summary>
        /// 判斷字串的內容是否為數值 (可判斷整數，亦可判斷帶有小數點的浮點數)
        /// </summary>
        /// <param name="s">要作判斷的字串</param>
        /// <returns></returns>
        public static bool isStringContentNumeric(string s) {
            if (s != null) {
                int n;
                double d;
                if (int.TryParse(s.Trim(), out n)) {
                    return true;    //是數值 (整數)，包含：0、負數
                } else if (double.TryParse(s.Trim(), out d)) {
                    return true;    //是數值 (浮點數)，包含：0.0、負數
                } else {
                    return false;   //不是數值
                }
            } else {
                return false;       //不是數值
            }
        } //end of isStringContentNumeric()

        /// <summary>
        /// 判斷字串的內容是否為整數 (只能判斷整數，無法判斷帶有小數點的浮點數)
        /// </summary>
        /// <param name="s">要作判斷的字串</param>
        /// <returns></returns>
        public static bool isStringContentInteger(string s) {
            if (s != null) {
                int n;
                if (int.TryParse(s.Trim(), out n)) {
                    return true;    //是數值 (整數)，包含：0、負數
                } else {
                    return false;   //不是數值
                }
            } else {
                return false;       //不是數值
            }
        } //end of isStringContentInteger()

        #endregion ****** 判斷字串的內容是否為數值 ******

        #region ****** 撰寫 Log (函數x4) ******

        /// <summary>
        /// 寫文字檔 Error Log
        /// </summary>
        /// <param name="CustomMessage">自訂的訊息內容</param>
        /// <param name="ex">Exception 例外(錯誤) 變數</param>
        public static void writeErrorLog(string CustomMessage, Exception ex) {
            if (Resources.Setup.IsWriteErrorLog.Trim().Equals("Y")) {
                //寫文字檔 Error Log。若文字檔不在會自動建立、寫入內容會附加在文字檔原有內容後。若要自行手動先建立文字檔，要設為 UTF-8
                File.AppendAllText(Resources.Setup.PathOfErrorLog + @"\" + System.DateTime.Now.ToString("yyyyMMdd") + ".txt",
                    "● 自訂訊息：" + CustomMessage + "。\r\n● 系統訊息：" + ex.ToString() +
                    "\r\n● 發生時間：" + System.DateTime.Now.ToString("yyyy/MM/dd, HH:mm:ss") +
                    "\r\n● 伺服器IP：" + getServerIP() +
                    "\r\n● 使用者IP：" + getUserIP() + "\r\n\r\n");
            }
        } //end of writeErrorLog()

        /// <summary>
        /// 寫文字檔 Error Log
        /// </summary>
        /// <param name="CustomMessage">自訂的訊息內容</param>
        /// <param name="ex">Exception 例外(錯誤) 變數</param>
        /// <param name="Sql">執行的 SQL 句子</param>
        public static void writeErrorLog(string CustomMessage, Exception ex, string Sql) {
            if (Resources.Setup.IsWriteErrorLog.Trim().Equals("Y")) {
                //寫文字檔 Error Log。若文字檔不在會自動建立、寫入內容會附加在文字檔原有內容後。若要自行手動先建立文字檔，要設為 UTF-8
                File.AppendAllText(Resources.Setup.PathOfErrorLog + @"\" + System.DateTime.Now.ToString("yyyyMMdd") + ".txt",
                    "● 自訂訊息：" + CustomMessage + "。\r\n● 系統訊息：" + ex.ToString() +
                    "\r\n● 發生時間：" + System.DateTime.Now.ToString("yyyy/MM/dd, HH:mm:ss") +
                    "\r\n● 伺服器IP：" + getServerIP() +
                    "\r\n● 使用者IP：" + getUserIP() + "\r\n● SQL句子：" + Sql + "\r\n\r\n");
            }
        } //end of writeErrorLog()

        /// <summary>
        /// 寫文字檔 Error Log
        /// </summary>
        /// <param name="CustomMessage">自訂的訊息內容</param>
        /// <param name="ex">Exception 例外(錯誤) 變數</param>
        /// <param name="Sql">執行的 SQL 句子</param>
        /// <param name="SqlParam">執行的 SQL 句子的參數值</param>
        public static void writeErrorLog(string CustomMessage, Exception ex, string Sql, SqlParameter[] SqlParam) {
            if (Resources.Setup.IsWriteErrorLog.Trim().Equals("Y")) {
                string strSqlParam = "";
                foreach (SqlParameter sp in SqlParam) {
                    strSqlParam += "參數名稱：" + sp.ParameterName + "，參數值：" + sp.Value.ToString() + "。";
                }

                //寫文字檔 Error Log。若文字檔不在會自動建立、寫入內容會附加在文字檔原有內容後。若要自行手動先建立文字檔，要設為 UTF-8
                File.AppendAllText(Resources.Setup.PathOfErrorLog + @"\" + System.DateTime.Now.ToString("yyyyMMdd") + ".txt",
                    "● 自訂訊息：" + CustomMessage + "。\r\n● 系統訊息：" + ex.ToString() +
                    "\r\n● 發生時間：" + System.DateTime.Now.ToString("yyyy/MM/dd, HH:mm:ss") +
                    "\r\n● 伺服器IP：" + getServerIP() +
                    "\r\n● 使用者IP：" + getUserIP() + "\r\n● SQL句子：" + Sql + "。\r\n● SQL句子的參數值：" + strSqlParam + "\r\n\r\n");
            }
        } //end of writeErrorLog()

        /// <summary>
        /// 寫文字檔 Reset Log
        /// </summary>
        /// <param name="CustomMessage">自訂的訊息內容</param>
        //public static void writeResetLog(string CustomMessage) {
        //    if (Resources.Setup.IsWriteResetLog.Trim().Equals("Y")) {
        //        //寫文字檔 Reset Log。若文字檔不在會自動建立、寫入內容會附加在文字檔原有內容後。若要自行手動先建立文字檔，要設為 UTF-8
        //        File.AppendAllText(Resources.Setup.PathOfErrorLog + @"\" + System.DateTime.Now.ToString("yyyyMMdd") + ".txt",
        //            "● 自訂訊息：" + CustomMessage + "\r\n● 發生時間：" + System.DateTime.Now.ToString("yyyy/MM/dd, HH:mm:ss") +
        //            "\r\n● 伺服器IP：" + getServerIP() + "\r\n\r\n");
        //    }
        //} //end of writeResetLog()

        #endregion ****** 撰寫 Log (純文字 Log) ******

        #region ****** 取得 Server IP 或使用者 IP (函數x2) ******

        /// <summary>
        /// 取得 Server IP (IPv4)
        /// 從本機執行會得到本機的 IP，放在 Server 上會得到 Server 的 IP 。
        /// </summary>
        /// <returns></returns>
        public static string getServerIP() {
            //string IP4Address = string.Empty;
            string IP4Address = "";

            foreach (IPAddress IPA in Dns.GetHostAddresses(Dns.GetHostName())) {
                if (IPA.AddressFamily.ToString() == "InterNetwork") //InterNetwork 或 InterNetworkV6
                {
                    IP4Address = IPA.ToString().Trim();
                    break;
                }
            }

            //從本機執行會得到本機的 IP，放在 Server 上會得到 Server 的 IP
            return IP4Address;
        }

        /// <summary>
        /// 取得使用者 IP (IPv4)
        /// 從本機執行會得到「::1」字樣，放在 Server 上會得到 user 的 IP 。
        /// </summary>
        /// <returns></returns>
        public static string getUserIP() {
            string strUserIP = "";

            //做法1:
            strUserIP = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"].ToString().Trim(); //::1
            //Response.Write(Request.ServerVariables["HTTP_VIA"].ToString() + "<br />");    //error:並未將物件參考設定為物件的執行個體
            //Response.Write(Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString());   //error:並未將物件參考設定為物件的執行個體
            //Response.Write(Page.Request.UserHostAddress + "<br />");                      //::1
            //Response.Write(HttpContext.Current.Request.UserHostAddress + "<br />");       //::1

            //做法2:
            //System.Web.HttpContext current = System.Web.HttpContext.Current;
            //string RemoteIP = "";
            //string innerIP = current.Request.Form["innerIP"] != null ? current.Request.Form["innerIP"].ToString() : string.Empty;
            //if (!string.IsNullOrEmpty(innerIP))
            //    RemoteIP = innerIP;
            //else
            //{
            //    string HTTP_VIA = current.Request.ServerVariables["Remote_Addr"] != null ? current.Request.ServerVariables["Remote_Addr"].ToString() : string.Empty;
            //    string HTTP_X_FORWARDED_FOR = string.Empty;
            //    if (!string.IsNullOrEmpty(HTTP_VIA) && HTTP_VIA.Contains("ebc.net.tw"))
            //        HTTP_X_FORWARDED_FOR = current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null ? current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString() : string.Empty;

            //    if (!string.IsNullOrEmpty(HTTP_X_FORWARDED_FOR))
            //        RemoteIP = HTTP_X_FORWARDED_FOR;
            //    else
            //        RemoteIP = current.Request.ServerVariables["Remote_Addr"].ToString();
            //}

            //return RemoteIP;

            //從本機執行會得到「::1」字樣，放在 Server 上會得到 user 的 IP
            return strUserIP;

        } //end of getUserIP()

        #endregion ****** 取得 Server IP 或使用者 IP ******

        #region ****** 產生不重複的亂數  ******

        /// <summary> 
        /// 產生不重複的亂數 (「產生亂數的範圍上限」至「「產生亂數的範圍下限」」之間的個數，不可小於「產生亂數的數量」，否則會跑不出迴圈)
        /// </summary> 
        /// <param name="intLower"></param>產生亂數的範圍下限 
        /// <param name="intUpper"></param>產生亂數的範圍上限 
        /// <param name="intNum"></param>產生亂數的數量 
        /// <returns></returns> 
        public static System.Collections.Generic.List<int> makeRand(int intLower, int intUpper, int intNum) {
            System.Collections.Generic.List<int> arrayRand = new System.Collections.Generic.List<int>();

            Random random = new Random((int)DateTime.Now.Ticks);
            int intRnd;
            while (arrayRand.Count < intNum) {
                intRnd = random.Next(intLower, intUpper + 1);
                if (!arrayRand.Contains(intRnd)) {
                    arrayRand.Add(intRnd);
                }
            }

            return arrayRand;
        }

        //引用此函數的方式:
        //System.Collections.Generic.List<int> rnd = makeRand(1, 8, 5);
        //foreach(int i in rnd.ToArray())
        //{
        //    Response.Write(i + ", ");
        //}

        #endregion ****** 產生不重複的亂數  ******

        #region ****** 取得文章多久前發布的距離時間  ******

        /// <summary> 
        /// 判斷文章多久前發布的距離時間
        /// </summary> 
        /// <param name="startDate"></param>文章發佈時間 
        /// <returns></returns> 
        public static String getStringDateRegin(string startDate) {
            DateTime STime = DateTime.Parse(startDate); //起始日
            DateTime ETime = Convert.ToDateTime(DateTime.Now);//結束日
            TimeSpan Total = ETime.Subtract(STime); //日期相減
            int mDays = Total.Days;
            string Rdate = "剛剛";
            if (mDays < 1) {
                int TotalHours = (int)Total.TotalHours;
                if (TotalHours < 1) {
                    int Minutes = Total.Minutes;
                    if (Minutes > 10) {
                        Rdate = Minutes + "分前"; //共幾分
                    }
                } else {
                    Rdate = TotalHours + "小時前"; //總共多少小時 
                }

            } else {
                Rdate = mDays + "天前"; //共幾天 
            }

            return Rdate;
        }
        #endregion ****** 取得文章多久前發布的距離時間  ******

        #region ****** 依傳入的日期時間，取得與系統時間的差距(小時) ******

        /// <summary>
        /// 依傳入的日期時間，取得與系統時間的差距(小時)
        /// </summary>
        /// <param name="DateAndTime">傳入的日期時間</param>
        /// <returns></returns>
        public static int getTimeSpanByHour(string DateAndTime) {
            int intReturnHour = 0;
            TimeSpan ts;

            try {
                ts = DateTime.Now - Convert.ToDateTime(DateAndTime);
                intReturnHour = Convert.ToInt32(ts.TotalHours);
            } catch (Exception ex) {
                throw ex;
            }

            return intReturnHour;
        } //end of getTimeSpanByHour()

        #endregion ****** 依傳入的日期時間，取得與系統時間的差距(小時) ******

        #region ****** 轉址至路由定義的key名 ******

        /// <summary>
        /// 轉址至路由定義的key名
        /// </summary>
        /// <param name="routeKey"></param>
        public static void toRoute(string routeKey) {
            HttpContext.Current.Response.RedirectToRoute(routeKey);
        }

        #endregion

        #region ****** 將字串轉換為Base64字串 ******

        /// <summary>
        /// 將字串轉換為Base64字串
        /// </summary>
        /// <param name="originStr">來源字串</param>
        /// <param name="encoding">編碼方式</param>
        /// <returns></returns>
        public static string stringToBase64(string originStr, Encoding encoding) {
            string outPut = null;
            if (!string.IsNullOrEmpty(originStr)) {
                outPut = Convert.ToBase64String(encoding.GetBytes(originStr));
            }

            return outPut;
        }

        #endregion

        #region****** 利用正則表示式判斷字元是否為中文字，返回指定長度的字串 ******

        /// <summary>
        /// 利用正則表示式判斷字元是否為中文字，返回指定長度的字串
        /// </summary>
        /// <param name="text">要檢測的字串</param>
        /// <param name="limit">限制要截取的長度</param>
        /// <param name="outCount">回傳計算過後的字元數量</param>
        /// <returns>string</returns>
        public static string subUnicodeCharForLimit(string text, int limit, out int outCount) {
            StringBuilder sb = new StringBuilder();
            char[] cAry = text.ToCharArray();
            string pattern = "[^\x00-\x7F]+";
            Regex regex = new Regex(pattern, RegexOptions.IgnoreCase);
            int count = 0;
            foreach (char c in cAry) {
                if (count >= limit) { break; }
                if (regex.IsMatch(c.ToString())) {      //中文字
                    count += 2;
                } else {                                //非中文字
                    count++;
                }
                sb.Append(c.ToString());
            }

            outCount = count;
            return sb.ToString();
        }

        #endregion

        #region ****** 檢查現在時間是否介於指定時間區間 ******

        /// <summary>
        /// 檢查現在時間是否介於指定時間區間
        /// </summary>
        /// <param name="beginDT">要檢查的開始時間</param>
        /// <param name="endDT">要檢查的結束時間</param>
        /// <returns></returns>
        public static bool checkNowDateTimeInScope(DateTime beginDT, DateTime endDT) {
            DateTime now = DateTime.Now;
            return (beginDT <= now && now <= endDT);
        }

        #endregion

    } //end of class
} //end of namespace
