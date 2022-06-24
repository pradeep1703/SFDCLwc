import { LightningElement,api } from 'lwc';

export default class WhatsNew extends LightningElement {
@api title;

@api
get titlename(){
    if(this.title=='' || this.title =='undefined'){
      return  false;
    }else{
        return true;
    }
}

}