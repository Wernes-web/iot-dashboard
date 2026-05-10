const socket = io();

const ctx = document
    .getElementById("moistureChart")
    .getContext("2d");

fetch("/api/moisture")
    .then(res => res.json())
    .then(data => {

        const labels = data.map(row => row.timestamp);
        const values = data.map(row => row.moisture);

        const chart = new Chart(ctx, {

            type: "line",

            data: {
                labels: labels,

                datasets: [{
                    label: "Moisture",
                    data: values,
                    tension: 0.3
                }]
            },

            options: {
                responsive: true,

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        socket.on("moisture-update", (data) => {

            console.log("Live update:", data);

            chart.data.labels.push(data.timestamp);
            chart.data.datasets[0].data.push(data.moisture);

            /*
             Keep chart size manageable
            */
            if (chart.data.labels.length > 50) {

                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
            }

            chart.update();
        });
    });