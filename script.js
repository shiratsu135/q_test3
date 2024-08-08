document.addEventListener('DOMContentLoaded', () => {
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
            { facingMode: "environment" }, // リアカメラを使用
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
                resultElement.textContent = 'QRコードの読み取りに失敗しました。';
                stopScanning();
            }
        ).catch((error) => {
            console.error('QRコードリーダーの開始エラー:', error);
            resultElement.textContent = 'QRコードリーダーの開始に失敗しました。';
            startScanButton.disabled = false;
        });
    });

    function stopScanning() {
        if (html5QrCode) {
            html5QrCode.stop().then(() => {
                console.log("QRコードスキャンが停止しました。");
                html5QrCode = null;
                startScanButton.disabled = false;
                resultElement.textContent = '';
            }).catch((error) => {
                console.error('停止エラー:', error);
                resultElement.textContent = 'QRコードスキャンの停止に失敗しました。';
            });
        }
    }
});
