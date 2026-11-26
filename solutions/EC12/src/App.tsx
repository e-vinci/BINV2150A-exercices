import { Button, Paper, Stack, Typography } from '@mui/material'
import Chronometre from './components/Chronometre'
import Horloge from './components/Horloge'
import { useState } from 'react';
import Message from './components/Message';
import CompteARebours from './components/CompteARebours';

function App() {

  const [masque, setMasque] = useState<boolean>(false);


  return (
    <Stack spacing={3} sx={{ maxWidth: 600, mx: "auto", p: 3 }}>

      <Typography variant="h4"> 
        EC12 - Les timers 
      </Typography>

      <Paper sx={{ p: 3 }}> 
        <Chronometre/> 
      </Paper>


      <Paper sx={{ p: 3 }}>

        {masque ? "L'horloge est masquée" : <Horloge />}

        <Button onClick={() => setMasque(prev => !prev)}>
          {masque ? "Afficher l'horloge" : "Masquer l'horloge"}
        </Button>

      </Paper>

      <Paper sx={{ p: 3 }}>
        <Message />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <CompteARebours />
      </Paper>

    </Stack>
  )
}

export default App;
