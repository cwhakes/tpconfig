
var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
var fso = new ActiveXObject("Scription.FileSystemObject");
var FILENAME = 'test.xml';

//dom:Document
function exportXml():void {
	
	var file = fso.CreateTextFile(FILENAME, true);
	file.WriteLine('<?xml version="1.0" encoding="utf-8"?>\n');
	file.WriteLine('<tripos xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n');
	file.WriteLine('<!-- This is a comment-->\n');
	file.WriteLine('</tripos>');
	
	file.Close();
}