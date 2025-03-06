const API_KEY = "AIzaSyDfkOf5ukZEt5sGsXHg7qh6iXBd3L7pXIM";
const CHANNEL_ID = "UCn6c3M9iD_-i0twEX0r2V0g";
const VIDEO_CONTAINER = document.querySelector("main");

async function getChannelLogo() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`);
        const data = await response.json();
        return data.items[0].snippet.thumbnails.default.url; // Kanal loqosunu qaytarır
    } catch (error) {
        console.error("Kanal loqosunu çəkərkən xəta baş verdi:", error);
        return ""; // Əgər xəta baş verərsə, boş qaytar
    }
}

async function fetchVideos() {
    try {
        const channelLogo = await getChannelLogo(); // Kanal loqosunu əldə et

        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&order=date&type=video&key=${API_KEY}`);
        const data = await response.json();

        VIDEO_CONTAINER.innerHTML = "";

        data.items.forEach(video => {
            const videoId = video.id.videoId;
            const snippet = video.snippet;
            const videoHTML = `
                <div class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition duration-300">
                    <div class="relative">
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                            <img src="${snippet.thumbnails.high.url}" alt="${snippet.title}" class="w-full rounded-lg">
                        </a>
                    </div>
                    <div class="flex mt-2 space-x-2">
                        <img src="${channelLogo}" alt="Channel" class="h-10 w-10 rounded-full">
                        <div>
                            <h3 class="font-bold line-clamp-2">${snippet.title}</h3>
                            <p class="text-gray-600 text-sm">${snippet.channelTitle}</p>
                        </div>
                    </div>
                </div>
            `;

            VIDEO_CONTAINER.innerHTML += videoHTML;
        });
    } catch (error) {
        console.error("Videoları çəkərkən xəta baş verdi:", error);
    }
}

// Səhifə yüklənəndə videoları çək
document.addEventListener("DOMContentLoaded", fetchVideos);



// https://www.googleapis.com/youtube/v3/channels?part=snippet&id={channel_id}&key={YOUTUBE_API_KEY}
// https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId={channel_id}&maxResults=50&pageToken={next_page_token}&key={YOUTUBE_API_KEY}
// https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId={playlist_id}&pageToken={next_page_token}&key={YOUTUBE_API_KEY}
// https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id={video_ids_str}&key={YOUTUBE_API_KEY}