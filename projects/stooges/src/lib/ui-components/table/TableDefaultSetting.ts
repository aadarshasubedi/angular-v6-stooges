
export class TableSetting {
    constructor(data?: Partial<TableSetting>) {
        Object.assign(this, data);
    }
    page = 1;
    sort: string;
    rowPerPage: number;
    desc = false;
    search?: {
        string?: string[],
        number?: string[],
        date?: string[]
    };
}
