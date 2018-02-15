let auth = require('./auth');
let jsonServer = require('json-server');
let bodyParcer = require('body-parser');

let server = jsonServer.create();
let db = require('./fakerData')();
let router = jsonServer.router(db);

server.use(jsonServer.defaults());
server.use(bodyParcer.urlencoded( { extended: true } ));
server.use(bodyParcer.json());

server.post('/auth/login', (request, response) => {
    let { email, password } = request.body;
    let status = 200;
    auth.users = router.db
        .find((a, b) => { return b === "users" })
        .valueOf();

    if (!auth.isAuthenticated({ email, password })) {
        status = 401;
        response.status(status).json('Incorrect email or password');

        return;
    }

    let accessToken = auth.createToken({ email, password });

    response.status(status).json({ accessToken });
});

server.use((request, response, next) => {
    if (process.env.PROTECTED_ROUTES !== undefined) {
        let protectedRoutes = require(process.env.PROTECTED_ROUTES);
        let isPathProtected = protectedRoutes.find((route) => { return request.url.indexOf(route) !== -1 });

        if (isPathProtected !== undefined) {
            let unauthStatus = 401;

            if (
                request.headers.authorization === undefined ||
                request.headers.authorization.split(' ')[0] !== 'Bearer'
            ) {
                response.status(unauthStatus).json({
                    "status": unauthStatus,
                    "message": "Bad authorization header",
                });

                return;
            }

            try {
                console.log(auth.verifyToken(request.headers.authorization.split(' ')[1]));
                auth.verifyToken(request.headers.authorization.split(' ')[1]);

                next();
            } catch (err) {
                response.status(unauthStatus).json({
                    "status": unauthStatus,
                    "message": "Error: access_token is not valid",
                })
            }
        }

        next();
    } else {
        next()
    }
});

server.use(router);

server.listen(3000, function () {
    console.log("STARTING SERVER");
});
