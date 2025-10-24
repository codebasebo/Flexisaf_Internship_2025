import React, { useState } from 'react';
import { api } from '../services/api';

// Component demonstrating FormData handling
const FormDataDemo: React.FC = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Submit form using FormData
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('email', formValues.email);
      formData.append('message', formValues.message);
      
      if (file) {
        formData.append('file', file);
      }

      // Log FormData entries (for demonstration)
      console.log('FormData entries:');
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: ${value.name} (${value.size} bytes, ${value.type})`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      // Submit the form data
      const response = await api.submitFormData(formData);
      setResult(`✅ ${response.message}`);
      
      // Reset form
      setFormValues({ name: '', email: '', message: '' });
      setFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      setResult(`❌ Error: ${error instanceof Error ? error.message : 'Submission failed'}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="demo-section">
      <h2>📝 Form Data Handling</h2>
      <p>Demonstrates creating and submitting FormData with files</p>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formValues.message}
            onChange={handleInputChange}
            required
            placeholder="Enter your message"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file-input">Upload File (optional):</label>
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
          />
          {file && (
            <div className="file-info">
              Selected: {file.name} ({Math.round(file.size / 1024)}KB)
            </div>
          )}
        </div>

        <button type="submit" disabled={submitting} className="submit-btn">
          {submitting ? 'Submitting...' : 'Submit Form'}
        </button>

        {result && (
          <div className={`result ${result.includes('✅') ? 'success' : 'error'}`}>
            {result}
          </div>
        )}
      </form>

      <div className="info-box">
        <h4>FormData Features:</h4>
        <ul>
          <li>✓ Handles text inputs</li>
          <li>✓ Supports file uploads</li>
          <li>✓ Automatically sets multipart/form-data</li>
          <li>✓ Works with async/await</li>
        </ul>
      </div>
    </div>
  );
};

export default FormDataDemo;
