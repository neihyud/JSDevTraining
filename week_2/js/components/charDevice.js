export function drawChar(infoCharDevice) {
    let xValues = []
    let yValues = []
    let barColors = []

    for (const device in infoCharDevice) {
        xValues.push(device)
        yValues.push(infoCharDevice[device].value)
        barColors.push(infoCharDevice[device].color)
    }

    new Chart('char-device', {
        type: 'doughnut',
        data: {
            labels: xValues,
            datasets: [
                {
                    backgroundColor: barColors,
                    data: yValues,
                },
            ],
        },
        options: {
            title: {
                display: true,
                text: 'Power Consumption',
                font: {
                    size: 30,
                    family: 'Comic Sans MS',
                    weight: 'bold',
                    lineHeight: 1.2,
                },
            },
        },
    })
}
