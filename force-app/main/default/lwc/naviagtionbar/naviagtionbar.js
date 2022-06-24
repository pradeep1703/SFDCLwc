import {
    LightningElement,
    wire
} from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/sampleLms__c';
export default class Naviagtionbar extends LightningElement {


    subscription = null;
   
    headers = [{
        name: 'd',
        position: 0
    }]
    @wire(MessageContext)
    messageContext;
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message, this.headers), {
                    scope: APPLICATION_SCOPE
                }
            );
        }
    }
    handleMessage(message) {
        console.log('message:::2-->>'+JSON.stringify(message));
        let subValue=message.name;
         this.positionvale=message.position;
        this.headers = this.headers.concat([{
            name: message.name,
            position: message.position
        }]);
    }
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleScrollClick() {
        console.log('aa-->>'+this.positionvale);
        let sc=this.positionvale;
        scrollTo({top:sc});
      // Element.scrollTo({top:this.positionvale}); 
        /*const topDiv = this.template.querySelector('.scrollOver');
        topDiv.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        });*/
    }
    handleclickpar(){
        console.log('hwll');
        const varclass=this.template.querySelectorAll('div.setup');
        console.log('nav-->>'+varclass.l);
    }

}