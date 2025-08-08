import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
    createTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../../services/auth/auth";
import { useSnackbar } from "notistack";
import {
    isAdminLoggedIn,
    isCustomerLoggedIn,
    saveToken,
} from "../../../../utils/common";

const defaultTheme = createTheme();

export default function Signin() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await signin(formData);

            if (response.status === 200) {
                console.log(response);
                const token = response.data.token;
                saveToken(token);
                if (isAdminLoggedIn()) {
                    navigate("/admin/dashboard");
                } else if (isCustomerLoggedIn()) {
                    navigate("/customer/dashboard");
                }
            }
        } catch (error) {
            enqueueSnackbar("Invalid Credentials!", {
                variant: "error",
                autoHideDuration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpClick = () => {
        navigate("/register");
    };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 6,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Sign In<br /><br />
                        </Typography>

                        {/* Demo credentials */}
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 1,
                                fontStyle: "italic",
                                textAlign: "center",
                            }}
                        >
                            Demo Credentials: <br />
                            <strong>Email:</strong> admin@test.com <br />
                            <strong>Password:</strong> admin
                        </Typography>

                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3, width: "100%" }}
                        >
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr",
                                    gap: 2,
                                }}
                            >
                                <Box>
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
                                <Box>
                                    <TextField
                                        autoComplete="current-password"
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
                                disabled={!formData.email || !formData.password || loading}
                            >
                                {loading ? (
                                    <CircularProgress color="inherit" size={24} />
                                ) : (
                                    "Sign In"
                                )}
                            </Button>

                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link
                                        variant="body2"
                                        onClick={handleSignUpClick}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}
