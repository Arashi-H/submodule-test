import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Button, Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';

import Close from '@mui/icons-material/Close';

import UserImg from '../../assets/img/team-1-800x800.jpg';
import PatientInfoComponent from './patientInfo';

//--- by patrick
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { display } from '@mui/system';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Popover from '@mui/material/Popover';
//end patrick

const patientNum = [];

//--- by patrick
const SearchBar = ({setSearchQuery}) => (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onChange={ (e) => {
            e.preventDefault();
            console.log("search---->", e.target.value);
            setSearchQuery(e.target.value);
          console.log(e)
        }}
        label="Enter a patient name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
      <IconButton aria-label="search" onClick={popDetailSearch}>
        <PersonSearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
);
const filterData = (query, data) => {
    console.log('filterData------------------------')
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.Name.toLowerCase().includes(query));
    }
};
const popDetailSearch = () => {
    const [anchorEl, setAnchorEl] = null;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
        >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover>
    );
}
//end patrick

const Traders = () => {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const [patientNumber, setPatientNumber] = React.useState(0);
    const [state, setState] = React.useState(true);

    
    const patientInfo = (num) => {
        console.log('-------------hi')
        var j = 0;
        patientNum.map((i, index) => {
            if (num === index) {
                j++;
            }
            return (
                <Box key={i + index.toString()}>

                </Box>
            )
        })
        if (j === 0) {
            patientNum.push(num);
        }
        console.log('patientNum:', patientNum)
        
        setPatientNumber(num);
        setState(false);
    }
    
    const patientNab = (num) => {
        setPatientNumber(num);
    };
    
    const closePatientedit = (num) => {
        patientNum.splice(patientNum.indexOf(num), 1);
        setPatientNumber(0);
        setState(!state);
    }
    
    const userArray = [{
        id: 1,
        Name: 'Brandy Hand',
    },{
        id: 2,
        Name: 'Alex Hand',
    },{
        id: 3,
        Name: 'Brandy Guesto',
    }];

    //---by patrick
    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, userArray);
    //end patrick
    console.log("patient number", patientNum);
    return (
        <>
            <DrawerHeader />
            <div style= {{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Box sx={{ paddingLeft: .1, paddingTop: .1}}>
                    <Button
                        sx={{ bgcolor: () => patientNumber === 0 ? '#003847' : 'rgb(0 75 95/1)', color: 'rgb(130 171 183/1)', p: 3 }}
                    >
                        <Typography onClick={() => { patientNab(0) }}>+NEW CHART</Typography>
                    </Button>
                    {patientNum.map((i, index) => {
                        return (
                            <Button
                                key={i + index.toString()}
                                sx={{ bgcolor: () => patientNumber === patientNum[index] ? '#003847' : 'rgb(0 75 95/1)', color: 'rgb(130 171 183/1)', p: 3 }}
                            >
                                <Typography onClick={() => { patientNab(patientNum[index]) }}>Brandy Hand</Typography>
                                <Close onClick={() => closePatientedit(patientNum[index])} />
                            </Button>
                        )
                    })}
                    {/* <Button
                        onClick={handleClick}
                        sx={{ bgcolor: 'rgb(0 75 95/1)', color: '#007e58' }}
                        endIcon={<Close />}
                    >
                        Avg Buy Price
                    </Button> */}
                </Box>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            </div>

            {patientNumber === 0 ?
                <>
                    <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                    </Box >
                    <Box component="main" sx={{ flexGrow: 1, paddingLeft: 5 }}>
                        <Grid container spacing={7}>
                            {dataFiltered.map((i, index) => {
                                return (
                                    <Grid item lg={3} md={6} xs={12} key={i + index.toString()} padding={2} >
                                        <Card sx={{ bgcolor: '#004b5f' }} onClick={() => { patientInfo(i.id) }}>
                                            <CardHeader
                                                sx={{ cursor: 'pointer' }}
                                                avatar={
                                                    <Avatar sx={{ bgcolor: 'white', width: '3.5rem', height: '3.5rem' }} aria-label="recipe">
                                                        <CardMedia
                                                            sx={{ height: 65, width: 65 }}
                                                            component="img"
                                                            image={UserImg}
                                                            alt="Live from space album cover"
                                                        />
                                                        <img src={i.image}></img>
                                                    </Avatar>
                                                }
                                                title={<Typography gutterBottom component="div" sx={{ color: 'rgb(130 171 183/1)' }}>
                                                    {i.Name}
                                                </Typography>}
                                            />
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </>
                :
                <PatientInfoComponent />
            }
            
        </>
    );
}

export default Traders;