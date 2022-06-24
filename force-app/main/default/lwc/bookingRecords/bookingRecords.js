import { LightningElement,wire,api } from 'lwc';
import getbookrecords from '@salesforce/apex/BookingApexClassLwc.bookinglistrec';
import { NavigationMixin } from 'lightning/navigation';
const columns=[

{label: 'Account', fieldName: 'Account__c'},
{label: 'CarModel', fieldName: 'Car_Model__c'},
{label: 'Year', fieldName: 'Car_Model_Year__c'},
{label: 'Price', fieldName: 'Car_Price__c'},
{label: 'Country', fieldName: 'Country__c'},
{label: 'State', fieldName:'State__c'}

];

export default class BookingRecords extends NavigationMixin( LightningElement) {
columns = columns;
wiredaccounts;
records;
error;
@api recordId;
@wire( getbookrecords, {accountid:'$recordId'} )


wiredbooking(value){

this.wiredaccounts=value;

const { data, error } = value;
if ( data ) {
    this.records = data;
    this.error = undefined;

} else if ( error ) {

this.error = error;
this.records = undefined;

}
}
/*  navigateToNewRecordPage() {
// Opens the new Account record modal
// to create an Account.
this[NavigationMixin.Navigate]({
    type: 'standard__objectPage',
    attributes: {
        objectApiName: 'Bookings__c',
        actionName: 'new'
    }
});
}


callActionRow(event){
const recId =  event.detail.row.Id;  
const actionName = event.detail.action.name; 
if ( actionName === 'Edit' ) {  

    this[NavigationMixin.Navigate]({  
        type: 'standard__recordPage',  
        attributes: {  
            recordId: recId,  
            objectApiName: 'Bookings__c',  
            actionName: 'edit'  
        }  
    })  

} else if ( actionName === 'View') {  

    this[NavigationMixin.Navigate]({  
        type: 'standard__recordPage',  
        attributes: {  
            recordId: recId,  
            objectApiName: 'Bookings__c',  
            actionName: 'view'  
        }  
    })  

}          
}*/
}