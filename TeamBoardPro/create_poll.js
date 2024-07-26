document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('addOption').addEventListener('click', function() {
    const option = document.createElement('input');
    option.type = 'text';
    option.className = 'option';
    option.placeholder = `Option ${document.querySelectorAll('.option').length + 1}`;
    document.getElementById('pollForm').insertBefore(option, document.getElementById('addOption'));
  });

  document.getElementById('pollForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const question = document.getElementById('question').value;
    const options = Array.from(document.querySelectorAll('.option')).map(input => input.value);

    chrome.storage.sync.get(['polls'], function(result) {
      const polls = result.polls || [];
      polls.push({ question, options });
      chrome.storage.sync.set({ polls }, function() {
        alert('Poll created successfully!');
        window.close();
      });
    });
  });
});

  