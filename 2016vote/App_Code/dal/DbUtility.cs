using System.Collections;
using System.Configuration;
using System.Web.Configuration;
using System;

/*
 *  說明: 存取資料庫或資料來源時，輔助的功能
 *  
 *  修改日期: 
 *  修改人員: 
 *  修改內容: 
 *  建立日期: 2015/06/22
 *  建立人員: 吳宇澤
    (若欲更新此檔案，請事先通知)
    (若在本機更動到此檔案內容，請勿存檔、請勿發佈至 Git)
 */

namespace com.ebc.dal
{
    /// <summary>
    /// 存取資料庫、資料來源時，輔助的功能
    /// </summary>
    public class DbUtility
    {
        public DbUtility() { }

        #region ****** 過濾掉可造成 SQL Injection 攻擊的所有符號、英文單字 (過濾特殊符號，也過濾英文單字) ******
        /// <summary>
        /// 過濾掉可造成 SQL Injection 攻擊的所有符號、英文單字 (過濾特殊符號，也過濾英文單字)
        /// </summary>
        /// <param name="checkWord"></param>
        /// <returns></returns>
        public static String checkSqlInjection(String checkWord)
        {
            //若為單引號，則以兩個單引號取代 (丟入資料庫當條件時，才會變成真的單引號來處理，避免造成錯誤)
            if (checkWord.IndexOf("'") != -1)
                checkWord = checkWord.Replace("'", "''");

            //有不合法的符號或英文單字，則以空字串取代
            if (checkWord.IndexOf("--") != -1)
                checkWord = checkWord.Replace("--", "");
            //if (checkWord.IndexOf("*") != -1)
            //    checkWord = checkWord.Replace("*", "");
            //if (checkWord.IndexOf("%") != -1)
            //    checkWord = checkWord.Replace("%", "");
            //if (checkWord.IndexOf("#") != -1)
            //    checkWord = checkWord.Replace("#", "");
            if (checkWord.IndexOf("/*") != -1)
                checkWord = checkWord.Replace("/*", "");
            if (checkWord.IndexOf("*/") != -1)
                checkWord = checkWord.Replace("*/", "");
            if (checkWord.IndexOf("=") != -1)
                checkWord = checkWord.Replace("=", "");
            if (checkWord.IndexOf(";") != -1)
                checkWord = checkWord.Replace(";", "");
            if (checkWord.IndexOf("<script") != -1)
                checkWord = checkWord.Replace("<script", "");
            if (checkWord.IndexOf("<>") != -1)
                checkWord = checkWord.Replace("<>", "");    //不等於
            if (checkWord.IndexOf("< >") != -1)
                checkWord = checkWord.Replace("< >", "");   //不等於
            if (checkWord.IndexOf("\"") != -1)
                checkWord = checkWord.Replace("\"", "");    //雙引號
            if (checkWord.ToLower().IndexOf("if ") != -1)
                checkWord = checkWord.ToLower().Replace("if ", "");     //if + 半形空格
            if (checkWord.ToLower().IndexOf("if(") != -1)
                checkWord = checkWord.ToLower().Replace("if(", "");
            if (checkWord.ToLower().IndexOf("else ") != -1)
                checkWord = checkWord.ToLower().Replace("else ", "");   //else + 半形空格
            if (checkWord.ToLower().IndexOf("else(") != -1)
                checkWord = checkWord.ToLower().Replace("else(", "");   //else + 半形空格
            if (checkWord.ToLower().IndexOf("and ") != -1)
                checkWord = checkWord.ToLower().Replace("and ", "");    //and + 半形空格
            if (checkWord.ToLower().IndexOf("and(") != -1)
                checkWord = checkWord.ToLower().Replace("and(", "");
            if (checkWord.ToLower().IndexOf("or ") != -1)
                checkWord = checkWord.ToLower().Replace("or ", "");     //or + 半形空格
            if (checkWord.ToLower().IndexOf("or(") != -1)
                checkWord = checkWord.ToLower().Replace("or(", "");
            if (checkWord.ToLower().IndexOf("not ") != -1)
                checkWord = checkWord.ToLower().Replace("not ", "");    //not + 半形空格
            if (checkWord.ToLower().IndexOf("drop ") != -1)
                checkWord = checkWord.ToLower().Replace("drop ", "");   //drop + 半形空格
            if (checkWord.ToLower().IndexOf("delete") != -1)
                checkWord = checkWord.ToLower().Replace("delete", "");
            if (checkWord.ToLower().IndexOf("update") != -1)
                checkWord = checkWord.ToLower().Replace("update", "");
            if (checkWord.ToLower().IndexOf("insert") != -1)
                checkWord = checkWord.ToLower().Replace("insert", "");
            if (checkWord.ToLower().IndexOf("declare") != -1)
                checkWord = checkWord.ToLower().Replace("declare", "");
            if (checkWord.ToLower().IndexOf("set ") != -1)
                checkWord = checkWord.ToLower().Replace("set ", "");    //set + 半形空格
            if (checkWord.ToLower().IndexOf("truncate") != -1)
                checkWord = checkWord.ToLower().Replace("truncate", "");
            if (checkWord.ToLower().IndexOf("exec ") != -1)
                checkWord = checkWord.ToLower().Replace("exec ", "");   //exec + 半形空格
            if (checkWord.ToLower().IndexOf("union ") != -1)
                checkWord = checkWord.ToLower().Replace("union ", "");  //union + 半形空格
            if (checkWord.ToLower().IndexOf("count(") != -1)
                checkWord = checkWord.ToLower().Replace("count(", "");
            if (checkWord.ToLower().IndexOf("master") != -1)
                checkWord = checkWord.ToLower().Replace("master", "");
            if (checkWord.ToLower().IndexOf("chr(") != -1)
                checkWord = checkWord.ToLower().Replace("chr(", "");
            if (checkWord.ToLower().IndexOf("mid(") != -1)
                checkWord = checkWord.ToLower().Replace("mid(", "");
            if (checkWord.ToLower().IndexOf("alter") != -1)
                checkWord = checkWord.ToLower().Replace("alter", "");
            if (checkWord.ToLower().IndexOf("select") != -1)
                checkWord = checkWord.ToLower().Replace("select", "");
            if (checkWord.ToLower().IndexOf("schema") != -1)
                checkWord = checkWord.ToLower().Replace("schema", "");
            if (checkWord.ToLower().IndexOf("sysobject") != -1)
                checkWord = checkWord.ToLower().Replace("sysobject", "");
            if (checkWord.ToLower().IndexOf("syscolumn") != -1)
                checkWord = checkWord.ToLower().Replace("syscolumn", "");

            return checkWord;
        } //end of checkSqlInjection()
        #endregion

