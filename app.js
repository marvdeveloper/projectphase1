document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('new-checkin');
    const entriesList = document.getElementById('entries');
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const startCheckinButton = document.getElementById('start-checkin');
    const tipsSection = document.getElementById('tips');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    let checkinEntries = [];

    // Show main content and hide landing page
    startCheckinButton.addEventListener('click', function () {
        landingPage.style.display = 'none';
        mainContent.style.display = 'block';
    });

    // Fetch a quote from ZenQuotes API
    async function fetchQuote() {
        try {
            const response = await fetch('https://zenquotes.io/api/random');
            const data = await response.json();
            const quote = data[0]; // Get the first quote object

            // Display the quote and author
            quoteText.textContent = `"${quote.q}"`;
            quoteAuthor.textContent = `- ${quote.a}`;
        } catch (error) {
            quoteText.textContent = 'Failed to fetch quote. Please try again later.';
            quoteAuthor.textContent = '';
        }
    }

    // Call fetchQuote when the page loads
    fetchQuote();

    // Hardcoded self-care tips for different moods
    const selfCareTips = {
        Happy: ["Keep spreading the positivity!", "Enjoy your day and share your joy with others."],
        Sad: ["It's okay to feel sad. Take a moment for self-care.", "Reach out to someone you trust and talk about it."],
        Anxious: ["Try some deep breathing exercises to calm your mind.", "Take things one step at a time, you're doing great."],
        Angry: ["Take a break and cool down. A quick walk might help.", "Express your feelings in a journal to release some tension."],
        Calm: ["Enjoy the peace and tranquility. Maintain this positive vibe.", "Reflect on the things that make you feel calm and grounded."],
        Neutral: ["It's a balanced day! Keep up the good work.", "Maybe try a new hobby or activity to uplift your mood."],
        Motivated: ["Channel your energy into something productive today!", "This is your moment—seize the day with enthusiasm!"],
        Stressed: ["Take a break. You deserve it.", "Relax your mind with a brief meditation session."],
        Irritated: ["Try stepping away from the situation and give yourself space.", "Consider doing something enjoyable to release the irritation."],
        Depressed: ["It's important to seek support. Reach out to loved ones or professionals.", "Remember that you're not alone—there are people who care."],
        Bored: ["Try something creative like drawing, writing, or cooking.", "Maybe start a new book or learn something new online."],
        Lonely: ["Connect with a friend or loved one today.", "Consider joining a community or online group where you can engage with others."],
        Frustrated: ["Take a deep breath. It will pass.", "Step away from what's frustrating you and revisit it with a fresh perspective later."]
    };

    // Function to fetch personalized self-care tips based on mood
    function fetchSelfCareTips(mood) {
        const tips = selfCareTips[mood];
        if (tips) {
            const randomTip = tips[Math.floor(Math.random() * tips.length)];
            tipsSection.innerHTML = `<p><strong>Personalized Tip:</strong> ${randomTip}</p>`;
        } else {
            tipsSection.innerHTML = `<p><strong>Personalized Tip:</strong> We couldn't find a tip for this mood, but take a moment to care for yourself.</p>`;
        }
    }

    // Function to display entries (check-ins)
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
        fetchSelfCareTips(mood);  // Fetch personalized tip based on mood after check-in submission
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
