const startScanButton = document.getElementById('startScan');
const resultElement = document.getElementById('result');
const readerElement = document.getElementById('reader');
const SCANNING_MESSAGE = '読み取り中...';

let html5QrCode;

startScanButton.addEventListener('click', () => {
    if (html5QrCode) {
        stopScanning();
        return;
    }

    startScanButton.disabled = true;
    resultElement.textContent = SCANNING_MESSAGE;

    html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        (decodedText, decodedResult) => {
            resultElement.textContent = decodedText;
            stopScanning();
        },
        (error) => {
            console.error('QRコード読み取りエラー:', error);
            alert('QRコードの読み取りに失敗しました。\n' + error.message);
            stopScanning();
        }
    );
});

function stopScanning() {
    html5QrCode.stop().then(() => {
        console.log("QRコードスキャンが停止しました。");
        html5QrCode = null;
        startScanButton.disabled = false;
        resultElement.textContent = '';
    });
}
