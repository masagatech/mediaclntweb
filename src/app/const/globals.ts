export class Globals {
    static weburl: String = window.location.hostname;
    static port: String = '3000';

    serviceurl: String = 'http://' + Globals.weburl + ':' + Globals.port + '/';
    uploadurl: String = 'http://' + Globals.weburl + ':' + Globals.port + '/images/';

    filepath: String = 'www\\uploads\\';
    xlsfilepath: String = 'www\\exceluploads\\';

    // filepath: String = 'www/uploads/';
    // xlsfilepath: String = 'www/uploads/bulkupload/';

    // Functions

    public static getWSDetails() {
        let _wsdetails = sessionStorage.getItem('_wsdetails_');

        if (_wsdetails !== null) {
            return JSON.parse(_wsdetails);
        }
        else {
            return {};
        }
    }

    public static getEntityDetails() {
        let _enttdetails = sessionStorage.getItem('_enttdetails_');

        if (_enttdetails !== null) {
            return JSON.parse(_enttdetails);
        }
        else {
            return {};
        }
    }
}