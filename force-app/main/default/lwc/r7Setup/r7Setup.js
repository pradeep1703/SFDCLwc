import {
  LightningElement,
  api,
  track
} from 'lwc';

import SAMPLEMC from "@salesforce/messageChannel/DataId__c";

export default class R7Setup extends LightningElement {

  @api subtitle;
  @api stepNo;
  @api title;
  
}