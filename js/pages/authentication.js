$(document).ready(() => {
    initEvent()
})

let initEvent = () => {
    // Submit
    $('#account-access button').click((event) => {
        event.preventDefault()

        let username = $('#js-form-login .username').val()
        let password = $('#js-form-login .password').val()

        if (username == '' || password == '') {
            $('#js-form-login .form-message').text(
                'Username or Password empty!'
            )

            $('#js-form-login .form-message').show()

            setTimeout(() => {
                $('#js-form-login .form-message').hide()
            }, 2000)
        } else if (username == 'john' && password == '1234') {
            $('#js-form-login').submit()
        } else {
            $('#js-form-login .form-message').text(
                'Username or Password invalid!'
            )

            $('#js-form-login .form-message').show()

            setTimeout(() => {
                $('#js-form-login .form-message').hide()
            }, 2000)
        }
    })

}
