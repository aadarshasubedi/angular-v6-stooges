 
import { InjectionToken } from "@angular/core";

// provide in root
export class FacebookConfig {
    constructor(data: FacebookConfig) {
        Object.assign(this, data);
    }
    appId: string
    /**
     * e.g. 'v2.8'
     */
    version: string

    // e.g https://www.facebook.com/VisWorksAutolab <-- pageName = VisWorksAutolab
    pageName : string
}

export const FACEBOOK_CONFIG = new InjectionToken<FacebookConfig>('FACEBOOK_CONFIG');



