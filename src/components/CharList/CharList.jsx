import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

   

import "./CharList.css";

function CharList() {
  const dispatch = useDispatch();
  const [characters, setCharacters] = useState([]);
  const user = useSelector((store) => store.user);

  let newChar = {
    id: user.id,
  };

  const fetchCharacters = () => {
    console.log("in fetchOrders function");

    axios
      .get("/api/characters")
      .then((response) => {
        console.log("RESPONSE:", response.data);
        setCharacters(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchCharacters([]);
  }, []);

  const selectChar = (event) => {
    const id = Number.parseInt(event.target.innerHTML);
    dispatch({ type: "CHAR_ID", payload: id });
    console.log(id);
  };

  const deleteChar = (event) => {

    
    axios
      .delete(`/api/characters/${id}`, id)
      .then((response) => {
        console.log("RESPONSE:", response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Characters</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Level</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Race</TableCell>
              <TableCell align="right">ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters.map((char) => (
              <TableRow
                key={char.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {char.name}
                </TableCell>
                <TableCell align="right">{char.level}</TableCell>
                <TableCell align="right">{char.character_name}</TableCell>
                <TableCell align="right">{char.race}</TableCell>
                <TableCell onClick={selectChar} align="right"><Link to="/charSheet">{char.id}</Link></TableCell>
                <TableCell><button onClick={deleteChar}>Delete</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <button>
        <Link to="/PgOne">New Char</Link>
      </button>
      </TableContainer>
    </div>
  );
}
export default CharList;