        #region ****** 過濾掉可造成 SQL Injection 攻擊的符號 (只過濾特殊符號，較不過濾英文單字。適合當作 WHERE 條件的 id 欄位檢查用，或 email、address 寫入前剛好內容有英文關鍵字) ******
        /// <summary>
        /// 過濾掉可造成 SQL Injection 攻擊的符號 (只過濾特殊符號，較不過濾英文單字。適合當作 WHERE 條件的 id 欄位檢查用，或 email、address 寫入前剛好內容有英文關鍵字)
        /// </summary>
        /// <param name="checkWord"></param>
        /// <returns></returns>
        public static String checkSqlInjectionOnlyWithSymbol(String checkWord)
        {
            //若為單引號，則以兩個單引號取代(丟入資料庫當條件時，才會變成真的單引號來處理，避免造成錯誤)
            if (checkWord.IndexOf("'") != -1)
                checkWord = checkWord.Replace("'", "''");

            //有不合法的符號或英文單字，則以空字串取代
            if (checkWord.IndexOf("--") != -1)
                checkWord = checkWord.Replace("--", "");
            //if (checkWord.IndexOf("*") != -1)
            //    checkWord = checkWord.Replace("*", "");
            //if (checkWord.IndexOf("%") != -1)
            //    checkWord = checkWord.Replace("%", "");
            //if (checkWord.IndexOf("#") != -1)
            //    checkWord = checkWord.Replace("#", "");
            if (checkWord.IndexOf("/*") != -1)
                checkWord = checkWord.Replace("/*", "");
            if (checkWord.IndexOf("*/") != -1)
                checkWord = checkWord.Replace("*/", "");
            if (checkWord.IndexOf("=") != -1)
                checkWord = checkWord.Replace("=", "");
            if (checkWord.IndexOf(";") != -1)
                checkWord = checkWord.Replace(";", "");
            if (checkWord.IndexOf("<script") != -1)
                checkWord = checkWord.Replace("<script", "");
            if (checkWord.IndexOf("<>") != -1)
                checkWord = checkWord.Replace("<>", "");    //不等於
            if (checkWord.IndexOf("< >") != -1)
                checkWord = checkWord.Replace("< >", "");   //不等於
            if (checkWord.IndexOf("\"") != -1)
                checkWord = checkWord.Replace("\"", "");    //雙引號
            if (checkWord.ToLower().IndexOf("or ") != -1)
                checkWord = checkWord.ToLower().Replace("or ", "");     //or + 半形空格
            if (checkWord.ToLower().IndexOf("or(") != -1)
                checkWord = checkWord.ToLower().Replace("or(", "");
            if (checkWord.ToLower().IndexOf("not ") != -1)
                checkWord = checkWord.ToLower().Replace("not ", "");    //not + 半形空格
            if (checkWord.ToLower().IndexOf("drop ") != -1)
                checkWord = checkWord.ToLower().Replace("drop ", "");   //drop + 半形空格
            if (checkWord.ToLower().IndexOf("delete ") != -1)
                checkWord = checkWord.ToLower().Replace("delete ", ""); //delete + 半形空格
            if (checkWord.ToLower().IndexOf("update ") != -1)
                checkWord = checkWord.ToLower().Replace("update ", ""); //update + 半形空格
            if (checkWord.ToLower().IndexOf("insert ") != -1)
                checkWord = checkWord.ToLower().Replace("insert ", ""); //insert + 半形空格
            if (checkWord.ToLower().IndexOf("declare ") != -1)
                checkWord = checkWord.ToLower().Replace("declare ", ""); //declare + 半形空格
            if (checkWord.ToLower().IndexOf("set ") != -1)
                checkWord = checkWord.ToLower().Replace("set ", "");    //set + 半形空格
            if (checkWord.ToLower().IndexOf("truncate ") != -1)
                checkWord = checkWord.ToLower().Replace("truncate ", ""); //truncate + 半形空格
            if (checkWord.ToLower().IndexOf("alter ") != -1)
                checkWord = checkWord.ToLower().Replace("alter ", "");  //alter + 半形空格
            if (checkWord.ToLower().IndexOf("exec ") != -1)
                checkWord = checkWord.ToLower().Replace("exec ", "");   //exec + 半形空格
            if (checkWord.ToLower().IndexOf("union ") != -1)
                checkWord = checkWord.ToLower().Replace("union ", "");  //union + 半形空格
            if (checkWord.ToLower().IndexOf("select ") != -1)
                checkWord = checkWord.ToLower().Replace("select ", ""); //select + 半形空格
            if (checkWord.ToLower().IndexOf("schema.") != -1)
                checkWord = checkWord.ToLower().Replace("schema.", "");
            if (checkWord.ToLower().IndexOf("sysobject ") != -1)
                checkWord = checkWord.ToLower().Replace("sysobject ", ""); //sysobject + 半形空格
            if (checkWord.ToLower().IndexOf("syscolumn ") != -1)
                checkWord = checkWord.ToLower().Replace("syscolumn ", ""); //syscolumn + 半形空格

            return checkWord;
        } //end of checkSqlInjectionOnlyWithSymbol()
        #endregion

