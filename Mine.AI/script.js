// script.js

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector(".submit-button");
    const userInput = document.getElementById("user-input");
    const chatContainer = document.querySelector(".chat-container");
    const youtubeSuggestionsContainer = document.querySelector(".youtube-suggestions");

    // Function to handle weather-related questions
    async function handleWeatherQuestion(city) {
        const apiUrl = `https://national-weather-service.p.rapidapi.com/zones/${city}/%7BzoneId%7D/forecast`;

        const headers = {
            'X-RapidAPI-Key': 'ba8f245a54msh317fa35a181c135p103286jsnc1e29dcb9414',
            'X-RapidAPI-Host': 'national-weather-service.p.rapidapi.com',
        };

        try {
            const response = await fetch(apiUrl, { headers });
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();

            // Extract relevant weather information from 'data' and construct a response
            const temperature = data.temperature; // Adjust property names based on API response
            const conditions = data.conditions;   // Adjust property names based on API response
            const responseText = `The weather in ${city} is currently ${conditions} with a temperature of ${temperature}°C.`;

            // Display the weather response in the chat
            displayChatMessage(responseText);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Handle error or no data available
            displayChatMessage('Sorry, I couldn\'t retrieve weather information at the moment.');
        }
    }

    // Function to handle the form submission
    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting

        const question = userInput.value.trim(); // Get the user's question
        if (question !== "") {
            if (isWeatherQuestion(question)) {
                // Extract the city from the user's question
                const city = extractCityFromQuestion(question);

                if (city) {
                    handleWeatherQuestion(city);
                } else {
                    // Handle the case where the city couldn't be extracted
                    displayChatMessage("I couldn't determine the city. Please specify a valid city name.");
                }
            } else {
                // Create a parent container for the logo and question
                const questionContainer = document.createElement("div");
                questionContainer.className = "question-container";

                // Create an image element for the engineer's logo
                const engineerLogoImg = document.createElement("img");
                engineerLogoImg.src = "engineer.png";
                engineerLogoImg.alt = "engineer";
                engineerLogoImg.className = "logo-eng";

                // Create a div element for the user's question
                const questionDiv = document.createElement("div");
                questionDiv.className = "user-question";
                questionDiv.textContent = question;

                // Append the engineer's logo and the user's question to the parent container
                questionContainer.appendChild(engineerLogoImg);
                questionContainer.appendChild(questionDiv);

                // Create a parent container for the logo and answer
                const ansContainer = document.createElement("div");
                ansContainer.className = "ans-container";

                // Create an image element for the engineer's logo
                const mineLogoImg = document.createElement("img");
                mineLogoImg.src = "Group 8.png";
                mineLogoImg.alt = "minegem";
                mineLogoImg.className = "logo-mine";

                // Create a div element for the answer
                const answerDiv = document.createElement("div");
                answerDiv.className = "answer";

                // Send the user's question to the ChatGPT API and get the response
                // Replace with your own API endpoint and headers
                const chatGPTUrl = 'https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/v1/chat/completions';
                const chatGPTOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Key': 'Aba8f245a54msh317fa35a181c135p103286jsnc1e29dcb9414',
                        'X-RapidAPI-Host': 'chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com'
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            {
                                role: 'user',
                                content: question
                            }
                        ],
                        temperature: 0.8
                    })
                };

                try {
                    const chatGPTResponse = await fetch(chatGPTUrl, chatGPTOptions);
                    if (!chatGPTResponse.ok) {
                        throw new Error('Failed to fetch answer from ChatGPT');
                    }
                    const chatGPTData = await chatGPTResponse.json();

                    if (chatGPTData.choices && chatGPTData.choices.length > 0) {
                        const assistantResponse = chatGPTData.choices[0].message.content || '';
                        answerDiv.textContent = assistantResponse;
                    } else {
                        answerDiv.textContent = 'Error: No response content found from ChatGPT';
                    }
                } catch (error) {
                    answerDiv.textContent = `Error: ${error.message}`;
                }

                // Append the engineer's logo and the answer to the parent container
                ansContainer.appendChild(mineLogoImg);
                ansContainer.appendChild(answerDiv);

                // Append the question container and the answer to the chat container
                chatContainer.appendChild(questionContainer);
                chatContainer.appendChild(ansContainer);

                // Clear the input field
                userInput.value = "";

                // Scroll to the bottom after adding a message
                scrollToBottom(chatContainer);

                // Fetch YouTube videos based on the user's question
                fetchYouTubeVideosByQuestion(question);
            }
        }
    }

    // Function to fetch YouTube video data from the API based on the user's question
    async function fetchYouTubeVideosByQuestion(question) {
        try {
            // Replace 'YOUR_API_KEY' with your actual YouTube API key
            const API_KEY = 'AIzaSyBxfdUpZFtjFbnV-lNh_ilMY5fNeLazNzA';
            const MAX_RESULTS = 5; // Adjust the number of results as needed

            // Encode the user's question as a search query
            const encodedQuestion = encodeURIComponent(question);

            // Fetch videos based on the search query using the YouTube Data API
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodedQuestion}&part=snippet&type=video&maxResults=${MAX_RESULTS}`);
            if (!response.ok) {
                throw new Error('Failed to fetch YouTube data');
            }
            const data = await response.json();

            // Loop through the fetched videos and populate the HTML
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;
                const thumbnailUrl = item.snippet.thumbnails.medium.url;

                // Create a div for each video preview
                const videoPreview = document.createElement("div");
                videoPreview.className = "youtube-preview";
                videoPreview.dataset.videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                // Create an image for the thumbnail
                const thumbnailImg = document.createElement("img");
                thumbnailImg.src = thumbnailUrl;
                thumbnailImg.alt = videoTitle;

                // Create an h3 element for the video title
                const videoTitleElement = document.createElement("h3");
                videoTitleElement.textContent = videoTitle;

                // Append the thumbnail and title to the video preview
                videoPreview.appendChild(thumbnailImg);
                videoPreview.appendChild(videoTitleElement);

                // Add the video preview to the container
                youtubeSuggestionsContainer.appendChild(videoPreview);

                // Add a click event listener to open the YouTube video in a new tab
                videoPreview.addEventListener("click", function () {
                    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                });
            });
        } catch (error) {
            console.error("Error fetching YouTube data:", error);
        }
    }

    // Function to check if a question is related to weather
    function isWeatherQuestion(question) {
        // Implement your logic to determine if a question is related to weather
        // For example, you can check for keywords like "weather" or "forecast"
        return question.toLowerCase().includes('weather') || question.toLowerCase().includes('forecast');
    }

    // Function to scroll the chat display to the bottom
    function scrollToBottom(element) {
        element.scrollTop = element.scrollHeight;
    }

    // Call scrollToBottom whenever a new message is added
    function handleNewMessage() {
        scrollToBottom(chatContainer);
    }

    // After adding a question and answer, call handleNewMessage to scroll to the bottom
    handleNewMessage();

    if (submitButton) {
        submitButton.addEventListener("click", handleSubmit);
    }

    // Event listener for the Enter key
    userInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    });
});

/* Function to fetch data from the new API
async function fetchNewApiData() {
    const apiKey = 'your_api_key';
    const apiUrl = 'https://api.example.com/data'; // Replace with the API endpoint
    const params = {
        param1: 'value1',
        param2: 'value2',
    };

    try {
        // Construct the URL with parameters
        const url = new URL(apiUrl);
        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from the new API');
        }

        const data = await response.json();

        // Process and use the data from the new API here
        console.log(data); // You can replace this with your own logic

    } catch (error) {
        console.error('Error fetching data from the new API:', error);
        // Handle the error here
    }
}

// Call the fetchNewApiData function when needed
fetchNewApiData();
*/