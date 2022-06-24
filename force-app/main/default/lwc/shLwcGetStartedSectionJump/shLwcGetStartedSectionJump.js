import {api,LightningElement,track} from 'lwc';
import {createMessageContext,releaseMessageContext,publish,subscribe,unsubscribe} from 'lightning/messageService';
import navMenu from '@salesforce/resourceUrl/navigationmenu';
import sampleLms from "@salesforce/messageChannel/sampleLms__c";
import msiLms from '@salesforce/messageChannel/msiLmsChannel__c';
export default class ShLwcGetStartedSectionJump extends LightningElement {
    navMenuIcon = navMenu;
    navbarclass = 'navbar-links';
    publishtitle;
    context = createMessageContext();
    titleobject = [];
    @api productname;
    @api link;

    // Convert Desktop to Mobile Screen
    toggleMenu() {
        if (this.navbarclass.includes('active')) {
            this.navbarclass = 'navbar-links';
        } else {
            this.navbarclass += '.active';
        }
    }

    // Publisher to send the className to Header component
    handleClick(event) {
        const getClsName = event.target.className;
        const classNameValueforHtml = getClsName;
        const classNameValue = {
            name: classNameValueforHtml,
        };
        publish(this.context, sampleLms, classNameValue);
    }
    
    // Subscribe to load the navigation list item
    connectedCallback() {
        this.subscribeMC();
    }
    subscribeMC() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.context, msiLms, (classNameValue) => {
            this.handleMessage(classNameValue);
        });
    }
    handleMessage(classNameValue) {
        this.titleobject = [...this.titleobject, classNameValue];
    }
}