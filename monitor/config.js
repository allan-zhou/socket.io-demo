var config = {
    host: "localhost",
    port: 3000,
    socketUri: "",
    redis:{}
}

config.socketUri = `http://${config.host}:${config.port}`;
config.redis = {
    host: "localhost",
    port:6379,
    db:1
};

module.exports = config;