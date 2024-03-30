let hopDataByDestination = {};
let previousMaxHops = []; 

document.getElementById('tracerouteBtn').addEventListener('click', () => {
    const destination = document.getElementById('destinationInput').value;
    const resultElement = document.getElementById('result');
    const statisticsElement = document.getElementById('statistics');
    resultElement.innerHTML = '';

    fetch(`/traceroute?destination=${destination}`)
        .then(response => {
            const reader = response.body.getReader();
            let decoder = new TextDecoder();
            let partialLine = '';
            let hopData = {};

            return reader.read().then(function processText({ done, value }) {
                if (done) {
                    return hopData;
                }

                const text = partialLine + decoder.decode(value);
                const lines = text.split('\n');

                lines.forEach(line => {
                    resultElement.innerHTML += `<div>${line}</div>`;

                    const match = line.match(/^\s*(\d+)\s+([\d.]+)/);
                    if (match) {
                        const hop = parseInt(match[1]);
                        const ip = match[2];

                        hopData[ip] = hop;
                    }
                });

                partialLine = lines.pop();

                return reader.read().then(processText);
            }).then(hopData => {
                const maxHop = Math.max(...Object.values(hopData));

                if (!hopDataByDestination[destination]) {
                    hopDataByDestination[destination] = [];
                }

                hopDataByDestination[destination].push(maxHop);
                if (hopDataByDestination[destination].length > 10) {
                    hopDataByDestination[destination].shift();
                }

                previousMaxHops = hopDataByDestination[destination];

                updateStatistics(statisticsElement, destination);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            resultElement.textContent = 'Traceroute failed. Please try again.';
        });
});

function updateStatistics(statisticsElement, destination) {
    const statistics = `
        <p><strong>Max Hop for Destination IP (${destination}) for the Last 10 Traceroutes:</strong></p>
        <canvas id="hopMaxChart"></canvas>
    `;
    statisticsElement.innerHTML = statistics;

    renderBarChart('hopMaxChart', previousMaxHops, destination);
}

function renderBarChart(chartId, maxHops, destination) {
    const ctx = document.getElementById(chartId).getContext('2d');
    const labels = Array.from({length: maxHops.length}, (_, i) => `Run ${i + 1}`);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `Max Hop for ${destination}`,
                data: maxHops,
                backgroundColor: '#007bff',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Max Hop'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Traceroute Run'
                    }
                }
            }
        }
    });
}
