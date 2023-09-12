document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector(".submit-button");
    const userInput = document.getElementById("user-input");
    const chatContainer = document.querySelector(".chat-container");

    // Function to handle the form submission
    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting

        const question = userInput.value.trim(); // Get the user's question
        if (question !== "") {
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

            // Send the user's question to the API and get the response
            //GET API FROM https://rapidapi.com/liuzhaolong765481/api/chatgpt-chatgpt3-5-chatgpt4
            const url = 'https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/v1/chat/completions';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': 'API-KEY',
                    'X-RapidAPI-Host': 'HOST-URL'
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
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Failed to fetch answer');
                }
                const data = await response.json();

                if (data.choices && data.choices.length > 0) {
                    const assistantResponse = data.choices[0].message.content || '';
                    answerDiv.textContent = assistantResponse;
                } else {
                    answerDiv.textContent = 'Error: No response content found';
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
        }
    }

    if (submitButton) {
        submitButton.addEventListener("click", handleSubmit);
    }
});
