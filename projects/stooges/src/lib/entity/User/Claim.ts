import { Key, Type } from "../decorators";

export class Claim {
    
    @Key()
    Id: number;

    @Type()
    UserId: number;

    @Type()
    ClaimType: string;

    @Type()
    ClaimValue: string;
}
