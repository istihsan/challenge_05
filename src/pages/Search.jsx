import {
    Box,
    Button,
    Container,
    Card,
    CardMedia,
    Typography,
    CardActions,
    CardContent,
  } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormPencarian from './components/DropdownBox';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCar } from '../redux/action/carAction';
import { saveDetailByID } from '../redux/action/detailAction';

function Search(){
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading: loadingCar, data: carData } = useSelector((state) => state.car);

  useEffect(() => {
    dispatch(getCar());
  }, []);


  return (
    <div style={{ minHeight: '100vh' }}>
    <Navbar />

    <Box sx={{ minHeight: 150, backgroundColor: '#F1F3FF;', fontFamily:['Helvetica'] }}></Box>
    <FormPencarian />
    <center>{loading && "Loading Data"}</center> 
    
    <form>
    <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
    {loadingCar ? 'loading data ...'
    : carData.map((item) => {
      return(
        <Card key={item.id} sx={{marginY:"3%", marginX: "0.25%" }}>
          <CardMedia
                  component="img"
                  image={item.image}
                  alt="img-car" 
                  sx={{maxHeight: "20vh", minHeight:'20vh'}}
          />
          <CardContent>
              <p>{item.name}</p>
              <Typography gutterBottom variant="h6" component="div">
                Rp {item.price} / hari
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </Typography>
              <p><img src="/fi_users.png" alt="" style={{marginRight:'4%'}}/>4 orang</p>
              <p><img src="/fi_settings.png" alt="" style={{marginRight:'4%'}}/>Manual</p>
              <p><img src="/fi_calendar.png" alt="" style={{marginRight:'4%'}}/>Tahun 2020</p>
          </CardContent>
          <CardActions>
          <Link to={`/DetailMobil/${item.id}`} onClick={()=> dispatch(saveDetailByID(item))}>
        <Button color="success" variant="contained" fullWidth>Pilih Mobil</Button></Link>
      </CardActions>
    </Card>
      );
    })}
    </Container>
    </form>
    
    <Footer />
  </div>
);
}

export default Search;