import React, { Fragment, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { UsersInterface } from "../models/IUser";
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from "@material-ui/pickers";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from "@date-io/date-fns";


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
   }

const useStyles = makeStyles((theme: Theme) =>

 createStyles({
   root: {flexGrow: 1},
   container: {marginTop: theme.spacing(2)},
   paper: {padding: theme.spacing(2),color: theme.palette.text.secondary},
 })
);
function UserCreate() {

    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
      new Date()
    );
   
    const [user, setUser] = React.useState<Partial<UsersInterface>>({});
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
   
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
   
      if (reason === "clickaway") {
        return;
      }
      setSuccess(false);
      setError(false);
    };
   
   
    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
    };
   
    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof UserCreate;
      const { value } = event.target;
      setUser({ ...user, [id]: value });
    };

    function submit() {
      let data = {
        Treatment: user.Treatment_no ?? "",
        PatientID: user.Patient_ID ?? "",
        DoctorID: user.Doctor_ID ?? "",
        dateRecord: user.record_date ?? "",
        treatment: user.Treatment ?? "",
        Food_type: user.Food_type ?? "",
        Med_ID: user.Med_ID ?? "",
        Med_amount: user.Med_amount ?? "",
        Equipment: user.Equipment_ID ?? "",
        cost: user.Cost ?? "",
      };
   
   
      const apiUrl = "http://localhost:8080/users";
   
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
   
      };
   
   
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setSuccess(true);
          } else {
            setError(true);
          }
        });
    }
   
    return (
   
      <Container className={classes.container} maxWidth="md">
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            บันทึกข้อมูลสำเร็จ
          </Alert>
        </Snackbar>
   
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            บันทึกข้อมูลไม่สำเร็จ
          </Alert>
        </Snackbar>
   
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                บันทึกข้อมูลการรักษา
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Grid container spacing={3} className={classes.root}>
   
            <Grid item xs={6}>
   
              <p>รหัสคนไข้</p>
              <FormControl fullWidth variant="outlined">
                
                <Select
                  id="Patient_ID"
                  variant="outlined"
                  type="string"
                  value={user.Patient_ID || ""}
                >
                    <MenuItem value={1001}>A1001</MenuItem>
                    <MenuItem value={1002}>A1002</MenuItem>
                    <MenuItem value={1003}>A1003</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <p>รหัสแพทย์ผู้บันทึกข้อมูล</p>
              <FormControl fullWidth variant="outlined">
                
                <Select
                  id="DoctorID"
                  variant="outlined"
                  type="string"
                  value={user.Doctor_ID || ""}
                >
                    <MenuItem value={6001}>Dr.Adam</MenuItem>
                    <MenuItem value={6002}>Dr.Paris</MenuItem>
                    <MenuItem value={6003}>Dr.Popo</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>วันที่บันทึกข้อมูล</p>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>

               <KeyboardDatePicker

                 margin="normal"

                 id="record_date"

                 format="yyyy-MM-dd"

                 value={selectedDate}

                 onChange={handleDateChange}

                 KeyboardButtonProps={{

                   "aria-label": "change date",

                 }}

               />

             </MuiPickersUtilsProvider>

           </FormControl>

         </Grid>

            <Grid item xs={6}>

            
              <FormControl fullWidth variant="outlined">
                <p>การรักษาของผู้ป่วย</p>
                <TextField
                  id="treatment"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={user.Treatment || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <p>ประเภทอาหารของผู้ป่วย</p>
              <FormControl fullWidth variant="outlined">
                
                <Select
                  id="Food_type"
                  variant="outlined"
                  type="number"
                  value={user.Food_type || ""}
                >
                    <MenuItem value={1}>3000</MenuItem>
                    <MenuItem value={2}>3001</MenuItem>
                    <MenuItem value={3}>3002</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <p>ยาของผู้ป่วย</p>
              <FormControl fullWidth variant="outlined">
                
                <Select
                  id="Med_ID"
                  variant="outlined"
                  type="string"
                  value={user.Med_ID || ""}
                >
                    <MenuItem value={1}>MED6001</MenuItem>
                    <MenuItem value={2}>MED6002</MenuItem>
                    <MenuItem value={3}>MED6003</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
                <p>จำนวนยาที่ใช้</p>
                <TextField
                  id="Med_amount"
                  variant="outlined"
                  type="number"
                  size="medium"
                  value={user.Med_amount || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
             <p>รหัสอุปกรณ์ที่ใช้กับผู้ป่วย</p>
              <FormControl fullWidth variant="outlined">
            
                <Select
                  id="Med_ID"
                  variant="outlined"
                  type="string"
                  value={user.Med_ID || ""}
                >
                    <MenuItem value={1}>001</MenuItem>
                    <MenuItem value={2}>002</MenuItem>
                    <MenuItem value={3}>003</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
             <p>ค่าใช้จ่ายสุทธิ</p>
                <TextField
                  id="cost"
                  variant="outlined"
                  type="number"
                  size="medium"
                  value={user.Cost || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button component={RouterLink} to="/" variant="contained">
                Back
              </Button>
              <Button
                style={{ float: "right" }}
                onClick={submit}
                variant="contained"
                color="primary"
              >
                บันทึกข้อมูลการรักษา
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
   }
   export default UserCreate;

    