import React, { useState } from 'react';
import { Button, Input, Box } from '@mui/material';
import axios from 'axios';

const FileUploadComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        await axios.post('/api/upload', formData); // Adjust the API endpoint
        // Handle success or display a message to the user.
      } catch (error) {
        // Handle error or display an error message to the user.
      }
    }
  };

  return (
    <Box>
      <Input type="file" inputProps={{ accept: 'image/*, video/*' }} onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>
    </Box>
  );
};

export default FileUploadComponent;
