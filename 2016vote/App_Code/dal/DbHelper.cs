using System;
//以下為額外引用的 Namespace
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

/*
 *  說明: 存取資料庫的共用元件
 *  
 *  最後更新日期: 2015/10/16
 *  最後更新人員: 吳宇澤
 *  最後更新內容: getPagerDataTable() 加大 GroupBy 欄位的長度至 200
 *  更新日期: 2015/08/05
 *  更新人員: 吳宇澤
 *  更新內容: 新增「撈資料的分頁」函數 getPagerDataTable()、getPagerDataTableRowCount()
 *  建立日期: 2015/06/22
 *  建立人員: 吳宇澤
    (若欲更新此檔案，請事先通知)
    (若在本機更動到此檔案內容，請勿存檔、請勿發佈至 Git)
 */

namespace com.ebc.dal
{
    /// <summary>
    /// 存取資料庫的共用元件
    /// </summary>
    public class DbHelper
    {
        public DbHelper() { }

        //取得 Web.config 特定的連線字串名稱
        private static readonly String strConnStr_EbcNet = System.Configuration.ConfigurationManager.ConnectionStrings["ConnStr_ELECTION2016"].ToString();
        //取得 Web.config 第一組連線字串名稱
        //private static readonly String strConnStr_EbcNet = System.Configuration.ConfigurationManager.ConnectionStrings[com.ebc.dal.DbUtility.getFirstConnStrNameInWebConfig()].ToString();

        //public enum returnTypeOfDbHelper { Int64, Int32, Int16 }; //函數返回型別的代號

        #region ****** 搭配 Stored Procedure 做「撈資料的分頁」******

        //從 Stored Procedure 回傳的一個整數，代表符合 WHERE 條件的資料總筆數。用來在 GridView 下方的「頁碼列」顯示頁碼之用 (如：1 2 3 4 ... 55)
        public int _totalRecords = 0;
        
        /// <summary>
        /// 搭配 Stored Procedure 做「撈資料的分頁」
        /// </summary>
        /// <param name="strTableName">資料表名稱</param>
        /// <param name="strColumnName">欄位名稱</param>
        /// <param name="strSqlWhere">WHERE 條件</param>
        /// <param name="strGroupBy">去除重複記錄 (可為 Null)</param>
        /// <param name="strDefaultOrderColumn">預設排序欄位</param>
        /// <param name="startRowIndex">ObjectDataSource 提供的「起始記錄索引」(從 0 開始)</param>
        /// <param name="maxinumRows">GridView 的 PageSize 屬性，提供的「每頁要顯示的筆數」</param>
        /// <param name="sortExpression">GridView 提供的「排序欄位名稱，和 ASC 或 DESC」(若提供此參數，則 strDefaultOrderColumn 無效)</param>
        /// <returns>要呈現在前端畫面上的資料內容 DataTable</returns>
        [System.ComponentModel.DataObjectMethodAttribute(System.ComponentModel.DataObjectMethodType.Select, true)]  //true 表示為 ObjectDataSource 要 SELECT 時的預設值
        public DataTable getPagerDataTable(String strTableName, String strColumnName, String strSqlWhere, String strGroupBy, String strDefaultOrderColumn, 
            int startRowIndex, int maxinumRows, String sortExpression)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            SqlDataAdapter adt = null;
            DataTable dt = null;
            String strOrderBy = null;       //排序欄位 + 排序方式 (昇幕或降幕)

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    dt = new DataTable();

