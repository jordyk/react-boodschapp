import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteIcon from "@material-ui/icons/Delete";
import React from 'react';
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
    DropResult
} from "react-beautiful-dnd";
import './App.css';
import BasicAppBar from "./components/BasicAppBar";
import FormDialog from "./components/FormDialog";
import { IAppState } from "./interfaces/IAppState";
import { IShopData } from "./interfaces/IShopData";

function createData(name: string, amount: number, checked: boolean): IShopData {
    return { name, amount, checked };
}

const getItemStyle = (draggableStyle: any, isDragging: boolean, isChecked: boolean): {} => ({
    userSelect: 'none',
    background: isDragging ? 'lightgrey' : 'white',
    opacity: isChecked ? '0.4' : '1.0',
    textDecorationLine: isChecked ? 'line-through' : 'none',
    ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): {} => ({
    background: isDraggingOver ? 'lightblue' : 'white'
});

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
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                            <List
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {this.state.items.map((item, index) => {
                                    const labelId = `item-${index}`;

                                    return (
                                        <Draggable key={index} draggableId={labelId} index={index}>
                                            {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                                                <ListItem
                                                    ref={providedDraggable.innerRef}
                                                    {...providedDraggable.draggableProps}
                                                    {...providedDraggable.dragHandleProps}
                                                    style={getItemStyle(
                                                        providedDraggable.draggableProps.style,
                                                        snapshotDraggable.isDragging,
                                                        item.checked
                                                    )}
                                                    onClick={handleToggle(index)}
                                                >
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            color="primary"
                                                            icon={<CheckBoxOutlineBlankIcon/>}
                                                            checkedIcon={<CheckBoxIcon/>}
                                                            checked={item.checked}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={item.name}
                                                        secondary={"Qty: " + item.amount}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton
                                                            aria-label="delete"
                                                            size="small"
                                                            onClick={handleRemove(index)}
                                                        >
                                                            <DeleteIcon fontSize="inherit"/>
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                    <IconButton
                        aria-label="add"
                        onClick={this.onDialogOpen}
                    >
                        <AddShoppingCartIcon fontSize="large"/>
                    </IconButton>
                </DragDropContext>
            </div>
        );
    };
};
