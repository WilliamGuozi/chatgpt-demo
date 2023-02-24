const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");


// Load chat history from localStorage if there is more than one message
if (localStorage.getItem("chatHistory") && JSON.parse(localStorage.getItem("chatHistory")).length > 0) {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory"));
    chatHistory.forEach(message => addMessage(message.message, message.isFromUser, true));
}

// Function to add a new message to the chat body and chat history
function addMessage(message, isFromUser, refresh) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");
    if (isFromUser) {
        messageDiv.classList.add("chat-message--to");
    } else {
        messageDiv.classList.add("chat-message--from");
    }
    messageDiv.textContent = message + "\n"; // add a newline character to the end of the message
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Add message to chat history and save to localStorage if there is more than one message
    if (refresh !== true) {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chatHistory.push({
            message,
            isFromUser
        });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
}

// Function to send a message to ChatGPT
function sendMessage() {
    // get the user's message from the input field
    const message = chatInput.value.trim();
    if (message.length === 0) {
        return;
    }

    // add the user's message to the chat body
    addMessage(message, true, false);

    // clear the input field
    chatInput.value = "";

    // send the message to the ChatGPT API
    const apiUrl = "/chat";
    const prompt = `User: ${message}\nChatGPT:`;
    const data = {
        "prompt": prompt,
        "max_tokens": 100,
        "temperature": 0.5,
        "n": 1
    };
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "sk-a"
    };
    fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            // add the ChatGPT response to the chat body
            const chatGPTResponse = data.choices[0].text.trim();
            addMessage(chatGPTResponse, false, false);
        })
        .catch(error => console.error(error));
}

// Add event listener for send button click
chatSend.addEventListener("click", sendMessage);

// Add event listener for enter key press in input field
chatInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});