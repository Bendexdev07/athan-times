import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./prayer.jsx";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import moment from "moment";
import axios from "axios";
import "moment/dist/locale/ar-dz";
import { useState, useEffect } from "react";

moment.locale("ar-dz");


export default function MainContent() {
  const availableCities = [{
    name: "سكيكدة",
    apiName: "Skikda"
  }, {
    name: "قسنطينة",
    apiName: "costantine"

  }, {
    name: "عنابة",
    apiName: "Annaba"
  },];
  const prayersArray= [ 
    { key:" Fajr", displayName:"الفجر "},
    { key: "Dhuhr", displayName:"الظهر " },
    { key: "Asr", displayName:" العصر" },
    { key: "Maghrib", displayName: "الفجر " },
    { key: "Isha", displayName:" العشاء "},
  ];

  //States
  const [timings, setTimings] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Maghrib: "18:03",
    Isha: "19:33",
  });
  const [city, setCity] = useState({ name: "سكيكدة", apiName: "Skikda" });
  const [today, setToday] = useState("");
  const [nextPrayerIndex, setIndex] = useState(0);


  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${city.apiName}&country=Algeria`
    );
    setTimings(response.data.data.timings);
  };
  useEffect(() => {
    const getTimings = async () => {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${city.apiName}&country=Algeria`
      );
      setTimings(response.data.data.timings);
    };
    getTimings();

  }, [city]);
  useEffect(() => {
    const updateClock = () => {
      const t = moment();
      setToday(t.format('dddd, Do MMMM YYYY | hh:mm'));
    };

    updateClock();

    const intervalId = setInterval(updateClock, 60_000);

    return () => clearInterval(intervalId);
  }, []);
  const setupCountdownTimer = () => {
    const momentnow = moment();
    let PrayerIndex = null;
    if (momentnow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentnow.isBefore(moment(timings["Dhuhr"]))) {
      PrayerIndex = 1;


    }
    else if (momentnow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentnow.isBefore(moment(timings["Asr"]))) {
      PrayerIndex = 2;

    }
    else if (momentnow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentnow.isBefore(moment(timings["Maghrib"]))) {
      PrayerIndex = 3;

    }
    else if (momentnow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentnow.isBefore(moment(timings["isha"]))) {
      PrayerIndex = 4;

    }
    else {
      PrayerIndex = 0;



    }
    setIndex(PrayerIndex)








  }
  setupCountdownTimer();

  const handleChange = (event) => {
    const cityobj = availableCities.find((city) => city.apiName === event.target.value);
    setCity(cityobj);
    getTimings();
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
        <Grid >
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>
              {today}
            </h2>
            <h1 style={{ margin: 0, fontSize: "2rem" }}>{city.name}</h1>
          </div>
        </Grid>

        {/* Right side (visually left in RTL): Countdown */}
        <Grid>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>
              متبقي حتى صلاة {prayersArray[PrayerIndex]}
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
            value={city.apiName}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="city"
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
            {availableCities.map((city) => <MenuItem value={city.apiName}>{city.name}</MenuItem>)}

          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
