const video = document.getElementById('video');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const result = document.getElementById('result');

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', handleStart);

function handleStart() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.play();

      setInterval(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        // QRコードを読み取るライブラリを使用し、imageDataからQRコードの情報を取得
        const qrResult = QRCode.decode(imageData.data); // 例: jsQRライブラリを使用

        if (qrResult) {
          result.textContent = qrResult.data;
        }
      }, 500);
    })
    .catch(error => {
      console.error('Error accessing media devices.', error);
    });
}
