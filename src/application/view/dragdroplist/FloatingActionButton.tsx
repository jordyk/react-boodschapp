import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { FloatingActionProps } from './IFloatingActionProps';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        fabButton: {
            position: 'absolute',
            bottom: theme.spacing(2),
            left: 0,
            right: 0,
            margin: '0 auto',
        },
    }),
);

export default function FloatingActionButton(Props: FloatingActionProps): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Fab color="primary" aria-label="add" className={classes.fabButton} onClick={Props.onClick}>
                <AddShoppingCartIcon />
            </Fab>
        </div>
    );
}
