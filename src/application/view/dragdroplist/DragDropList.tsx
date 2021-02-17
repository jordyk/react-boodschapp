import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot
} from "react-beautiful-dnd";
import FloatingActionButton from "./FloatingActionButton";
import { IDragDropProps } from "./IDragDropProps";

export default function DragDropList(Props: IDragDropProps) {
    const getItemStyle = (draggableStyle: any, isDragging: boolean, isChecked: boolean): {} => ({
        userSelect: 'none',
        background: isDragging ? 'lightgrey' : 'white',
        borderBottom: '1px solid #e8e8e8',
        opacity: isChecked ? '0.4' : '1.0',
        textDecorationLine: isChecked ? 'line-through' : 'none',
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean): {} => ({
        background: isDraggingOver ? 'lightblue' : 'white'
    });

    return (
        <DragDropContext onDragEnd={Props.onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <List
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {Props.items.map((item, index) => {
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
                                            onClick={Props.onItemToggle(index)}
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
                                                secondary={"Quantity: " + item.amount}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={Props.onItemRemove(index)}
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
            <FloatingActionButton onClick={Props.onDialogOpen} />
        </DragDropContext>
    );
}