import React from "react";
import { TaskCard } from "./TaskCard";

export default class TaskCardClass extends React.PureComponent {
  render() {
    const { item, nodeDatum } = this.props;
    //const classes=useStyles();
    return <TaskCard item={item} />;
  }
}
