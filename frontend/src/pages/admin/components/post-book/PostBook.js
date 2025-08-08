import { Avatar, Backdrop, Box, Button, CircularProgress, Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BookIcon from "@mui/icons-material/Book";
import { postBook } from "../../service/admin";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function PostBook() {
    const [conditions] = useState(["New", "Like New", "Used - Good", "Used - Acceptable"]);
    const [genres] = useState([
        "Fiction", "Non-Fiction", "Mystery", "Thriller", "Science Fiction", "Fantasy",
        "Historical Fiction", "Romance", "Horror", "Biography", "Memoir", "Self-Help",
        "Health & Wellness", "Travel", "Science", "Philosophy", "Psychology", "Poetry",
        "Religion & Spirituality", "Cooking", "Art & Photography", "Children's Literature",
        "Young Adult", "Graphic Novel", "Drama", "Business & Economics", "Education",
        "Politics", "Law", "Anthology", "Adventure", "Classics", "Short Stories", "Humor",
        "Sports", "Music", "True Crime"
    ]);

    const [book, setBook] = useState({
        title: '',
        author: '',
        description: '',
        price: 0,
        genre: '',
        condition: '',
        edition: '',
        imageUrl: '',
    });

    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBook({
            ...book,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Current book state:", book);
        setLoading(true);
        try {
            const payload = {
                ...book,
                price: parseInt(book.price, 10) || 0,
            };
            const response = await postBook(payload);
            if (   response.status === 201) {
                enqueueSnackbar('Book posted successfully', { variant: 'success', autoHideDuration: 5000 });
                navigate('/admin/dashboard');
            }
        } catch (error) {
            enqueueSnackbar('Error posting book', { variant: 'error', autoHideDuration: 5000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <BookIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Post Book</Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
                            <TextField
                                required
                                fullWidth
                                id="imageUrl"
                                label="Enter image URL"
                                name="imageUrl"
                                value={book.imageUrl}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                value={book.title}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                required
                                fullWidth
                                id="author"
                                label="Author"
                                name="author"
                                value={book.author}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                multiline
                                rows={3}
                                value={book.description}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                required
                                fullWidth
                                id="price"
                                label="Price"
                                name="price"
                                type="number"
                                value={book.price}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                required
                                fullWidth
                                id="edition"
                                label="Edition"
                                name="edition"
                                value={book.edition}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="genre-label">Genre</InputLabel>
                                <Select
                                    labelId="genre-label"
                                    name="genre"
                                    value={book.genre}
                                    label="Genre"
                                    onChange={handleInputChange}
                                >
                                    {genres.map((genre) => (
                                        <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="condition-label">Condition</InputLabel>
                                <Select
                                    labelId="condition-label"
                                    name="condition"
                                    value={book.condition}
                                    label="Condition"
                                    onChange={handleInputChange}
                                >
                                    {conditions.map((condition) => (
                                        <MenuItem key={condition} value={condition}>{condition}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!book.title || !book.author || !book.description || !book.genre || !book.condition || !book.edition || !book.imageUrl}
                            >
                                {loading ? <CircularProgress color="inherit" size={24} /> : 'Post Book'}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>

    );
}
