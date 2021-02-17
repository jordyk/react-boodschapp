import { AppBar, createStyles, IconButton, Theme } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { IDialogProps } from "./IDialogProps";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

export default function FormDialog(Props: IDialogProps) {
    const classes = useStyles();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        switch (e.target.name) {
            case 'name':
                Props.form.name = e.target.value;
                break;
            case 'amount':
                Props.form.amount = parseInt(e.target.value);
                break;
        }
    }

    const onSubmit = (): void => {
        Props.handler({
            name: Props.form.name,
            amount: Props.form.amount,
            checked: false
        })
    }

    return (
        <Dialog fullScreen open={Props.open} onClose={Props.onClose} aria-labelledby="add-to-list">
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={Props.onClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Add to list
                    </Typography>
                    <Button color="inherit" onClick={onSubmit}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <TextField
                    autoFocus
                    name="name"
                    label="Name"
                    type="text"
                    onChange={onChange}
                    fullWidth
                />
                <TextField
                    name="amount"
                    label="Quantity"
                    type="number"
                    onChange={onChange}
                    fullWidth
                />
            </DialogContent>
        </Dialog>
    );
}
