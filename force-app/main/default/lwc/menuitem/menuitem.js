import { LightningElement ,track} from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import img from '@salesforce/resourceUrl/images';
export default class Menuitem extends LightningElement {
    llLogo = img + '/images/moto.png';
    @track
    items = [
        {
            id: 'menu-item-1',
            label: 'Set Up',
            value: 'Set Up',
        },
        {
            id: 'menu-item-2',
            label: 'What New',
            value: 'What New',
        },
        {
            id: 'menu-item-3',
            label: 'Accessories',
            value: 'Accessories',
        },
        {
            id: 'menu-item-3',
            label: 'Help',
            value: 'Help',
        },
    ];
 
    handleMenuSelect(event) {
        // retrieve the selected item's value
        const selectedItemValue = event.detail.value;

        // INSERT YOUR CODE HERE
    }
}