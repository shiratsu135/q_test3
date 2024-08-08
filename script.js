// HTML5 QR Codeライブラリを使用してQRコードリーダーをセットアップ
const startScanButton = document.getElementById('startScan');
const resultElement = document.getElementById('result');
const readerElement = document.getElementById('reader');

let html5QrCode;

startScanButton.addEventListener('click', () => {
    if (html5QrCode) {
        // スキャンがすでに開始されている場合は停止
        html5QrCode.stop().then(() => {
            resultElement.textContent = "QRコードスキャンが停止しました。";
        }).catch((error) => {
            console.error('停止エラー:', error);
        });
        return;
    }

    // QRコードリーダーを初期化して開始
    html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" }, // 環境カメラを使用
        {
            fps: 10, // フレームレート
            qrbox: { width: 250, height: 250 } // QRコードの検出エリアのサイズ
        },
        (decodedText, decodedResult) => {
            // QRコードが読み取られた時の処理
            resultElement.textContent = decodedText;
            html5QrCode.stop().then(() => {
                console.log("QRコードスキャンが停止しました。");
                html5QrCode = null;
            }).catch((error) => {
                console.error('停止エラー:', error);
            });
        },
        (error) => {
            console.error('QRコード読み取りエラー:', error);
        }
    ).catch((error) => {
        console.error('開始エラー:', error);
    });
});
