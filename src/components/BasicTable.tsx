import { Checkbox, IconButton } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { IShopData } from "../interfaces/IShopData";

function createData(name: string, amount: number, checked: boolean): IShopData {
    return { name, amount, checked };
}

const rows = [
    createData('Frozen yoghurt', 1, false),
    createData('Ice cream sandwich', 3, false),
    createData('Eclair', 1, false),
    createData('Cupcake', 1, false),
    createData('Gingerbread', 2, false),
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2)
        },
        table: {
            maxWidth: 750,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        tableRow: {
            "&.Mui-selected": {
                textDecoration: 'line-through',
                opacity: 0.3
            }
        }
    }),
);

export default function BasicTable() {
    const classes = useStyles();
    const [ selected, setSelected ] = React.useState<string[]>([]);

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="medium"
                        aria-label="table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">&nbsp;</TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell align="right">Pcs</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.name)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        key={row.name}
                                        selected={isItemSelected}
                                        className={classes.tableRow}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.amount}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete" size="small">
                                                <DeleteIcon fontSize="inherit"/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <IconButton aria-label="add">
                <AddShoppingCartIcon fontSize="large"/>
            </IconButton>
        </div>
    );
}
