import { api, LightningElement,wire } from 'lwc';
import getContent from '@salesforce/apex/Mangedclass.getContent';
import basePath from '@salesforce/community/basePath'
export default class MSIPCROE3DIMAGE extends LightningElement {
    @api contentId
    @api backgroundimageurl ='';
    
    @wire(getContent, {contentId:'$contentId', page: 0,  pageSize: 1,language: 'en_US',filterby: ''}) 
    wiredcontent({ data, error }){
        if(data){
            this.backgroundimageurl=basePath+'/sfsites/c'+data.source.unauthenticatedUrl;
        }
    }
    handleClick() {
        this.backgroundimageurl = !this.backgroundimageurl;
    }
}