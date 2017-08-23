/* Name: export.ts
Description: Exports the xml document to an external XML file
Collaborators: Eva Goins, Will Hakes
Date: 8/22/17-8/23/17

TO-DO: 
  -- Write fields into exported file rather than exporting open file
*/

//On-click event for Export button
function exportXml(): void {
	var data: String = window.sessionStorage.the_dom;
	download(data, "triposconfig", "XML");
}

//Pulls a file to export. 
//If msblob is supported, use it. If not, use alternative.
function download(data:any, filename:any, type:any) {
	var file = new Blob([data], {type: type});
	if (window.navigator.msSaveOrOpenBlob) {
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
