export default class ConsoleLog {

    private isDebug : boolean = true;
    private startTime : number = 0;

    constructor() {
        if( process.env.VUE_APP_FIRESTORE_CONFIG === 'production' ) {
            this.isDebug = false;
        }

        if( this.isDebug ) {
            this.startTime = Date.now();
        }
    }

    log( ...data: any[] ) {
        if( !this.isDebug ) return;
        console.log( Date.now() - this.startTime, ...data );
    }
}


const consoleLog = new ConsoleLog();

export {
    consoleLog
}