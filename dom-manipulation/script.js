const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Use this mock API for our setup  

let quotes = JSON.parse(localStorage.getItem('quotes')) || [...DEFAULT_QUOTES];  

async function fetchQuotesFromServer() {  
    try {  
        const response = await fetch(API_URL);  
        const data = await response.json();  
        return data.map(item => ({  
            text: item.title,  
            category: "Imported"  
        }));  
    } catch (error) {  
        console.error('Error fetching quotes:', error);  
        return [];  
    }  
}  

async function syncQuotes() {  
    const serverQuotes = await fetchQuotesFromServer();  
    let conflicts = [];  

    serverQuotes.forEach(serverQuote => {  
        const localQuote = quotes.find(q => q.text === serverQuote.text);  
        if (!localQuote) {  
            quotes.push(serverQuote);  
        } else if (localQuote.category !== serverQuote.category) {  
            conflicts.push({ local: localQuote, server: serverQuote });  
        }  
    });  

    if (conflicts.length > 0) {  
        conflicts.forEach(conflict => {  
            notifyUser(`Conflict detected for quote: "${conflict.local.text}". Resolved: Server data takes precedence.`);  
            const index = quotes.findIndex(q => q.text === conflict.local.text);  
            quotes[index] = conflict.server;  
        });  
    }  

    saveQuotes();  
    populateCategories();  
    filterQuotes();  
}  

function notifyUser(message) {  
    const notification = document.createElement('div');  
    notification.innerText = message;  
    notification.style.position = 'fixed';  
    notification.style.bottom = '20px';  
    notification.style.right = '20px';  
    notification.style.backgroundColor = 'lightyellow';  
    notification.style.padding = '10px';  
    notification.style.border = '1px solid #ccc';  
    document.body.appendChild(notification);  
    
    setTimeout(() => {  
        document.body.removeChild(notification);  
    }, 5000);  
}  

// Sync every 10 seconds  
setInterval(syncQuotes, 10000);
