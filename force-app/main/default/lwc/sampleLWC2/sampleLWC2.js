import { LightningElement } from 'lwc';
import { createMessageContext, releaseMessageContext,publish} from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/sampleLms__c";
export default class SampleLWC2 extends LightningElement {
    context = createMessageContext();
  
    datapassvalue(){
        const val=this.template.querySelector('.smapleclass2').className;
        
        console.log(val.offsetTop);
        console.log(val);
        const classNameValue={
         name:val
        };
        publish(this.context, SAMPLEMC, classNameValue);
    }
}