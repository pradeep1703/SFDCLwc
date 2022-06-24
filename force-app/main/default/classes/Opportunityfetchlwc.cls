public with sharing class Opportunityfetchlwc {
    @AuraEnabled()
    public static List<Opportunity> getopp(String recordId) {
       System.debug('o-->>>>>>>'+recordId);
        return [SELECT Id, Name,Amount,Account.Industry from Opportunity where AccountId = :recordId];
    }
}