import React, { useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';

type Column = {
  id: string;
  label: string;
  format?: (value: string | number) => string
};

const columns: Column[] = [
  { id: 'date', label: 'Date/Time of the transaction' },
  { id: 'correspondent', label: 'Correspondent Name' },
  { id: 'amount', label: 'Transaction amount' },
  { id: 'balance', label: 'Resulting balance' }
];

type Props = {

}

export const Transactions = () => {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', width: '100%', marginBottom: 8, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button style={{ backgroundColor: '#e1bee7' }}>
          Transfer Money
        </Button>
      </div>
      <div>
        <Paper style={{ width: '100%' }}>
          <TableContainer style={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>

              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  )
};
