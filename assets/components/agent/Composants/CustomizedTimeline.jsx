import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import MapIcon from "@mui/icons-material/Map";
import WalkIcon from "@mui/icons-material/NordicWalking";
import EditIcon from "@mui/icons-material/Edit";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import { Stack, Chip, Avatar, CircularProgress, IconButton } from "@mui/material";
import ClockIcon from "@mui/icons-material/HourglassTop";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import _ from "lodash";
import axios from 'axios';
import moment from 'moment';

class CustomizedTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      progressLoading: 1,
      step_experiences: []
    }
  }
  componentDidMount() {
    this.loadSteps();
  }
  tick() {
    this.setState(state => ({
      progressLoading: state.progressLoading + 20
    }));
  }

  loadSteps = async () => {
    try {
      this.setState({ isLoading: true });
      this.interval = setInterval(() => this.tick(), 100);
      let token = "";
      const instance = axios.create({
        baseURL: `https://127.0.0.1:8000/`,
        headers: { 'Authorization': 'Bearer ' + token }
      });
      let response = null;

      if (this.props.experience) {
        response = await instance.get(
          `api/step_experiences?experience.id=${this.props.experience}`
        );
      }

      const steps = response.data["hydra:member"];
      console.log(steps);

      this.setState({
        step_experiences: steps,
        progressLoading: 10
      });
      clearInterval(this.interval);
    } finally {
      this.setState({ isLoading: false });
    }

  };


  render() {
    const { step_experiences, isLoading, progressLoading } = this.state;

    const groupByJour = _.groupBy(step_experiences, "jour");

    return (<>
      {!isLoading ?
        <Timeline>
          {
            Object.keys(groupByJour).map(jour =>
              <>
                <TimelineItem>
                  <TimelineSeparator >
                    <Chip sx={{ my: 2 }} label={"Jeudi 13 Juin 2020"} color="secondary" variant="outlined" size="large" avatar={<Avatar>{jour}</Avatar>} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                  </TimelineContent>
                </TimelineItem>
                {
                  groupByJour[jour].map((step, index) => (
                    <TimelineItem key={step.id ? step.id : '?'}>
                      <TimelineOppositeContent >
                        <Stack
                          direction="column"
                          justifyContent="end"
                          alignItems="flex-end"
                          spacing={2}
                          sx={{ mt: 2 }}
                        >
                          <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                          >
                            <Typography color="primary"> ~ {step.debut ? moment(step.debut).format('hh:mm') : '?'}</Typography>
                            <Typography>{step.type_etape && step.type_etape.libelle ? step.type_etape.libelle : '?'}</Typography>{" "}
                            <Chip icon={<ClockIcon />} label={(step.duree ? step.duree : "0-") + " heures"} />
                            <Chip icon={<MapIcon />} label={step.destination && step.destination.name ? step.destination.name : '?'} color="success" variant="outlined" />
                          </Stack>
                        </Stack>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot color="secondary" variant="outlined">
                          <IconButton color="secondary" aria-label="EDIT STEP" onClick={()=> this.props.onEditStep(step.id)}>
                            <EditIcon />
                          </IconButton>
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent >
                        <Card sx={{ maxWidth: 345 }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image={step.media && step.media.imageName ? "/images/medias/" + step.media.imageName : "https://image.shutterstock.com/image-vector/your-media-placeholder-simulate-photo-260nw-2115837101.jpg"}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h6" component="div">
                                {step.title ? step.title : '?'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {step.resume ? step.resume : '?'}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </TimelineContent>
                    </TimelineItem>
                  ))
                }
              </>)
          }
        </Timeline>
        : <CircularProgress value={progressLoading} />}</>
    );
  }
}
export default CustomizedTimeline