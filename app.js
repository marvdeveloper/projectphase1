document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('new-checkin');
    const entriesList = document.getElementById('entries');
    const tipsSection = document.createElement('div');
    tipsSection.id = 'tips';
    document.body.insertBefore(tipsSection, document.querySelector('footer'));
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

        // Analyze entries and provide tips
        generateSelfCareTips();
    }

    // Generate personalized self-care tips based on mood trends
    function generateSelfCareTips() {
        const moodCount = { Happy: 0, Neutral: 0, Sad: 0 };
        
        // Count occurrences of each mood
        checkinEntries.forEach(function (entry) {
            if (moodCount[entry.mood] !== undefined) {
                moodCount[entry.mood]++;
            }
        });

        // Determine the most frequent mood
        let frequentMood = Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);

        // Provide a personalized tip based on the most frequent mood
        let tipMessage = '';
        switch (frequentMood) {
            case 'Happy':
                tipMessage = "You're feeling great! Keep it up! Consider sharing your positive energy with others.";
                break;
            case 'Neutral':
                tipMessage = "Feeling neutral? It might be a good time to focus on self-care activities that boost your mood.";
                break;
            case 'Sad':
                tipMessage = "You've been feeling down. Consider reaching out to a friend or taking some time for self-care.";
                break;
        }

        tipsSection.innerHTML = `<p><strong>Personalized Tip:</strong> ${tipMessage}</p>`;
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

    // Set a simple reminder every 30 seconds (you can change the interval)
    let reminderInterval = setInterval(() => {
        alert("Reminder: Please check in to track your emotional well-being!");
    }, 30000); // 30 seconds (adjust for longer intervals)

    // Optional: Button to stop the reminder
    const stopReminderBtn = document.createElement('button');
    stopReminderBtn.textContent = "Dismiss Reminder";
    document.body.appendChild(stopReminderBtn);

    stopReminderBtn.addEventListener('click', () => {
        clearInterval(reminderInterval);
        alert("Reminders stopped.");
    });
});
