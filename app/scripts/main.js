function importWrapper() {
    var myfile = document.getElementById("myFile");
    importXml(myfile);
}
function importXml(myfile) {
    var x = myfile.files[0];
    var fr = new FileReader();
    if (typeof (sessionStorage) == "undefined") {
        alert("No sessionStorage");
    }
    fr.onload = function (e) {
        window.sessionStorage.the_dom = fr.result;
        parseXml();
    };
    fr.readAsText(x);
}
function parseXml() {
    var parser = new DOMParser();
    var xmlinput = window.sessionStorage.the_dom;
    var the_dom = parser.parseFromString(xmlinput.toString(), "application/xml");
    sessionStorage.setItem("the_dom", xmlinput.toString());
    var tripos = the_dom.getElementsByTagName('tripos')[0];
    paths().split(" ").filter(checkEmpty).forEach(function (path) { importTextbox(tripos, path); });
    paths_checkboxes().split(" ").filter(checkEmpty).forEach(function (path) { importCheckbox(tripos, path); });
    importDropdownUnique(tripos, "host/driver", "host_driver");
    importDropdownUnique(tripos, "lanes/serialLane/pinpad/driver", "pinpad_driver");
    paths_dropdowns().split(" ").filter(checkEmpty).forEach(function (path) { importDropdown(tripos, path); });
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
function paths_dropdowns() {
    return " \
lanes/serialLane/pinpad/stopBits \
transaction/currencyCode \
transaction/marketCode \
lanes/serialLane/pinpad/terminalType \
lanes/serialLane/pinpad/handshake \
lanes/serialLane/pinpad/baudRate \
  ".trim();
}
function validateInput(event) {
    var e = event.target;
    eval(e.dataset.callback);
}
function validateHex(self) {
    var data = self.value.split("-").join("");
    var result = data.match("^[0-9a-fA-F]+$");
    if (result != null) {
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
    var regex = "^[0-9%,\\s]*$";
    var result = self.value.match(regex);
    if (result != null) {
        self.style.backgroundColor = "white";
    }
    else {
        self.style.backgroundColor = "red";
    }
}
function validateBool(self) {
    var label = self.nextElementSibling;
    label.style.backgroundColor = "white";
}
function validateDropdown(self) {
    var label = self.previousElementSibling.previousElementSibling;
    label.style.backgroundColor = "white";
}
function validateNone(self) {
    self.style.backgroundColor = "white";
}
function getField(path) {
    var checkpoints = path.trim().split("/");
    var element_name = checkpoints[checkpoints.length - 1];
    var field = document.getElementById(element_name);
    return field;
}
function getValue(tripos, path) {
    var location = tripos;
    var checkpoints = path.split("/");
    checkpoints.forEach(function (cp) {
        location = location.getElementsByTagName(cp.trim())[0];
    });
    return location.textContent;
}
function importTextbox(root, path) {
    var field = getField(path);
    try {
        field.value = getValue(root, path);
        field.style.backgroundColor = "White";
    }
    catch (err) {
        var ignore = err;
        field.value = "ERROR";
        field.style.backgroundColor = "Red";
    }
    var e = field;
    eval(e.dataset.callback);
}
function importCheckbox(root, path) {
    var field = getField(path);
    try {
        field.checked = toBool(getValue(root, path));
        var label = field.nextElementSibling;
        label.style.backgroundColor = "White";
    }
    catch (err) {
        var ignore = err;
        var label = field.nextElementSibling;
        label.style.backgroundColor = "Red";
    }
}
function importDropdown(root, path) {
    var field = getField(path);
    try {
        var value = getValue(root, path);
        for (var i = 0; i <= field.children.length; i++) {
            var child = field.children[i];
            if (child.value == value) {
                field.value = value.toString();
                break;
            }
        }
        var label = field.previousElementSibling.previousElementSibling;
        label.style.backgroundColor = "White";
    }
    catch (err) {
        var ignore = err;
        var label = field.previousElementSibling.previousElementSibling;
        label.style.backgroundColor = "Red";
    }
}
function importDropdownUnique(root, path, id) {
    var field = document.getElementById(id.toString());
    try {
        var value = getValue(root, path);
        for (var i = 0; i <= field.children.length; i++) {
            var child = field.children[i];
            if (child.value == value) {
                field.value = value.toString();
                break;
            }
        }
        var label = field.previousElementSibling.previousElementSibling;
        label.style.backgroundColor = "White";
    }
    catch (err) {
        var ignore = err;
        var label = field.previousElementSibling.previousElementSibling;
        label.style.backgroundColor = "Red";
    }
}
//# sourceMappingURL=main.js.map