document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector(".submit-button");
    const userInput = document.getElementById("user-input");
    const chatContainer = document.querySelector(".chat-container");

    // Function to handle the form submission
    function handleSubmit(event) {
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

            // Create a parent container for the logo and ans
            const ansContainer = document.createElement("div");
            ansContainer.className = "ans-container";

            // Create an image element for the engineer's logo
            const mineLogoImg = document.createElement("img");
            mineLogoImg.src = "Group 8.png";
            mineLogoImg.alt = "minegem";
            mineLogoImg.className = "logo-mine";

            // Create a div element for the answer and set a default response
            const answerDiv = document.createElement("div");
            answerDiv.className = "answer";
            answerDiv.textContent = "Answer: I don't have an answer for that.";

            // Append the engineer's logo and the user's question to the parent container
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
