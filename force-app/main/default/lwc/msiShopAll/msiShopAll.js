import {LightningElement,api,wire} from 'lwc';
import { NavigationMixin} from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';
import getContent from '@salesforce/apex/Mangedclass.getContent';
import bgimagers from '@salesforce/resourceUrl/ASP2';
import { createMessageContext, releaseMessageContext,publish} from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/DataId__c";
export default class MsiShopAll extends NavigationMixin(LightningElement) {
    context = createMessageContext();
    @api title = '';
    @api buttonurl = '';
    @api buttonname
    @api contentId
    @api opacityvalue
    @api url
    @api imagehidden
    scrollOver1 ='scrollover1';
    get backgroundStyle() {
        return `height:202px; background-image:url(${bgimagers}); opacity:${(this.opacityvalue)/100};   background-size: cover; background-repeat: no-repeat; background-position: center;`;
    }

    connectedCallback() {
        const message = {recordid:this.scrollOver1};
        console.log('ttt--->>'+message );
       publish(this.context, SAMPLEMC,message  );
        if (this.title != null) {
            getContent({
                    contentId: this.contentId,
                    page: 0,
                    pageSize: 1,
                    language: 'en_US',
                    filterby: ''
                })
                .then((result) => {
                    this.url = basePath + '/sfsites/c' + result.source.unauthenticatedUrl;
                    this.error = undefined;

                    if (this.imagehidden == false) {
                        this.template.querySelector(".backgroundStyle").style.backgroundImage = `url(${this.url})`;

                    }
                    this.template.querySelector(".backgroundStyle").style.opacity = `${(this.opacityvalue)/100}`;
                   
                })
                .catch((error) => {
                    this.error = error;
                    this.url = undefined;
                });
        }

    }
  
    @api
    get displayconnectioncondition() {
        if (this.title != '' && this.buttonurl != '') {
           
            var res = this.buttonurl.match();
            if (res == null) {

                return false;
            } else {
                return true;
            }
        } else {

            return false;
        }
    }
    navigateurl(event) {
        this.url = event.currentTarget.dataset.value;

        if (this.url != '') {
            window.open(this.url, "_target");
        }


    }

}