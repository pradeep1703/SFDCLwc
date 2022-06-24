import {LightningElement,api,wire} from 'lwc';
import {createMessageContext,releaseMessageContext,APPLICATION_SCOPE,subscribe,unsubscribe,publish} from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/sampleLms__c";
import msiLms from '@salesforce/messageChannel/msiLmsChannel__c';
export default class MSIPCROEHeader extends LightningElement {
   context = createMessageContext();
   subscription = null;
   classNameValue;
   classTitleName;
   @api title;
   @api navgationLinkName;
   @api registerquickjump;
   @api
   get rendertemplate() {
      if (this.title == '' || this.title == 'undefined') {
         return false;
      } else {
         return true;
      }
   }
   // Publish the title name and class name to navigation bar or section Jump
   connectedCallback() {
      this.subscribeMC();
      if(this.title){
         const classtitle = this.title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
         this.classTitleName=classtitle;
          this.classNameValue = {
            name: classtitle,
            title: this.title,
         };
      }
      if (this.registerquickjump) {
         setTimeout(() => {
            publish(this.context, msiLms, this.classNameValue);
         }, 200)
      }
   }

  // Subscribe to scrollover the class name
   subscribeMC() {
      if (this.subscription) {
         return;
      }
      this.subscription = subscribe(this.context, SAMPLEMC, (classNameValue) => {
         this.handleMessage(classNameValue);
      });
   }
   handleMessage(classNameValue) {
      const clsname = classNameValue.name;
      if(clsname===this.classTitleName){
        const ll = this.template.querySelector(`.${clsname}`);
        ll.scrollIntoView({ behavior: "smooth" });
      }  
   }

   disconnectedCallback() {
      this.unsubscribeToMessageChannel();
   }
   unsubscribeToMessageChannel() {
      unsubscribe(this.subscription);
      this.subscription = null;
   }
   dispatchToast(error) {
      this.dispatchEvent(
         new ShowToastEvent({
            title: 'Error loading contact',
            message: reduceErrors(error).join(', '),
            variant: 'error',
         })
      );
   }
}