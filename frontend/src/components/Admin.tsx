import React, { useState } from 'react';
import axios from 'axios';
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

type Status = 'edit' | 'delete' | 'create';

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

const Admin = () => {
  const [apps, setApps] = useState<ServerApp[]>([]);
  const [selectedApp, setSelectedApp] = useState<ServerApp>();
  const [status, setStatus] = useState<Status>();

  useEffect(() => {
    axios
      .get<ServerApp[]>(`${BASE_URL}/apps/all`)
      .then((res) => res.data)
      .then((data) =>
        data.map((app) => ({
          ...emptyApp,
          ...app,
          due: new Date(app.due || '').toUTCString(),
        }))
      )
      .then(setApps);
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
    await axios.delete<ServerApp[]>(`${BASE_URL}/apps/${id}`);
    const updatedApps = [...apps].filter((app) => app.id !== id);
    setApps(updatedApps);
  };

  const handleSave = async () => {
    if (!selectedApp) return;
    const { id, appName, clubName, due, category, link, image } = selectedApp;
    console.log(selectedApp);
    removeStatus();
    const res = await axios.post<string>(`${BASE_URL}/apps/${id || ''}`, {
      appName,
      clubName,
      due,
      category,
      link,
      image,
    });
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CssBaseline />
      <CardHeader title="ClubHub Admin"></CardHeader>
      <Grid container spacing={2} direction="column" alignItems="center">
        {createButton}
        {appCards}
        {(status === 'create' || status === 'edit') && editModal}
        {status === 'delete' && deleteModal}
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default Admin;