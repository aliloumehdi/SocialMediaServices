
exports.signUpErrors = (err) => {
    let errors = {
        username: false, email: false, password: false
    }
    if (err.message.includes('username'))
        errors.username = true

    if (err.message.includes('email'))
        errors.email = true

    if (err.message.includes('password'))
        errors.password = true
    // if (err.code==)
    return errors
}
exports.signInErrors=(err)=>{
    
}