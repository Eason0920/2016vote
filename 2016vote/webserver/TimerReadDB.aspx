<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TimerReadDB.aspx.cs" Inherits="webserver_TimerReadDB" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        此為 2016 大選，AP Server 的「定時撈資料」排程網頁，每 20 秒鐘去 DB 撈一次「活動」資料、存放在本機的記憶體 (內容為 JSON)。 <br /><br />
        <hr />
        <font color='red'>請勿關閉本頁。</font> <br />遠端桌面登入此 AP Server，若要離開，請直接關閉遠端桌面程式，<font color='red'>不要用「登出Windows」的方式</font>，否則會造成此頁面(瀏覽器)一併被關閉。<br /><br />
        <hr />
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" ChildrenAsTriggers="true" UpdateMode="Conditional">
            <ContentTemplate>
                <asp:Timer ID="Timer1" runat="server" Interval="20000" OnTick="Timer1_Tick"></asp:Timer>
                <asp:Literal ID="ltlTimeNow" runat="server"></asp:Literal><br /><br />
                <hr />
                <asp:Label ID="lblTip" runat="server" BackColor="Gold"></asp:Label><br /><br />
                資料表 TVOTE_COUNTING_STATUS 的 TCS_TIMER_READ_DB 欄位 (排程是否每 20 秒讀一次資料庫)：<asp:Label ID="lblTCS_TIMER_READ_DB" runat="server" BackColor="Silver"></asp:Label>
                <hr />
                <asp:Label ID="lblError" runat="server" BackColor="Pink" Visible="false"></asp:Label><br /><br />
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
    </form>
</body>
</html>
