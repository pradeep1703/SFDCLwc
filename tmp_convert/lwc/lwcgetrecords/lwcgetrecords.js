import { LightningElement,api,wire } from 'lwc';
import getContacts from '@salesforce/apex/lwcfetchrecord.getContacts';
export default class Lwcgetrecords extends LightningElement {
    @api recordId;
    @wire(getContacts, {accId:'$recordId' })
      contacts;
}