public with sharing class Mangedclass {
    @AuraEnabled(cacheable=true)
    public static Map<String, ConnectApi.ManagedContentNodeValue> getContent(
        String contentId,
        Integer page,
        Integer pageSize,
        String language,
        String filterby
    ) {
        if(contentId!=null && contentId!=''){
            try {
                String networkId = Network.getNetworkId();
                ConnectApi.ManagedContentVersionCollection contentCollection = ConnectApi.ManagedContent.getManagedContentByContentKeys(
                    networkId,
                    new List<String>{ contentId },
                    0,
                    1,
                    language,
                    filterby,
                    false
                );
                return contentCollection.items[0].contentNodes;
            } catch (ConnectApi.ConnectApiException e) {
                System.debug('Error Message : ' + e);
                Map<String, ConnectApi.ManagedContentNodeValue> mcnvMap = new Map<String, ConnectApi.ManagedContentNodeValue>();
                return mcnvMap;
            }
        }else {
            return null;
        }
      
    }

    @AuraEnabled(cacheable=true)
    public static List<ConnectApi.ManagedContentVersion> getContentList(
        Integer page,
        Integer pageSize,
        String language,
        String filterby
    ) {
        try {
            String networkId = Network.getNetworkId();
            ConnectApi.ManagedContentVersionCollection contentCollection = ConnectApi.ManagedContent.getAllManagedContent(
                networkId,
                page,
                pageSize,
                language,
                filterby
            );
            return contentCollection.items;
        } catch (ConnectApi.ConnectApiException e) {
            System.debug('Error Message : ' + e);
            List<ConnectApi.ManagedContentVersion> mcnvMap = new List<ConnectApi.ManagedContentVersion>();
            return mcnvMap;
        }
    }
}
