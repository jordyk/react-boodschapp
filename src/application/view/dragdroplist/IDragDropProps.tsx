import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { IShopData } from '../../../domain/IShopData';

export interface IDragDropProps {
    onDragEnd(result: DropResult, provided: ResponderProvided): void;
    onItemToggle(index: number): () => void;
    onItemRemove(index: number): () => void;
    onDialogOpen(): void;
    items: IShopData[];
}