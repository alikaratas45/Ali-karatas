document.addEventListener('DOMContentLoaded', function() {
    // Hoşgeldiniz ekranını 5 saniye sonra kaldır
    setTimeout(function() {
        document.querySelector('.welcome-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.welcome-screen').style.display = 'none';
            document.querySelector('.content').style.display = 'block';
        }, 1000); // Ekranı tamamen gizlemek için bir süre bekle
    }, 5000); // Hoşgeldiniz ekranının ne kadar süre gösterileceği

    const qrScanner = document.getElementById('qr-scanner');
    const closeScannerButton = document.getElementById('close-qr-scanner');
    const qrButton = document.getElementById('qr-button');

    qrButton.addEventListener('click', function() {
        qrScanner.style.display = 'flex';
        startQrScanner();
    });

    closeScannerButton.addEventListener('click', function() {
        qrScanner.style.display = 'none';
        stopQrScanner();
    });

    let html5QrCode;

    function startQrScanner() {
        html5QrCode = new Html5Qrcode("qr-reader");
        html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: 250
            },
            (decodedText, decodedResult) => {
                alert(`QR kod içeriği: ${decodedText}`);
                // QR kod okunduktan sonra tarayıcıyı durdurabilirsiniz
                stopQrScanner();
            },
            (errorMessage) => {
                // Eğer bir hata oluşursa burada işleyebilirsiniz
            }
        ).catch(err => {
            console.error(err);
        });
    }

    function stopQrScanner() {
        if (html5QrCode) {
            html5QrCode.stop().then(() => {
                html5QrCode.clear();
            }).catch(err => {
                console.error(err);
            });
        }
    }
});
