export class File {
    constructor(data?: Partial<File>) {
        Object.assign(this, data);
    }
    //server path
    src: string;
    /** we use KB */
    size: number;
    name: string;
}
