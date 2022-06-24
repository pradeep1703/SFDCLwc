import { LightningElement,wire,api } from 'lwc';
import basePath from '@salesforce/community/basePath';
import getContent from '@salesforce/apex/Mangedclass.getContent';
import bgimagers from '@salesforce/resourceUrl/ASP2';
export default class MSIPCROEGETSTARTEDPAGELEAD extends LightningElement {

   @api contentId
   @api opacityvalue
   @api title
   @api backgroundimageurl='';
   @api subtext;
   @api backgroundfalse;  
  
   get defaultbackground(){
       return`height:456px; background-image:url(${bgimagers})`
   }
 

   @wire(getContent, {contentId:'$contentId', page: 0,  pageSize: 1,language: 'en_US',filterby: ''}) 
   wiredcontent({ data, error }){
       if(data){
           
         if((this.contentId!=''|| this.contentId==undefined)&& this.backgroundfalse==false ){
            
                this.backgroundimageurl=basePath+'/sfsites/c'+data.source.unauthenticatedUrl;
                this.template.querySelector(".bgImage").style.backgroundImage=`url(${this.backgroundimageurl})`;
                this.template.querySelector('.bgImage').style.opacity=`${(this.opacityvalue)*100}`;             
        
                 
            } 
                      
       }
    
 
     
   }


}