        #region ****** 過濾掉可造成 SQL Injection 攻擊的符號 (只過濾少數的特殊符號，也較不過濾英文單字。適合 WHERE 條件中，不確定內容為何的字串檢查用) ******
        /// <summary>
        /// 過濾掉可造成 SQL Injection 攻擊的符號 (只過濾少數的特殊符號，也較不過濾英文單字。適合 WHERE 條件中，不確定內容為何的字串檢查用)
        /// </summary>
        /// <param name="checkWord"></param>
        /// <returns></returns>
        public static String checkSqlInjectionLowestSecurity(String checkWord)
        {
            //若為單引號，則以兩個單引號取代(丟入資料庫當條件時，才會變成真的單引號來處理，避免造成錯誤)
            if (checkWord.IndexOf("'") != -1)
                checkWord = checkWord.Replace("'", "''");

            //有不合法的符號或英文單字，則以空字串取代
            if (checkWord.IndexOf("--") != -1)
                checkWord = checkWord.Replace("--", "");
            //if (checkWord.IndexOf("* ") != -1)
            //    checkWord = checkWord.Replace("* ", "");
            //if (checkWord.IndexOf("%") != -1)
            //    checkWord = checkWord.Replace("%", "");
            //if (checkWord.IndexOf("#") != -1)
            //    checkWord = checkWord.Replace("#", "");
            if (checkWord.IndexOf("/*") != -1)
                checkWord = checkWord.Replace("/*", "");
            if (checkWord.IndexOf("*/") != -1)
                checkWord = checkWord.Replace("*/", "");
            //if (checkWord.IndexOf("=") != -1)
            //    checkWord = checkWord.Replace("=", "");
            if (checkWord.IndexOf(";") != -1)
                checkWord = checkWord.Replace(";", "");
            if (checkWord.IndexOf("<script") != -1)
                checkWord = checkWord.Replace("<script", "");
            //if (checkWord.IndexOf("<>") != -1)
            //    checkWord = checkWord.Replace("<>", "");    //不等於
            //if (checkWord.IndexOf("< >") != -1)
            //    checkWord = checkWord.Replace("< >", "");   //不等於
            if (checkWord.ToLower().IndexOf("delete ") != -1)
                checkWord = checkWord.ToLower().Replace("delete ", "");     //delete + 半形空格
            if (checkWord.ToLower().IndexOf("update ") != -1)
                checkWord = checkWord.ToLower().Replace("update ", "");     //update + 半形空格
            if (checkWord.ToLower().IndexOf("insert ") != -1)
                checkWord = checkWord.ToLower().Replace("insert ", "");     //insert + 半形空格
            if (checkWord.ToLower().IndexOf("drop ") != -1)
                checkWord = checkWord.ToLower().Replace("drop ", "");       //drop + 半形空格
            if (checkWord.ToLower().IndexOf("truncate ") != -1)
                checkWord = checkWord.ToLower().Replace("truncate ", "");   //truncate + 半形空格
            if (checkWord.ToLower().IndexOf("alter ") != -1)
                checkWord = checkWord.ToLower().Replace("alter ", "");      //alter + 半形空格
            if (checkWord.ToLower().IndexOf("declare ") != -1)
                checkWord = checkWord.ToLower().Replace("declare ", "");    //declare + 半形空格
            if (checkWord.ToLower().IndexOf("set ") != -1)
                checkWord = checkWord.ToLower().Replace("set ", "");        //set + 半形空格
            if (checkWord.ToLower().IndexOf("exec ") != -1)
                checkWord = checkWord.ToLower().Replace("exec ", "");       //exec + 半形空格
            //if (checkWord.ToLower().IndexOf("union ") != -1)
            //    checkWord = checkWord.ToLower().Replace("union ", "");  //union + 半形空格
            if (checkWord.ToLower().IndexOf("schema") != -1)
                checkWord = checkWord.ToLower().Replace("schema", "");
            if (checkWord.ToLower().IndexOf("master") != -1)
                checkWord = checkWord.ToLower().Replace("master", "");
            if (checkWord.ToLower().IndexOf("sysobject ") != -1)
                checkWord = checkWord.ToLower().Replace("sysobject ", ""); //sysobject + 半形空格
            if (checkWord.ToLower().IndexOf("syscolumn ") != -1)
                checkWord = checkWord.ToLower().Replace("syscolumn ", ""); //syscolumn + 半形空格

            return checkWord;
        } //end of checkSqlInjectionLowestSecurity()
        #endregion

