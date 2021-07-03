

module.exports = class Routes {
    constructor(document, routes) {
        this.getDocument = document;
        this.routes = routes;
        this.routesReload();

    }

    routesReload(document = false) {
        document = document ? document : this.getDocument();
        [...document.links].forEach(link => {
            this.routes.forEach(route => {
                if (link.href.split('#')[1] == route) {
                    link.onclick = (e) => this[route]({
                        params: JSON.parse(
                            e.target.getAttribute('data-params')
                        ),
                        document: document,
                        target: e.target,
                        event: e
                    })
                }
            })
        })
    }
}
