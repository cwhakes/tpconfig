/*
var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var FILENAME = 'test.xml';

//dom:Document
function exportXml(dom: Document):void {

	var file = fso.CreateTextFile(FILENAME, true);
	file.WriteLine('<?xml version="1.0" encoding="utf-8"?>\n');
	file.WriteLine('<tripos xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n');
	var configVersion = <HTMLInputElement> dom.getElementById("configVersion");
	file.WriteLine('<' + dom.getElementById("configVersion").id + '>' + configVersion.value + '</' + dom.getElementById("configVersion").id + '>\n');
	file.WriteLine('<!-- This is comment 2-->\n');
	file.WriteLine('</tripos>');

	file.Close();
}
*/


function exportXml(): void {
	var data: String = window.sessionStorage.the_dom;
	download(data, "triposconfig", "XML");
}

function download(data:any, filename:any, type:any) {
	var file = new Blob([data], {type: type});
	if (window.navigator.msSaveOrOpenBlob) {//IE10
		window.navigator.msSaveOrOpenBlob(file, filename);
	} else {
		var a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}
