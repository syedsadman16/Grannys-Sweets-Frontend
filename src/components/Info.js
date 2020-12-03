import React from "react";
import clsx from "clsx";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "256px",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

const Info = ({ className, title, icon, body, ...rest }) => {
  const classes = useStyles();
  const Icon = icon;
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {body}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <Icon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Info;
