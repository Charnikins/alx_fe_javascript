// script.js

// Initialize an array to hold quotes
let quotes = [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
    { text: "Get busy living or get busy dying.", category: "Life" }
];

// Function to display a random quote
function displayRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteDisplay").textContent = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById("quoteDisplay").textContent = `${quote.text} - ${quote.category}`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';
        alert("Quote added successfully!");
    } else {
        alert("Please fill in both fields.");
    }
}

// Event listeners for buttons
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);


