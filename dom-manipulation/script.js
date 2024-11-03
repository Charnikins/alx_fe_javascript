const quotes = [  
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },  
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },  
    { text: "Get busy living or get busy dying.", category: "Motivation" },  
    { text: "You have to be odd to be number one.", category: "Inspiration" }  
];  

function showRandomQuote() {  
    const quoteDisplay = document.getElementById('quoteDisplay');  
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];  
    quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong> <em>(${randomQuote.category})</em>`;  
}  

function addQuote() {  
    const quoteText = document.getElementById('newQuoteText').value;  
    const quoteCategory = document.getElementById('newQuoteCategory').value;  

    // Basic validation  
    if (quoteText.trim() === '' || quoteCategory.trim() === '') {  
        alert("Please enter both a quote and a category.");  
        return;  
    }  

    // Create a new quote object  
    const newQuote = { text: quoteText, category: quoteCategory };  

    // Add the new quote to the quotes array  
    quotes.push(newQuote);  

    // Clear input fields  
    document.getElementById('newQuoteText').value = '';  
    document.getElementById('newQuoteCategory').value = '';  

    // Show the new quote immediately after adding it  
    showRandomQuote();  
    alert("Quote added!");  
}  

function createAddQuoteForm() {  
    // Create container for the form input elements  
    const container = document.createElement('div');  

    // Create input field for quote text  
    const quoteInput = document.createElement('input');  
    quoteInput.id = 'newQuoteText';  
    quoteInput.type = 'text';  
    quoteInput.placeholder = 'Enter a new quote';  

    // Create input field for quote category  
    const categoryInput = document.createElement('input');  
    categoryInput.id = 'newQuoteCategory';  
    categoryInput.type = 'text';  
    categoryInput.placeholder = 'Enter quote category';  

    // Create button for adding quote  
    const addButton = document.createElement('button');  
    addButton.innerText = 'Add Quote';  
    addButton.onclick = addQuote; // Bind the addQuote function to button click  

    // Append elements to the container  
    container.appendChild(quoteInput);  
    container.appendChild(categoryInput);  
    container.appendChild(addButton);  

    // Append the whole container to the body or a specific section  
    document.body.appendChild(container);  
}  

// Initialize the quote form  
createAddQuoteForm();  

// Set up the event listener for the "Show New Quote" button  
document.getElementById('newQuote').addEventListener('click', showRandomQuote);  

// Optionally display a random quote on load  
showRandomQuote();
