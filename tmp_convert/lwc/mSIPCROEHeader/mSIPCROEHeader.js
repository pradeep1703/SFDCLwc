import { LightningElement,api } from 'lwc';

export default class MSIPCROEHeader extends LightningElement {
   @api title;
   @api Registerquickjump;
    @api
   get rendertemplate(){
         if(this.title == '' || this.title =='undefined'){
                return false;
         }else{
              return true;

   }



}
}