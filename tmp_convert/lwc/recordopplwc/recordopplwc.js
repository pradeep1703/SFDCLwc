import { LightningElement,api,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
 /* eslint-disable no-console */
 /* eslint-disable no-alert */
import opportunitylwcstate from '@salesforce/apex/opportunitylwc.opportunitylwcstate';
export default class RecordIdExample extends LightningElement {
     @api recordId;
      @wire(opportunitylwcstate, {accId:'$recordId'})
       opportunities(result){
            this.opportunitylwcstate = result;
            
      }
}