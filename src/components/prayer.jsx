import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MosqueImage from '../assets/mosque.jpg'; 


export default function MediaCard({name,time}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={MosqueImage}
        title="mosque"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h1" color="text.secondary" style={{fontSize:"4.7rem",fontWeight:"bold"}}>
          {time  }
        </Typography>
    
      </CardContent>
      <CardActions/>

    </Card>
  );
}