        #region ****** 過濾掉可造成 SQL Injection 攻擊的符號 (只過濾少數的特殊符號，較不過濾英文單字。適合 WHERE 條件中的 VIDEOID、VIDEO_ID 欄位，因其會有 -- SQL 的註解符號) ******
        /// <summary>
        /// 過濾掉可造成 SQL Injection 攻擊的符號 (只過濾少數的特殊符號，較不過濾英文單字。適合 WHERE 條件中的 VIDEOID、VIDEO_ID 欄位，因其會有 -- SQL 的註解符號)
        /// </summary>
        /// <param name="checkWord"></param>
        /// <returns></returns>
        public static String checkSqlInjectionLowestSecurityForVIDEOID(String checkWord)
        {
            //若為單引號，則以兩個單引號取代(丟入資料庫當條件時，才會變成真的單引號來處理，避免造成錯誤)
            if (checkWord.IndexOf("'") != -1)
                checkWord = checkWord.Replace("'", "''");

            //有不合法的符號或英文單字，則以空字串取代
            if (checkWord.IndexOf(")--") != -1)
                checkWord = checkWord.Replace(")--", "");
            if (checkWord.IndexOf(" --") != -1)
                checkWord = checkWord.Replace(" --", "");
            if (checkWord.IndexOf("-- ") != -1)
                checkWord = checkWord.Replace("-- ", "");
            //if (checkWord.IndexOf("*") != -1)
            //    checkWord = checkWord.Replace("*", "");
            //if (checkWord.IndexOf("%") != -1)
            //    checkWord = checkWord.Replace("%", "");
            //if (checkWord.IndexOf("#") != -1)
            //    checkWord = checkWord.Replace("#", "");
            if (checkWord.IndexOf("/*") != -1)
                checkWord = checkWord.Replace("/*", "");
            if (checkWord.IndexOf("*/") != -1)
                checkWord = checkWord.Replace("*/", "");
            //if (checkWord.IndexOf("=") != -1)
            //    checkWord = checkWord.Replace("=", "");
            if (checkWord.IndexOf(";") != -1)
                checkWord = checkWord.Replace(";", "");
            if (checkWord.IndexOf("<script") != -1)
                checkWord = checkWord.Replace("<script", "");
            //if (checkWord.IndexOf("<>") != -1)
            //    checkWord = checkWord.Replace("<>", "");    //不等於
            //if (checkWord.IndexOf("< >") != -1)
            //    checkWord = checkWord.Replace("< >", "");   //不等於
            if (checkWord.ToLower().IndexOf("or ") != -1)
                checkWord = checkWord.ToLower().Replace("or ", "");     //or + 半形空格
            if (checkWord.ToLower().IndexOf("or(") != -1)
                checkWord = checkWord.ToLower().Replace("or(", "");
            if (checkWord.ToLower().IndexOf("not ") != -1)
                checkWord = checkWord.ToLower().Replace("not ", "");    //not + 半形空格
            if (checkWord.ToLower().IndexOf("drop ") != -1)
                checkWord = checkWord.ToLower().Replace("drop ", "");   //drop + 半形空格
            if (checkWord.ToLower().IndexOf("delete ") != -1)
                checkWord = checkWord.ToLower().Replace("delete ", ""); //delete + 半形空格
            if (checkWord.ToLower().IndexOf("update ") != -1)
                checkWord = checkWord.ToLower().Replace("update ", ""); //update + 半形空格
            if (checkWord.ToLower().IndexOf("insert ") != -1)
                checkWord = checkWord.ToLower().Replace("insert ", ""); //insert + 半形空格
            if (checkWord.ToLower().IndexOf("declare ") != -1)
                checkWord = checkWord.ToLower().Replace("declare ", ""); //declare + 半形空格
            if (checkWord.ToLower().IndexOf("set ") != -1)
                checkWord = checkWord.ToLower().Replace("set ", "");    //set + 半形空格
            if (checkWord.ToLower().IndexOf("truncate ") != -1)
                checkWord = checkWord.ToLower().Replace("truncate ", ""); //truncate + 半形空格
            if (checkWord.ToLower().IndexOf("alter ") != -1)
                checkWord = checkWord.ToLower().Replace("alter ", ""); //alter + 半形空格
            if (checkWord.ToLower().IndexOf("exec ") != -1)
                checkWord = checkWord.ToLower().Replace("exec ", "");   //exec + 半形空格
            if (checkWord.ToLower().IndexOf("union ") != -1)
                checkWord = checkWord.ToLower().Replace("union ", "");   //union + 半形空格
            if (checkWord.ToLower().IndexOf("select ") != -1)
                checkWord = checkWord.ToLower().Replace("select ", "");  //select + 半形空格
            if (checkWord.ToLower().IndexOf("schema.") != -1)
                checkWord = checkWord.ToLower().Replace("schema.", "");
            if (checkWord.ToLower().IndexOf("sysobject ") != -1)
                checkWord = checkWord.ToLower().Replace("sysobject ", ""); //sysobject + 半形空格
            if (checkWord.ToLower().IndexOf("syscolumn ") != -1)
                checkWord = checkWord.ToLower().Replace("syscolumn ", ""); //syscolumn + 半形空格

            return checkWord;
        } //end of checkSqlInjectionLowestSecurityForVIDEOID()
        #endregion

