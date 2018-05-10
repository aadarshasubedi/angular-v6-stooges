import { Resource, Key, ForeignKey } from '../decorators';
import { User } from './User';
import { forwardRef } from '@angular/core';


export abstract class Character {

    @Key()
    Id: number = 0;

    @ForeignKey('user')
    userId: number;

    @Resource(forwardRef(() => User))
    user: User;
}

