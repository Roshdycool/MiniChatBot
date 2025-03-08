document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        
        messageContent.appendChild(messageParagraph);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to send a message to the server and get a response
    function sendMessage(message) {
        // Add user message to the chat
        addMessage(message, true);
        
        // Clear input field
        userInput.value = '';
        
        // Send message to the server
        fetch('/get_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            // Add bot response to the chat
            setTimeout(() => {
                addMessage(data.response, false);
            }, 500); // Slight delay for more natural conversation feel
        })
        .catch(error => {
            console.error('Error:', error);
            setTimeout(() => {
                addMessage('Sorry, I encountered an error. Please try again.', false);
            }, 500);
        });
    }
    
    // Handle send button click
    sendButton.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            sendMessage(message);
        }
    });
    
    // Handle pressing Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                sendMessage(message);
            }
        }
    });
    
    // Function to handle suggestion clicks
    window.sendSuggestion = function(suggestion) {
        userInput.value = suggestion;
        sendMessage(suggestion);
    };
    
    // Focus on input field when page loads
    userInput.focus();
});