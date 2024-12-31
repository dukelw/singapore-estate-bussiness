import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Pagination,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import {
  uploadImage,
  estimateValue,
  createEstate,
  getAllEstate,
  updateEstate,
  deleteEstate,
} from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import CONSTANTS from "../../constants";

function EstateTable({ pagination = 10 }) {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const TOWN = CONSTANTS.TOWN;
  const [estates, setEstates] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [newEstate, setNewEstate] = useState({
    estate_name: "",
    estate_image: "",
    estate_year: "",
    estate_town: "",
    estate_type: "",
    estate_area_sqm: "",
    estate_distance: "",
    estate_rly: "",
    estate_price: "",
  });
  const [editEstate, setEditEstate] = useState({
    estate_id: "",
    estate_name: "",
    estate_image: "",
    estate_year: "",
    estate_town: "",
    estate_type: "",
    estate_area_sqm: "",
    estate_distance: "",
    estate_rly: "",
    estate_price: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEstates = async (currentPage = 1) => {
    try {
      const response = await getAllEstate(dispatch, currentPage, pagination);
      setEstates(response.metadata.estates);
      setTotalPages(Math.ceil(response.metadata.totalEstates / pagination));
    } catch (error) {
      console.error("Error fetching estates:", error);
    }
  };

  useEffect(() => {
    fetchEstates(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleEdit = ({
    estate_id,
    estate_name,
    estate_image,
    estate_year,
    estate_town,
    estate_type,
    estate_area_sqm,
    estate_distance,
    estate_rly,
    estate_price,
  }) => {
    setEditEstate({
      estate_id,
      estate_name,
      estate_image,
      estate_year,
      estate_town,
      estate_type,
      estate_area_sqm,
      estate_distance,
      estate_rly,
      estate_price,
    });
    setOpenEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEstate(id, userID, accessToken, dispatch, axiosJWT);
      setEstates((prev) => prev.filter((estate) => estate?._id !== id));
    } catch (error) {
      console.error("Error deleting estate:", error);
    }
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewEstate({
      estate_name: "",
      estate_image: "",
      estate_year: "",
      estate_town: "",
      estate_type: "",
      estate_area_sqm: "",
      estate_distance: "",
      estate_rly: "",
      estate_price: "",
    });
  };

  const handleCloseEdit = async () => {
    setOpenEdit(false);
    setNewEstate({
      estate_name: "",
      estate_image: "",
      estate_year: "",
      estate_town: "",
      estate_type: "",
      estate_area_sqm: "",
      estate_distance: "",
      estate_rly: "",
      estate_price: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEstate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEstate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleEditImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    let imageUrl = "";
    if (imageFile) {
      const response = await uploadImage(imageFile, dispatch);
      imageUrl = response.metadata.url;
      setNewEstate((prev) => ({
        ...prev,
        estate_image: imageUrl,
      }));
    }

    const data = {
      year: newEstate.estate_year,
      town: newEstate.estate_town,
      flat_type: newEstate.estate_type,
      floor_area_sqm: newEstate.estate_area_sqm,
      remaining_lease_years: newEstate.estate_rly,
      distance_from_expressway: newEstate.estate_distance,
    };
    const value = await estimateValue(data);
    const estateData = {
      ...newEstate,
      estate_price: value.data.estimatePrice,
      estate_image: imageUrl,
    };

    await createEstate(
      userID,
      { ...estateData, estate_image: imageUrl },
      accessToken,
      dispatch,
      axiosJWT
    );
    fetchEstates(page);
    handleClose();
  };

  const handleSubmitEdit = async () => {
    try {
      let imageUrl = "";
      if (imageFile) {
        const response = await uploadImage(imageFile, dispatch);
        imageUrl = response.metadata.url;
        setEditEstate((prev) => ({
          ...prev,
          estate_image: imageUrl,
        }));
      }
      await updateEstate(
        editEstate.estate_id,
        { ...editEstate, estate_image: imageUrl },
        dispatch
      );
      fetchEstates(page);
      handleCloseEdit();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h1>Estate List</h1>
        <IconButton
          sx={{ backgroundColor: "#1976d2", color: "#fff" }}
          onClick={handleAddClick}
        >
          <Add />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Image</strong>
              </TableCell>
              <TableCell>
                <strong>Year</strong>
              </TableCell>
              <TableCell>
                <strong>Town</strong>
              </TableCell>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Area (sqm)</strong>
              </TableCell>
              <TableCell>
                <strong>Distance</strong>
              </TableCell>
              <TableCell>
                <strong>RLY</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estates.map((estate) => (
              <TableRow key={estate?._id}>
                <TableCell>{estate?.estate_name}</TableCell>
                <TableCell>
                  {estate?.estate_image ? (
                    <img
                      src={estate?.estate_image}
                      alt="Estate"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>{estate?.estate_year}</TableCell>
                <TableCell>{estate?.estate_town}</TableCell>
                <TableCell>{estate?.estate_type}</TableCell>
                <TableCell>{estate?.estate_area_sqm}</TableCell>
                <TableCell>{estate?.estate_distance}</TableCell>
                <TableCell>{estate?.estate_rly}</TableCell>
                <TableCell>S${estate?.estate_price.toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      handleEdit({
                        estate_id: estate?._id,
                        estate_name: estate?.estate_name,
                        estate_image: estate?.estate_image,
                        estate_year: estate?.estate_year,
                        estate_town: estate?.estate_town,
                        estate_type: estate?.estate_type,
                        estate_area_sqm: estate?.estate_area_sqm,
                        estate_distance: estate?.estate_distance,
                        estate_rly: estate?.estate_rly,
                        estate_price: estate?.estate_price,
                      })
                    }
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(estate?._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      {/* Add Estate Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent>
          <h1 style={{ marginTop: 0 }}>Add New Estate</h1>
          <Box display="flex" flexDirection="column" gap="10px">
            <TextField
              label="Name"
              name="estate_name"
              value={newEstate.estate_name}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" component="label">
              Insert Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            {imagePreview && (
              <img
                src={imagePreview || newEstate.estate_image}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}
            <TextField
              label="Year"
              name="estate_year"
              value={newEstate.estate_year}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="town-label">Town</InputLabel>
              <Select
                labelId="town-label"
                label="Town"
                name="estate_town"
                value={newEstate.estate_town}
                onChange={handleChange}
              >
                {TOWN?.map((town) => (
                  <MenuItem value={town}>{town}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Type"
              name="estate_type"
              value={newEstate.estate_type}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Area (sqm)"
              name="estate_area_sqm"
              value={newEstate.estate_area_sqm}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Distance"
              name="estate_distance"
              value={newEstate.estate_distance}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="RLY"
              name="estate_rly"
              value={newEstate.estate_rly}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Estate Modal */}
      <Dialog open={openEdit} onClose={handleClose} fullWidth>
        <DialogContent>
          <h1 style={{ marginTop: 0 }}>Edit Estate</h1>
          <Box display="flex" flexDirection="column" gap="10px">
            <TextField
              label="Name"
              name="estate_name"
              value={editEstate.estate_name}
              onChange={handleEditChange}
              fullWidth
            />
            <Button variant="contained" component="label">
              Insert Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleEditImageUpload}
              />
            </Button>
            {editEstate.estate_image && (
              <img
                src={imagePreview || editEstate.estate_image}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}
            <TextField
              label="Year"
              name="estate_year"
              value={editEstate.estate_year}
              onChange={handleEditChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="town-label">Town</InputLabel>
              <Select
                labelId="town-label"
                label="Town"
                name="estate_town"
                value={editEstate.estate_town}
                onChange={handleEditChange}
              >
                {TOWN?.map((town) => (
                  <MenuItem value={town}>{town}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Type"
              name="estate_type"
              value={editEstate.estate_type}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Area (sqm)"
              name="estate_area_sqm"
              value={editEstate.estate_area_sqm}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Distance"
              name="estate_distance"
              value={editEstate.estate_distance}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="RLY"
              name="estate_rly"
              value={editEstate.estate_rly}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Price"
              name="estate_price"
              value={editEstate.estate_price}
              onChange={handleEditChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitEdit}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EstateTable;
