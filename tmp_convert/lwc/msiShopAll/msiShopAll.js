import { LightningElement,api,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';
import getContent from '@salesforce/apex/Mangedclass.getContent';
import bgimagers from '@salesforce/resourceUrl/ASP2';
export default class MsiShopAll extends NavigationMixin(LightningElement) {
@api title='';
@api subtext
@api buttonurl='';
@api buttonname
@api contentId
@api opacityvalue
@api url
@api imagehidden
@api
get displayconnectioncondition(){
if(this.title != '' && this.buttonurl !=''){
var res = this.buttonurl.match();
if (res == null) {

return false;
}else{
return true;
}
}else{

return false;
}
}
get backgroundStyle() {
    return `height:205px; background-image:url(${bgimagers}); opacity:${(this.opacityvalue)*100};   background-size: cover; background-repeat: no-repeat; background-position: center;`;
    }
    @wire(getContent,{
        contentId: '$contentId',
        page: 0,
        pageSize: 1,
        language: 'en_US',
        filterby: ''
    })
    wiredContent({ data, error }) {
        if (data) {
          
           if((this.contentId!=''|| this.contentId==undefined)&& this.imagehidden==false ){
            this.url =   basePath + '/sfsites/c' + data.source.unauthenticatedUrl;
            this.template.querySelector(".backgroundStyle").style.backgroundImage=`url(${this.url})`;
            this.template.querySelector(".backgroundStyle").style.opacity=`${(this.opacityvalue)*100}`;
                 // this.url = basePath + '/sfsites/c' + this.data.source.url;    
        }
    }
        if (error) {
            console.log('Error: ' + JSON.stringify(error));
        }
        
    }
    urlclick(){
        const config = {
            type: 'standard__webPage',
            attributes: {
                url: 'http://salesforcecasts.com'
            }
        };
        this[NavigationMixin.Navigate](config);
    }

   
}