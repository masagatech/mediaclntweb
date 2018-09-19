export class Globals {
    static weburl: string = window.location.hostname;
    static port: string = "3000";

    serviceurl: string = "http://" + Globals.weburl + ":" + Globals.port + "/";
    uploadurl: string = "http://" + Globals.weburl + ":" + Globals.port + "/images/";

    filepath: string = "www\\uploads\\";
    xlsfilepath: string = "www\\exceluploads\\";

    // filepath: string = "www/uploads/";
    // xlsfilepath: string = "www/uploads/bulkupload/";

    // Functions

    public static getWSDetails() {
        let _wsdetails = sessionStorage.getItem("_wsdetails_");

        if (_wsdetails !== null) {
            return JSON.parse(_wsdetails);
        }
        else {
            return {};
        }
    }

    public static getEntityDetails() {
        let _enttdetails = sessionStorage.getItem("_enttdetails_");

        if (_enttdetails !== null) {
            return JSON.parse(_enttdetails);
        }
        else {
            return {};
        }
    }
}