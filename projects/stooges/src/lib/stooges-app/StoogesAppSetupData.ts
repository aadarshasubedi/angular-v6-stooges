import { TitleMetaDescriptionConfig } from "../common/services/title-meta-description-config";
import { UploadedPathConfig } from "../common/services/uploaded-path-config";
import { APIServerConfig, DeviceConfig } from "../common/services";
import { LanguageConfig } from "../language/language-config";

export class StoogesAppSetupData {
    constructor(data: Partial<StoogesAppSetupData>) {
        Object.assign(this, data);
    }
    titleMetaDescriptionConfig : TitleMetaDescriptionConfig
    uploadedPathConfig : UploadedPathConfig
    APIServerConfig: APIServerConfig
    languageConfig = new LanguageConfig();
    deviceConfig = new DeviceConfig();
    
}