                    //排序欄位、排序方式 (昇幕或降幕)
                    if (String.IsNullOrEmpty(sortExpression))
                    {
                        //排序欄位。第一次進入頁面時，sortExpression 為空值，以開發人員在 DAL 層指定的欄位 (本例中為 OrderID) 由大到小排序
                        //strOrderBy = " ORDER BY DATA_ID DESC";
                        strOrderBy = strDefaultOrderColumn + " DESC";    //預設的 GridView 排序方式，由大到小排序
                    }
                    else if ((!String.IsNullOrEmpty(sortExpression)) && (sortExpression.IndexOf(" ASC") == -1))
                    {
                        //排序欄位。若使用者按下了 GridView 某個欄位的 title，此時 sortExpression 有值，且要由小到大排序
                        //strOrderBy = " ORDER BY " + sortExpression + " ASC";
                        if (sortExpression.IndexOf("ASC") != -1)
                            sortExpression = sortExpression.Remove(sortExpression.Length - 4, 4);   // 刪除 CodeBehind 手動在最後面加的「 ASC」字樣(4個字元)

                        strOrderBy = sortExpression + " ASC";
                    }
                    else if ((!String.IsNullOrEmpty(sortExpression)) && (sortExpression.IndexOf(" DESC") != -1))
                    {
                        //刪除 ObjectDataSource 自動在最後面加的「 DESC」字樣(5個字元)
                        sortExpression = sortExpression.Remove(sortExpression.Length - 5, 5);

                        //排序欄位。若使用者按下了 GridView 某個欄位的 title，此時 sortExpression 有值，且要由大到小排序
                        //strOrderBy = " ORDER BY " + sortExpression + " DESC";
                        strOrderBy = sortExpression + " DESC";
                    }

                    //SELECT 的 WHERE 條件 (包含使用者輸入的模糊查詢關鍵字)
                    if (String.IsNullOrEmpty(strSqlWhere))
                    {
                        strSqlWhere = " 1=1 ";  //若沒加這句，則當 WHERE 條件為空值時(使用者未輸入搜尋關鍵字)，丟到 Stored Procedure 裡後會 Error
                    }

                    cmd = new SqlCommand("dbo.GridViewPager", conn);    //要呼叫的 Stored Procedure 名稱
                    cmd.CommandTimeout = 120;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@StartRowIndex", SqlDbType.Int).Value = startRowIndex;       //目前頁面，要撈的資料的起始索引 (從 0 開始)
                    cmd.Parameters.Add("@PageSize", SqlDbType.Int).Value = maxinumRows;              //GridView 每頁要顯示的筆數
                    cmd.Parameters.Add("@tableName", SqlDbType.NVarChar, 3000).Value = strTableName;
                    cmd.Parameters.Add("@columnName", SqlDbType.NVarChar, 2000).Value = strColumnName;
                    cmd.Parameters.Add("@sqlWhere", SqlDbType.NVarChar, 1000).Value = strSqlWhere;

                    //若需要去除重複記錄，則傳入此 @groupBy 參數，以 Group By 取代 Distinct
                    if (String.IsNullOrEmpty(strGroupBy))
                        cmd.Parameters.Add("@groupBy", SqlDbType.NVarChar, 300).Value = DBNull.Value;
                    else
                        cmd.Parameters.Add("@groupBy", SqlDbType.NVarChar, 300).Value = strGroupBy;

                    cmd.Parameters.Add("@orderBy", SqlDbType.NVarChar, 1000).Value = strOrderBy;

                    //從 Stored Procedure 回傳的一個整數，代表符合 WHERE 條件的資料總筆數。用來在 GridView 下方的「頁碼列」顯示頁碼之用 (如：1 2 3 4 ... 55)
                    cmd.Parameters.Add("@rowCount", SqlDbType.Int).Direction = ParameterDirection.Output;

                    adt = new SqlDataAdapter(cmd);
                    adt.Fill(dt);

                    //從 Stored Procedure 回傳的一個整數，代表符合 WHERE 條件的資料總筆數。用來在 GridView 下方的「頁碼列」顯示頁碼之用 (如：1 2 3 4 ... 55)
                    _totalRecords = Convert.ToInt32(cmd.Parameters["@rowCount"].Value);

                    //可在這裡存至 Session，以便在 .aspx.cs 中取用後，用來在 GridView 下方的「頁碼列」中顯示頁碼之用
                    //HttpContext.Current.Session["s_RecordTotalCount"] = _totalRecords;
                    //Console.Write("tc: " + _totalRecords);

