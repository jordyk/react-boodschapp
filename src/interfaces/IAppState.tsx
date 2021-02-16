import { IShopData } from "./IShopData";

export interface IAppState {
    items: IShopData[];
    open: boolean;
}