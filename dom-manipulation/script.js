const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL  
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];  

// Function to synchronize local quotes with the server  
async function syncQuotes() {  
    try {  
        const response = await fetch(API_URL);  
        if (!response.ok) {  
            throw new Error('Failed to fetch quotes from server.');  
        }  
        const serverQuotes = await response.json();  

        // Handle conflicts and update local storage  
        updateLocalQuotes(serverQuotes);  
        saveQuotes();  
        notifyUser('Quotes synchronized successfully!');  

    } catch (error) {  
        console.error('Error syncing quotes:', error);  
        notifyUser('Error syncing quotes: ' + error.message);  
    }  
}  

// Update local quotes with server quotes, handling conflicts  
function updateLocalQuotes(serverQuotes) {  
    const conflicts = [];  
    
    serverQuotes.forEach(serverQuote => {  
        const localQuote = quotes.find(q => q.text === serverQuote.title); // Match using appropriate key  
        if (!localQuote) {  
            quotes.push({ text: serverQuote.title, category: serverQuote.body }); // Add new quote  
        } else if (localQuote.category !== serverQuote.body) {  
            conflicts.push({ local: localQuote, server: { text: serverQuote.title, category: serverQuote.body } });  
        }  
    });  

    // Resolve conflicts  
    if (conflicts.length > 0) {  
        conflicts.forEach(conflict => {  
            notifyUser(`Conflict detected for quote: "${conflict.local.text}". Using server data.`);  
            const index = quotes.findIndex(q => q.text === conflict.local.text);  
            quotes[index] = conflict.server; // Update with server data  
        });  
    }  
}  

// Function to save quotes to localStorage  
function saveQuotes() {  
    localStorage.setItem('quotes', JSON.stringify(quotes));  
}  

// Function to notify users of updates or errors  
function notifyUser(message) {  
    const notification = document.createElement('div');  
    notification.innerText = message;  
    notification.style.position = 'fixed';  
    notification.style.bottom = '20px';  
    notification.style.right = '20px';  
    notification.style.backgroundColor = 'lightyellow';  
    notification.style.padding = '10px';  
    notification.style.border = '1px solid #ccc';  
    notification.style.zIndex = 1000;  
    document.body.appendChild(notification);  
    
    setTimeout(() => {  
        document.body.removeChild(notification);  
    }, 5000);  
}  

// Sync every 10 seconds  
setInterval(syncQuotes, 10000);  

// Example function to add a new quote and post to server  
async function addNewQuote(text, category) {  
    const newQuote = { text, category };  
    quotes.push(newQuote);  
    saveQuotes(); // Save the quote locally  
    await postQuoteToServer(newQuote); // Post the new quote to the server  
}  

// Function to post a new quote to the server  
async function postQuoteToServer(quote) {  
    try {  
        const response = await fetch(API_URL, {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify({  
                title: quote.text,  
                body: quote.category,  
                userId: 1  
            })  
        });  

        if (!response.ok) {  
            throw new Error('Network response was not ok');  
        }  

        const data = await response.json();  
        console.log('Quote posted successfully:', data);  
    } catch (error) {  
        console.error('Error posting quote:', error);  
        notifyUser('Error posting quote: ' + error.message);  
    }  
}  

// Example of adding a new quote  
addNewQuote("The best way to predict the future is to invent it.", "Inspirational");
