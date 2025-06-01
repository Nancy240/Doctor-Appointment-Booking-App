import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

import { google } from 'googleapis';

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())

app.use(cors({
  origin: ['http://localhost:3000','http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization','token'],
}));

app.options('*', cors());
// Initialize OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Google Fit scopes - updated with all requested scopes
const SCOPES = [
  "https://www.googleapis.com/auth/fitness.activity.read",
  "https://www.googleapis.com/auth/fitness.blood_glucose.read",
  "https://www.googleapis.com/auth/fitness.blood_pressure.read",
  "https://www.googleapis.com/auth/fitness.heart_rate.read",
  "https://www.googleapis.com/auth/fitness.body.read",
  "https://www.googleapis.com/auth/fitness.sleep.read",
  "https://www.googleapis.com/auth/fitness.reproductive_health.read",
  "https://www.googleapis.com/auth/userinfo.profile",
];

// 1. Generate OAuth2 consent URL
app.get('/auth-url', (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  });
  
  res.json({ url });
});

// 2. OAuth2 callback: exchange code for tokens
app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code');
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.redirect(`http://localhost:5173/health_dashboard?access_token=${tokens.access_token}`);
  } catch (err) {
    res.redirect(`http://localhost:5173/?error=${err.message}`);
  }
});


// 3. Fetch Google Fit sessions (activities)
app.get('/fit/sessions', async (req, res) => {
  const { access_token } = req.query;
  if (!access_token) return res.status(400).send('Missing access_token');
  oAuth2Client.setCredentials({ access_token });
  try {
    const fitness = google.fitness({ version: 'v1', auth: oAuth2Client });
    const sessions = await fitness.users.sessions.list({ userId: 'me' });
    res.json(sessions.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Fetch Google Fit steps data (example: last 7 days)
app.get('/fit/steps', async (req, res) => {
  const { access_token } = req.query;
  if (!access_token) return res.status(400).send('Missing access_token');
  oAuth2Client.setCredentials({ access_token });

  // Calculate time range (last 7 days)
  const endTimeMillis = Date.now();
  const startTimeMillis = endTimeMillis - 7 * 24 * 60 * 60 * 1000;

  // Data source for steps
  const dataSourceId = 'derived:com.google.step_count.delta:com.google.android.gms:aggregated';

  try {
    const fitness = google.fitness({ version: 'v1', auth: oAuth2Client });
    const datasetId = `${startTimeMillis * 1000000}-${endTimeMillis * 1000000}`;
    const data = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId,
      datasetId
    });
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/fit/heartrate', async (req, res) => {
  const { access_token } = req.query;
  if (!access_token) return res.status(400).send('Missing access_token');
  oAuth2Client.setCredentials({ access_token });

  const endTimeMillis = Date.now();
  const startTimeMillis = endTimeMillis - 7 * 24 * 60 * 60 * 1000;
  const dataSourceId = 'derived:com.google.heart_rate.bpm:com.google.android.gms:aggregated';

  try {
    const fitness = google.fitness({ version: 'v1', auth: oAuth2Client });
    const datasetId = `${startTimeMillis * 1000000}-${endTimeMillis * 1000000}`;
    const data = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId,
      datasetId
    });
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/fit/bloodpressure', async (req, res) => {
  const { access_token } = req.query;
  if (!access_token) return res.status(400).send('Missing access_token');
  oAuth2Client.setCredentials({ access_token });

  const endTimeMillis = Date.now();
  const startTimeMillis = endTimeMillis - 7 * 24 * 60 * 60 * 1000;
  const dataSourceId = 'derived:com.google.blood_pressure.summary:com.google.android.gms:aggregated';

  try {
    const fitness = google.fitness({ version: 'v1', auth: oAuth2Client });
    const datasetId = `${startTimeMillis * 1000000}-${endTimeMillis * 1000000}`;
    const data = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId,
      datasetId
    });
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/fit/bodyfat', async (req, res) => {
  const { access_token } = req.query;
  if (!access_token) return res.status(400).send('Missing access_token');
  oAuth2Client.setCredentials({ access_token });

  const endTimeMillis = Date.now();
  const startTimeMillis = endTimeMillis - 7 * 24 * 60 * 60 * 1000;
  const dataSourceId = 'derived:com.google.body.fat.percentage:com.google.android.gms:aggregated';

  try {
    const fitness = google.fitness({ version: 'v1', auth: oAuth2Client });
    const datasetId = `${startTimeMillis * 1000000}-${endTimeMillis * 1000000}`;
    const data = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId,
      datasetId
    });
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/fit/bodytemperature', async (req, res) => {
  const { access_token } = req.query;
  if (!access_token) return res.status(400).send('Missing access_token');
  oAuth2Client.setCredentials({ access_token });

  const endTimeMillis = Date.now();
  const startTimeMillis = endTimeMillis - 7 * 24 * 60 * 60 * 1000;
  const dataSourceId = 'derived:com.google.body.temperature:com.google.android.gms:aggregated';

  try {
    const fitness = google.fitness({ version: 'v1', auth: oAuth2Client });
    const datasetId = `${startTimeMillis * 1000000}-${endTimeMillis * 1000000}`;
    const data = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId,
      datasetId
    });
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Test endpoint: fetch both sessions and steps (for demonstration)
app.get('/fit/test', async (req, res) => {
  const { access_token } = req.query;
  if (!access_token) return res.status(400).send('Missing access_token');
  oAuth2Client.setCredentials({ access_token });

  try {
    const fitness = google.fitness({ version: 'v1', auth: oAuth2Client });

    // Sessions (activities)
    const sessionsResp = await fitness.users.sessions.list({ userId: 'me' });

    // Steps (last 7 days)
    const endTimeMillis = Date.now();
    const startTimeMillis = endTimeMillis - 7 * 24 * 60 * 60 * 1000;
    const dataSourceId = 'derived:com.google.step_count.delta:com.google.android.gms:aggregated';
    const datasetId = `${startTimeMillis * 1000000}-${endTimeMillis * 1000000}`;
    const stepsResp = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId,
      datasetId
    });

    res.json({
      sessions: sessionsResp.data,
      steps: stepsResp.data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New endpoint for aggregated fitness data
app.get('/fit/aggregate', async (req, res) => {
  const { access_token } = req.query;
  if (!access_token) return res.status(400).send('Missing access_token');
  oAuth2Client.setCredentials({ access_token });

  const endTimeMillis = Date.now();
  const startTimeMillis = endTimeMillis - 7 * 24 * 60 * 60 * 1000;

  try {
    const fitness = google.fitness({ version: 'v1', auth: oAuth2Client });
    
    const response = await fitness.users.dataset.aggregate({
      userId: "me",
      requestBody: {
        aggregateBy: [
          {
            dataTypeName: "com.google.step_count.delta",
          },
          {
            dataTypeName: "com.google.blood_glucose",
          },
          {
            dataTypeName: "com.google.blood_pressure",
          },
          {
            dataTypeName: "com.google.heart_rate.bpm",
          },
          {
            dataTypeName: "com.google.weight",
          },
          {
            dataTypeName: "com.google.height",
          },
          {
            dataTypeName: "com.google.sleep.segment",
          },
          {
            dataTypeName: "com.google.body.fat.percentage",
          },
          {
            dataTypeName: "com.google.menstruation",
          },
        ],
        bucketByTime: { durationMillis: 86400000 }, // Aggregate data in daily buckets
        startTimeMillis,
        endTimeMillis,
      },
    });

    const fitnessData = response.data.bucket;
    const formattedData = [];

    fitnessData.map((data) => {
      const date = new Date(parseInt(data.startTimeMillis));
      const formattedDate = date.toDateString();

      const formattedEntry = {
        date: formattedDate,
        step_count: 0,
        glucose_level: 0,
        blood_pressure: [],
        heart_rate: 0,
        weight: 0,
        height_in_cms: 0,
        sleep_hours: 0,
        body_fat_in_percent: 0,
        menstrual_cycle_start: "",
      };

      const datasetMap = data.dataset;
      datasetMap.map((mydataset) => {
        const point = mydataset.point;
        if (point && point.length > 0) {
          const value = point[0].value;
          switch (mydataset.dataSourceId) {
            case "derived:com.google.step_count.delta:com.google.android.gms:aggregated":
              formattedEntry.step_count = value[0]?.intVal || 0;
              break;
            case "derived:com.google.blood_glucose.summary:com.google.android.gms:aggregated":
              let glucoseLevel = 0;
              if (mydataset.point[0]?.value) {
                if (mydataset.point[0]?.value.length > 0) {
                  const dataArray = mydataset.point[0]?.value;
                  dataArray.map((data) => {
                    if (data.fpVal) {
                      glucoseLevel = data.fpVal * 10;
                    }
                  });
                }
              }
              formattedEntry.glucose_level = glucoseLevel;
              break;
            case "derived:com.google.blood_pressure.summary:com.google.android.gms:aggregated":
              let finalData = [0, 0];
              if (mydataset.point[0]?.value) {
                const BParray = mydataset.point[0]?.value;
                if (BParray.length > 0) {
                  BParray.map((data) => {
                    if (data.fpVal) {
                      if (data.fpVal > 100) {
                        finalData[0] = data.fpVal;
                      } else if (data.fpVal < 100) {
                        finalData[1] = data.fpVal;
                      }
                    }
                  });
                }
              }
              formattedEntry.blood_pressure = finalData;
              break;
            case "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated":
              let heartData = 0;
              if (mydataset.point[0]?.value) {
                if (mydataset.point[0]?.value.length > 0) {
                  const heartArray = mydataset.point[0]?.value;
                  heartArray.map((data) => {
                    if (data.fpVal) {
                      heartData = data.fpVal;
                    }
                  });
                }
              }
              formattedEntry.heart_rate = heartData;
              break;
            case "derived:com.google.weight.summary:com.google.android.gms:aggregated":
              formattedEntry.weight = value[0]?.fpVal || 0;
              break;
            case "derived:com.google.height.summary:com.google.android.gms:aggregated":
              formattedEntry.height_in_cms = value[0]?.fpVal * 100 || 0;
              break;
            case "derived:com.google.sleep.segment:com.google.android.gms:merged":
              formattedEntry.sleep_hours = mydataset.point[0]?.value || 0;
              break;
            case "derived:com.google.body.fat.percentage.summary:com.google.android.gms:aggregated":
              let bodyFat = 0;
              if (mydataset.point[0]?.value) {
                if (mydataset.point[0]?.value.length > 0) {
                  bodyFat = mydataset.point[0].value[0].fpVal;
                }
              }
              formattedEntry.body_fat_in_percent = bodyFat;
              break;
            case "derived:com.google.menstruation:com.google.android.gms:aggregated":
              formattedEntry.menstrual_cycle_start =
                mydataset.point[0]?.value[0]?.intVal || 0;
              break;
            default:
              break;
          }
        }
      });
      formattedData.push(formattedEntry);
    });

    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));