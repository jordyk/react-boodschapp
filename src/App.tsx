import React from 'react';
import { DropResult } from "react-beautiful-dnd";
import './App.css';
import BasicAppBar from "./components/BasicAppBar";
import DragDropList from "./components/DragDropList";
import FormDialog from "./components/FormDialog";
import { IAppState } from "./interfaces/IAppState";
import { IShopData } from "./interfaces/IShopData";

function createData(name: string, amount: number, checked: boolean): IShopData {
    return { name, amount, checked };
}

const reorder = (list: IShopData[], startIndex: number, endIndex: number): IShopData[] => {
    const result = [ ...list ];
    const [ removed ] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export default class App extends React.Component<{}, IAppState> {
    constructor(props: any) {
        super(props);

        this.state = { items: [], open: false };

        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDialogOpen = this.onDialogOpen.bind(this);
    }

    public onDragEnd(result: DropResult): void {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(this.state.items, result.source.index, result.destination.index);

        this.setState({ ...this.state, items });
    }

    public onDialogOpen(): void {
        this.setState({ open: true });
    }

    public render() {
        const handleToggle = (index: number) => () => {
            const newChecked = [ ...this.state.items ]
            newChecked[index].checked = !newChecked[index].checked;
            const items = reorder(newChecked, index, newChecked[index].checked ? (newChecked.length - 1) : index);

            this.setState({ ...this.state, items });
        };

        const handleRemove = (index: number) => () => {
            this.state.items.splice(index, 1);

            this.setState({ ...this.state });
        }

        const handleAddition = (item: IShopData): void => {
            const items = reorder(
                [ ...this.state.items, createData(item.name, item.amount, item.checked) ],
                this.state.items.length,
                0
            );

            this.setState({ ...this.state, items, open: false });
        }

        return (
            <div className="App">
                <BasicAppBar/>
                <FormDialog open={this.state.open}
                            onClose={() => this.setState({ open: false })}
                            handler={handleAddition}
                            form={{ name: "", amount: 1 }}
                />
                <DragDropList items={this.state.items}
                              onDragEnd={this.onDragEnd}
                              onDialogOpen={this.onDialogOpen}
                              onItemToggle={handleToggle}
                              onItemRemove={handleRemove}
                />
            </div>
        );
    };
};
