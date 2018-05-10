import { EntityConfig, entityConfigToken } from '../Config';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { HttpWatcher } from '../../http/http-watcher.service';
import { EntityService } from '../entity.service';
import { ResourceService } from '../resource.service';
import { User } from './User';

@Injectable({
    providedIn : 'root'
})
export class UserService extends ResourceService<User> {
    constructor(
        http: HttpClient,
        entityService: EntityService,
        httpWatcher: HttpWatcher,
        @Inject(entityConfigToken) entityConfig: EntityConfig
    ) {
        super(http, entityService, User, httpWatcher, entityConfig);
    }
}
