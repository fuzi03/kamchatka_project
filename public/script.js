document.addEventListener('DOMContentLoaded', function() {
    let map;
    const initializeMap = () => {
        if (map) {
            map.remove();
        }

        map = L.map('mapid').setView([56.1378, 159.527], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const attractions = [
            { name: 'Вулкан Ключевская Сопка', coords: [56.0575, 160.6394] },
            { name: 'Долина гейзеров', coords: [54.4918, 160.0005] },
            { name: 'Курильское озеро', coords: [51.4496, 157.1113] }
        ];

        attractions.forEach(function(attraction) {
            L.marker(attraction.coords).addTo(map)
                .bindPopup(attraction.name);
        });
    };

    // Обработка формы обратной связи
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('form-response').textContent = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('form-response').textContent = 'Произошла ошибка при отправке сообщения.';
        });
    });

    // Плавная прокрутка для навигационных ссылок и отображение контента
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            sections.forEach(section => {
                section.style.display = 'none';
            });

            targetSection.style.display = 'block';

            if (targetId === 'attractions') {
                initializeMap();
            }

            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });
});

// Добавьте эту функцию в самый конец файла
function toggleReportForm() {
    const form = document.getElementById('reportForm');
    form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
}

