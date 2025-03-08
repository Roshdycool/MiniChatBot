import nltk
from nltk.chat.util import Chat, reflections
from flask import Flask, render_template, request, jsonify
import os

# Ensure the necessary NLTK data is downloaded
nltk.download('punkt', quiet=True)

# Download necessary NLTK data
nltk.download('punkt', quiet=True)

# Define patterns and responses
patterns = [
    (r'hi|hello|hey', ['Hello!', 'Hi there!', 'Hey! How can I help?']),
    (r'what is your name|whats your name', ['I am ChatBot, nice to meet you!', 'You can call me ChatBot.']),
    (r'how are you', ['I am doing well, thank you!', 'I\'m fine, how are you?']),
    (r'fine|good|well', ['That\'s great to hear!', 'Excellent!']),
    (r'bye|goodbye', ['Goodbye!', 'See you later!', 'Bye!']),
    (r'thanks|thank you', ['You\'re welcome!', 'No problem!', 'My pleasure!']),
    (r'help', ['I can chat with you about various topics. Just ask me something!']),
    (r'weather', ['I don\'t have access to real-time weather information.']),
    (r'.*', ['I\'m not sure I understand. Can you rephrase that?',
             'Interesting. Tell me more.',
             'I see. Can you elaborate?'])
]

# Create a chatbot
chatbot = Chat(patterns, reflections)

# Create Flask app
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.json['message']
    bot_response = chatbot.respond(user_message)
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
    