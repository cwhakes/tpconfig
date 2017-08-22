function paths():String {
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
  "
}

/*
	host/driver \
	application/testMode \
	transaction/allowPartialApprovals \
	transaction/confirmOriginalAmount \
	transaction/checkForDuplicateTransactions \
	transaction/currencyCode \
	transaction/isCashbackAllowed
	transaction/isDebitSupported \
	transaction/isGiftSupported \
	transaction/confirmConvenienceFeeAmount \
	transaction/isTipAllowed \
	transaction/isHealthcareSupported \
	transaction/marketCode \
	lanes/serialLane/pinpad/terminalType \
	lanes/serialLane/pinpad/driver
	lanes/serialLane/pinpad/handshake \
	lanes/serialLane/pinpad/baudRate \
	lanes/serialLane/pinpad/isManualEntryAllowed \
	lanes/serialLane/pinpad/isContactlessMsdEntryAllowed \
*/
