import { InjectionToken } from '@angular/core';

export let tableConfigToken = new InjectionToken<TableConfig>('tableConfigToken');

export interface TableConfig {
    // 这里和 LanguageModule 是完全不一样的概念哦
    // LanguageModule 是说 App 的 language
    // 这里的是 table 处理的 language 
    defaultLanguage: string,
    supportedLanguages: string[]
}



