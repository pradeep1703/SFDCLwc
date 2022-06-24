import { LightningElement,wire } from 'lwc';
import getList from '@salesforce/apex/ContactController.getContactList';
import updated from 'lightning/uiRecordApi';
import apexclass from '@salesforce/apex';
const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];
export default class Contactdatatablelwc extends LightningElement {
    error;
    columns = columns;

     @wire(getList) contacts;

}