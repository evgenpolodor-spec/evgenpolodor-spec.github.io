document.addEventListener('DOMContentLoaded', () => {
    const candidates = document.querySelectorAll('.kart .card');
    const form = document.getElementById('voteForm');
    const candidateInput = document.getElementById('candidateInput');
    const messageDiv = document.getElementById('message');
    const voteKey = 'editVote2025'; // Уникальный ключ для этой номинации

    if (localStorage.getItem(voteKey) === 'true') {
        messageDiv.textContent = 'Вы уже проголосовали! Спасибо за участие ❤️';
        messageDiv.className = 'message already';
        candidates.forEach(card => card.classList.add('voted'));
        return;
    }

    candidates.forEach(card => {
        card.addEventListener('click', (e) => {
            // Не голосовать, если кликнули по ссылке или кнопке
            if (e.target.closest('a') || e.target.closest('button')) return;

            if (localStorage.getItem(voteKey) === 'true') {
                messageDiv.textContent = 'Вы уже проголосовали!';
                messageDiv.className = 'message already';
                return;
            }

            const name = card.getAttribute('data-name');

            if (confirm(`Ты уверен, что эдит "${name}" — лучший эдит года?`)) {
                candidateInput.value = name;

                fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                })
                .then(response => {
                    if (response.ok) {
                        messageDiv.innerHTML = `Спасибо! Твой голос за <strong>${name}</strong> отправлен 🎉`;
                        messageDiv.className = 'message success';
                        localStorage.setItem(voteKey, 'true');
                        candidates.forEach(c => c.classList.add('voted'));
                    } else {
                        throw new Error('Ошибка сервера');
                    }
                })
                .catch(() => {
                    messageDiv.innerHTML = 'Ошибка отправки 😢<br>Попробуй позже.';
                    messageDiv.className = 'message error';
                });
            }
        });
    });
});