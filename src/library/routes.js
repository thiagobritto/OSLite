
module.exports = class Routes {
    constructor(document) {
        this.getDocument = document;
        this.routesReload();
    }

    getParams(params){
        let paramsOBJ = {}
        for (let i = 1; i < params.length; i++){
            if (params[i].indexOf(':') > -1){
                paramsOBJ[params[i].split(':')[0]] = params[i].split(':')[1] 
            } else {
                paramsOBJ[i] = params[i]
            }
        }
        return paramsOBJ
    }

    routesReload(document = false) {
        document = document ? document : this.getDocument();
        [...document.links].forEach( link => {
            let href = link.href.split('#')[1]
            if (href){
                let params = this.getParams(href.split('/'))
                if (this[href.split('/')[0]]){
                    link.onclick = (e) => {
                        let event = {
                            params: params,
                            document: document,
                            target: e.target,
                            e: e
                        }
                        let callEvent = this[href.split('/')[0]](event)
                        if (callEvent) this.routesReload(callEvent.document)
                    }
                }
            }
        })
    }
}
