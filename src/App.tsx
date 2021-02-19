import { Container } from '@material-ui/core';
import React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import './App.css';
import FormDialog from './application/form/FormDialog';
import BasicAppBar from './application/view/components/BasicAppBar';
import DragDropList from './application/view/dragdroplist/DragDropList';
import { IAppState } from './domain/IAppState';
import { IShopData } from './domain/IShopData';
import { create, remove, reorder, toggle } from './infrastructure/mapper/ShopDataMapper';

export default class App extends React.Component<unknown, IAppState> {
    constructor(Props: unknown) {
        super(Props);

        this.state = {
            items: [
                create('Frozen yoghurt', 1, false),
                create('Ice cream sandwich', 3, false),
                create('Eclair', 1, false),
                create('Cupcake', 1, false),
                create('Gingerbread', 2, false),
            ],
            open: false,
        };

        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    public handleDragEnd(result: DropResult): void {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(this.state.items, result.source.index, result.destination.index);

        this.setState({ ...this.state, items });
    }

    public handleAddition(item: IShopData): void {
        const items = reorder(
            [ ...this.state.items, create(item.name, item.amount, item.checked) ],
            this.state.items.length,
            0,
        );

        this.setState({ ...this.state, items, open: false });
    }

    public render(): JSX.Element {
        const handleToggle = (index: number) => () => {
            const newChecked = toggle(this.state.items, index);
            const items = reorder(newChecked, index, newChecked[index].checked ? (newChecked.length - 1) : index);

            this.setState({ ...this.state, items });
        };

        const handleRemove = (index: number) => () => {
            this.setState({ items: remove(this.state.items, index) });
        };

        return (
            <div className="App">
                <BasicAppBar/>
                <FormDialog
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}
                    handleAddition={this.handleAddition}
                    formData={{ name: '', amount: 1 }}
                />
                <Container style={{ marginTop: 20 }} maxWidth={'md'}>
                    <DragDropList
                        items={this.state.items}
                        onDragEnd={this.handleDragEnd}
                        onDialogOpen={() => this.setState({ open: true })}
                        handleToggle={handleToggle}
                        handleRemove={handleRemove}
                    />
                </Container>
            </div>
        );
    }
}
