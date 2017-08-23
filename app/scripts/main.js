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
            field.style.backgroundColor = "White";
        }
        catch (err) {
            var ignore = err;
            field.value = "ERROR";
            field.style.backgroundColor = "Red";
        }
        var e = field;
        eval(e.dataset.callback);
    });
    paths_checkboxes().split(" ").filter(checkEmpty).forEach(function (path) {
        var checkpoints = path.trim().split("/");
        var element_name = checkpoints[checkpoints.length - 1];
        var field = document.getElementById(element_name);
        try {
            field.checked = toBool(get_value(tripos, path));
            var label = field.nextElementSibling;
            label.style.backgroundColor = "White";
        }
        catch (err) {
            var ignore = err;
            var label = field.nextElementSibling;
            label.style.backgroundColor = "Red";
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
transaction/creditAvsEntryCondition \
transaction/cashbackSelections \
transaction/cashbackAmountIncrement \
transaction/maximumCashbackAmount \
transaction/tipSelections \
transaction/debitSurcharge \
transaction/creditSaleSignatureThresholdAmount \
transaction/signatureFormat \
transaction/emvFallbackAllowed \
lanes/serialLane/description \
lanes/serialLane/laneId \
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
application/testMode \
transaction/allowPartialApprovals \
transaction/confirmOriginalAmount \
transaction/checkForDuplicateTransactions \
transaction/isCashbackAllowed \
transaction/isDebitSupported \
transaction/isGiftSupported \
transaction/confirmConvenienceFeeAmount \
transaction/isHealthcareSupported \
lanes/serialLane/pinpad/isManualEntryAllowed \
lanes/serialLane/pinpad/isContactlessMsdEntryAllowed \
  ".trim();
}
function validateInput(event) {
    var e = event.target;
    eval(e.dataset.callback);
}
function validateHex(self) {
    var data = self.value.split("-").join("");
    var array = data.match("^[0-9a-fA-F]*$");
    if (array != null) {
        self.style.backgroundColor = "white";
    }
    else {
        self.style.backgroundColor = "red";
    }
}
function validateInt(self) {
    if (!isNaN(Number(self.value))) {
        self.style.backgroundColor = "white";
    }
    else {
        self.style.backgroundColor = "red";
    }
}
function validateStringInt(self) {
}
function validateBool(self) {
    var label = self.nextElementSibling;
    label.style.backgroundColor = "White";
}
//# sourceMappingURL=main.js.map