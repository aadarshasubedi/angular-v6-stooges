import { typeOf } from './typeof';

export function isFunction(value: any): value is FunctionConstructor {
    return typeOf(value) === 'function';
}