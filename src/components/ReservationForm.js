import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import api from "axios";
import { isNumeric } from "lodash";
import { Form } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateAndTimePickers({
  shouldShow = false,
  handleChange,
  table,
  timeTo,
  timeFrom,
}) {
  const [tables, setTables] = useState([]);
  console.log(table, timeTo, timeFrom);

  const fetchData = async () => {
    try {
      let { data } = await api.get(
        `/tables?from=${new Date(timeFrom).toISOString()}&to=${new Date(
          timeTo
        ).toISOString()}`
      );
      const tableIds = data.map((table) => table.id);
      setTables(tableIds);
    } catch (e) {}
  };

  useEffect(() => {
    if (table && timeTo && timeFrom) {
      fetchData();
    }
  }, [table, timeTo, timeFrom]);
  const classes = useStyles();

  return (
    shouldShow && (
      <>
        <form className={classes.container} noValidate>
          <Form.Group>
            <Form.Label>Select a Table</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleChange({ table: e.target.value })}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
          </Form.Group>
          <TextField
            id="datetime-local"
            label="Start Time"
            type="datetime-local"
            defaultValue={new Date()}
            className={classes.textField}
            onChange={(e) => handleChange({ timeFrom: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="datetime-local"
            label="End Time"
            type="datetime-local"
            defaultValue={new Date()}
            className={classes.textField}
            onChange={(e) => handleChange({ timeTo: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          Available Tables:{tables.join(" ")}
        </form>
      </>
    )
  );
}
