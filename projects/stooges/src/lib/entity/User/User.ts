import { Resources, Roles, Key, Type, Email } from '../decorators';
import { Character } from './Character';
import { Claim } from './Claim';
import { Login } from './Login';
import { Role } from './Role';
import { forwardRef } from '@angular/core';


export class User {

    static entityName = 'users';

    @Key()
    Id: number;

    @Email()
    Email: string;

    @Type()
    EmailConfirmed: boolean;

    @Type()
    UserName: string;

    @Type()
    PhoneNumber: string;

    @Type()
    PhoneNumberConfirmed: boolean;

    @Type()
    TwoFactorEnabled: boolean;

    @Resources(forwardRef(() => Login))
    Logins: Login[];

    @Resources(forwardRef(() => Claim))
    Claims: Claim[];

    @Roles()
    Roles: Role[];

    @Resources(forwardRef(() => Character))
    characters: Character[];
}

