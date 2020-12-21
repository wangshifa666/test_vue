    function transferred(data) {
      return data.replace(/<br>/g, "\r\n").replace(/&gt;/g, ">");
    }
    function tableToCsv() {
      let fileName = Date.now() + ".csv";//使用当前时间戳作为文件名
      var columnDelimiter = ","; //列分割符
      var lineDelimiter = "\r\n"; //行分割符
      var table__header = document.getElementsByClassName(
        "el-table__header"
      )[0];//获取表头
      var table__body = document.getElementsByClassName("el-table__body")[0];//获取tbody
      var head = table__header.tHead;
      let result = "";// 最终结果的字符串
      var ths = head.getElementsByTagName("th");
      for (let i = 0, l = ths.length; i < l; i++) {
        result +=
          transferred('"' + ths[i].innerText + '"') + columnDelimiter;//每一列用逗号分隔
      }
      result += lineDelimiter;// 每一行使用"\r\n"分隔
      var trs = table__body.getElementsByTagName("tr");
      for (let i = 0, l = trs.length; i < l; i++) {
        let spandata = trs[i].getElementsByTagName("td");
        for (let i = 0, l = spandata.length; i < l; i++) {
          result +=
            transferred('"' + spandata[i].innerText + '"') +
            columnDelimiter;
        }
        result += lineDelimiter;
      }
      var blob = new Blob(["\uFEFF" + result], { type: "text/csv;" });//记得将编码格式设置一下，避免最终下载的文件出现乱码
      var downloadLink = document.createElement("a");
      if ("download" in downloadLink) {
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = fileName;
        downloadLink.hidden = true;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        if (navigator.msSaveBlob) {
          //IE10+
          navigator.msSaveBlob(blob, fileName);
        }
      }
    }

export default {
  tableToCsv
}
