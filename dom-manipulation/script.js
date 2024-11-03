const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL  
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];  

// Function to fetch quotes from the server  
async function fetchQuotesFromServer() {  
    try {  
        const response = await fetch(API_URL);  
        if (!response.ok) {  
            throw new Error('Failed to fetch quotes from server.');  
        }  
        return await response.json();  
    } catch (error) {  
        console.error('Error fetching quotes:', error);  
        notifyUser('Error fetching quotes: ' + error.message, 'error');  
        return [];  
    }  
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
                userId: 1 // Mock userId  
            })  
        });  

        if (!response.ok) {  
            throw new Error('Failed to post quote to server');  
        }  

        const data = await response.json();  
        console.log('Quote posted successfully:', data);  
    } catch (error) {  
        console.error('Error posting quote:', error);  
        notifyUser('Error posting quote: ' + error.message, 'error');  
    }  
}  

// Function to synchronize quotes with the server  
async function syncQuotes() {  
    const serverQuotes = await fetchQuotesFromServer();  

    // Update local quotes based on server data  
    updateLocalQuotes(serverQuotes);  
    saveQuotes();  
}  

// Update local quotes while handling conflicts  
function updateLocalQuotes(serverQuotes) {  
    const conflicts = [];  

    serverQuotes.forEach(serverQuote => {  
        const localQuote = quotes.find(q => q.text === serverQuote.title);  
        if (!localQuote) {  
            quotes.push({ text: serverQuote.title, category: serverQuote.body });  
        } else if (localQuote.category !== serverQuote.body) {  
            conflicts.push({ local: localQuote, server: { text: serverQuote.title, category: serverQuote.body } });  
        }  
    });  

    if (conflicts.length > 0) {  
        handleConflicts(conflicts);  
    }  
}  

// Function to handle detected conflicts  
function handleConflicts(conflicts) {  
    conflicts.forEach(conflict => {  
        const index = quotes.findIndex(q => q.text === conflict.local.text);  
        if (confirm(`Conflict detected for quote: "${conflict.local.text}". Do you want to use the server's data?`)) {  
            quotes[index] = conflict.server; // Update with server data  
            notifyUser(`Updated "${conflict.local.text}" with server data.`, 'info');  
        } else {  
            notifyUser(`Kept local version of "${conflict.local.text}".`, 'info');  
        }  
    });  
}  

// Function to save quotes to local storage  
function saveQuotes() {  
    localStorage.setItem('quotes', JSON.stringify(quotes));  
}  

// Function to notify users of updates or errors  
function notifyUser(message, type) {  
    const notification = document.createElement('div');  
    notification.innerText = message;  
    notification.style.position = 'fixed';  
    notification.style.bottom = '20px';  
    notification.style.right = '20px';  
    notification.style.backgroundColor = type === 'success' ? 'lightgreen' : type === 'error' ? 'lightcoral' : 'lightyellow';  
    notification.style.padding = '10px';  
    notification.style.border = '1px solid #ccc';  
    notification.style.color = '#333';  
    notification.style.zIndex = 1000;  
    document.body.appendChild(notification);  

    setTimeout(() => {  
        document.body.removeChild(notification);  
    }, 5000);  
}  

// Periodically sync quotes every 10 seconds  
setInterval(syncQuotes, 10000);  

// Example initial quote  
addNewQuote("The best way to predict the future is to invent it.", "Inspirational");  

// Function to add a new quote, save it locally, and post it to the server  
async function addNewQuote(text, category) {  
    const newQuote = { text, category };  
    quotes.push(newQuote);  
    saveQuotes(); // Save locally  
    await postQuoteToServer(newQuote); // Post to the server  
}
