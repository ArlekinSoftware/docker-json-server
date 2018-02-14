import jwt from 'jsonwebtoken'

export default {
    users: null,

    createToken: function (payload){
        let expires = process.env.JWT_EXPIRES_IN;

        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expires })
    },

    verifyToken: function (token){
        return  jwt.verify(
            token,
            process.env.JWT_SECRET_KEY,
            (err, decode) => decode !== undefined ?  decode : err
        )
    },

    isAuthenticated: function ({email, password}){
        return this.users.findIndex( user =>
            user.email === email && user.password === password
        ) !== -1
    }
}
