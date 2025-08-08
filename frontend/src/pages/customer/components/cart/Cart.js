import { useState, useEffect } from "react";
import { getCartByUser, placeOrder } from "../../service/customer";
import {
    Backdrop,
    Box,
    CircularProgress,
    Grid,
    Typography,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    height: "250px",
    objectFit: "cover"
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...(theme.applyStyles && theme.applyStyles("dark", {
        backgroundColor: "#1A2027"
    }))
}));

export default function Cart() {
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [order, setOrder] = useState({});
    const [formData, setFormData] = useState({
        orderDescription: '',
        address: '',
    });
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const fetchCartByUser = async () => {
        setLoading(true);
        try {
            const response = await getCartByUser();
            if (response.status === 200) {
                console.log(response.data);
                setCartItems(response.data.cartItem || []);
                setOrder(response.data || {});
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartByUser();
    }, []);

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
            const response = await placeOrder(formData);
            console.log(response); // Debug
            if (response.status === 201) {
                enqueueSnackbar('Order placed successfully', { variant: 'success', autoHideDuration: 5000 });
                setOpen(false);
                navigate('/customer/dashboard');
            }
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Getting error while placing order', { variant: 'error', autoHideDuration: 5000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {(!Array.isArray(cartItems) || cartItems.length === 0) ? (
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h4">Nothing to see here!</Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{ flexGrow: 1, p: 5 }}>
                        <Grid container spacing={1}>
                            <Grid container item spacing={3}>
                                {cartItems.map(item => (
                                    <Grid item xs={4} key={item.book._id}>
                                        <Item>
                                            <Img src={item.book.imageUrl} alt="product-image" style={{ width: 70, height: 70 }} />
                                            <Typography variant="h6">
                                                Name: {item.book.title}
                                            </Typography>
                                            <Typography variant="body1">
                                                Price: ${item.book.price}
                                            </Typography>
                                        </Item>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1, p: 5, display: 'flex', justifyContent: 'flex-end' }}>
                        <Grid container spacing={1} direction="column" alignItems="flex-end">
                            <Grid item>
                                <Typography>Total Amount: ${order.amount ?? '0.00'}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mt: 2 }}>
                                    Place Order
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}

            {/* Dialog always mounted */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Place Order</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Place your order by adding any special instruction in description and address.
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="address"
                        name="address"
                        label="Address"
                        type="text"
                        multiline
                        maxRows={4}
                        fullWidth
                        variant="standard"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="orderDescription"
                        name="orderDescription"
                        label="Description or Instruction"
                        type="text"
                        multiline
                        maxRows={4}
                        fullWidth
                        variant="standard"
                        value={formData.orderDescription}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit">Place Order</Button>
                </DialogActions>
            </Dialog>

            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="success" />
            </Backdrop>
        </>
    );
}
