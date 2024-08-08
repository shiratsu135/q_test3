const video = document.getElementById('video');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

//    
HTML Media Captureでカメラを起動
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.play();

    // 定期的にCanvasに画像を描画
    setInterval(() => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canva   
s.height);

      // Barcode Detection APIで画像解析
      barcodeDetector.detect(canvas)
        .then(barcodes => {
          if (barcodes.length > 0) {
            // QRコードが見つかった場合の処理
            console.log(barcodes[0].rawValue);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, 500);
  })
  .catch(error => {
    console.error('Error accessing media devices.', error);
  });
