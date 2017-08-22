function myFunction() {
    var myfile = document.getElementById("myFile");
    var x = myfile.files[0];
    var fr = new FileReader();
    fr.onload = function (e) {
        parseXML(fr.result);
    };
    fr.readAsText(x);
}
function parseXML(xmlinput) {
    var configVersion_field = document.getElementById("configVersion");
    var developerKey_field = document.getElementById("developerKey");
    var parser = new DOMParser();
    var the_dom = parser.parseFromString(xmlinput.toString(), "application/xml");
    var tripos = the_dom.getElementsByTagName('tripos')[0];
    paths().split(" ").forEach(function (path) {
        var checkpoints = path.split("/");
        var element_name = checkpoints[checkpoints.length - 1];
        var field = document.getElementById(element_name);
        field.value = get_value(tripos, path);
    });
}
function get_value(tripos, path) {
    var location = tripos;
    var checkpoints = path.split("/");
    checkpoints.forEach(function (cp) {
        location = location.getElementsByTagName(cp)[0];
    });
    return location.textContent;
}
function paths() {
    return " \
    configVersion \
    developers/developer/developerKey \
    developers/developer/developerSecret \
    server/listeningPort \
	host/acceptorId \
	host/accountId \
	host/accountToken \
	host/autoReversalRetryLimit \
	application/pinPadIdleMessage \
	application/corsAllowedOrigins \
	transaction/CreditAvsEntryCondition \
	transaction/cashbackSelections \
	transaction/cashbackAmountIncrement \
	transaction/maximumCashbackAmount \
	transaction/tipSelections \
	transaction/debitSurcharge \
	transaction/creditSaleSignatureThresholdAmount \
	transaction/signatureFormat \
	transaction/emvFallbackAllowed \
	lanes/serialLane/description \
	lanes/serialLane/laneID \
	lanes/serialLane/pinpad/comPort \
	lanes/serialLane/pinpad/dataBits \
	lanes/serialLane/pinpad/parity \
	lanes/serialLane/pinpad/stopBits \
	lanes/serialLane/host/terminalId \
  ";
}
function validate_developerSecret(self) {
    var data = self.value.split("-").join("");
    var array = data.match("^[0-9a-fA-F]*$");
    if (array != null) {
        self.style.backgroundColor = "white";
    }
    else {
        self.style.backgroundColor = "red";
    }
}
//# sourceMappingURL=main.js.map