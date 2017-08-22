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
    var parser = new DOMParser();
    var the_dom = parser.parseFromString(xmlinput.toString(), "application/xml");
    var tripos = the_dom.getElementsByTagName('tripos')[0];
    paths().split(" ").filter(checkEmpty).forEach(function (path) {
        var checkpoints = path.trim().split("/");
        var element_name = checkpoints[checkpoints.length - 1];
        var field = document.getElementById(element_name);
        try {
            field.value = get_value(tripos, path);
        }
        catch (err) {
            var ignore = err;
            field.value = "ERROR";
            field.style.backgroundColor = "Red";
        }
    });
    paths_checkboxes().split(" ").filter(checkEmpty).forEach(function (path) {
        var checkpoints = path.trim().split("/");
        var element_name = checkpoints[checkpoints.length - 1];
        var field = document.getElementById(element_name);
        try {
            field.checked = toBool(get_value(tripos, path));
        }
        catch (err) {
            var ignore = err;
            field.style.backgroundColor = "Red";
        }
    });
}
function toBool(str) {
    if (str.toLowerCase() == "false") {
        return false;
    }
    else if (str.toLowerCase() == "true") {
        return true;
    }
    else {
        throw "typeErr";
    }
}
function checkEmpty(str) {
    if (str.trim().length > 0) {
        return str;
    }
}
function get_value(tripos, path) {
    var location = tripos;
    var checkpoints = path.split("/");
    checkpoints.forEach(function (cp) {
        location = location.getElementsByTagName(cp.trim())[0];
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
".trim();
}
function paths_checkboxes() {
    return " \
  transaction/isTipAllowed \
  ".trim();
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