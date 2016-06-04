using System;

//額外引用的 namespace
using System.Text;
using System.Runtime.InteropServices;

public partial class webserver_testReadThridProgramTextFile : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //string strFilePath = "~/App_Data/VotePresident.ini";  //這種寫法會讀不到檔案(相對路徑)
        string strFilePath = @"E:\2016vote\App_Data\VotePresident.ini"; //絕對路徑

        StringBuilder outValue = new StringBuilder(128);    //讀 .ini 檔時，緩衝區的記憶體，最大值為 128 Bytes

        //讀取 .ini 設定檔。 緩衝區的記憶體，最大值為 128 Bytes

        GetPrivateProfileString("President", "開票率", "", outValue, 128, strFilePath);
        this.Label1.Text += "開票率：" + outValue.ToString() + "<br />";

        GetPrivateProfileString("President", "全國總票數_朱立倫", "", outValue, 128, strFilePath);
        this.Label1.Text += "全國總票數_朱立倫：" + outValue.ToString() + "<br />";

        GetPrivateProfileString("President", "全國總票數_蔡英文", "", outValue, 128, strFilePath);
        this.Label1.Text += "全國總票數_蔡英文：" + outValue.ToString() + "<br />";

        GetPrivateProfileString("President", "全國總票數_宋楚瑜", "", outValue, 128, strFilePath);
        this.Label1.Text += "全國總票數_宋楚瑜：" + outValue.ToString() + "<br />";

        GetPrivateProfileString("President", "全國得票率_朱立倫", "", outValue, 128, strFilePath);
        this.Label1.Text += "全國得票率_朱立倫：" + outValue.ToString() + "<br />";

        GetPrivateProfileString("President", "全國得票率_蔡英文", "", outValue, 128, strFilePath);
        this.Label1.Text += "全國得票率_蔡英文：" + outValue.ToString() + "<br />";

        GetPrivateProfileString("President", "全國得票率_宋楚瑜", "", outValue, 128, strFilePath);
        this.Label1.Text += "全國得票率_宋楚瑜：" + outValue.ToString() + "<br />";
    }

    //用來讀取 VotePresident.ini 純文字設定檔
    [DllImport("kernel32", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern int GetPrivateProfileString(string section, string key, string def, StringBuilder retval, int size, string filePath);

}