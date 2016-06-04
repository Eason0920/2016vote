using System;
//using System.Collections.Generic;
//using System.Web;
using System.Net.Mail;
//using System.Text;

/*
 *  說明: 寄送郵件
 *  
 *  修改日期: 2015/12/29
 *  修改人員: 吳宇澤
 *  修改內容: 寄信 SMTP Server 改遠傳專用的 IP
 *  
 *  建立日期: 2015/11/09
 *  建立人員: 吳宇澤
 */

namespace com.ebc.WebServer.utility
{
    /// <summary>
    /// SendMail 的摘要描述
    /// </summary>
    public class MailSender
    {
        public MailSender()
        {
            //if (!String.IsNullOrWhiteSpace(Account.debugBCCMail) && IsValidEmail(Account.debugBCCMail))
            //    BCC.Add(new mailAddr("李小明", Account.debugBCCMail));
        }

        //private readonly static string strSmtpIP = "smtp.ebc.net.tw"; //SMTP Server 位址 (內網)
        private readonly static string strSmtpIP = "spam1.ebc.net.tw";  //SMTP Server 位址 (遠傳)
        private readonly static string strSmtpID = "eservice";
        private readonly static string strSmtpPW = "n59097";

        /// <summary>
        /// 寄送系統錯誤通知郵件
        /// </summary>
        /// <param name="errMsg">系統的錯誤訊息(ex.Message)</param>
        public static void sendMailToAdmin(string errMsg)
        {
            #region

            //if (Resources.Utility.IsSendMailToAdmin.Trim().Equals("Y"))
            //{
                MailAddress mailFrom = null;
                MailMessage mailMsg = null;
                SmtpClient client = null;
                bool blIsSend = false;  //是否要寄信 (若所有的 AdminMail 都是空白，就不寄；若任一個 AdminMail 有值，就寄信)


                try
                {
                    //寄件者的信箱(捉共用設定檔)、寄件者的顯示名稱(寫死)
                    mailFrom = new MailAddress("eservice@ebc.net.tw", "2016大選, 系統自動通知");
                    //mailFrom = new MailAddress("eservice@ebc.net.tw", "ebcweb 系統");
                    //MailAddress mailTo = new MailAddress(toMailAddress);  //收件者的信箱、顯示名稱

                    //mailMsg = new MailMessage("eservice@ebc.net.tw", "wizard_wu@ebc.net.tw");
                    mailMsg = new MailMessage();    //"eservice@ebc.net.tw", Resources.Setup.AdminMail2_Agent);
                    mailMsg.From = mailFrom;

                    //寄信對象 (可寄給一或多人)
                    mailMsg.To.Add("wizard_wu@ebc.net.tw");       //管理員1
                    //mailMsg.To.Add("fanny_chou@ebc.net.tw");       //管理員2
                    //mailMsg.To.Add("eason_wang@ebc.net.tw");       //管理員3
                    //mailMsg.To.Add("shulman_hsing@ebc.net.tw");    //管理員4
                    blIsSend = true;

                    if (blIsSend == false)
                    {
                        if (mailMsg != null)
                            mailMsg.Dispose();

                        return; //離開此函數、不寄信
                    }

                    //message.To = mailTo;
                    mailMsg.Subject = "2016大選, 系統發生錯誤";
                    mailMsg.SubjectEncoding = System.Text.Encoding.Default;     //捉作業系統的預設值（Big5）

                    mailMsg.BodyEncoding = System.Text.Encoding.Default;        //捉作業系統的預設值（Big5）
                    mailMsg.IsBodyHtml = true;

                    mailMsg.Priority = MailPriority.Normal;

                    string strMailBody = "<table id=\"Table_01\" align=\"center\" width=\"550\" height=\"218\" border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"border-style:solid; border-collapse: collapse; border-color: Silver;\">"
                        + "<tr><td height=\"120\" valign=\"top\">"
                        + "<table width=\"498\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\">"
                        + "<tr><td width=\"496\" height=\"112\"><span style=\"font-size: 9pt;font-family: Verdana, Arial, Helvetica, sans-serif;line-height: 15pt;\">"
                        + "您好：<br />"
                        + "此為 2016大選，Web Server 自動發送的通知信 ! 提醒您系統曾經發生錯誤。<br /><br />"
                        + "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=<br />"
                        + "錯誤訊息：<font color=\"red\">" + errMsg + "</font><br />"
                        + "錯誤時間：<font color=\"red\">" + System.DateTime.Now.ToString("yyyy/MM/dd, HH:mm:ss") + "</font><br />"
                        + "發生錯誤的主機：<font color=\"red\">" + com.ebc.utility.Utility.getServerIP() + "</font> (內部 Private IP)<br />"
                        + "您可至 Web Server 的下列路徑，瀏覽主機上的 Error Log：<br /><br />"
                        + "<font color=\"blue\">C:\\2016vote\\log\\</font><br />"
                        + "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=<br /><br />"
                        + "注意：請勿回覆此電子郵件。<br /><br />"
                        + "</span></td>"
                        + "</tr></table></td></tr>"
                        + "<tr><td height=\"23\"><table width=\"548\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" bgcolor=\"#666666\">"
                        + "<tr><td><div align=\"center\"><span style=\"font-size: 9pt;color: #CCCCCC;font-family: Verdana, Arial, Helvetica, sans-serif;\">Copyright  &copy; " + DateTime.Now.Year + " 東森電視. All rights reserved.</span></div></td>"
                        + "</tr></table></td></tr></table>";

                    mailMsg.Body = strMailBody;

                    //寄附件(可用)
                    //MailAddress copy1 = new MailAddress("test@msa.hinet.net", "副1: 給附件的人");
                    //MailAddress copy2 = new MailAddress("test@pchome.com.tw", "副2: 給附件的人");

                    //if (!string.IsNullOrEmpty(ccMailAddress.Trim()))
                    //    mailMsg.CC.Add(ccMailAddress);      //郵件的副本 (CC) 收件者

                    //if (!string.IsNullOrEmpty(bccMailAddress.Trim()))
                    //    mailMsg.Bcc.Add(bccMailAddress);    //郵件的密件副本 (BCC) 收件者

                    client = new SmtpClient();

                    client.Host = strSmtpIP;
                    client.Credentials = new System.Net.NetworkCredential(strSmtpID, strSmtpPW);
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    // Include credentials if the server requires them.
                    //client.Credentials = CredentialCache.DefaultNetworkCredentials;
                    //Console.WriteLine("Sending an e-mail message to {0} by using the SMTP host {1}.",
                    //     to.Address, client.Host);
                    client.Send(mailMsg);
                    //return true;

                }
                catch (Exception ex)
                {
                    //寫文字檔 Error Log
                    com.ebc.utility.Utility.writeErrorLog("MailSender 的 sendMailToAdmin() 發生錯誤", ex);
                    //throw ex;
                    //return false;
                }
                finally
                {
                    if (mailMsg != null)
                        mailMsg.Dispose();
                    if (client != null)
                        client.Dispose();
                }
            //} //end of "if (Resources.Setup.IsSendMailToAdmin.Trim().Equals("Y"))"

            #endregion
        } //end of sendMail()
    } //end of class MailSednder
} //end of namespace