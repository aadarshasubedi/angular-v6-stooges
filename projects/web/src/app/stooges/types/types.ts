import { Observable, SubscriptionLike as ISubscription } from 'rxjs';

export type AM_PM = 'AM' | 'PM';
export type ObjectFix = 'contain' | 'cover';
export interface HourAM_PM { hour: number; AM_PM: AM_PM; }
export interface QueryParams { [propName: string]: string | null; } // null 表示拿掉
export type QueryParamsFnValue = QueryParams | (() => QueryParams);
export type Constructor<T = any> = new (...args: any[]) => T;
export interface IEntity { Id: number; }
export interface Stream<T> { data$: Observable<T>; subscription: ISubscription; refreshAsync: (newQueryParamsFnValue?: QueryParamsFnValue) => Promise<void>; }
export interface Dimension { width: number; height: number; }
export interface XY { x: number; y: number; }
export interface Crop { x: number; y: number; width: number; height: number; }
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
