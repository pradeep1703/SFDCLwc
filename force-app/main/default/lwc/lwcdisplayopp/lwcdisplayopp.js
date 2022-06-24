import { LightningElement,api,wire } from 'lwc';
import ACC_INDUSTRY from '@salesforce/schema/Account.Industry';
import getopp from '@salesforce/apex/Opportunityfetchlwc.getopp';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import { updateRecord } from 'lightning/uiRecordApi';
export default class Lwcdisplayopp extends LightningElement {
  @api recordId;
  opportunities = [];
/*@wire(getRecord, { recordId: '$recordId',fields:[ACC_INDUSTRY]})
  accrecord({ error, data }){
if(data){
  let caseLang = getFieldValue(data, ACC_INDUSTRY);
   this.setInitialData(this.recordId);
}
}
setInitialData(accountId){
  getopp({recordId:accountId}).then(result=>{
    this.opportunities=result;
  }).catch(error=>{

  })
}*/
@wire(getRecord, {recordId : '$recordId', fields : [ACC_INDUSTRY]}) accountDetails({error, data}){
  if(data){
  const industry = getFieldValue(data, ACC_INDUSTRY);
  console.log('Industry : '+industry);
  this.setInitialData(this.recordId);
  }
  }
  
  
  
  setInitialData(recId) {
  getopp({ recordId: recId })
  .then(result => {
  this.opportunities = result;
  })
  .catch(error => {
  this.opportunities = [];
  })
  }

  
  
}