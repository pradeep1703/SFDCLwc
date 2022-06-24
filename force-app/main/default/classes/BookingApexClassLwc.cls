public with sharing class BookingApexClassLwc {
    @AuraEnabled(cacheable=true)


Public static  List<Bookings__c> bookinglistrec(String accountid){
    List<Bookings__c> books=[select id,Account__c,Car_Model__c,Car_Model_Year__c,Car_Price__c,Country__c,State__c, Name from Bookings__c where Account__c=:accountid ];
return books;
}
}