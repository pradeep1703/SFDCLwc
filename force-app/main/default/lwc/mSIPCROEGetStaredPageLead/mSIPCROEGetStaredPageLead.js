import {LightningElement, wire, api} from 'lwc';
import basePath from '@salesforce/community/basePath';
import getContent from '@salesforce/apex/Mangedclass.getContent';
import bgimagers from '@salesforce/resourceUrl/ASP2';
export default class MSIPCROEGETSTARTEDPAGELEAD extends LightningElement {

    @api contentId
    @api opacityvalue
    @api title
    @api backgroundimageurl;
    @api subtext;
    @api backgroundfalse;
    @api get displayconnectioncondition() {
     return title;
    }

    @api get defaultbackground() {
        
        return `background-image:url(${bgimagers}); opacity:${(this.opacityvalue)/100};   background-size: cover; background-repeat: no-repeat; background-position: center;`
    
}
    connectedCallback() {

        if (this.title != null) {

            getContent({
                    contentId: this.contentId,
                    page: 0,
                    pageSize: 1,
                    language: 'en_US',
                    filterby: ''
                })
                .then((result) => {
                    this.backgroundimageurl = basePath + '/sfsites/c' + result.source.unauthenticatedUrl;

                    if (this.backgroundfalse == false) {
                        this.template.querySelector(".bgImage").style.backgroundImage = `url(${this.backgroundimageurl})`;
                        this.template.querySelector('.bgImage').style.opacity = `${(this.opacityvalue)/100}`;

                    }
                    this.error = undefined;

                })
                .catch((error) => {
                    this.error = error;
                    this.url = undefined;
                });
        }

    }

}