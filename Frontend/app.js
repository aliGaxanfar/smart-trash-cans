document.addEventListener('DOMContentLoaded', function () {
    // The data provided by the endpoint
    const data = [
        { id: 1, status: "empty", location: "dfsd" },
        { id: 2, status: "ghazanfar", location: "ghazam" },
        { id: 3, status: "Sam", location: "Yaseen" },
        { id: 4, status: "Safi", location: "Gupis" },
        { id: 5, status: "jjjj", location: "jjjj" },
        { id: 6, status: "Overflowed", location: "Jandrote" },
        { id: 7, status: "filled", location: "35.6895° N, 139.6917° E" },
        { id: 8, status: "empty", location: "Ishkoman" }
    ];

    // Initialize counts for empty and filled bins
    let emptyCount = 0;
    let filledCount = 0;

    // Iterate through the data to count the statuses
    data.forEach(item => {
        if (item.status.toLowerCase() === 'empty') {
            emptyCount++;
        } else if (item.status.toLowerCase() === 'filled') {
            filledCount++;
        }
    });

    // Data for the pie chart
    const chartData = {
        labels: ['Empty Bins', 'Filled Bins'],
        datasets: [{
            data: [emptyCount, filledCount],
            backgroundColor: ['#FF6384', '#36A2EB']
        }]
    };

    // Get the context of the canvas element we want to select
    const ctx = document.getElementById('myPieChart').getContext('2d');

    // Create the pie chart
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Bin Status'
                }
            }
        }
    });
});
