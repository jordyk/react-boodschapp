import * as React from 'react';
import { IShopData } from '../../domain/IShopData';

export interface IDialogProps {
    open: boolean;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleAddition: (item: IShopData) => void;
    formData: {
        name: string;
        amount: number;
    }
}