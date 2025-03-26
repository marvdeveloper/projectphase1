document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('new-checkin');
    const entriesList = document.getElementById('entries');
    const tipsSection = document.createElement('div');
    tipsSection.id = 'tips';
    document.body.insertBefore(tipsSection, document.querySelector('footer'));
    let checkinEntries = [];

    
    function showEntries() {
        entriesList.innerHTML = ''; 
        checkinEntries.forEach(function (entry) {
            const listItem = document.createElement('li');
            listItem.classList.add('checkin-item'); 
            listItem.innerHTML = `
                <div class="entry-header">
                    <h3>${entry.title}</h3> 
                    <span class="mood-label">${entry.mood}</span>
                </div>
                <p>${entry.description}</p>
            `;
            entriesList.appendChild(listItem);
        });

        
        generateSelfCareTips();
    }

    
    function generateSelfCareTips() {
        const moodCount = {
            Happy: 0, Sad: 0, Anxious: 0, Angry: 0, Calm: 0, 
            Neutral: 0, Motivated: 0, Stressed: 0, Irritated: 0, 
            Depressed: 0, Bored: 0, Lonely: 0, Frustrated: 0
        };

        // Count occurrences of each mood
        checkinEntries.forEach(function (entry) {
            if (moodCount[entry.mood] !== undefined) {
                moodCount[entry.mood]++;
            }
        });

        
        let frequentMood = Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);

        
        let tipMessage = '';
        switch (frequentMood) {
            case 'Happy':
                tipMessage = "You're feeling great! Keep the positivity going by treating yourself or sharing your energy.";
                break;
            case 'Neutral':
                tipMessage = "A neutral mood is a great time to practice mindfulness or engage in a relaxing activity.";
                break;
            case 'Sad':
                tipMessage = "It seems like you're feeling down. Take time for yourself, maybe a walk or talk to someone.";
                break;
            case 'Anxious':
                tipMessage = "Anxiety can be challenging. Try a breathing exercise or some meditation.";
                break;
            case 'Angry':
                tipMessage = "Take a moment to breathe and let go of the anger. Maybe try a calming activity.";
                break;
            case 'Calm':
                tipMessage = "You're feeling calm! Keep doing whatever is keeping you grounded and peaceful.";
                break;
            case 'Motivated':
                tipMessage = "You’re motivated! Use this energy to accomplish something you've been putting off.";
                break;
            case 'Stressed':
                tipMessage = "Stress can take a toll. Take a break, even a short one, and focus on relaxation.";
                break;
            case 'Irritated':
                tipMessage = "Irritation building up? Consider stepping away for a moment of peace.";
                break;
            case 'Depressed':
                tipMessage = "You've been feeling low. It's important to talk to someone or seek support if it persists.";
                break;
            case 'Bored':
                tipMessage = "Maybe it's time to pick up a new hobby or revisit an old one you enjoy!";
                break;
            case 'Lonely':
                tipMessage = "Feeling lonely? Reach out to a friend or loved one, or join an online community.";
                break;
            case 'Frustrated':
                tipMessage = "Frustration is tough. Take a deep breath and break tasks into smaller steps.";
                break;
        }

        tipsSection.innerHTML = `<p><strong>Personalized Tip:</strong> ${tipMessage}</p>`;
    }

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent page refresh

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
        reminder.classList.add('reminder-popup'); // Add class for reminder styling
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
