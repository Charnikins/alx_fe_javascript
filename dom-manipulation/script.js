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

function saveQuotes() {  
    localStorage.setItem('quotes', JSON.stringify(quotes));  
}  

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
    addButton.onclick = addQuote;  

    const exportButton = document.createElement('button');  
    exportButton.innerText = 'Export Quotes';  
    exportButton.onclick = exportQuotes;  

    const importButton = document.createElement('button');  
    importButton.innerText = 'Import Quotes';  

    const inputFile = document.createElement('input');  
    inputFile.type = 'file';  
    inputFile.id = 'importFile';  
    inputFile.accept = '.json';   
    inputFile.onchange = importFromJsonFile;  

    container.appendChild(quoteInput);  
    container.appendChild(categoryInput);  
    container.appendChild(addButton);  
    container.appendChild(exportButton);  
    container.appendChild(importButton);  
    container.appendChild(inputFile);  

    document.body.appendChild(container);  
}  

// Function to export quotes as JSON  
function exportQuotes() {  
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

// Initialize the application  
createAddQuoteForm();  
showRandomQuote();
