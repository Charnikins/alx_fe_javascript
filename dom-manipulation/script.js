const DEFAULT_QUOTES = [  
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },  
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },  
    { text: "Get busy living or get busy dying.", category: "Motivation" },  
    { text: "You have to be odd to be number one.", category: "Inspiration" }  
];  

// Load quotes from local storage or use the default quotes  
let quotes = JSON.parse(localStorage.getItem('quotes')) || [...DEFAULT_QUOTES];  

function showRandomQuote() {  
    const quoteDisplay = document.getElementById('quoteDisplay');  
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];  
    quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong> <em>(${randomQuote.category})</em>`;  
    // Store the last viewed quote in session storage  
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));  
}  

// Function to add a new quote  
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
    
    // Save quotes to local storage  
    saveQuotes();  

    // Clear input fields  
    document.getElementById('newQuoteText').value = '';  
    document.getElementById('newQuoteCategory').value = '';  

    // Show the new quote immediately after adding it  
    showRandomQuote();  
    alert("Quote added!");  
}  

// Function to save quotes to local storage  
function saveQuotes() {  
    localStorage.setItem('quotes', JSON.stringify(quotes));  
}  

// Create the form for adding and exporting quotes  
function createAddQuoteForm() {  
    const container = document.getElementById('quoteFormContainer');  

    const quoteInput = document.createElement('input');  
    quoteInput.id = 'newQuoteText';  
    quoteInput.type = 'text';  
    quoteInput.placeholder = 'Enter a new quote';  

    const categoryInput = document.createElement('input');  
    categoryInput.id = 'newQuoteCategory';  
    categoryInput.type = 'text';  
    categoryInput.placeholder = 'Enter quote category';  

    const addButton = document.createElement('button');  
    addButton.innerText = 'Add Quote';  
    addButton.addEventListener('click', addQuote); // Use addEventListener  

    const exportButton = document.createElement('button');  
    exportButton.innerText = 'Export Quotes'; // Ensure this button is present  
    exportButton.addEventListener('click', exportToJsonFile); // Correct function name  

    const importInput = document.createElement('input');  
    importInput.type = 'file';  
    importInput.accept = '.json';  
    importInput.id = 'importFile';  
    importInput.addEventListener('change', importFromJsonFile); // Ensure this function is called  

    // Append the elements to the container  
    container.appendChild(quoteInput);  
    container.appendChild(categoryInput);  
    container.appendChild(addButton);  
    container.appendChild(exportButton); // Append export button  
    container.appendChild(importInput); // Append import input  
}  

// Function to export quotes as JSON  
function exportToJsonFile() {  
    const dataStr = JSON.stringify(quotes, null, 2);  
    const blob = new Blob([dataStr], { type: 'application/json' });  
    const url = URL.createObjectURL(blob);  
    const a = document.createElement('a');  
    a.href = url;  
    a.download = 'quotes.json';  
    document.body.appendChild(a);  
    a.click();  
    document.body.removeChild(a);  
}  

// Function to import quotes from a JSON file  
function importFromJsonFile(event) {  
    const fileReader = new FileReader();  
    fileReader.onload = function(event) {  
        const importedQuotes = JSON.parse(event.target.result);  
        quotes.push(...importedQuotes);  
        saveQuotes();  
        alert('Quotes imported successfully!');  
        showRandomQuote(); // Optionally show a quote after import  
    };  
    fileReader.readAsText(event.target.files[0]);  
}  

// Load the last viewed quote if it exists  
window.onload = function() {  
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');  
    if (lastViewedQuote) {  
        const quote = JSON.parse(lastViewedQuote);  
        const quoteDisplay = document.getElementById('quoteDisplay');  
        quoteDisplay.innerHTML = `<strong>${quote.text}</strong> <em>(${quote.category})</em>`;  
    }  
};  

// Set up event listeners for "Show New Quote" button  
document.addEventListener('DOMContentLoaded', function() {  
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);  
    createAddQuoteForm();  
});;
