document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('new-checkin');
    const entriesList = document.getElementById('entries');
    let checkinEntries = [];

    
    function showEntries() {
        entriesList.innerHTML = ''; // Clear the current list
        checkinEntries.forEach(function (entry) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <h3>${entry.title} (${entry.mood})</h3>
              <p>${entry.description}</p>
            `;
            entriesList.appendChild(listItem);
        });
    }

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Stop page refresh

        const title = document.getElementById('title').value;
        const mood = document.getElementById('mood').value;
        const description = document.getElementById('description').value;

        const newEntry = { title: title, mood: mood, description: description };
        checkinEntries.push(newEntry); 

        form.reset(); 

        showEntries(); // Update the list with new entry
    });
});
