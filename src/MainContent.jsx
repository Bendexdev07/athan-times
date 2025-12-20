import React from 'react';
import Grid from '@mui/material/Grid';

export default function MainContent() {
  return (
    <Grid container spacing={2} style={{ backgroundColor: "blue", padding: '16px' }}>
      {/* Right Column (Date & City) — stays right-aligned */}
      <Grid item xs={6}>
        <div style={{ textAlign: 'right' }}>
          <h2>سبتمبر 9 2023 | 4.20</h2>
          <h1>مكة المكرمة</h1>
        </div>
      </Grid>

      {/* Left Column (Countdown) — force left-aligned */}
      <Grid item xs={6}>
        <div style={{ textAlign: 'left' }}>
          <h2>متبقي حتى صلاة العصر</h2>
          <h1>00:10:20</h1>
        </div>
      </Grid>
    </Grid>
  );
}