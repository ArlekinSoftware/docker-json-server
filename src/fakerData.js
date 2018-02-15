let fakerWrapper = require('json-schema-faker');

module.exports = () => {
    let schemaPath = process.env.JSON_SCHEMA_PATH;
    fakerWrapper.extend('faker', () => {
        return require('faker');
    });

    return fakerWrapper(require(schemaPath));
};
