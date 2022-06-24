import { LightningElement ,api,wire,track} from 'lwc';
import getContent from '@salesforce/apex/Mangedclass.getContent';
import basePath from '@salesforce/community/basePath';

export default class MSIPCROESubHeader extends LightningElement {

    @api title;
    @api detail;
    @api contentId;
    url;
@wire(getContent,{
    contentId: '$contentId',
    page: 0,
    pageSize: 1,
    language: 'en_US',
    filterby: ''
})
wiredContent({ data, error }) {
    if (data) {
      
       
        this.url =   basePath + '/sfsites/c' + data.source.unauthenticatedUrl;
           
           // this.url = basePath + '/sfsites/c' + this.data.source.url;
        
    }if (error) {
        console.log('Error: ' + JSON.stringify(error));
    }
    
}

@api
get rendertemplate(){

    if(this.subheadertitle==''|| this.subheadertitle =='undefined'){
        return false;
    } else {
        return true;
    }
}

}