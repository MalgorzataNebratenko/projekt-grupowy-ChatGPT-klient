'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('start-btn');
// const save = document.getElementById('save');
// const send = document.getElementById('send');
// const imageNameInput = document.getElementById('imageName');
const capturedImage = document.getElementById('capturedImage');
const errorMsgElement = document.getElementById('errorMsg');

const constraints = {
    audio: true,
    video: {
        width: 320,
        height: 240
    }
};

//dodanie opóźnienia czasowego żeby zdążyć przesłać zdjęcie
function goToChatPage() {
    setTimeout(() => {  window.location.href = "../chatUI/chat.html"; }, 2000);
}

let capturedImageData = null;

// Access webcam
async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia.error: ${e.toString()}`;
    }
}

// Success
function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
}

// Draw image
var context = canvas.getContext('2d');
snap.addEventListener('click', function () {
    context.drawImage(video, 0, 0, 320, 240);
    capturedImageData = canvas.toDataURL("image/jpeg");
    console.log(capturedImageData);
    // capturedImage.src = capturedImageData;
    // capturedImage.style.display = "block";
});

// Send image (simulate sending to a server)
function sendImageToServer(){
    if (capturedImageData) {
        // Przygotuj dane do wysłania na serwer
        const formData = new FormData();
        formData.append('image', capturedImageData);

        // Wysyłanie danych na serwer przy użyciu Fetch API
        fetch('https://example.com/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            // Obsługa odpowiedzi od serwera
            if (response.ok) {
                console.log('Zdjęcie zostało przesłane na serwer.');
            } else {
                console.error('Błąd podczas przesyłania zdjęcia na serwer. Kod błędu:', response.status);
            }
        })
        .catch(error => {
            console.error('Błąd podczas przesyłania zdjęcia na serwer:', error);
        });
    }
}


// // Save image
// save.addEventListener('click', function () {
//     if (capturedImageData) {
//         const a = document.createElement('a');
//         a.href = capturedImageData;
//         a.download = (imageNameInput.value || 'captured-image') + '.jpg';
//         a.click();
//     }
// });

// Load init
init();
