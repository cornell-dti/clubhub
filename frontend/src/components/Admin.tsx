import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants';
import { useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardTimePicker } from '@material-ui/pickers';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  CssBaseline,
} from '@material-ui/core';
import Alert, { AlertProps } from '@material-ui/lab/Alert';
import firebase from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';

type Status = 'edit' | 'delete' | 'create';

type AlertInfo = {
  props: AlertProps;
  message: string;
};

type ServerApp = {
  id?: string;
  appName: string;
  clubName: string;
  category: string;
  due?: string;
  link: string;
  image?: string;
};

const emptyApp: ServerApp = {
  appName: '',
  clubName: '',
  category: '',
  due: new Date().toUTCString(),
  link: '',
  image: '',
};

const firebaseConfig = {
  apiKey: 'AIzaSyCNAXlrhzBU-xH890rKyYnN-bjeJ0fIaLY',
  authDomain: 'clubhub-dev-89ca0.firebaseapp.com',
  databaseURL: 'https://clubhub-dev-89ca0.firebaseio.com',
  projectId: 'clubhub-dev-89ca0',
  storageBucket: 'clubhub-dev-89ca0.appspot.com',
  messagingSenderId: '980709987861',
  appId: '1:980709987861:web:d79b026cf49cbe7ad7a01c',
  measurementId: 'G-BX6SHVT6T1',
};

firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

// Maybe go into utils
const generateAxiosConfig = async (user: firebase.User | null) => {
  const idToken = await user?.getIdToken();
  return idToken ? { headers: { Authorization: `Bearer ${idToken}` } } : {};
};

const Admin = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [apps, setApps] = useState<ServerApp[]>([]);
  const [selectedApp, setSelectedApp] = useState<ServerApp>();
  const [status, setStatus] = useState<Status>();
  const [alert, setAlert] = useState<AlertInfo>();

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      setUser(user);

      if (user) {
        const config = await generateAxiosConfig(user);
        axios
          .get<ServerApp[]>(`${BASE_URL}/apps/all`, config)
          .then((res) => res.data)
          .then((data) =>
            data.map((app) => ({
              ...emptyApp,
              ...app,
              due: new Date(app.due || '').toUTCString(),
            }))
          )
          .then(setApps)
          .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
              setAlert({ props: { severity: 'error' }, message: 'Not Authorized :((' });
            }
          });
      }
    });
  }, []);

  const removeStatus = () => {
    setSelectedApp(undefined);
    setStatus(undefined);
  };

  const updateStatus = (app: ServerApp, newStatus: Status) => {
    if (status) return;
    setSelectedApp(app);
    setStatus(newStatus);
  };

  const handleDelete = async () => {
    if (!selectedApp) return;
    const { id } = selectedApp;
    removeStatus();
    const config = await generateAxiosConfig(user);
    await axios.delete<ServerApp[]>(`${BASE_URL}/apps/${id}`, config);
    const updatedApps = [...apps].filter((app) => app.id !== id);
    setApps(updatedApps);
  };

  const handleSave = async () => {
    if (!selectedApp) return;
    const { id, appName, clubName, due, category, link, image } = selectedApp;
    removeStatus();
    const config = await generateAxiosConfig(user);
    const res = await axios.post<string>(
      `${BASE_URL}/apps/${id || ''}`,
      {
        appName,
        clubName,
        due,
        category,
        link,
        image,
      },
      config
    );
    const updatedApps = selectedApp.id
      ? [...apps].map((app) => (app.id === id ? selectedApp : app))
      : [...apps, { ...selectedApp, id: res.data }];
    setApps(updatedApps);
  };

  const deleteModal = (
    <Dialog open={status === 'delete'}>
      <DialogTitle>Delete?</DialogTitle>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={removeStatus}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          DELETE!
        </Button>
      </DialogActions>
    </Dialog>
  );

  const editModal = selectedApp && (
    <Dialog open={status === 'edit' || status === 'create'}>
      <DialogTitle>{selectedApp.id ? 'Edit' : 'Create'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="app-name"
          label="App Name"
          value={selectedApp.appName}
          onChange={(event) => setSelectedApp({ ...selectedApp, appName: event.target.value })}
        />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="club-name"
          label="Club Name"
          value={selectedApp.clubName}
          onChange={(event) => setSelectedApp({ ...selectedApp, clubName: event.target.value })}
        />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="category"
          label="Category"
          value={selectedApp.category}
          onChange={(event) => setSelectedApp({ ...selectedApp, category: event.target.value })}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker"
          label="Due Date"
          value={selectedApp.due}
          onChange={(date: Date | null) =>
            setSelectedApp({ ...selectedApp, due: date?.toUTCString() })
          }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          disableToolbar
          margin="normal"
          id="time-picker"
          label="Due Date"
          value={selectedApp.due}
          onChange={(date: Date | null) =>
            setSelectedApp({ ...selectedApp, due: date?.toUTCString() })
          }
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="link"
          label="Application Link"
          value={selectedApp.link}
          onChange={(event) => setSelectedApp({ ...selectedApp, link: event.target.value })}
        />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="image"
          label="Image Link"
          value={selectedApp.image}
          onChange={(event) => setSelectedApp({ ...selectedApp, image: event.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="secondary" onClick={removeStatus}>
          Discard
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );

  const alertComponent = alert && <Alert {...alert.props}>{alert.message}</Alert>;

  const createButton = (
    <Grid item>
      <Button
        variant="contained"
        disabled={!!status}
        color="primary"
        onClick={() => updateStatus(emptyApp, 'create')}
      >
        Add New
      </Button>
    </Grid>
  );

  const signoutButton = (
    <Grid item>
      <Button
        variant="contained"
        disabled={!!status}
        color="secondary"
        onClick={() => {
          firebase.auth().signOut();
          setApps([]);
          setAlert(undefined);
        }}
      >
        Sign Out
      </Button>
    </Grid>
  );

  const appCards = (
    <>
      {apps.map((app) => {
        const { id, appName, clubName, category, due, link, image } = app;
        const content = [
          `Position: ${appName}`,
          `Category: ${category}`,
          `Due Date: ${due}`,
          `Link: ${link}`,
          `Image: ${image}`,
        ];
        return (
          <Grid item xs key={id}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {clubName}
                </Typography>
                {content.map((line, idx) => (
                  <Typography key={idx} variant="body2" color="textSecondary" component="p">
                    {line}
                  </Typography>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  disabled={!!status}
                  color="primary"
                  onClick={() => updateStatus(app, 'edit')}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  disabled={!!status}
                  color="secondary"
                  onClick={() => updateStatus(app, 'delete')}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </>
  );

  const adminPage = (
    <Grid container spacing={2} direction="column" alignItems="center">
      {alertComponent}
      <CardActions>
        {createButton}
        {signoutButton}
      </CardActions>
      {appCards}
      {(status === 'create' || status === 'edit') && editModal}
      {status === 'delete' && deleteModal}
    </Grid>
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CssBaseline />
      <CardHeader
        title={`ClubHub Admin | ${user ? `Logged in as ${user.email}` : 'Not Logged In'}`}
      ></CardHeader>
      {user ? adminPage : <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
    </MuiPickersUtilsProvider>
  );
};

export default Admin;
