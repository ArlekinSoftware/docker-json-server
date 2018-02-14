import faker from 'faker';

const ENVIRONMENTS = [
    "JSON_DB",
    "JSON_SCHEMA"
];

let readDataFromEvs = (environments) => {
    let result = {};

    environments.forEach( (envVar) => {
        let requirePath = "./../runtime/" + envVar + ".json";
        if (process.env[envVar] !== undefined) {
            requirePath = process.env[envVar];
        }

        result[envVar] = require(requirePath);
    });

    return result;
};

let generateDb = () => {
    let db = {};
    let dataFromEnvs = readDataFromEvs(ENVIRONMENTS);

    for (let key in dataFromEnvs.JSON_SCHEMA) {
        db[key] === undefined ? db[key] = [] : void 0;
        for (let i=1; i <= dataFromEnvs.JSON_SCHEMA[key].count; i++) {
            let data = {};
            for (let field in dataFromEnvs.JSON_SCHEMA[key].schema) {
                data[field] = faker.fake(dataFromEnvs.JSON_SCHEMA[key].schema[field]);
            }

            db[key].push(data);
        }
    }

    for (let key in dataFromEnvs.JSON_DB) {
        db[key] === undefined ? db[key] = [] : void 0;
        db[key] = db[key].concat(dataFromEnvs.JSON_DB[key]);
    }

    console.log(db);

    return db;
};

export default {
    readDataFromEvs: readDataFromEvs,
    generateDb: generateDb
};