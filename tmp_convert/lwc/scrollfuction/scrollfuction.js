import { LightningElement } from 'lwc';

export default class Scrollfuction extends LightningElement {
    value = '1';
    get options() {
        return [
            { label: 'Set Up', value: '1' },
            { label: 'Whats New', value: '2' },
            { label: 'Accessories', value: '3' },
            { label: 'Help', value: '4' }
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        let containerChoosen = this.template.querySelector('.container_' + this.value);
        containerChoosen.scrollIntoView();
    }
}