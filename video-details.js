const API_KEY = "AIzaSyDfkOf5ukZEt5sGsXHg7qh6iXBd3L7pXIM";
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get("videoId");

const videoFrame = document.getElementById("video-frame");
const videoTitle = document.getElementById("video-title");
const videoDescription = document.getElementById("video-description");

if (videoId) {
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;

    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const videoData = data.items[0].snippet;
            videoTitle.textContent = videoData.title;
            videoDescription.textContent = videoData.description;
        })
        .catch(error => console.error("Video detalları alınarkən xəta:", error));
} else {
    videoTitle.textContent = "Video tapılmadı!";
    videoDescription.textContent = "Xahiş olunur, düzgün linkdən istifadə edin.";
}
