import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client/client-service';
import { Subscription } from 'rxjs';
import {
    MqttService,
    IMqttMessage
} from 'ngx-mqtt';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
    templateUrl: 'dashboard.comp.html',
    providers: [ClientService, MqttService],
    styleUrls: ['./dashboard.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
    clients: any = [];
    selectedClient = { clientid: '', status: { status: 'offline', mac: '', iplocal: '' } };
    private subscriptions: Subscription[] = [];
    private subscription: Subscription;
    src: any = '';
    cpudet = {
        cpu: 0,
        ram: 0,
        freemem: 0,
        totlmem: 0,
        freememper: 0,
        totdisk: 0,
        freedisk: 0,
        temp: '0',
        cpuct: 0,
        useddisk: 0,
    };


    settings = {
        orientation: 'normal',
        url: '',
        persist: false,
    };
    interval: any;

    constructor(private _router: Router, private _clients: ClientService,
        private _mqttService: MqttService, private _sanitizer: DomSanitizer
        , private toastr: ToastrService) {

        this._mqttService.onConnect.subscribe((data) => {
            console.log('dadsdasdsa', data);
        });
        this._mqttService.connect();
    }

    ngOnInit() {
        this.ClientRefresh();
        const that = this;
        this.interval = setInterval(function () {
            that.ShowDevInfo();
        }, 3000);
    }

    onClientClick(item) {
        this.clearSettings();
        this.selectedClient = item;
        this.cpudet = {
            cpu: 0,
            ram: 0,
            freemem: 0,
            totlmem: 0,
            freememper: 0,
            totdisk: 0,
            freedisk: 0,
            temp: '0',
            cpuct: 0,
            useddisk: 0,
        };
        this.getclientDetails(item.clientid);
        this.subscribestatus();
    }

    private clearSettings() {
        this.settings.url = '';
        this.settings.persist = false;
        this.settings.orientation = 'normal';
    }


    ClientRefresh() {
        const that = this;
        this.unsuball();
        that._clients.getClients({}).subscribe((data) => {
            that.clients = data.data;
            for (let i = 0; i < that.clients.length; i++) {
                const element = that.clients[i];
                const datas = {
                    status: 'offline',
                    mac: '',
                    iplocal: ''
                };
                element['status'] = datas;
                const topic = 'client/' + element['clientid'] + '/status';
                const sub = that._mqttService.observe(topic).subscribe((message: IMqttMessage) => {
                    try {
                        const parsedata = JSON.parse(message.payload.toString());
                        datas.status = parsedata.status;
                        datas.mac = parsedata.mac;
                        datas.iplocal = parsedata.iplocal;

                    } catch (error) {

                    }

                    element['status'] = datas;
                    console.log(element);

                }, (console.error), () => {
                    console.log('done');
                });
                this.subscriptions.push(sub);
            }

        });
    }




    UpdateName() {
        this._clients.updateClient({ 'clientid': this.selectedClient.clientid, 'name': this.selectedClient['name'] }).subscribe((data) => {
            if (data.status) {
                this.toastr.success(data.data, 'Success', { positionClass: 'toast-top-center', timeOut: 2000 });
            } else {
                this.toastr.error(data.err, 'Error', { positionClass: 'toast-top-center', timeOut: 8000 });
            }
        });
    }

    ShowDevInfo() {
        const data = {
            func: 'devinfo'
        };
        const topic = 'client/' + this.selectedClient['clientid'] + '/cmd';
        this._mqttService.publish(topic, JSON.stringify(data)).subscribe((res) => {

        }, (error) => {
        }, () => {
        });
    }

    UpdateSettings() {
        this._clients.updateClient({
            'clientid': this.selectedClient.clientid,
            'state': this.settings
        }).subscribe((data) => {

            console.log(data);

        });
    }

    sendMessageToClient(msg, cmd) {
        const data = {
            data: null,
            func: msg
        };
        switch (msg) {
            case 'screenshot':
                $('#selected').waitMe({});
                break;
            case 'url':
                data.data = {
                    'url': this.settings.url,
                    'persist': this.settings.persist
                };
                this.settings.url = this.settings.url;
                this.settings.persist = this.settings.persist;
                this.UpdateSettings();
                break;
            case 'rotate':
                data.data = {
                    'orientation': cmd
                };
                this.settings.orientation = cmd;
                this.UpdateSettings();
                break;

        }
        const topic = 'client/' + this.selectedClient['clientid'] + '/cmd';
        this._mqttService.publish(topic, JSON.stringify(data)).subscribe((res) => {
            console.log('res', res);
            this.toastr.success('Sent!', '', { positionClass: 'toast-top-center', timeOut: 1000 });
        }, (error) => {
            console.log('res', error);
            this.toastr.success(error, 'Error', { positionClass: 'toast-top-center', timeOut: 8000 });
        }, () => {
            console.log('complete');
        });

        // this.unsafePublish(topic, JSON.stringify(data));

    }

    private subscribestatus() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        const topic = 'client/' + this.selectedClient['clientid'] + '/msg';
        this.subscription = this._mqttService.observe(topic).subscribe((message: IMqttMessage) => {
            const data = JSON.parse(message.payload.toString());
            switch (data.cmd) {
                case 'screenshot':
                    this.src = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                        + data.data);

                    $('#selected').waitMe('hide');
                    break;
                case 'devinfo':
                    const d = data.data.split('|');
                    this.cpudet.cpu = parseFloat(d[0]);
                    this.cpudet.temp = parseFloat(d[8]).toFixed(2);
                    this.cpudet.totlmem = d[3];
                    this.cpudet.totdisk = parseFloat(d[6]);
                    this.cpudet.freedisk = parseFloat(d[7]);
                    this.cpudet.useddisk = this.cpudet.totdisk - this.cpudet.freedisk;
                    break;
                default:
                    break;
            }
            console.log(JSON.parse(message.payload.toString()));
        });
    }

    private getclientDetails(clientid) {
        this._clients.getClientDetails({ 'clientid': clientid }).subscribe((data) => {
            console.log(data.data);
            const d = data.data;
            this.selectedClient['offlinetm'] = d.offlinetm;

            if (d.state === undefined) {
                d.state = this.settings;
            }

            this.settings.orientation = d.state.orientation || 'normal';
            this.settings.url = d.state.url || '';
            this.settings.persist = d.state.persist || false;
        });
    }


    public unsafePublish(topic: string, message: string): void {
        this._mqttService.unsafePublish(topic, message, { qos: 0, retain: false });
    }

    private unsuball() {
        if (this.subscriptions.length > 0) {
            for (let i = 0; i < this.subscriptions.length; i++) {
                const sub = this.subscriptions[i];
                try {
                    sub.unsubscribe();
                } catch (error) {

                }
            }
        }
    }

    public ngOnDestroy() {
        this.unsuball();
        if (this.interval) {
            clearInterval(this.interval);
        }

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this._mqttService.disconnect();

    }

}