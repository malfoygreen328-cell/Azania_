import React, { useEffect, useState } from 'react';
import { getVendors, approveVendor, declineVendor } from '../api/api';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography } from '@mui/material';

function Vendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = () => getVendors().then(res => setVendors(res.data));

  return (
    <div style={{ marginLeft: 260, padding: 20 }}>
      <Typography variant="h4" gutterBottom>Vendor Registrations</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.map(v => (
            <TableRow key={v._id}>
              <TableCell>{v.name}</TableCell>
              <TableCell>{v.email}</TableCell>
              <TableCell>{v.registrationStatus}</TableCell>
              <TableCell>
                {v.registrationStatus === 'pending' && <>
                  <Button onClick={() => { approveVendor(v._id).then(fetchVendors); }} color="primary">Approve</Button>
                  <Button onClick={() => { declineVendor(v._id).then(fetchVendors); }} color="secondary">Decline</Button>
                </>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Vendors;