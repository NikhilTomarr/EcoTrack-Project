// Initial Data (matches the starting dashboard in the PDF)
let currentTotalEmissions = 124; 

// Select the form element
const activityForm = document.getElementById('activity-form');

activityForm.addEventListener('submit', function(event) {
    // Prevent the page from refreshing when form is submitted
    event.preventDefault(); 

    // Get the values entered by the user
    const mode = document.getElementById('transport-mode').value;
    const distance = parseFloat(document.getElementById('distance').value);
    
    let emissionsAdded = 0;

    // Simple Carbon Calculation Logic (kg CO2 per km)
    if (mode === 'car') {
        emissionsAdded = distance * 0.2; // roughly 0.2 kg per km for a car
    } else if (mode === 'bus') {
        emissionsAdded = distance * 0.05; // roughly 0.05 kg per km for public transport
    } else if (mode === 'bike') {
        emissionsAdded = 0; // Walking or cycling produces zero emissions
    }

    // Add new emissions to total
    currentTotalEmissions += emissionsAdded;

    // 1. Update Total Emissions UI
    document.getElementById('total-emissions').textContent = currentTotalEmissions.toFixed(1) + ' kg';
    
    // 2. Update Trees Needed (Rough logic: 1 tree offsets about 20kg per year)
    const treesNeeded = Math.ceil(currentTotalEmissions / 20);
    document.getElementById('trees-needed').textContent = treesNeeded + ' Trees';

    // Show a success message to the user
    if (emissionsAdded === 0) {
        alert("Great job! Zero emissions for this trip. 🌍");
    } else {
        alert(`Activity logged! You added ${emissionsAdded.toFixed(1)} kg of CO2.`);
    }
    
    // Reset the form fields
    activityForm.reset();
});
