// Масив для зберігання випадкових подій
let events = [];

// Функція для додавання нової події
function addEvent() {
    const eventName = document.getElementById('eventName').value;
    const eventProbability = parseFloat(document.getElementById('eventProbability').value);

    // Перевірка на валідність та додавання події
    if (eventName && !isNaN(eventProbability) && eventProbability >= 0 && eventProbability <= 1) {
        events.push({ name: eventName, probability: eventProbability });
        updateEventList();
        alert('Event successfully added!');
    } else {
        alert('Please enter valid event details.');
    }
}

// Функція для оновлення списку подій
function updateEventList() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    // Додавання кожної події до списку
    for (const event of events) {
        const listItem = document.createElement('li');
        listItem.textContent = `${event.name} (${event.probability})`;
        eventList.appendChild(listItem);
    }
}

// Функція для запуску симуляції
function runSimulation() {
    const simulationCount = parseInt(document.getElementById('simulationCount').value);
    const resultsList = document.getElementById('resultsList');
    const statisticsContainer = document.getElementById('statisticsContainer');
    
    // Очищення виведених результатів та статистики
    resultsList.innerHTML = '';
    statisticsContainer.innerHTML = '';

    // Об'єкт для зберігання кількості кожної події
    let eventOccurrences = {};

    // Запуск симуляцій
    for (let i = 0; i < simulationCount; i++) {
        const result = simulateEvent();
        const listItem = document.createElement('li');
        listItem.textContent = `Simulation ${i + 1}: ${result}`;
        resultsList.appendChild(listItem);

        eventOccurrences[result] = (eventOccurrences[result] || 0) + 1;
    }

    // Виведення статистики
    for (const event in eventOccurrences) {
        const statisticItem = document.createElement('div');
        statisticItem.textContent = `${event}: ${eventOccurrences[event]}`;
        statisticsContainer.appendChild(statisticItem);
    }
}

// Функція для симуляції випадкової події
function simulateEvent() {
    const randomValue = Math.random();
    let cumulativeProbability = 0;

    // Перебір подій
    for (const event of events) {
        cumulativeProbability += event.probability;
        if (randomValue <= cumulativeProbability) {
            return event.name;
        }
    }

    return 'No event';
}
