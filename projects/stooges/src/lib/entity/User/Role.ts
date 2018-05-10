import { Type, Key } from "../decorators";

export class Role
{
    @Key()
    public Id: number;

    @Type()
    public Name: string;

    @Type()
    public disabled: boolean;
}
