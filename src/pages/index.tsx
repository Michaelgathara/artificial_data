import { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        responseType: 'blob', // Important for file downloads
      });

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    } catch (err) {
      setError('An error occurred while uploading the file.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Artificial Data Generator</h1>
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} className="border p-2" />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Processing...' : 'Upload and Generate Data'}
      </button>
      {downloadUrl && (
        <div className="mt-4">
          <a
            href={downloadUrl}
            download="synthetic_data.txt"
            className="text-blue-500 underline"
          >
            Download Synthetic Data
          </a>
        </div>
      )}
    </div>
  );
};

export default HomePage;
