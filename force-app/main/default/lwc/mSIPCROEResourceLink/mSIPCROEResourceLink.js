import { LightningElement,api,wire,track } from 'lwc';

export default class MSIPCROEResourceLink extends LightningElement {
    @api label;
    @api link;
    @api newtab;
}