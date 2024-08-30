const SPEED_OF_CHAT_ANIMATION = 1;

function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  document.getElementById('current-time').textContent = `Today, ${timeString}`;
}
updateTime();
setInterval(updateTime, 60000);

document.addEventListener('DOMContentLoaded', () => {
  const introTexts = document.querySelectorAll('.intro h1');

  introTexts.forEach((text, index) => {
    setTimeout(() => {
      text.classList.add('animate');
    }, 200 * index); // 200ms stagger between each element
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const words = document.querySelectorAll('.intro .word');

  words.forEach((word, index) => {
    setTimeout(() => {
      word.classList.add('animate');
    }, 100 * index); // 100ms stagger between each word
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const timeElement = document.getElementById('current-time');
  const messages = document.querySelectorAll('.message:not(.loading)');
  const loadingMessage = document.querySelector('.message.loading');
  const calendlyButton = document.querySelector('button');

  // Speed control (0 to 1, where 1 is the fastest)
  const speed = SPEED_OF_CHAT_ANIMATION; // You can adjust this value

  // Hide all messages, time, and the button initially
  timeElement.style.opacity = '0';
  messages.forEach(message => {
    message.style.display = 'none';
    message.style.opacity = '0';
    message.style.transform = 'translateY(20px)';
  });
  loadingMessage.style.opacity = '0';
  calendlyButton.style.display = 'none';
  calendlyButton.style.opacity = '0';

  function revealTime() {
    timeElement.style.transition = 'opacity 0.5s ease';
    timeElement.style.opacity = '1';
  }

  function revealMessageContent(index) {
    if (index < messages.length) {
      const message = messages[index];
      message.style.display = 'block';
      
      setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
      }, 50 / speed);

      const words = message.textContent.split(' ');
      message.textContent = '';
      
      words.forEach((word, wordIndex) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.opacity = '0';
        message.appendChild(span);
        
        setTimeout(() => {
          span.style.transition = 'opacity 0.3s ease';
          span.style.opacity = '1';
        }, (wordIndex * 100) / speed);
      });

      setTimeout(() => revealMessageContent(index + 1), (words.length * 100 + 1000) / speed);
    } else {
      loadingMessage.style.opacity = '1';
      loadingMessage.style.transform = 'translateY(0)';
      
      // Show the Calendly button after a short delay
      setTimeout(() => {
        calendlyButton.style.display = 'block';
        setTimeout(() => {
          calendlyButton.style.opacity = '1';
          calendlyButton.style.transform = 'translateY(0)';
        }, 50);
      }, 1000 / speed);
    }
  }

  // Start the sequence: time, then messages
  setTimeout(() => {
    revealTime();
    setTimeout(() => revealMessageContent(0), 500 / speed);
  }, 500 / speed);
});


// Cool SHIT

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.querySelector('.intro');
  const vimeoContainer = document.getElementById('vimeo-container');
  const iframe = vimeoContainer.querySelector('iframe');
  const blurOverlay = document.getElementById('blur-overlay');
  const player = new Vimeo.Player(iframe);

  let isHovering = false;

  intro.addEventListener('mouseenter', () => {
    isHovering = true;
    vimeoContainer.classList.remove('hidden');
    setTimeout(() => {
      if (isHovering) {
        vimeoContainer.classList.add('visible');
        blurOverlay.style.opacity = '1';
        player.play().then(() => {
          player.setVolume(1);
        }).catch((error) => {
          console.error('Error playing video:', error);
        });
      }
    }, 50);
  });

  intro.addEventListener('mouseleave', () => {
    isHovering = false;
    vimeoContainer.classList.remove('visible');
    blurOverlay.style.opacity = '0';
    player.pause().catch((error) => {
      console.error('Error pausing video:', error);
    });
    setTimeout(() => {
      if (!isHovering) {
        vimeoContainer.classList.add('hidden');
      }
    }, 300);
  });

  intro.addEventListener('mousemove', (e) => {
    if (!vimeoContainer.classList.contains('hidden')) {
      const rect = intro.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      iframe.style.left = `${x}px`;
      iframe.style.top = `${y}px`;
    }
  });
});