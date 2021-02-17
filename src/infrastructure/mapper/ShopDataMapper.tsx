import { IShopData } from '../../domain/IShopData';

export function create(name: string, amount: number, checked: boolean): IShopData {
    return { name, amount, checked };
}

export function reorder(list: IShopData[], startIndex: number, endIndex: number): IShopData[] {
    const result = [ ...list ];
    const [ removed ] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}