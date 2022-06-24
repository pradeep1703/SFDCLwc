import {
    LightningElement,api
} from 'lwc';

import { createMessageContext, releaseMessageContext,APPLICATION_SCOPE,subscribe, unsubscribe } from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/sampleLms__c";
export default class SampleLWC1 extends LightningElement {
    context = createMessageContext();
    subscription = null;

    connectedCallback(){
        this.subscribeMC();
    }
    subscribeMC() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.context, SAMPLEMC, (classNameValue) => {
            this.handleMessage(classNameValue);
        },{scope: APPLICATION_SCOPE});
     }
     handleMessage(classNameValue) {       
        console.log('message:::'+JSON.stringify(classNameValue));
        const clsname=classNameValue.name;
        const ll=document.querySelector(`.${clsname}`);
        ll.scrollIntoView();
        console.log('hello-->>'+clsname);
    }
    
}