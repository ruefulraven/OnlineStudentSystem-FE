import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Paper, Button } from '@mui/material';

export default function Student() {
    const paperStyle = {
        padding: '20px 50px',
        width: 600,
        margin: '20px auto'
    }
    const [name, setName]=useState('')
    const [address, setAddress]=useState('')
    const [students, setStudents] = useState([])

    const handeClick = (e)=>{
        const student = {name, address}
        console.log(student)
        fetch("http://localhost:8080/student/addStudent",{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)

        }).then(()=>{
            console.log("New Student added!!")
        }
    )}

    useEffect(()=>{
        fetch("http://localhost:8080/student/getAllStudent")
        .then(res=>res.json())
        .then((result)=>{
          setStudents(result);
        }
      )
      },[])
    return (
        <Container>
            <Paper elevation = {3} style = {paperStyle}>
            <u><h1 style = {{color: "blue"}}>Add Student</h1></u>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { 
                        m: 1 
                    },
                }}
                >
                <form  noValidate autoComplete='off'>
                    <TextField id="standard-basic" label="Student Name" variant="standard" 
                    fullWidth value = {name} onChange = {(e)=>setName(e.target.value)}/>

                    <TextField id="standard-basic" label="Student Address" variant="standard" 
                    fullWidth value = {address} onChange = {(e)=>setAddress(e.target.value)}/>
                     <br></br>
                     <br></br>
                    <Button variant="contained" color= 'secondary' onClick={handeClick}>Submit</Button>
                </form>
                </Box>
                </Paper>
                <h1>Students</h1>
                <Paper elevation = {3} style = {paperStyle}>

                    {students.map(student=>(
                        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
                            Id:{student.id}<br/>
                            Name:{student.name}<br/>
                            Address:{student.address}
                        </Paper>
                    ))
                }

                </Paper>
            
            
        </Container>
    );
}
