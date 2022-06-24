import { LightningElement } from 'lwc';
import { createMessageContext, releaseMessageContext,APPLICATION_SCOPE,subscribe, unsubscribe } from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/msiLmsChannel__c";
export default class MsiHeaderElement extends LightningElement {
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
        const ll=this.template.querySelector(`.${clsname}`);
        console.log('ll-->>'+ll);
        //ll.scrollTo(0,0);
        ll.scrollIntoView();
        console.log('hello-->>'+clsname);
    }
}