'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const save = document.getElementById('save');
const send = document.getElementById('send');
const imageNameInput = document.getElementById('imageName');
const capturedImage = document.getElementById('capturedImage');
const errorMsgElement = document.getElementById('errorMsg');

const constraints = {
    audio: true,
    video: {
        width: 1280,
        height: 720
    }
};

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
    capturedImage.src = capturedImageData;
    capturedImage.style.display = "block";
});

// Save image
save.addEventListener('click', function () {
    if (capturedImageData) {
        const a = document.createElement('a');
        a.href = capturedImageData;
        a.download = (imageNameInput.value || 'captured-image') + '.jpg';
        a.click();
    }
});

// Send image (simulate sending to a server)
send.addEventListener('click', function () {
    if (capturedImageData) {
        // Here, you can simulate sending the capturedImageData to a server using AJAX or any other method.
        // Example: You can use the fetch API to send the data to your server.
        // Replace the URL with your server endpoint.
        fetch('https://example.com/upload', {
            method: 'POST',
            body: capturedImageData,
            headers: {
                'Content-Type': 'image/jpeg',
            },
        })
        .then(response => {
            // Handle the response from the server as needed
            console.log('Image sent to the server successfully.');
        })
        .catch(error => {
            console.error('Error sending image to the server:', error);
        });
    }
});

// Load init
init();