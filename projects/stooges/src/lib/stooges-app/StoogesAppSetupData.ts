export class StoogesAppSetupData {
    constructor(data: StoogesAppSetupData) {
        Object.assign(this, data);
    }
    titleSuffix : string
    uploadedFilesPath : string
    APIServer : string
}