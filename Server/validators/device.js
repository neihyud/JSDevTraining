const validatorDevice = (device) => {
    const { name = '', ip = '', power = 0 } = device

    if (!name.trim() || !ip.trim() || power < 1) {
        return 'Name or Ip or Power invalid'
    }

    return ''
}

module.exports = { validatorDevice }
