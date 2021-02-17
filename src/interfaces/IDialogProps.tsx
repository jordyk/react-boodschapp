import * as React from 'react';
import { IShopData } from "./IShopData";

export interface IDialogProps {
    open: boolean;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handler: (item: IShopData) => void;
    form: {
        name: string;
        amount: number;
    }
}