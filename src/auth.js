let jwt = require('jsonwebtoken');

module.exports = {
    users: null,

    createToken: (payload) => {
        let expiresIn = process.env.JWT_EXPIRES_IN;

        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
    },

    verifyToken: (token) => {
        return  jwt.verify(
            token,
            process.env.JWT_SECRET_KEY,
            (err, decode) => decode !== undefined ?  decode : err
        );
    },

    isAuthenticated: function ({email, password}) {
        return this.users.findIndex( user =>
            user.email === email && user.password === password
        ) !== -1;
    },
};
