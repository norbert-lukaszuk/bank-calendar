import React from "react";
import Aux from "../components/wraper";
import { formatDistance } from "date-fns";
function DaysLeft({ date }) {
  return (
    <Aux>
      <span>{formatDistance(new Date(date), new Date())}</span>
    </Aux>
  );
}

export default DaysLeft;
