// Dashboard.js
import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Link,
} from "@mui/material";
import {
  getVendorApplications,
  getUnpaidVendors,
  approveVendor,
  declineVendor,
  sendEmail,
} from "../api/vendorApi"; // ensure api functions are defined here

function Dashboard() {
  const [pendingVendors, setPendingVendors] = useState([]);
  const [unpaidVendors, setUnpaidVendors] = useState([]);
  const [topStats, setTopStats] = useState({
    traffic: 0,
    revenue: 0,
    topVendor: null,
  });

  const [emailOpen, setEmailOpen] = useState(false);
  const [emailData, setEmailData] = useState({ to: "", subject: "", message: "" });

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const vendorsRes = await getVendorApplications();
      const unpaidRes = await getUnpaidVendors();

      const vendors = vendorsRes.data.data || [];
      setPendingVendors(vendors.filter((v) => v.status === "PENDING"));
      setUnpaidVendors(unpaidRes.data || []);

      // Dummy top stats logic (replace with real API if available)
      setTopStats({
        traffic: 1200,
        revenue: 45000, // in Rands
        topVendor: vendors[0] || null,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Approve vendor
  const handleApprove = async (id) => {
    try {
      await approveVendor(id);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert("Failed to approve vendor");
    }
  };

  // Decline vendor
  const handleDecline = async (id) => {
    try {
      await declineVendor(id);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert("Failed to decline vendor");
    }
  };

  // Send email
  const handleSendEmail = async () => {
    try {
      await sendEmail(emailData);
      setEmailOpen(false);
      setEmailData({ to: "", subject: "", message: "" });
      alert("Email sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send email");
    }
  };

  return (
    <div style={{ marginLeft: 260, padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Azania Admin Dashboard
      </Typography>

      {/* Top Stats */}
      <Grid container spacing={3} style={{ marginBottom: 20 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "rgb(13, 80, 33)", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Traffic</Typography>
              <Typography variant="h4">{topStats.traffic}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "#115325", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4">R{topStats.revenue}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "#0f5123", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Unpaid Vendors</Typography>
              <Typography variant="h4">{unpaidVendors.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "rgb(15, 84, 35)", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Top Vendor</Typography>
              <Typography variant="h5">{topStats.topVendor?.fullName || "N/A"}</Typography>
              <Typography variant="body2">
                Revenue: R{topStats.topVendor?.revenue || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pending Vendors */}
      <Typography variant="h5" gutterBottom>
        Pending Vendor Applications
      </Typography>
      <Table style={{ marginBottom: 20 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Business</TableCell>
            <TableCell>Subscription</TableCell>
            <TableCell>Documents</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingVendors.map((vendor) => (
            <TableRow key={vendor._id}>
              <TableCell>{vendor.fullName}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.businessName}</TableCell>
              <TableCell>{vendor.subscriptionPlan}</TableCell>
              <TableCell>
                <div>
                  <Link
                    href={`http://localhost:5000/${vendor.documents.registrationCert}`}
                    target="_blank"
                  >
                    Registration Cert
                  </Link>
                  <br />
                  <Link
                    href={`http://localhost:5000/${vendor.documents.directorId}`}
                    target="_blank"
                  >
                    Director ID
                  </Link>
                  <br />
                  <Link
                    href={`http://localhost:5000/${vendor.documents.proofOfAddress}`}
                    target="_blank"
                  >
                    Proof of Address
                  </Link>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 8 }}
                  onClick={() => handleApprove(vendor._id)}
                >
                  Approve
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => handleDecline(vendor._id)}
                >
                  Decline
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Unpaid Vendors */}
      <Typography variant="h5" gutterBottom>
        Vendors With Unpaid Subscriptions
      </Typography>
      <Table style={{ marginBottom: 20 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Subscription Due</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {unpaidVendors.map((vendor) => (
            <TableRow key={vendor._id}>
              <TableCell>{vendor.fullName}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>R{vendor.subscriptionDue || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Send Email */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setEmailOpen(true)}
      >
        Send Email
      </Button>

      <Dialog open={emailOpen} onClose={() => setEmailOpen(false)} fullWidth>
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent>
          <TextField
            label="To (Email)"
            fullWidth
            margin="dense"
            value={emailData.to}
            onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
          />
          <TextField
            label="Subject"
            fullWidth
            margin="dense"
            value={emailData.subject}
            onChange={(e) =>
              setEmailData({ ...emailData, subject: e.target.value })
            }
          />
          <TextField
            label="Message"
            fullWidth
            margin="dense"
            multiline
            rows={5}
            value={emailData.message}
            onChange={(e) =>
              setEmailData({ ...emailData, message: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailOpen(false)}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={handleSendEmail}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dashboard;