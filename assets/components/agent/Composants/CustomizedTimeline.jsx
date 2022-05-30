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
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import { Stack, Chip } from "@mui/material";
import ClockIcon from "@mui/icons-material/HourglassBottom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

class CustomizedTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent>Jour 1</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Jeudi 13 Juin 2020</TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent >
            <Stack
              direction="column"
              justifyContent="end"
              alignItems="flex-end"
              spacing={2}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Typography color="primary">08:10</Typography>
                <Typography>Ascension</Typography>{" "}
                <Chip icon={<ClockIcon />} label="5 heures" />
                <Chip icon={<MapIcon />} label="Imlil" color="success" variant="outlined" />
              </Stack>
            </Stack>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <WalkIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://image.shutterstock.com/image-vector/your-media-placeholder-simulate-photo-260nw-2115837101.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );
  }
}
export default CustomizedTimeline