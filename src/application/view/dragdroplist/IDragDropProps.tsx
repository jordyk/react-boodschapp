import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { IShopData } from '../../../domain/IShopData';

export interface IDragDropProps {
    onDragEnd(result: DropResult, provided: ResponderProvided): void;
    handleToggle(index: number): () => void;
    handleRemove(index: number): () => void;
    onDialogOpen(): void;
    items: IShopData[];
}