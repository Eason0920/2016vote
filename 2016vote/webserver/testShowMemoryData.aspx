<%@ Page Language="C#" AutoEventWireup="true" CodeFile="testShowMemoryData.aspx.cs" Inherits="webserver_testShowMemoryData" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <%--顯示記憶體中的「開票」資料 (static 字串變數，內容為 JSON)：<br /><br />--%>
        <asp:Label ID="lblOriginalJSON" runat="server" BackColor="Silver"></asp:Label>
        <hr />
        <asp:Label ID="lblDeserializedJSON" runat="server" BackColor="Gold"></asp:Label>
    </div>
    </form>
</body>
</html>
