import { LightningElement ,api,wire} from 'lwc';
import getContent from '@salesforce/apex/Mangedclass.getContent';
import basePath from '@salesforce/community/basePath';
export default class CmsImagesvalue extends LightningElement {
    
@api contentId
@api title
@api opacityvalue
@api subtitle
@api url;
    renderedCallback() { 

        this.initCSSVariables();

        /* JFYI, use a flag if you only want to run this logic on first render of the component. */

    }
    
@wire(getContent,{
        contentId: '$contentId',
        page: 0,
        pageSize: 1,
        language: 'en_US',
        filterby: ''
    })
    wiredContent({ data, error }) {
        if (data) {
          
           
            this.url =   basePath + '/sfsites/c' + data.source.unauthenticatedUrl;
          
              // this.url = basePath + '/sfsites/c' + this.data.source.url;    
        }if (error) {
            console.log('Error: ' + JSON.stringify(error));
        }
        
    }
    get backgroundStyle() {
        return `height:30rem; background-image:url(${this.url}); opacity:${(this.opacityvalue)/100};   background-size: cover; background-repeat: no-repeat; background-position: center;`;
        }
      
    initCSSVariables() {
        var css = document.body.style;
        css.setProperty('--modalHeight', this.opacityvalue);
        css.setProperty('modelimage', this.url);
    }
    
}