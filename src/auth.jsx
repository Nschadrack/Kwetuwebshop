class Auth{
    login(cb){
        cb()
    }
    logout(cb){
        cb()
    }

    isAuthenticated(authenticated){
        return authenticated
    }
}

export default new Auth()