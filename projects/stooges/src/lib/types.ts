import { Observable, SubscriptionLike as ISubscription } from 'rxjs';

export type AM_PM = 'AM' | 'PM';
export type ObjectFix = 'contain' | 'cover';
export interface QueryParams { [propName: string]: string | null; } // null 表示拿掉
export type QueryParamsFnValue = QueryParams | (() => QueryParams);
export type Constructor<T = any> = new (...args: any[]) => T;
export interface Entity { Id: number; }
export interface ResourceStream<T> { data$: Observable<T>; subscription: ISubscription; refreshAsync: (newQueryParamsFnValue?: QueryParamsFnValue) => Promise<void>; }
export interface Dimension { width: number; height: number; }
export interface XY { x: number; y: number; }
export interface CropData { x: number; y: number; width: number; height: number; }
export interface Dictionary { [prop: string]: any; }
export interface Metadata {
    key: string,
    value: any
}
export type CompareType = 'eq' | 'gt' | 'ge' | 'lt' | 'le';

// 只是让我知道有多少个 routeData 还有方便调用而已
// 没有任何 type protect 的作用的
export interface RouteData {
    title?: any;
    metaDescription?: any;
    robotsRule?: any;
    authGuardRole?: any;
    authLoginPath?: any;
    authNoRolePath?: any;
}

export enum KeyCode {
    arrowLeft = 37,
    arrowUp = 38,
    arrowRight = 39,
    arrowDown = 40,
    escape = 27,
    enter = 13,
    delete = 46,
    space = 32,
    backspace = 8
}