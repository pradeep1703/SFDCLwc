public class singleemail {
    public void singleemailvv(){
list<contact> con=[select id,email from contact];
 for(contact c:con){
   messaging.SingleEmailMessage msg=new messaging.SingleEmailMessage();
string[] email=new string[]{c.Email};
msg.setToAddresses(email);
string body='dear customer';
msg.setplaintextbody(body);
msg.setsubject('Take care of sfdc');
Messaging.Email[] emails=new Messaging.Email[]{msg};
Messaging.sendEmail(emails);
    }
    }
}