import React from 'react';
import { Button, Container, Alert,AlertTitle ,Box, Typography} from "@mui/material";
import { useMoralis } from "react-moralis";
import Create from './Create';
import { Link } from 'react-router-dom'
import './Create.css';

function Metamask() {

   const { authenticate, isAuthenticated, isAuthenticating ,logout, authError} = useMoralis();
   if( isAuthenticated ) {
     return(
<>

<Create />
       {/* <Heading>Welcome to the CRUD app</Heading> */}
       <Link to="/">

       <Button onClick={() => logout()}
         size="lg"
                style={{
                  backgroundColor: "#009879",
                  textTransform: "capitalize",
                  border: "2px solid #009879",
                  fontWeight: "bold",
                  color:'white',
                  textDecoration:'none',
                  marginTop:'5vw',
                 marginLeft:'47vw',
                 padding:'10px',
                }}
                sx={{ borderRadius: 2, mt: 5}}

       >Logout</Button>
       </Link>
</>
     )
   }
  

  return (
  
    <Container>
<Typography  color='black' fontSize='40px' mt={30} ml={42}> Please do authentication here

</Typography>


   {authError && (
    <Alert status='error'>
      <Box>
        <AlertTitle>Authentication has failed</AlertTitle>
        
      </Box>
     
    </Alert>
   )} 
   <div>

       <Button  isLoading={ isAuthenticating} onClick={() => authenticate()}  variant="contained"
                size="lg"
                style={{
                  backgroundColor: "#009879",
                  textTransform: "capitalize",
                  border: "2px solid #009879",
                  fontWeight: "bold",
                  marginTop:'5vw',
                 marginLeft:'35vw'
                }}
                sx={{ borderRadius: 2, mt: 5}}>Authenticate</Button>
       </div>

    </Container>
  );
}

export default Metamask;