        #region ****** 過濾掉可造成 SQL Injection 攻擊的符號 (只過濾少數的特殊符號，較不過濾英文單字。適合 Password 欄位的檢查，或用來組網址的內容，因其會有各種特殊符號) ******
        /// <summary>
        /// 過濾掉可造成 SQL Injection 攻擊的符號 (只過濾少數的特殊符號，較不過濾英文單字。適合 Password 欄位的檢查，或用來組網址的內容，因其會有各種特殊符號)
        /// </summary>
        /// <param name="checkWord"></param>
        /// <returns></returns>
        public static String checkSqlInjectionLowestSecurityForPassword(String checkWord)
        {
            //若為單引號，則以兩個單引號取代(丟入資料庫當條件時，才會變成真的單引號來處理，避免造成錯誤)
            if (checkWord.IndexOf("'") != -1)
                checkWord = checkWord.Replace("'", "''");

            //有不合法的符號或英文單字，則以空字串取代
            if (checkWord.IndexOf(")--") != -1)
                checkWord = checkWord.Replace(")--", "");
            if (checkWord.IndexOf(" --") != -1)
                checkWord = checkWord.Replace(" --", "");
            if (checkWord.IndexOf("-- ") != -1)
                checkWord = checkWord.Replace("-- ", "");
            //if (checkWord.IndexOf("*") != -1)
            //    checkWord = checkWord.Replace("*", "");
            //if (checkWord.IndexOf("%") != -1)
            //    checkWord = checkWord.Replace("%", "");
            //if (checkWord.IndexOf("#") != -1)
            //    checkWord = checkWord.Replace("#", "");
            //if (checkWord.IndexOf("/*") != -1)
            //    checkWord = checkWord.Replace("/*", "");
            //if (checkWord.IndexOf("*/") != -1)
            //    checkWord = checkWord.Replace("*/", "");
            //if (checkWord.IndexOf("=") != -1)
            //    checkWord = checkWord.Replace("=", "");
            //if (checkWord.IndexOf(";") != -1)
            //    checkWord = checkWord.Replace(";", "");
            if (checkWord.IndexOf("<script") != -1)
                checkWord = checkWord.Replace("<script", "");
            //if (checkWord.IndexOf("<>") != -1)
            //    checkWord = checkWord.Replace("<>", "");    //不等於
            //if (checkWord.IndexOf("< >") != -1)
            //    checkWord = checkWord.Replace("< >", "");   //不等於
            if (checkWord.ToLower().IndexOf("or ") != -1)
                checkWord = checkWord.ToLower().Replace("or ", "");     //or + 半形空格
            if (checkWord.ToLower().IndexOf("or(") != -1)
                checkWord = checkWord.ToLower().Replace("or(", "");
            if (checkWord.ToLower().IndexOf("not ") != -1)
                checkWord = checkWord.ToLower().Replace("not ", "");    //not + 半形空格
            if (checkWord.ToLower().IndexOf("drop ") != -1)
                checkWord = checkWord.ToLower().Replace("drop ", "");   //drop + 半形空格
            if (checkWord.ToLower().IndexOf("delete ") != -1)
                checkWord = checkWord.ToLower().Replace("delete ", ""); //delete + 半形空格
            if (checkWord.ToLower().IndexOf("update ") != -1)
                checkWord = checkWord.ToLower().Replace("update ", ""); //update + 半形空格
            if (checkWord.ToLower().IndexOf("insert ") != -1)
                checkWord = checkWord.ToLower().Replace("insert ", ""); //insert + 半形空格
            if (checkWord.ToLower().IndexOf("declare ") != -1)
                checkWord = checkWord.ToLower().Replace("declare ", ""); //declare + 半形空格
            if (checkWord.ToLower().IndexOf("set ") != -1)
                checkWord = checkWord.ToLower().Replace("set ", "");    //set + 半形空格
            if (checkWord.ToLower().IndexOf("truncate ") != -1)
                checkWord = checkWord.ToLower().Replace("truncate ", ""); //truncate + 半形空格
            if (checkWord.ToLower().IndexOf("alter ") != -1)
                checkWord = checkWord.ToLower().Replace("alter ", ""); //alter + 半形空格
            if (checkWord.ToLower().IndexOf("exec ") != -1)
                checkWord = checkWord.ToLower().Replace("exec ", "");   //exec + 半形空格
            if (checkWord.ToLower().IndexOf("union ") != -1)
                checkWord = checkWord.ToLower().Replace("union ", "");   //union + 半形空格
            if (checkWord.ToLower().IndexOf("select ") != -1)
                checkWord = checkWord.ToLower().Replace("select ", "");  //select + 半形空格
            if (checkWord.ToLower().IndexOf("schema.") != -1)
                checkWord = checkWord.ToLower().Replace("schema.", "");
            if (checkWord.ToLower().IndexOf("sysobject ") != -1)
                checkWord = checkWord.ToLower().Replace("sysobject ", ""); //sysobject + 半形空格
            if (checkWord.ToLower().IndexOf("syscolumn ") != -1)
                checkWord = checkWord.ToLower().Replace("syscolumn ", ""); //syscolumn + 半形空格

            return checkWord;
        } //end of checkSqlInjectionLowestSecurityForPassword()
        #endregion

