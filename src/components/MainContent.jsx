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
  const availableCities = [
    {
      name: "سكيكدة",
      apiName: "Skikda",
    },
    {
      name: "قسنطينة",
      apiName: "costantine",
    },
    {
      name: "عنابة",
      apiName: "Annaba",
    },
  ];
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر " },
    { key: "Dhuhr", displayName: "الظهر " },
    { key: "Asr", displayName: " العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: " العشاء " },
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
  const [countdown, setCountdown] = useState("");
  

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
		let interval = setInterval(() => {
			console.log("calling timer");
			commingPrayer();
		}, 1000);

		const t = moment();
		setToday(t.format("MMM Do YYYY | h:mm"));

		return () => {
			clearInterval(interval);
		};
	}, [timings]);
  const commingPrayer= () => {
    const now = moment();
    const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    let nextIndex = 0;

    for (let i = 0; i < prayerOrder.length; i++) {
      const prayerTime = moment(timings[prayerOrder[i]], "HH:mm");
      if (prayerTime.isValid() && now.isBefore(prayerTime)) {
        nextIndex = i;
        break;
      }
    }

    setIndex(nextIndex);
    //starting the counter 
    const nextprayerObj = prayersArray[nextPrayerIndex];
    console.log("Next prayer object:", nextprayerObj);
    const nextPrayertime=timings[nextprayerObj.key];
    console.log("Next prayer time:", nextPrayertime); 

    let remainingTime=(moment(nextPrayertime,"HH:mm")).diff(now); ;
    console.log("Remaining time in ms:", remainingTime);

    let reaminingDuration = moment.duration(remainingTime);
    console.log("duartion iss",reaminingDuration.hours(),reaminingDuration.minutes(),reaminingDuration.seconds());
    setCountdown(
      `${reaminingDuration.hours()}:${reaminingDuration.minutes()}:${reaminingDuration.seconds()}`
    );
    //handling the special case of fajr 
    if (nextprayerObj.key==="Fajr" ){
      const diffrenceTOmidnight=moment("23:59","HH:mm").diff(now);
      const diffrenceFromMidnightToFajr=moment(nextPrayertime,"HH:mm").diff(moment("00:00","HH:mm"));
      const TotalDifference=diffrenceTOmidnight+diffrenceFromMidnightToFajr;
      reaminingDuration = moment.duration(TotalDifference);
      
    }
 
    
  

    
  };


  
  



  const handleChange = (event) => {
    const cityobj = availableCities.find(
      (city) => city.apiName === event.target.value
    );
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
        <Grid>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>{today}</h2>
            <h1 style={{ margin: 0, fontSize: "2rem" }}>{city.name}</h1>
          </div>
        </Grid>

        {/* Right side (visually left in RTL): Countdown */}
        <Grid>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>
              متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}
            </h2>
            <h1 style={{ margin: 0, fontSize: "2rem" }}> {countdown}</h1>
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
            {availableCities.map((city) => (
              <MenuItem value={city.apiName}>{city.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
