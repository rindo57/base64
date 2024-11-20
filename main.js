<!-- JavaScript for copying code and opening links -->
	const canvas = document.getElementById("matrix");
        const ctx = canvas.getContext("2d");

        // Adjust canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const words = [
            //{ text: "AniDL", color: "#ffffff" }, // Red
           { text: "Happy Birthday", color: "#ff69b4" }, // Pink
            { text: "AniDL", color: "#00ff00" } // Green
        ];

        const fontSize = 16;
        const columns = canvas.width / fontSize;

        // Array for matrix animation
        const drops = Array(Math.floor(columns)).fill(1);

        // Draw matrix effect
        function drawMatrix() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px Courier New`;

            for (let i = 0; i < drops.length; i++) {
                const word = words[Math.floor(Math.random() * words.length)];
                ctx.fillStyle = word.color; // Set text color
                ctx.fillText(word.text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        setInterval(drawMatrix, 90);

        // Create the audio element and set it to autoplay
		const audio = new Audio("music/Love-Your-Voice.mp3"); // Replace with your audio file path
		audio.loop = true; // Loop music

		// Auto-play music on page load
		window.addEventListener("load", () => {
			// Set autoplay to true (for browsers that allow autoplay)
			audio.autoplay = true;

			// Attempt to play the audio
			audio.play().catch((error) => {
				console.log("Music autoplay failed due to browser restrictions.", error);
			});
		});

		// Toggle play/pause functionality
		function toggleMusic() {
			const playPauseButton = document.getElementById("playPauseButton");
			if (audio.paused) {
				audio.play();
				playPauseButton.textContent = "Pause";
			} else {
				audio.pause();
				playPauseButton.textContent = "Play";
			}
		}


        // Encode Base64
        function encodeBase64() {
            const text = document.getElementById('base64Input').value;
            if (!text) {
                document.getElementById('base64Result').innerText = `Please enter some text to encode.`;
                return;
            }
            try {
                const encoded = btoa(unescape(encodeURIComponent(text)));
                document.getElementById('base64Result').innerText = `${encoded}`;
            } catch (e) {
                document.getElementById('base64Result').innerText = `Encoding failed. Make sure your input is valid.`;
            }
        }

        // Decode Base64
        function decodeBase64() {
			const text = document.getElementById('base64Input').value;
			if (!text) {
				document.getElementById('base64Result').innerText = `Please enter some Base64 text to decode.`;
				return;
			}
			try {
				const decoded = decodeURIComponent(escape(atob(text)));
				document.getElementById('base64Result').innerHTML = `<pre>${decoded}</pre>`;  // à¦à¦–à¦¾à¦¨à§‡ à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¨ à¦•à¦°à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡
			} catch (e) {
				document.getElementById('base64Result').innerText = `Invalid Base64 string. Please try again.`;
			}
		}


        // Clear fields
        function clearFields() {
            document.getElementById('base64Input').value = '';
            document.getElementById('base64Result').innerText = '';
        }

        // Copy result to clipboard
        function copyToClipboard() {
            const resultText = document.getElementById('base64Result').innerText;
            const textarea = document.createElement('textarea');
            textarea.value = resultText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
		
		function copyToClipboard() {
		// Get the text to be copied
		var textToCopy = document.getElementById("base64Result").innerText;

		// Create a temporary text area to copy the text
		var tempTextArea = document.createElement("textarea");
		document.body.appendChild(tempTextArea);
		tempTextArea.value = textToCopy;
		tempTextArea.select();
		document.execCommand("copy");

		// Remove the temporary text area
		document.body.removeChild(tempTextArea);

		// Show the alert message box
		var alertBox = document.getElementById("alertBox");
		alertBox.classList.add("show");

		// Hide the alert message after 3 seconds
		setTimeout(function() {
			alertBox.classList.remove("show");
		}, 3000);
	}


        // Adjust canvas size on window resize
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
