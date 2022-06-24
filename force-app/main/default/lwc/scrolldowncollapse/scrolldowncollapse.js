import {
    api,
    LightningElement,
    track
} from 'lwc';
import {
    createMessageContext,
    releaseMessageContext,
    publish
} from 'lightning/messageService';
import navMenu from '@salesforce/resourceUrl/navigationmenu';
import SAMPLEMC from "@salesforce/messageChannel/sampleLms__c";
export default class Scrolldowncollapse extends LightningElement {
  navMenuIcon=navMenu;
    context = createMessageContext();
    @api productname;
    @api sectionJumpName;
    @api link;
    navbarclass = 'navbar-links';
    
    toggleMenu() {
        if (this.navbarclass.includes('active')) {
            this.navbarclass = 'navbar-links';
        } else {
            this.navbarclass += '.active';
        }
    

    }
 
  
    handleClick(event) {
        const cls = event.target.className;
        const classNameValueforHtml = cls;
        const classNameValue = {
            name: classNameValueforHtml
        };
        publish(this.context, SAMPLEMC, classNameValue);
    }

}