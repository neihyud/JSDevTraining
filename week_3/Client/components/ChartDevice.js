import { useEffect } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

import store from '@/store/store'

function ChartDevice() {
    const devices = store.getState().devices.devices

    let xValues = []
    let yValues = []
    let barColors = []

    devices.forEach((device) => {
        let randomColor =
            'hsl(' +
            360 * Math.random() +
            ',' +
            (25 + 70 * Math.random()) +
            '%,' +
            (85 + 10 * Math.random()) +
            '%)'

        xValues.push(device.name)
        yValues.push(device.power)
        barColors.push(randomColor)
    })


    useEffect(() => {
        var ctx = document.getElementById('char-device').getContext('2d')
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: xValues,
                datasets: [
                    {
                        data: yValues,
                        backgroundColor: barColors,
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
            },
        })
        return () => {
            myChart.destroy()
        }
    }, [devices])

    return (
        <div id="wrapper-char">
            <h3 className="center">Power Consumption</h3>
            <div id="char">
                {/* <Doughnut data={data} /> */}
                <canvas id="char-device"></canvas>
            </div>

            <style jsx>{`
                #wrapper-char {
                    background-color: #fff;
                    box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
                    border-radius: 10px;
                    padding: 20px;
                    width: 46%;
                    max-height: 385px;
                    overflow: auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                #wrapper-char::-webkit-scrollbar {
                    width: 2px;
                    background-color: #f5f5f5;
                }
                /* #wrapper-char::-webkit-scrollbar-thumb {
                    background-color: #c0c0c0;
                    border-radius: 50px;
                } */

                #char {
                    /* height: 100%; */
                    width: fit-content;
                    /* max-height: 385px; */
                }

                #char-device {
                    width: 100% !important;
                    height: 100% !important;
                }
            `}</style>
        </div>
    )
}

export default ChartDevice
