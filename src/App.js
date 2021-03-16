import './App.css';
import * as XLSX from 'xlsx';
import { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = makeStyles({
  table: {
    minWidth: 700,  
  }
})

function App() {
  const[file, setFile] = useState([])
  const classes = styles();

  const readExcel=(file) =>{
    const promise = new Promise((resolve, reject)=>{
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload=(e)=>{
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, {type:'array'});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {header:1});
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) =>{
      console.log(d)
      setFile(d)
    })
  }

  return (
    <div className="App">
      <div className="container">
         <div className="row justify-content-md-center">
          <input className="col-md-auto int" type="file" onChange={(e) =>{
            const file = e.target.files[0]
            readExcel(file)
          }} />
         </div>
       </div>

        <TableContainer className="container" component={Paper}>
          <Table className={classes.table, "row"} aria-label="simple table">
          {file.map((d) =>(
              <TableHead key={d.name}>
                <TableBody>
                  <TableRow className="col col-md-4">
                    <TableCell className="col" scope="row">
                      {d} 
                    </TableCell>
                  </TableRow>
              </TableBody>
              </TableHead>
          ))}
          </Table>
        </TableContainer>
        
    </div>
  );
}

export default App;
