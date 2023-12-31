import { useState } from "react"
import PropTypes from 'prop-types';
import {Tabs, Tab, Box}from '@mui/material';
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Select, MenuItem } from '@mui/material';
import SensFreshMeat from "./Charts/BoxPlot/SensFreshMeat";
import SensProcMeat from "./Charts/BoxPlot/SensProcMeat";
import SensHeatedMeat from "./Charts/BoxPlot/SensHeatedMeat";
import TasteFreshMeat from "./Charts/BoxPlot/TasteFreshMeat";
import TasteProcMeat from "./Charts/BoxPlot/TasteProcMeat";
import SensFreshMap from "./Charts/HeatMap/SensFreshMap";
import SensHeatedMap from "./Charts/HeatMap/SensHeatedMap";
import TasteFreshMap from "./Charts/HeatMap/TasteFreshMap";
import TasteProcMap from "./Charts/HeatMap/TasteProcMap";
import TasteTime from "./Charts/Time/TasteTime";
import { useEffect } from "react";
import SensProcMap from "./Charts/HeatMap/SensProcMap";
import TasteFreshCorr from "./Charts/Corr/TasteFreshCorr";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ backgroundColor: "white" }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function StatsTabs({ startDate, endDate }) {
  const [value, setValue] = useState(0);
  useEffect(() => {console.log('stat tab'+startDate, '-', endDate)}, [startDate, endDate]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const [alignment, setAlignment] = React.useState("맛");
  const [secondary, setSecondary] = React.useState("원육");

  const handleFirstChange = (event) => {
  setAlignment(event.target.value);
};

const handleSecondChange = (event) => {
  setSecondary(event.target.value);
};

  return (
    <Box sx={{ width: "900px", height: "350px" }}>
      <Typography
      component="h2"
      variant="h4"
      gutterBottom
      style={{
        color: '#151D48',
        fontFamily: 'Poppins',
        fontSize: `${(36 / 1920) * 100}vw`,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: `${(36 / 1920) * 100 * 1.4}vw`,
      }}
    >
      Statistics Analysis
    </Typography>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="통계" {...a11yProps(0)} />
          <Tab label="분포" {...a11yProps(1)} />
          <Tab label="상관관계" {...a11yProps(2)} />
          <Tab label="시계열" {...a11yProps(3)} />
        </Tabs>
        <Box>

  <Select
    labelId="alignment-label"
    id="alignment"
    value={alignment}
    onChange={handleFirstChange}
    label="맛 또는 관능"
  >
    <MenuItem value="맛">맛</MenuItem>
    <MenuItem value="관능">관능</MenuItem>
  </Select>
  <Select
    labelId="secondary-label"
    id="secondary"
    value={secondary}
    onChange={handleSecondChange}
    label="원육, 처리육, 가열육"
  >
    <MenuItem value="원육">원육</MenuItem>
    <MenuItem value="처리육">처리육</MenuItem>
    <MenuItem value="가열육" disabled={alignment === "맛"}>가열육</MenuItem>
  </Select>
  </Box>

      </Box>
      {/* BoxPlot(통계) */}
      <CustomTabPanel value={value} index={0}>
        {alignment === "관능" && secondary === "원육" ? (
          <SensFreshMeat startDate={startDate} endDate={endDate} />
        ) : alignment === "관능" && secondary === "처리육" ? (
          <SensProcMeat startDate={startDate} endDate={endDate} />
        ) : alignment === "관능" && secondary === "가열육" ? (
          <SensHeatedMeat startDate={startDate} endDate={endDate} />
        ) : alignment === "맛" && secondary === "원육" ? (
          <TasteFreshMeat startDate={startDate} endDate={endDate} />
        ) : alignment === "맛" && secondary === "처리육" ? (
          <TasteProcMeat startDate={startDate} endDate={endDate} />
        ) : null}
      </CustomTabPanel>

      {/* HeatMap(분포) */}
      <CustomTabPanel value={value} index={1}>
        {alignment === "관능" && secondary === "원육" ? (
          <SensFreshMap startDate={startDate} endDate={endDate} />
        ) : alignment === "관능" && secondary === "처리육" ? (
          <SensProcMap startDate={startDate} endDate={endDate} />
        ) : alignment === "관능" && secondary === "가열육" ? (
          <SensHeatedMap startDate={startDate} endDate={endDate} />
        ) : alignment === "맛" && secondary === "원육" ? (
          <TasteFreshMap startDate={startDate} endDate={endDate} />
        ) : alignment === "맛" && secondary === "처리육" ? (
          <TasteProcMap startDate={startDate} endDate={endDate} />
        ) : null}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        {/* {alignment === "관능" && secondary === "원육" ? (
          // <Sens_Fresh_Map startDate={startDate} endDate={endDate} />
          <Taste_Fresh_Corr startDate={startDate} endDate={endDate} />
        ) : alignment === "관능" && secondary === "처리육" ? (
          <Sens_Proc_Map startDate={startDate} endDate={endDate} />
        ) : alignment === "관능" && secondary === "가열육" ? (
          <Sens_Heated_Map startDate={startDate} endDate={endDate} />
        ) : alignment === "맛" && secondary === "원육" ? (
          <Taste_Fresh_Corr startDate={startDate} endDate={endDate} />
        ) : alignment === "맛" && secondary === "처리육" ? (
          <Taste_Proc_Map startDate={startDate} endDate={endDate} />
        ) : null} */}

        <TasteFreshCorr startDate={startDate} endDate={endDate} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        <TasteTime startDate={startDate} endDate={endDate} />
      </CustomTabPanel>
    </Box>
  );
}