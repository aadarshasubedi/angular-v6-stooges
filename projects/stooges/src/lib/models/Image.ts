// import { ImageMetadata } from '../../modules/entity/decorators';
import { File } from './File';
import { defineHideProperty } from '../common';

export class Image extends File {

    constructor(data?: Partial<Image>) {
        super();
        defineHideProperty(this,'$metadata',null); 
        Object.assign(this, data);
    }

    width: number;
    height: number;
    // $metadata: ImageMetadata; // not enumerable 在 entity parse 的时候会填进去这个值, 这个是专门为了 s-image 而设计的, 纯粹就是为了方便调用, 不然不应该出现在这里的.
}
