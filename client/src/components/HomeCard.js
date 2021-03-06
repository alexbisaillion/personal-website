import React from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: 'Kanit, sans-serif'
  },
});


export default function HomeCard(props) {
  const classes = useStyles();
  let link;
  if (props.info.link.endsWith(".pdf")) {
    link = (
      <a href={props.info.link} target="_blank" rel="noopener noreferrer">
        <CardActions>
          <Button size="small" color="primary">
            <span style={{fontFamily: 'Kanit, sans-serif', fontWeight: 600, fontSize: '1.25em', color: '#56B5D9'}}>View</span>
          </Button>
        </CardActions>
      </a>
    );
  } else {
    link = (
      <Link to={props.info.link}>
        <CardActions>
          <Button size="small" color="primary">
            <span style={{fontFamily: 'Kanit, sans-serif', fontWeight: 600, fontSize: '1.25em', color: '#56B5D9'}}>View</span>
          </Button>
        </CardActions>
      </Link>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.info.image}
            title={props.info.title}
          />
          <CardContent>
            <span style={{fontFamily: 'Kanit, sans-serif', fontWeight: 600, fontSize: '2em'}}>{props.info.title}</span>
            <br/>
            <span style={{fontFamily: 'Kanit, sans-serif', fontWeight: 300, fontSize: '1em'}}>
              {props.info.description}
            </span>
          </CardContent>
        </CardActionArea>
        {link}
      </Card>
    </ThemeProvider>
  );
}