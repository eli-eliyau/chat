"use strict";
// import express from 'express';
// import multer from 'multer';
// import mongoose from 'mongoose';
// import GridFsStorage from 'multer-gridfs-storage';
// import http from 'http';
// import { Server } from 'socket.io';
// export const gig =()=>{
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
// const mongoURI = 'mongodb+srv://Projects:qcran4bvydnObCNu@cluster0.ywfj6da.mongodb.net/chatProject'; // Replace with your MongoDB URI
// // Connect to MongoDB
// mongoose.connect(mongoURI)
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });
// // Set up GridFS storage engine with custom chunk size
// const storage = new GridFsStorage({
//   url: mongoURI,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     return {
//       bucketName: 'uploads',
//       filename: file.originalname,
//       chunkSize:  2147483648 // Set custom chunk size (1MB)
//     };
//   },
// });
// const upload = multer({ storage });
// // Serve static files
// app.use(express.static('public'));
// // API endpoint for file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//   io.emit('fileUploaded', { filename: req.file?.filename });
//   res.json({ message: 'File uploaded successfully' });
// });
// // Listen for connections
// const PORT = 3004;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// // Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('Socket connected:', socket.id);
// });
// }
