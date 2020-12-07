import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  seminarCard: {
    // display: "flex",
    // flexDirection: "column",
    height: "100%",
    // justifyContent: "space-between",
  },
  date: {
    textAlign: "center",
    fontSize: 10,
  },
  // wrapIcon: {
  //   verticalAlign: "middle",
  //   display: "inline-flex",
  //   marginBottom: theme.spacing(0.5),
  // },
  // icon: {
  //   marginRight: theme.spacing(1),
  //   color: theme.palette.primary.main,
  // },
}));

const truncate = (str) => {
  return str.length > 280 ? str.substring(0, 280) + "..." : str;
};

const SeminarCard = (props) => {
  const { seminar } = props;
  const classes = useStyles();

  const startDay = moment(seminar.start_time).format("D");
  const startMonth = moment(seminar.start_time).format("MMM").toUpperCase();

  return (
    <Card variant="outlined" className={classes.seminarCard}>
      <CardActionArea component={RouterLink} to={`/seminar/${seminar.id}`}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="seminar"
              variant="rounded"
              className={classes.avatar}
            >
              <span className={classes.date}>
                <b style={{ fontSize: 12 }}>{startDay}</b>
                <br />
                {startMonth}
              </span>
            </Avatar>
          }
          action={
            <IconButton
              aria-label="clear"
              color="secondary"
              onClick={() => console.log("CLEAR")}
            >
              <ClearIcon />
            </IconButton>
          }
          title={<b>{seminar.title}</b>}
          subheader={
            moment(seminar.start_time).format("H:mm") +
            " - " +
            moment(seminar.end_time).format("H:mm")
          }
        />

        <CardContent>
          <Typography variant="body2" component="p">
            {truncate(seminar.description)}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Rating
            name={`rating-${seminar.id}`}
            defaultValue={0}
            precision={0.5}
            onChange={(e) => console.log("change rating")}
          />

          {!seminar.serves_food && (
            <Tooltip title="This seminar serves food!" placement="top">
              <FastfoodOutlinedIcon color="secondary" />
            </Tooltip>
          )}

          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton> */}
        </CardActions>
      </CardActionArea>
    </Card>
    // <Paper className={classes.seminarCard}>
    //   <Box p={2}>
    //     <Typography variant="h6" gutterBottom>
    //       {seminar.title}
    //     </Typography>

    //     <Typography>
    //       <span className={classes.wrapIcon}>
    //         <CalendarTodayOutlinedIcon className={classes.icon} />
    //         {moment(seminar.start_time).format("Do MMMM YYYY")}
    //       </span>
    //     </Typography>

    //     <Typography>
    //       <span className={classes.wrapIcon}>
    //         <ScheduleOutlinedIcon className={classes.icon} />
    //         {moment(seminar.start_time).format("H:mm")} -{" "}
    //         {moment(seminar.end_time).format("H:mm")}
    //       </span>
    //     </Typography>

    //     <span className={classes.wrapIcon}>
    //       <PersonOutlineOutlinedIcon className={classes.icon} />
    //       {seminar.speaker != null ? (
    //         <Typography>{seminar.speaker.speaker}</Typography>
    //       ) : (
    //         <Typography>-</Typography>
    //       )}
    //     </span>

    //     <br />

    //     <span className={classes.wrapIcon}>
    //       <LocationOnOutlinedIcon className={classes.icon} />
    //       {seminar.location != null ? (
    //         <Typography>{seminar.location.location}</Typography>
    //       ) : (
    //         <Typography>-</Typography>
    //       )}
    //     </span>

    //     <br />

    //     <Button
    //       variant="outlined"
    //       color="secondary"
    //       component={RouterLink}
    //       to={`/seminar/${seminar.id}`}
    //     >
    //       View Seminar
    //     </Button>
    //   </Box>
    // </Paper>
  );
};

SeminarCard.propTypes = {
  seminar: PropTypes.object,
};

export default SeminarCard;
