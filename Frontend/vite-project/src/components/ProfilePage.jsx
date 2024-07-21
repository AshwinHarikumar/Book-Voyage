import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  CircularProgress, 
  Paper, 
  Box, 
  TextField, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid 
} from '@mui/material';
import NavbarUser from './NavbarUser';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user details.');
        }

        const data = await response.json();
        setUser(data);
        setFormData(data); 
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (userId) {
      fetchUserData();
    } else {
      setError('User ID not found.');
      setLoading(false);
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user details.');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setOpenDialog(false); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    // Implement feedback submission logic here
    setFeedbackSubmitted(true);
    setFeedback('');
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <NavbarUser />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid item xs={12}>
          <Paper elevation={6} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#fafafa' }}>
            <Typography variant="h5" align="center" gutterBottom>
              User Profile
            </Typography>
            {user && (
              <>
                <Typography variant="body1"><strong>First Name:</strong> {user.firstName}</Typography>
                <Typography variant="body1"><strong>Last Name:</strong> {user.lastName}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                <Typography variant="body1"><strong>Age:</strong> {user.age}</Typography>
                <Typography variant="body1"><strong>Location:</strong> {user.place}</Typography>
                <Typography variant="body1"><strong>Rented Books:</strong> {user.rentedBooks.length}</Typography>
              </>
            )}
            <Box textAlign="center" sx={{ mt: 3 }}>
              <Button variant="contained" onClick={handleEditClick} color="primary">
                Edit Profile
              </Button>
            </Box>
          </Paper>

          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Edit User Details</DialogTitle>
            <DialogContent>
              <form id="edit-form" onSubmit={handleSubmit}>
                <TextField label="First Name" name="firstName" value={formData.firstName || ''} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Last Name" name="lastName" value={formData.lastName || ''} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Email" name="email" value={formData.email || ''} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Age" name="age" type="number" value={formData.age || ''} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Location" name="place" value={formData.place || ''} onChange={handleChange} fullWidth margin="normal" />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
              <Button type="submit" form="edit-form" variant="contained" color="primary">Save</Button>
            </DialogActions>
          </Dialog>

          <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
            <Typography variant="h6">Feedback</Typography>
            <form onSubmit={handleFeedbackSubmit}>
              <TextField
                label="Your Feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Box textAlign="right">
                <Button type="submit" variant="contained" color="primary">Submit Feedback</Button>
              </Box>
            </form>
            {feedbackSubmitted && <Typography color="success.main" sx={{ mt: 2 }}>Thank you for your feedback!</Typography>}
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
