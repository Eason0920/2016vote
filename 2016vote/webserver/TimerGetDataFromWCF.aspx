<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TimerGetDataFromWCF.aspx.cs" Inherits="TimerGetDataFromWCF" %>

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
        此為 2016 大選的「定時撈資料」排程網頁，每 20 秒撈一次資料、暫存在記憶體中。 <br /><br />
        請勿關閉本頁。 <br />若遠端桌面登入此 AP Server，若要離開，請直接關閉遠端桌面程式，不要用登出Windows的方式，否則會造成此瀏覽器一併被關閉。<br /><br />
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" ChildrenAsTriggers="true" UpdateMode="Conditional">
            <ContentTemplate>
                <asp:Timer ID="Timer1" runat="server" Interval="20000" OnTick="Timer1_Tick"></asp:Timer><%//排程秒數設定 %>
                <asp:Literal ID="ltlTimeNow" runat="server"></asp:Literal>
                <asp:Label ID="lblResult" runat="server" BackColor="Silver"></asp:Label>

                <asp:Label ID="lblError" runat="server" BackColor="Pink" Visible="false"></asp:Label>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
    </form>
</body>
</html>
