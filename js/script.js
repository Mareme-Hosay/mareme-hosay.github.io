const videos = [
	{
		title: "Demo Reel",
		url: "../videos/Demoreel.webm",
		blob: null,
	},
];

// Function to preload a video using XMLHttpRequest
function preloadVideo(url, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.responseType = "blob"; // Load as a binary large object (blob)
	xhr.onload = function () {
		if (xhr.status === 200) {
			const videoBlob = xhr.response; // The video content as a blob
			callback(videoBlob);
		}
	};
	xhr.send(); // Start the request
}

// Preload all the videos
for (const video of videos) {
	preloadVideo(video.url, videoBlob => {
		video.blob = videoBlob;
	});
}

// Get the video element and play button
const videoElement = document.getElementById("video");
let currentIndex = 0;

// Function to play the next video
function changeVideo() {
	videoElement.src = URL.createObjectURL(videos[currentIndex].blob);
	videoElement.play();
}

// Play the video
const playButton = document.getElementById("play_button");
playButton.addEventListener("click", () => {
	videoElement.play();
	playButton.style.display = "none";
});

// Check if the video is played using the controls
videoElement.addEventListener("play", () => {
	playButton.style.display = "none";
});

// Check if the video is paused using the controls
videoElement.addEventListener("pause", () => {
	playButton.style.display = "block";
});

// Check if the video ends
videoElement.addEventListener("ended", () => {
	currentIndex = (currentIndex + 1) % videos.length;
	changeVideo();
});

// Video buttons
if (videos.length > 1) {
	const videoButtons = document.getElementById("video_buttons");
	videos.forEach((video, index) => {
		// Create a button for each video
		const button = document.createElement("button");
		button.textContent = video.title;
		button.addEventListener("click", () => {
			currentIndex = index;
			playButton.style.display = "none";
			changeVideo();
		});
		button.classList.add("box");
		videoButtons.appendChild(button);
	});
}
