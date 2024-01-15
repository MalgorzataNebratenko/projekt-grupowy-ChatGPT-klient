'use strict';

// uruchomienie do pythona ze ścieżki startUI :))
// python -m http.server

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
    setTimeout(() => {  window.location.href = "http://127.0.0.1:5000/chat"; }, 2000);
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
    sendImageToServer()
    // goToChatPage()
});

function sendImageToServer() {
    if (capturedImageData) {
        // Przygotuj dane do wysłania na serwer
        const formData = new FormData();
        formData.append('text', capturedImageData);

        var requestOptions = {
            method: "POST",
            mode: 'no-cors',
            body: formData,
            redirect: "follow",
        };

        // Wysyłanie danych na serwer przy użyciu Fetch API
        fetch("http://localhost:5000/photo", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

            goToChatPage()
    }
}

// function goToNextPage() {
    
//         // Przygotuj dane do wysłania na serwer
//         // const formData = new FormData();
//         // formData.append('text', capturedImageData);

//         var requestOptions = {
//             method: "GET",
//             mode: 'no-cors',
//             // body: formData,
//             redirect: "follow",
//         };

//         // Wysyłanie danych na serwer przy użyciu Fetch API
//         fetch("http://localhost:5000/chat", requestOptions)
//             .then((response) => response.text())
//             .then((result) => console.log(result))
//             .catch((error) => console.log("error", error));
    
// }


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