        #region ****** 取得 Web.config 第一組連線字串的名稱 ******
        /// <summary>
        /// 取得 Web.config 第一組連線字串的名稱
        /// </summary>
        /// <returns></returns>
        public static String getFirstConnStrNameInWebConfig()
        {
            // Get the connectionStrings key,value pairs collection.
            ConnectionStringSettingsCollection connectionStrings = WebConfigurationManager.ConnectionStrings as ConnectionStringSettingsCollection;

            // Get the collection enumerator.
            IEnumerator connectionStringsEnum = connectionStrings.GetEnumerator();

            // Loop through the collection and display the connectionStrings key, value pairs.
            //int i = 0;
            String strFirstConnStringName = "";
            ////Response.Write("[Display connectionStrings]");
            while (connectionStringsEnum.MoveNext())
            {
                //    i += 1;
                //    if (i == 1)
                //    {
                //        // 傳回第一組連線字串的 name
                //        strFirstConnStringName = connectionStrings[i].Name;
                //strTest = connectionStrings[0].Name;              //LocalSqlServer
                strFirstConnStringName = connectionStrings[1].Name; //ConnStr_BIGUSER
                break;  //stop while loop
                //    }
            }

            //return connectionStrings[0].Name;
            return strFirstConnStringName;

        } //end of getFirstConnStrNameInWebConfig()
        #endregion ****** 取得 Web.config 第一組連線字串的名稱 ******
    } //end of class
} //end of namespace
