const {AllRoutes} = require("./router/router");

module.exports = class Application {
    #express = require("express");
    #app = this.#express();
    constructor(PORT, DB_URL) {
        this.configApplication();
        this.configDatabase(DB_URL);
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    }

    configApplication() {
        const path = require("path");
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended: true}));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
    }

    createServer(PORT) {
        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server Run > on http://localhost:${PORT}`);
        });
    }

    configDatabase(DB_URL) {
        const mongoose = require("mongoose");

        mongoose
            .connect(DB_URL)
            .then(() => {
                console.log("connected to mongodb");
            })
            .catch(error => console.log(error));
    }

    errorHandler() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                sucsess: false,
                message: " صفحه با آدرس مورد نظر یافت نشد",
            });
        });
        this.#app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || "InternalServerError";
            return res.status(status).json({
                status,
                sucsess: false,
                message,
            });
        });
    }

    createRoutes() {
        this.#app.get("/", (req, res, next) => {
            return res.json({message: "this is a new Express aplication"});
        });
        this.#app.use(AllRoutes);
    }
};
