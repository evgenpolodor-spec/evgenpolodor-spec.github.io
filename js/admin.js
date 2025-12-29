document.addEventListener('DOMContentLoaded', () => {
    const candidates = document.querySelectorAll('.cond .kart a');
    const form = document.getElementById('voteForm');
    const candidateInput = document.getElementById('candidateInput');
    const messageDiv = document.getElementById('message');
    const voteKey = 'Vote2025-admingoda'; // Меняй на новый год при следующем голосовании

    // Если уже голосовал
    if (localStorage.getItem(voteKey) === 'true') {
        messageDiv.textContent = 'Вы уже проголосовали! Спасибо за участие ❤️';
        messageDiv.className = 'message already';
        candidates.forEach(a => a.classList.add('voted'));
        return;
    }

    candidates.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            if (localStorage.getItem(voteKey) === 'true') {
                messageDiv.textContent = 'Вы уже проголосовали!';
                messageDiv.className = 'message already';
                return;
            }

            const name = link.getAttribute('data-name');

            if (confirm(`Ты уверен, что ${name} — лучший админ года?`)) {
                candidateInput.value = name;

                fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        messageDiv.innerHTML = `Спасибо! Твой голос за <strong>${name}</strong> успешно отправлен 🎉`;
                        messageDiv.className = 'message success';
                        localStorage.setItem(voteKey, 'true');
                        candidates.forEach(a => a.classList.add('voted'));
                    } else {
                        throw new Error('Ошибка сервера');
                    }
                })
                .catch(() => {
                    messageDiv.innerHTML = 'Ошибка отправки 😢<br>Попробуй позже или напиши нам в телегу.';
                    messageDiv.className = 'message error';
                });
            }
        });
    });
});