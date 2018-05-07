import { isFunction } from "./is-function";

export function fnValue(value: any | (() => any)): any {
    return (isFunction(value)) ? value() : value;
}