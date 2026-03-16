// Change label text based on dropdown selection
document.getElementById('interestType').addEventListener('change', function() {
    const rateLabel = document.getElementById('rateLabel');
    if (this.value === 'percentage') {
        rateLabel.innerText = "Interest Rate (%) per year";
    } else {
        rateLabel.innerText = "Interest (₹) per 100 per month";
    }
});

function calculateInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rateInput = parseFloat(document.getElementById('rate').value);
    const type = document.getElementById('interestType').value;
    const start = new Date(document.getElementById('startDate').value);
    const end = new Date(document.getElementById('endDate').value);

    if (isNaN(principal) || isNaN(rateInput) || !start || !end || start > end) {
        alert("Please enter valid details and dates.");
        return;
    }

    // Calculate time difference
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = (diffDays % 365) % 30;

    // Convert Rate to Annual Percentage
    let annualRate;
    if (type === 'percentage') {
        annualRate = rateInput;
    } else {
        // ₹2 per 100 per month = 2% per month = 24% per year
        annualRate = rateInput * 12;
    }

    // Simple Interest Formula: (P * R * T) / 100
    // Time (T) is expressed in years
    const timeInYears = diffDays / 365;
    const interest = (principal * annualRate * timeInYears) / 100;
    const total = principal + interest;

    // Display Results
    document.getElementById('result').style.display = "block";
    document.getElementById('timeDiff').innerText = `Duration: ${years} Years, ${months} Months, ${days} Days (${diffDays} total days)`;
    document.getElementById('interestAmount').innerText = `Interest: ₹${interest.toFixed(2)}`;
    document.getElementById('totalAmount').innerText = `Total: ₹${total.toFixed(2)}`;
}