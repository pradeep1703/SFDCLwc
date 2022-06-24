import { LightningElement, api, wire } from 'lwc';
import getContent from '@salesforce/apex/MangedClass.getContent';
import basePath from '@salesforce/community/basePath';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

export default class CmsImageWithTitle extends NavigationMixin(LightningElement) {
    @api action;
    @api contentId;
    
    cmsData;
    @api set selected(value) {
        this._selected = value;
        if (!this.cmsData) return;
        if (this._selected) {
            this.handleMouseOver();
        } else {
            this.handleMouseOut();
        }
    }
    get selected() {
        return this._selected;
    }
    @api title;

    @wire(CurrentPageReference)
    pageReference({ state }) {
        if (state && state.type && state.type === this.action) {
            this.dispatchEvent(
                new CustomEvent('imageselected', {
                    detail: {
                        action: this.action
                    } 
                })
            );
        }
    }

    @wire(getContent, {contentId: '$contentId', page: 0,
        pageSize: 1,
        language: 'en_US',
        filterby: ''
    })
    wiredContent({ data, error }) {
        console.log('dtat'+data);
        if (data) {
        
            this.cmsData = data;
            console.log('CmsData--->>'+stringify.JSON(data));
            if (this._selected && this.cmsData.selectedImageAltText) {
                this.altText = this.cmsData.selectedImageAltText.value;
                this.url = basePath +'/sfsites/c' + this.cmsData.selectedImage.unauthenticatedUrl;
                    console.log('thimage-->>'+ this.cmsData.selectedImage.unauthenticatedUrl);
            } else if (this.cmsData.unselectedImageAltText) {
                this.altText = this.cmsData.unselectedImageAltText.value;
                this.url =
                    basePath +
                    '/sfsites/c' +
                    this.cmsData.unselectedImage.unauthenticatedUrl;
                    console.log('thimage2-->>'+ this.cmsData.selectedImage.unauthenticatedUrl);
            } else {
                this.altText = this.cmsData.altText.value;
                this.url = basePath + '/sfsites/c' + this.cmsData.source.url;
                console.log('thimage3-->>'+ this.cmsData.selectedImage.unauthenticatedUrl);
            }
        }
        if (error) {
            console.log('Error: ' + JSON.stringify(error));
        }
    }

    altText;
    url;

    _hover;
    _isRendered;
    _selected;

    handleClick() {
        if (this.action !== undefined) {
            this.altText = this.cmsData.selectedImageAltText.value;
            this.url =
                basePath +
                '/sfsites/c' +
                this.cmsData.selectedImage.unauthenticatedUrl;
            this.dispatchEvent(
                new CustomEvent('imageselected', {
                    detail: {
                        action: this.action
                    }
                })
            );
            this._selected = true;
        }
    }

    handleMouseOver() {
        this.altText = this.cmsData.selectedImageAltText.value;
        this.url =
            basePath +
            '/sfsites/c' +
            this.cmsData.selectedImage.unauthenticatedUrl;
    }

    handleMouseOut() {
        if (!this._selected) {
            this.altText = this.cmsData.unselectedImageAltText.value;
            this.url =
                basePath +
                '/sfsites/c' +
                this.cmsData.unselectedImage.unauthenticatedUrl;
        }
    }

    get wrapperCss() {
        return this.action !== undefined
            ? `slds-grid slds-text-align_center slds-wrap action`
            : 'slds-grid slds-text-align_center slds-wrap';
    }

    get imgCss() {
        return this._selected ? 'selected' : '';
    }
}