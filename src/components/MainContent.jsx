import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./prayer.jsx";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useState, useEffect } from "react";

export default function MainContent() {
const availableCities = [{
  name: "سكيكدة",
  apiName: "Skikda"
},{
  name: "قسنطينة",
  apiName: "costantine"

},{
  name: "عنابة",
  apiName: "Annaba"
}, ];


  //States
   const [timings, setTimings] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Maghrib: "18:03",
    Isha: "19:33",
  });
  const [city, setCity] = useState({name: "سكيكدة", apiName: "Skikda"});





  const getTimings = async () => {
    const response = await axios.get(
      "https://api.aladhan.com/v1/timingsByCity?city=Skikda&country=Algeria"
    );
    setTimings(response.data.data.timings);
  };
  useEffect(() => {
    getTimings();
  }, []);

 
  const handleChange = (event) => {
    const cityobj=availableCities.find((city)=>city.apiName===event.target.value);
    setCity(cityobj);
  };
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{
          minHeight: "80px",
        }}
      >
        {/* Left side (visually right in RTL): Date & Location */}
        <Grid item>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>
              سبتمبر 9 2023 | 4.20
            </h2>
            <h1 style={{ margin: 0, fontSize: "2rem" }}>{city.name}</h1>
          </div>
        </Grid>

        {/* Right side (visually left in RTL): Countdown */}
        <Grid>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>
              متبقي حتى صلاة العصر
            </h2>
            <h1 style={{ margin: 0, fontSize: "2rem" }}>00:10:20</h1>
          </div>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "white", marginY: 1 }} />
      {/* Prayer cards */}
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        style={{ gap: "1rem", marginTop: "1rem" }}
      >
        <Prayer name={"الفجر"} time={timings.Fajr} />
        <Prayer name={"الظهر"} time={timings.Dhuhr} />
        <Prayer name={"العصر"} time={timings.Asr} />
        <Prayer name={"المغرب"} time={timings.Maghrib} />
        <Prayer name={"العشاء"} time={timings.Isha} />
      </Stack>

      {/* Prayer cards */}
      {/*select city*/}
      <Stack
        direction={"row"}
        justifyContent={"center"}
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            <span color="white">المدينة</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={age}
            label="Age"
            onChange={handleChange}
            sx={{
              color: "white", // Default (idle) state
              "&.Mui-focused": {
                color: "white", // Focused state
              },
              "&.MuiFormLabel-filled": {
                color: "white", // When field has value
              },
            }}
          >
            {availableCities.map((city)=><MenuItem value={city.apiName}>{city.name}</MenuItem>)}

          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
