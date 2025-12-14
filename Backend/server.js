import express from 'express';
import dbconnect from './DB/dbconnect.js';
import dotenv from "dotenv";
import cors from 'cors';
import AuthRoutes from './Routes/Auth.routes.js';
import UserRoutes from './Routes/User.routes.js';
import BookingRoutes from './Routes/Booking.routes.js';
import DestinationRoutes from './Routes/Destination.routes.js';
import PackageRoutes from './Routes/Package.routes.js';
import PlannerRoutes from './Routes/Planner.routes.js';
import VendorRoutes from './Routes/Vendor.routes.js';
import AdminRoutes from './Routes/Admin.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/booking", BookingRoutes);
app.use("/api/v1/destination", DestinationRoutes);
app.use("/api/v1/package", PackageRoutes);
app.use("/api/v1/planner", PlannerRoutes);
app.use("/api/v1/vendor", VendorRoutes);
app.use("/api/v1/admin", AdminRoutes);

// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

dbconnect();