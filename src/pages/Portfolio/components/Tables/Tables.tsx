import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PythAbi from '@pythnetwork/pyth-sdk-solidity/abis/IPyth.json';
import { ethers } from 'ethers';

function createData(
  name: string,
  marketPrice: number,
  volumn: number,
  cost: number,
  profit: number,
) {
  return {
    name,
    marketPrice,
    volumn,
    cost,
    profit,
    history: [
      {
        date: '2020-01-05',
        customerId: '0x02136f1EBe65969D10a018aa370FaAa7d35a1a65',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: '3NwSw9xrYf3kNdLCxZenbYgnuoZ3RL9C6EdVmXU7tSr3',
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.marketPrice}</TableCell>
        <TableCell align="right">{row.volumn}</TableCell>
        <TableCell align="right">{row.cost}</TableCell>
        <TableCell align="right">{row.profit}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Clients
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Wallet</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price (USDC)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.cost * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('SOL/USDC', 5000000, 69342.0, 7432543500, 4452352.0),
  createData('ETH/USDC', 200, 659.0, 37654900 ,534623400),
  createData('BTC/USDC', 40000, 64.0, 24654500, 5345982.0),
  createData('LINK/USDC', 15, 6536252.7, 670000, 453463.3),
  createData('XRP/USDC', 0.7, 54353.0, 495345300, 52354234.9),
];

// Arbitrum One
async function getProvider() {
  const contractAddress = '0x178a9995af257C3566A541eCCFd9085093E46A19';
  const provider = ethers.getDefaultProvider('https://arb1.arbitrum.io/rpc');
  const contract = new ethers.Contract(contractAddress, PythAbi, provider);
  
  //BTC/USDC: 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43
  //ETH/USDC: 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace
  const priceId = '<id>';
  const [price, conf, expo, timestamp] = await contract.getPrice(priceId);
}



export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography variant="h6" fontWeight="bold">
                Portfolio 1 
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" fontWeight="bold">
                Market Price&nbsp;(USDC)
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" fontWeight="bold">
                    Volume&nbsp;(K)
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" fontWeight="bold">
                Cost&nbsp;(USDC)
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" fontWeight="bold">
                Profits&nbsp;(USDC)
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
