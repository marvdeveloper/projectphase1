document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('new-checkin');
    const entriesList = document.getElementById('entries');
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const startCheckinButton = document.getElementById('start-checkin');
    const tipsSection = document.getElementById('tips');
    let checkinEntries = [];

    // Show main content and hide landing page
    startCheckinButton.addEventListener('click', function () {
        landingPage.style.display = 'none';
        mainContent.style.display = 'block';
    });

    // Fetch motivational quotes from ZenQuotes API
    fetch('https://zenquotes.io/api/quotes')
        .then(response => response.json())
        .then(data => {
            checkinEntries = data.map(entry => ({
                title: "Quote",
                mood: entry.a,
                description: entry.q
            }));
            showEntries(); // Display fetched quotes as check-in entries
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to display entries (quotes and user check-ins)
    function showEntries() {
        entriesList.innerHTML = '';
        checkinEntries.forEach(function (entry) {
            const listItem = document.createElement('li');
            listItem.classList.add('checkin-item');
            listItem.innerHTML = `
                <div class="entry-header">
                    <h3>${entry.title}</h3>
                    <span class="mood-label">${entry.mood}</span>
                    <p>${entry.description}</p>
                </div>
            `;
            entriesList.appendChild(listItem);
        });

        generateSelfCareTips();
    }

    // Function to generate self-care tips
    function generateSelfCareTips() {
        const tipMessage = "Remember to take breaks and prioritize your mental health!";
        tipsSection.innerHTML = `<p><strong>Personalized Tip:</strong> ${tipMessage}</p>`;
    }

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const mood = document.getElementById('mood').value;
        const description = document.getElementById('description').value;

        const newEntry = { title: title, mood: mood, description: description };
        checkinEntries.push(newEntry);

        form.reset();

        showEntries();
    });

    // Reminder section
    let reminderInterval = setInterval(() => {
        const reminder = document.createElement('div');
        reminder.classList.add('reminder-popup');
        reminder.textContent = "Reminder: It's time for a mental health check-in!";
        document.body.appendChild(reminder);

        setTimeout(() => {
            reminder.remove();
        }, 5000);
    }, 60000);

    // Button to stop the reminder
    const stopReminderBtn = document.createElement('button');
    stopReminderBtn.textContent = "Dismiss Reminder";
    stopReminderBtn.classList.add('dismiss-btn');
    document.body.appendChild(stopReminderBtn);

    stopReminderBtn.addEventListener('click', () => {
        clearInterval(reminderInterval);
        alert("Reminders stopped.");
    });
});
