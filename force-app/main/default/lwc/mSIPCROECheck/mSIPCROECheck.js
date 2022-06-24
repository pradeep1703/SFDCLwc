import {LightningElement, api} from 'lwc';
import basePath from '@salesforce/community/basePath';
import bgimagers from '@salesforce/resourceUrl/ASP2';
import getContent from '@salesforce/apex/Mangedclass.getContent';
export default class MSIPCROECheck extends LightningElement {
    @api title = '';
    @api buttonurl = '';
    @api subtext
    @api buttonname
    @api contentId
    @api opacityvalue
    @api url
    @api imagehidden

    get backgroundStyle() {
        return `height:322px; background-image:url(${bgimagers}); opacity:${(this.opacityvalue)/100};   background-size: cover; background-repeat: no-repeat; background-position: center;`;
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
            var res = this.buttonurl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
         
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