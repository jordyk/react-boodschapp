import { IShopData } from '../../domain/IShopData';

export function create(name: string, amount: number, checked: boolean): IShopData {
    return { name, amount, checked };
}

export function remove(list: IShopData[], index: number): IShopData[] {
    const result = [ ...list ];
    result.splice(index, 1);

    return result;
}

export function reorder(list: IShopData[], startIndex: number, endIndex: number): IShopData[] {
    const result = [ ...list ];
    const [ removed ] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

export function toggle(list: IShopData[], index: number): IShopData[] {
    const result = [ ...list ];
    result[index].checked = !result[index].checked;

    return result;
}