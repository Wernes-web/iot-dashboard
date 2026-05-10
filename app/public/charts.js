const ctx = document.getElementById("moistureChart");

fetch("/api/moisture")
    .then(res => res.json())
    .then(data => {

        const labels = data.map(row => row.timestamp);
        const values = data.map(row => row.moisture);

        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Moisture",
                    data: values
                }]
            }
        });
    });