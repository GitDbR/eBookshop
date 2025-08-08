import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Avatar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    Grid,
    Link,
    TextField,
    ThemeProvider,
    Typography,
    createTheme
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/auth/auth";
import { useSnackbar } from 'notistack';

const defaultTheme = createTheme();

export default function Signup() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await signup(formData);
            if (response.status === 201) {
                navigate('/login');
                enqueueSnackbar('Signup successful!', { variant: 'success', autoHideDuration: 5000 });
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                enqueueSnackbar('Email already exists!', { variant: 'error', autoHideDuration: 5000 });
            } else {
                enqueueSnackbar('Signup Failed!', { variant: 'error', autoHideDuration: 5000 });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignInClick = () => {
        navigate('/login');
    };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                    gap: 2
                                }}
                            >
                                <Box>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        autoComplete="family-name"
                                        name="lastName"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                                <Box sx={{ gridColumn: '1 / -1' }}>
                                    <TextField
                                        autoComplete="email"
                                        name="email"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                                <Box sx={{ gridColumn: '1 / -1' }}>
                                    <TextField
                                        autoComplete="new-password"
                                        name="password"
                                        required
                                        fullWidth
                                        type="password"
                                        id="password"
                                        label="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!formData.email || !formData.firstName || !formData.lastName || !formData.password || loading}
                            >
                                {loading ? <CircularProgress color="inherit" size={24} /> : 'Sign Up'}
                            </Button>

                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link variant="body2" onClick={handleSignInClick} sx={{ cursor: 'pointer' }}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
        </>
    );
}
