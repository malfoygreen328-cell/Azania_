import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
  deleteMultipleBrands,
} from "../api/api";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBrand, setCurrentBrand] = useState({ name: "", description: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc"); // name ascending

  // Fetch all brands
  const fetchBrands = async () => {
    try {
      const res = await getBrands();
      setBrands(res.data);
      setFilteredBrands(res.data);
    } catch (err) {
      console.error("Failed to fetch brands:", err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Search / Filter
  useEffect(() => {
    const filtered = brands.filter((b) =>
      b.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredBrands(filtered);
    setPage(0); // Reset to first page
  }, [searchText, brands]);

  // Sort by name
  const handleSort = () => {
    const sorted = [...filteredBrands].sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
    setFilteredBrands(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Dialog functions
  const handleOpenDialog = (brand = null) => {
    if (brand) {
      setCurrentBrand(brand);
      setIsEdit(true);
    } else {
      setCurrentBrand({ name: "", description: "" });
      setIsEdit(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleSave = async () => {
    try {
      if (isEdit) await updateBrand(currentBrand._id, currentBrand);
      else await addBrand(currentBrand);
      fetchBrands();
      handleCloseDialog();
    } catch (err) {
      console.error("Failed to save brand:", err);
    }
  };

  // Delete single brand
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      await deleteBrand(id);
      fetchBrands();
    } catch (err) {
      console.error(err);
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selected.length === 0) return alert("No brands selected");
    if (!window.confirm("Delete selected brands?")) return;
    try {
      await deleteMultipleBrands(selected);
      setSelected([]);
      fetchBrands();
    } catch (err) {
      console.error(err);
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Checkbox selection
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) setSelected(filteredBrands.map((b) => b._id));
    else setSelected([]);
  };

  return (
    <div style={{ marginLeft: 260, padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Brands
      </Typography>

      <div style={{ marginBottom: 16, display: "flex", gap: "12px", alignItems: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Search brands..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Add Brand
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBulkDelete}
          disabled={selected.length === 0}
        >
          Delete Selected
        </Button>
      </div>

      {/* Brands Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={
                  selected.length > 0 &&
                  selected.length === filteredBrands.length
                }
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell onClick={handleSort} style={{ cursor: "pointer" }}>
              Name {sortOrder === "asc" ? "↑" : "↓"}
            </TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBrands
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((brand) => (
              <TableRow key={brand._id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(brand._id)}
                    onChange={() => handleSelect(brand._id)}
                  />
                </TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand.description}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleOpenDialog(brand)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </Button>
                  <Button color="secondary" onClick={() => handleDelete(brand._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredBrands.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{isEdit ? "Edit Brand" : "Add New Brand"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={currentBrand.name}
            onChange={(e) =>
              setCurrentBrand({ ...currentBrand, name: e.target.value })
            }
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            multiline
            rows={3}
            value={currentBrand.description}
            onChange={(e) =>
              setCurrentBrand({ ...currentBrand, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={handleSave}>
            {isEdit ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Brands;