                    //從資料庫撈回來，暫存在 Web Server 記憶體中 DataTable 的資料總筆數。其值等同 _totalRecords 變數
                    //int jj = dt.Rows.Count;
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getPagerDataTable() 在呼叫「分頁」預存程序時，發生 SqlException 錯誤", ex, "strTableName：" + strTableName +
                    "。 strColumnName：" + strColumnName + "。 strSqlWhere：" + strSqlWhere + "。 strOrderBy：" + strOrderBy +
                    "。 startRowIndex：" + startRowIndex.ToString() + "。 maxinumRows：" + maxinumRows.ToString());

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                //throw new Exception("發生資料庫存取錯誤: " + ex.Message);
                throw ex;
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getPagerDataTable() 在呼叫「分頁」預存程序時，發生 Exception 錯誤", ex, "strTableName：" + strTableName +
                "。 strColumnName：" + strColumnName + "。 strSqlWhere：" + strSqlWhere + "。 strOrderBy：" + strOrderBy +
                "。 startRowIndex：" + startRowIndex.ToString() + "。 maxinumRows：" + maxinumRows.ToString());

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                //throw new Exception("發生資料庫存取以外的錯誤: " + ex.Message);
                throw ex;
            }
            finally
            {
                if (cmd != null)
                    cmd.Dispose();
                if (adt != null)
                    adt.Dispose();
                if (dt != null)
                    dt.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return dt;

        } //end of getPagerDataTable()
        
        /// <summary>
        /// 從 Stored Procedure 回傳的一個整數，代表符合 WHERE 條件的資料總筆數。用來在 GridView 下方的「頁碼列」顯示頁碼之用 (如：1 2 3 4 ... 55)
        /// </summary>
        /// <returns></returns>
        public int getPagerDataTableRowCount()
        {
            return _totalRecords;
        }

        #endregion ****** 搭配 Stored Procedure 做「撈資料的分頁」******

        #region ****** 取得一個 DataTable (函數x2) ******

        /// <summary>
        /// 取得一個 DataTable (有 SqlParameter)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <param name="param">SELECT 句子 WHERE 條件的值 (一或多個)</param>
        /// <returns>DataTable</returns>
        public static DataTable getDataTable(String sql, SqlParameter[] param)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            SqlDataAdapter adt = null;
            DataTable dt = null;

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);
                    //cmd.CommandText = sql;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddRange(param);

                    //待補-寫入Sql Log
                    //
                    //foreach(SqlParameter sp in param)
                    //{
                    //    sp.Value;
                    //}

                    dt = new DataTable();
                    adt = new SqlDataAdapter(cmd);
                    adt.Fill(dt);
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getDataTable() 發生 SqlException 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getDataTable() 發生 Exception 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (cmd != null)
                    cmd.Dispose();
                if (adt != null)
                    adt.Dispose();
                if (dt != null)
                    dt.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return dt;
        } //end of getDataTable()

        /// <summary>
        /// 取得一個 DataTable (沒有 SqlParameter)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <returns>DataTable</returns>
        public static DataTable getDataTable(String sql)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            SqlDataAdapter adt = null;
            DataTable dt = null;

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);
                    cmd.Parameters.Clear();
                    //cmd.Parameters.AddRange(param);

                    //待補-寫入Sql Log
                    //
                    //foreach(SqlParameter sp in param)
                    //{
                    //    sp.Value;
                    //}

                    dt = new DataTable();
                    adt = new SqlDataAdapter(cmd);
                    adt.Fill(dt);
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getDataTable() 發生 SqlException 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getDataTable() 發生 Exception 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (cmd != null)
                    cmd.Dispose();
                if (adt != null)
                    adt.Dispose();
                if (dt != null)
                    dt.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return dt;
        } //end of getDataTable()

        #endregion ****** 取得一個 DataTable ******

        #region ****** 取得單一值 (函數x2) ******

        /// <summary>
        /// 取得單一值 (有 SqlParameter)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <param name="param">SELECT 句子 WHERE 條件的值 (一或多個)</param>
        /// <returns>object</returns>
        public static object getOneValue(String sql, SqlParameter[] param)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            object obj = null;

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);
                    //cmd.CommandText = sql;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddRange(param);

                    obj = cmd.ExecuteScalar();
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getOneValue() 發生 SqlException 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getOneValue() 發生 Exception 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return obj;
        } //end of getOneValue()

        /// <summary>
        /// 取得單一值 (沒有 SqlParameter)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <returns>object</returns>
        public static object getOneValue(String sql)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            object obj = null;

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);

                    obj = cmd.ExecuteScalar();
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getOneValue() 發生 SqlException 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getOneValue() 發生 Exception 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return obj;
        } //end of getOneValue()

        #endregion ****** 取得單一值 ******

        #region ****** 取得某一筆記錄的多個欄位 (函數x2) ******

        /// <summary>
        /// 取得某一筆記錄的多個欄位，回傳 List 動態陣列 (有 SqlParameter)。 
        /// (若欄位的內容為 Null，會回傳空字串)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <param name="param">SELECT 句子 WHERE 條件的值 (一或多個)</param>
        /// <returns>List 動態陣列</returns>
        public static List<String> getOneRecord(String sql, SqlParameter[] param)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            SqlDataReader dr = null;
            List<String> list = new List<String>();

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);
                    //cmd.CommandText = sql;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddRange(param);

                    dr = cmd.ExecuteReader(CommandBehavior.SingleRow);  //只撈一筆

                    if (dr.HasRows)
                    {
                        if (dr.Read())
                        {
                            for (int x = 0; x < dr.FieldCount; x++)
                            {
                                //若此欄位裡的值不為 Null，則將其轉為 String，加入至動態陣列 list ;
                                //若此欄位裡的值為 Null，則將一個空字串，加入至動態陣列 list 
                                if (!dr.IsDBNull(x))
                                    list.Add(dr.GetValue(x).ToString());   // 將讀到的欄位裡存的值，指派給 list 的相對索引位置
                                else
                                    list.Add("");
                            }

                            if (cmd != null)
                            {
                                cmd.Cancel();   //一定要執行，否則會繼續在背景掃描資料表，看是否有其他筆符合的記錄
                            }
                            if (dr != null)
                            {
                                if (dr.IsClosed == false)
                                    dr.Close();
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getOneRecord() 發生 SqlException 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getOneRecord() 發生 Exception 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (dr != null)
                {
                    if (dr.IsClosed == false)
                        dr.Close();
                    dr.Dispose();
                }
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return list;
        } //end of getOneRecord()

        /// <summary>
        /// 取得某一筆記錄的多個欄位，回傳 List 動態陣列 (沒有 SqlParameter)。 
        /// (若欄位的內容為 Null，會回傳空字串)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <returns>List 動態陣列</returns>
        public static List<String> getOneRecord(String sql)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            SqlDataReader dr = null;
            List<String> list = new List<String>();

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);
                    //cmd.CommandText = sql;

                    dr = cmd.ExecuteReader(CommandBehavior.SingleRow);  //只撈一筆

                    if (dr.HasRows)
                    {
                        if (dr.Read())
                        {
                            for (int x = 0; x < dr.FieldCount; x++)
                            {
                                //若此欄位裡的值不為 Null，則將其轉為 String，加入至動態陣列 list ;
                                //若此欄位裡的值為 Null，則將一個空字串，加入至動態陣列 list 
                                if (!dr.IsDBNull(x))
                                    list.Add(dr.GetValue(x).ToString());   // 將讀到的欄位裡存的值，指派給 list 的相對索引位置
                                else
                                    list.Add("");
                            }

                            if (cmd != null)
                            {
                                cmd.Cancel();   //一定要執行，否則會繼續在背景掃描資料表，看是否有其他筆符合的記錄
                            }
                            if (dr != null)
                            {
                                if (dr.IsClosed == false)
                                    dr.Close();
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getOneRecord() 發生 SqlException 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getOneRecord() 發生 Exception 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (dr != null)
                {
                    if (dr.IsClosed == false)
                        dr.Close();
                    dr.Dispose();
                }
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return list;
        } //end of getOneRecord()

        #endregion ****** 取得某一筆記錄的多個欄位 ******

        #region ****** 取得多筆記錄的同一個欄位 (函數x2) ******

        /// <summary>
        /// 取得多筆記錄的同一個欄位 (有 SqlParameter)。 
        /// (若欄位的內容為 Null，會回傳空字串)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <param name="param">SELECT 句子 WHERE 條件的值 (一或多個)</param>
        /// <returns></returns>
        public static List<String> getMultiRecordsOneColumn(String sql, SqlParameter[] param)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            SqlDataReader rd = null;
            List<String> list = new List<String>();

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);
                    //cmd.CommandText = sql;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddRange(param);

                    rd = cmd.ExecuteReader();

                    if (rd.HasRows)
                    {
                        while (rd.Read())
                        {
                            //若此欄位裡的值不為 Null，則將其轉為 String，加入至動態陣列 list ;
                            //若此欄位裡的值為 Null，則將一個空字串，加入至動態陣列 list 
                            if (!rd.IsDBNull(0))
                                list.Add(rd.GetValue(0).ToString());   // 將讀到的欄位裡存的值，指派給 list 的相對索引位置
                            else
                                list.Add("");
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getMultiRecordsOneColumn() 發生 SqlException 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getMultiRecordsOneColumn() 發生 Exception 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (rd != null)
                {
                    if (rd.IsClosed == false)
                        rd.Close();
                    rd.Dispose();
                }
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return list;
        } //end of getMultiRecordsOneColumn()

        /// <summary>
        /// 取得多筆記錄的同一個欄位 (沒有 SqlParameter)。 
        /// (若欄位的內容為 Null，會回傳空字串)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <returns></returns>
        public static List<String> getMultiRecordsOneColumn(String sql)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            SqlDataReader rd = null;
            List<String> list = new List<String>();

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);
                    //cmd.CommandText = sql;

                    rd = cmd.ExecuteReader();

                    if (rd.HasRows)
                    {
                        while (rd.Read())
                        {
                            //若此欄位裡的值不為 Null，則將其轉為 String，加入至動態陣列 list ;
                            //若此欄位裡的值為 Null，則將一個空字串，加入至動態陣列 list 
                            if (!rd.IsDBNull(0))
                                list.Add(rd.GetValue(0).ToString());   // 將讀到的欄位裡存的值，指派給 list 的相對索引位置
                            else
                                list.Add("");
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getMultiRecordsOneColumn() 發生 SqlException 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 getMultiRecordsOneColumn() 發生 Exception 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (rd != null)
                {
                    if (rd.IsClosed == false)
                        rd.Close();
                    rd.Dispose();
                }
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return list;
        } //end of getMultiRecordsOneColumn()

        #endregion ****** 取得多筆記錄的同一個欄位 ******

        #region ****** 寫入資料庫一或多筆，適用 INSERT、UPDATE、DELETE (不含交易) (函數x2) ******

        /// <summary>
        /// 寫入資料庫一或多筆，適用 INSERT、UPDATE、DELETE (有 SqlParameter、不含交易)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <param name="param">SELECT 句子 WHERE 條件的值 (一或多個)</param>
        /// <returns></returns>
        public static int writeOneRecord(String sql, SqlParameter[] param)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            int intWritedRecordCount = 0;

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);
                    //cmd.CommandText = sql;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddRange(param);

                    intWritedRecordCount = cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 writeOneRecord() 發生 SqlException 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 writeOneRecord() 發生 Exception 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return intWritedRecordCount;
        } //end of writeOneRecord()

        /// <summary>
        /// 寫入資料庫一或多筆，適用 INSERT、UPDATE、DELETE (沒有 SqlParameter、不含交易)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <returns></returns>
        public static int writeOneRecord(String sql)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            int intWritedRecordCount = 0;

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);
                    //cmd.CommandText = sql;

                    intWritedRecordCount = cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 writeOneRecord() 發生 SqlException 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 writeOneRecord() 發生 Exception 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return intWritedRecordCount;
        } //end of writeOneRecord()

        #endregion ****** 寫入資料庫一或多筆，適用 INSERT、UPDATE、DELETE (不含交易) ******

        #region ****** 寫入資料庫多筆，適用 INSERT、UPDATE、DELETE (包含交易) (函數x2) ******

        /// <summary>
        /// 寫入資料庫多筆，適用 INSERT、UPDATE、DELETE (有 SqlParameter、包含交易)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <param name="param">SELECT 句子 WHERE 條件的值 (一或多個)</param>
        /// <returns></returns>
        public static int writeMultiRecords(String sql, SqlParameter[] param)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            SqlTransaction tran = null;        // 資料庫交易
            int intWritedRecordCount = 0;

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    // ReadUncommitted: 使用最寬鬆的「交易隔離等級」，不會造成任何鎖定 (確保別人一定能立即讀得到資料)，
                    //                  但別人可能會 Dirty Read，亦即讀到未交易完成的舊資料。
                    tran = conn.BeginTransaction(IsolationLevel.ReadUncommitted);

                    // ReadCommitted: 預設的「交易隔離等級」，交易中在做寫入時，
                    //                別人皆無法 SELECT 這幾筆記錄，但別人仍能 UPDATE、INSERT。
                    //tran = conn.BeginTransaction(IsolationLevel.ReadCommitted);

                    // RepeatableRead: 較嚴謹的「交易隔離等級」，整個交易過程，
                    //                 別人皆無法 SELECT、UPDATE，但別人仍能 INSERT。
                    //                 此等級，相較 ReadCommitted 等級，較容易造成 Dead Lock。
                    //tran = conn.BeginTransaction(IsolationLevel.RepeatableRead);

                    // Serializable: 最嚴格的「交易隔離等級」，保障交易期間，別人無法存取這幾筆記錄。
                    //               可保證別人一定會讀到最新最正確的資料。
                    //tran = conn.BeginTransaction(IsolationLevel.Serializable);

                    cmd = new SqlCommand(sql, conn);
                    cmd.Transaction = tran;
                    //cmd.CommandText = sql;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddRange(param);

                    intWritedRecordCount = cmd.ExecuteNonQuery();
                    tran.Commit();      //確認「交易」
                }
            }
            catch (SqlException ex)
            {
                if (tran != null)
                {
                    tran.Rollback();    // 回復「交易」
                }

                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 writeMultiRecords() 發生 SqlException 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                if (tran != null)
                {
                    tran.Rollback();     // 回復「交易」
                }

                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 writeMultiRecords() 發生 Exception 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (tran != null)
                {
                    tran.Dispose();
                    tran = null;
                }
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return intWritedRecordCount;
        } //end of writeMultiRecords()

        /// <summary>
        /// 寫入資料庫多筆，適用 INSERT、UPDATE、DELETE (沒有 SqlParameter、包含交易)
        /// </summary>
        /// <param name="sql">SELECT 句子</param>
        /// <returns></returns>
        public static int writeMultiRecords(String sql)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            SqlTransaction tran = null;        // 資料庫交易
            int intWritedRecordCount = 0;

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    // ReadUncommitted: 使用最寬鬆的「交易隔離等級」，不會造成任何鎖定 (確保別人一定能立即讀得到資料)，
                    //                  但別人可能會 Dirty Read，亦即讀到未交易完成的舊資料。
                    tran = conn.BeginTransaction(IsolationLevel.ReadUncommitted);

                    // ReadCommitted: 預設的「交易隔離等級」，交易中在做寫入時，
                    //                別人皆無法 SELECT 這幾筆記錄，但別人仍能 UPDATE、INSERT。
                    //tran = conn.BeginTransaction(IsolationLevel.ReadCommitted);

                    // RepeatableRead: 較嚴謹的「交易隔離等級」，整個交易過程，
                    //                 別人皆無法 SELECT、UPDATE，但別人仍能 INSERT。
                    //                 此等級，相較 ReadCommitted 等級，較容易造成 Dead Lock。
                    //tran = conn.BeginTransaction(IsolationLevel.RepeatableRead);

                    // Serializable: 最嚴格的「交易隔離等級」，保障交易期間，別人無法存取這幾筆記錄。
                    //               可保證別人一定會讀到最新最正確的資料。
                    //tran = conn.BeginTransaction(IsolationLevel.Serializable);

                    cmd = new SqlCommand(sql, conn);
                    cmd.Transaction = tran;
                    //cmd.CommandText = sql;

                    intWritedRecordCount = cmd.ExecuteNonQuery();
                    tran.Commit();      //確認「交易」
                }
            }
            catch (SqlException ex)
            {
                if (tran != null)
                {
                    tran.Rollback();    // 回復「交易」
                }

                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 writeMultiRecord() 發生 SqlException 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                if (tran != null)
                {
                    tran.Rollback();     // 回復「交易」
                }

                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 writeMultiRecord() 發生 Exception 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (tran != null)
                {
                    tran.Dispose();
                    tran = null;
                }
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return intWritedRecordCount;
        } //end of writeMultiRecords()

        #endregion ****** 寫入資料庫多筆，適用 INSERT、UPDATE、DELETE (包含交易)  ******

        #region ****** INSERT 一筆至資料庫，並取得最新的編號(Identity) (不含交易) (函數x2) ******

        /// <summary>
        /// INSERT 一筆至資料庫，並取得最新的編號(Identity) (有 SqlParameter、不含交易)
        /// </summary>
        /// <param name="sql">INSERT 句子</param>
        /// <param name="param">INSERT 句子的 VALUES 的值 (一或多個)</param>
        /// <returns></returns>
        public static object insertOneRecordAndGetID(String sql, SqlParameter[] param)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            object objIdentity = "0";   //型別有可能是 Int64、Int32、Int16

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);
                    //cmd.CommandText = sql;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddRange(param);

                    objIdentity = cmd.ExecuteScalar();
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 insertOneRecordAndGetID() 發生 SqlException 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 insertOneRecordAndGetID() 發生 Exception 錯誤", ex, sql, param);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return objIdentity;
        } //end of insertOneRecordAndGetID()

        /// <summary>
        /// INSERT 一筆至資料庫，並取得最新的編號(Identity) (沒有 SqlParameter、不含交易)
        /// </summary>
        /// <param name="sql">INSERT 句子</param>
        /// <returns></returns>
        public static object insertOneRecordAndGetID(String sql)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;
            object objIdentity = "0";   //型別有可能是 Int64、Int32、Int16

            try
            {
                conn = new SqlConnection(strConnStr_EbcNet);
                conn.Open();

                if (conn.State == ConnectionState.Open)
                {
                    cmd = new SqlCommand(sql, conn);
                    //cmd.CommandText = sql;
                    cmd.Parameters.Clear();
                    //cmd.Parameters.AddRange(param);

                    objIdentity = cmd.ExecuteScalar();
                }
            }
            catch (SqlException ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 insertOneRecordAndGetID() 發生 SqlException 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取錯誤
            }
            catch (Exception ex)
            {
                //寫文字檔 Error Log
                com.ebc.utility.Utility.writeErrorLog("DbHelper 的 insertOneRecordAndGetID() 發生 Exception 錯誤", ex, sql);

                //寄信通知此系統的管理人員
                //com.ebc.utility.MailSender.sendMailToAdmin(ex.Message);

                throw ex;   //發生資料庫存取以外的錯誤
            }
            finally
            {
                if (cmd != null)
                    cmd.Dispose();
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                    conn.Dispose();
                }
            }

            return objIdentity;
        } //end of insertOneRecordAndGetID()

        #endregion ****** INSERT 一筆至資料庫，並取得最新的編號(Identity) (不含交易) ******

    } //end of class
} //end of namespace
