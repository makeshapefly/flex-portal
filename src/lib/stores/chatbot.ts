import { writable } from 'svelte/store';

export interface ChatState {
    prompts: string[][];
    replies: string[][];
    alternative: string[];
    coronavirus: string[];
    botTyping: boolean;
    messages: { from: string; text: string }[];
}

// Function to create a unique store for each chatbot instance
export const createChatStore = (chatId: string) => {
    const { subscribe, update } = writable<ChatState>({
        prompts: [
            // Example prompts...
            ["hi", "hey", "hello", "good morning", "good afternoon"],
            ["how are you", "how is life", "how are things"],
            ["what are you doing", "what is going on", "what is up"],
            ["how old are you"],
            ["who are you", "are you human", "are you bot", "are you human or bot"],
            ["who created you", "who made you"],
            ["your name please", "your name", "may i know your name", "what is your name", "what call yourself"],
            ["i love you"],
            ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
            ["bad", "bored", "tired"],
            ["help me", "tell me story", "tell me joke"],
            ["ah", "yes", "ok", "okay", "nice"],
            ["bye", "good bye", "goodbye", "see you later"],
            ["what should i eat today"],
            ["bro"],
            ["what", "why", "how", "where", "when"],
            ["no", "not sure", "maybe", "no thanks"],
            [""],
            ["haha", "ha", "lol", "hehe", "funny", "joke"],
            ["flip a coin", "heads or tails", "tails or heads", "head or tails", "head or tail", "tail or heads", "tail or head"],
            ["beer", "buy me a beer", "want a beer"]
        ],
        replies: [
            // Example replies...
            ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],
            ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
            ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"],
            ["I am infinite"],
            ["I am just a bot", "I am a bot. What are you?"],
            ["The one true God, JavaScript"],
            ["I am nameless", "I don't have a name"],
            ["I love you too", "Me too"],
            ["Have you ever felt bad?", "Glad to hear it"],
            ["Why?", "Why? You shouldn't!", "Try watching TV"],
            ["What about?", "Once upon a time..."],
            ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
            ["Bye", "Goodbye", "See you later"],
            ["Sushi", "Pizza"],
            ["Bro!"],
            ["Great question"],
            ["That's ok", "I understand", "What do you want to talk about?"],
            ["Please say something :("],
            ["Haha!", "Good one!"],
            ["Heads", "Tails"],
            ["You can buy me a beer at: <a href=\"https://www.buymeacoffee.com/scottwindon\" target=\"_blank\" style=\"text-decoration:underline;\">https://www.buymeacoffee.com/scottwindon</a>"]
        ],
        alternative: ["Try again", "I don't understand :/"],
        coronavirus: ["Please stay home", "Wear a mask", "Fortunately, I don't have COVID", "These are uncertain times"],
        botTyping: false,
        messages: [
            {
                from: 'bot',
                text: 'Hello! I am a Domiex chatbot. How can I assist you today?'
            }
        ]
    });

    // Method to handle user input and generate bot reply
    const handleUserInput = (userInput: string) => {
        update(state => {
            // Push the user's message to the store
            const newMessages = [...state.messages, { from: 'user', text: userInput }];
            
            // Show typing indicator for the bot
            state.botTyping = true;

            // After a delay, add bot's reply and hide typing indicator
            setTimeout(() => {
                const botReply = getReplyForInput(userInput, state.prompts, state.replies) || state.alternative[Math.floor(Math.random() * state.alternative.length)];
                update(state => ({
                    ...state,
                    messages: [...newMessages, { from: 'bot', text: botReply }],
                    botTyping: false,  // Hide typing indicator
                }));
            }, 1000); // Simulate typing delay

            return { ...state, messages: newMessages };
        });
    };

    return {
        subscribe,
        handleUserInput
    };
};

// Helper function to get the bot's reply based on user input
function getReplyForInput(userInput: string, promptsArray: string[][], repliesArray: string[][]): string | null {
    for (let i = 0; i < promptsArray.length; i++) {
        for (let j = 0; j < promptsArray[i].length; j++) {
            if (promptsArray[i][j].toLowerCase() === userInput.toLowerCase()) {
                // Return a random reply from the corresponding array
                return repliesArray[i][Math.floor(Math.random() * repliesArray[i].length)];
            }
        }
    }

    // If no exact match, use fuzzy matching (Levenshtein distance)
    for (let i = 0; i < promptsArray.length; i++) {
        for (let j = 0; j < promptsArray[i].length; j++) {
            if (levenshtein(promptsArray[i][j], userInput) >= 0.75) {
                return repliesArray[i][Math.floor(Math.random() * repliesArray[i].length)];
            }
        }
    }

    return null; // No match found
}

// Levenshtein distance for approximate matching
function levenshtein(s1: string, s2: string): number {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength === 0) return 1.0;
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength.toString());
}

function editDistance(s1: string, s2: string): number {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    let costs: number[] = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
