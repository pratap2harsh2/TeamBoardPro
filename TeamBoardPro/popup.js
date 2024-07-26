document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('createPoll').addEventListener('click', function() {
    chrome.tabs.create({ url: chrome.runtime.getURL('create_poll.html') });
  });

  loadPolls();
  setupPomodoro();
});

function loadPolls() {
  chrome.storage.sync.get(['polls'], function(result) {
    const polls = result.polls || [];
    const pollsContainer = document.getElementById('polls');
    pollsContainer.innerHTML = '';
    
    polls.forEach((poll, index) => {
      const pollElement = document.createElement('div');
      pollElement.className = 'poll';
      pollElement.innerHTML = `<h3>${poll.question}</h3>`;
      
      poll.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option;
        pollElement.appendChild(optionElement);
      });

      pollsContainer.appendChild(pollElement);
    });
  });
}

function setupPomodoro() {
  const timerDisplay = document.getElementById('timer');
  let timer;
  let timeLeft = 25 * 60; // 25 minutes in seconds

  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  document.getElementById('startTimer').addEventListener('click', function() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert('Time is up!');
      }
    }, 1000);
  });

  document.getElementById('resetTimer').addEventListener('click', function() {
    if (timer) clearInterval(timer);
    timeLeft = 25 * 60;
    updateDisplay();
  });

  updateDisplay();
}

