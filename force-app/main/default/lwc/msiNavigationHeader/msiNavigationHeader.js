import { api, LightningElement } from 'lwc';
import {createMessageContext,releaseMessageContext,publish} from 'lightning/messageService';
import navigationfile from '@salesforce/resourceUrl/navigationmenu.png'
import SAMPLEMC from "@salesforce/messageChannel/msiLmsChannel__c";
export default class MsiNavigationHeader extends LightningElement {
    @api productname;
    @api link
    navbarclass = 'topnav.responsive';
    context = createMessageContext();
    handleClick() {
        const classNameValueforHtml=this.template.querySelector('.setUp').className;
       console.log('classNameValueforHtml-->>'+classNameValueforHtml);
        const classNameValue = {
            name: classNameValueforHtml
        };
       publish(this.context, SAMPLEMC, classNameValue);
    }
 
      
      toggleMenu() {
          if (this.navbarclass.includes('responsive')) {
              this.navbarclass = 'topnav';
          } else {
              this.navbarclass += 'responsive';
          }
  
      }
}