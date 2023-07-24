let logs = []

let name = [
    'Washer',
    'Tv',
    'Phone',
    'Lamp',
    'Mobile',
    'Fridge',
    'Air',
    'Fan',
    'Electric Cooker',
]
let action = ['Turn On', 'Turn Off', 'Sleep']

for (let i = 1; i < 150; i++) {
    let rn1 = Math.floor(Math.random() * 8) + 1
    let rn2 = Math.floor(Math.random() * 2) + 1
    let log = {
        deviceId: i,
        name: name[rn1],
        action: action[rn2],
        date: '2023-02-25',
    }

    logs.push(log)
}

export const data = { logs }
