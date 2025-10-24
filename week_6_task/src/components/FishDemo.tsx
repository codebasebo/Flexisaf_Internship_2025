import React, { useEffect, useState } from 'react';
import { fishService } from '../services/fishService';

const FishDemo: React.FC = () => {
  const [fishList, setFishList] = useState<any[]>([]);
  const [selectedFish, setSelectedFish] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const data = await fishService.fetchFish();
        if (mounted) setFishList(data);
      } catch (err) {
        setMessage(err instanceof Error ? err.message : String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => { mounted = false; };
  }, []);

  const showDetails = async (id: number) => {
    setLoading(true);
    setSelectedFish(null);
    try {
      const fish = await fishService.fetchFishById(id);
      setSelectedFish(fish);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadResult(null);
    setMessage(null);
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    try {
      const res = await fishService.uploadFishData(fd);
      setUploadResult(res);
      setMessage('Upload successful');
      form.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const runPromiseExample = () => {
    setMessage(null);
    setLoading(true);
    fishService.fishPromiseExample()
      .then(res => setMessage(res))
      .catch(err => setMessage(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  };

  return (
    <div className="demo-section">
      <h2>🐟 Fish Demo</h2>
      <p>Small demo showing JSON fetch, FormData upload, Promises, and async/await using fish data.</p>

      <div className="button-group">
        <button onClick={runPromiseExample} disabled={loading}>Run Fish Promise</button>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {message && <div className="info-box">{message}</div>}

      <div className="data-display">
        <h3>Fish List</h3>
        <div className="users-list">
          {fishList.map(f => (
            <div className="card" key={f.id}>
              <h4>{f.name}</h4>
              <p>{f.species}</p>
              <p>{f.description}</p>
              <button onClick={() => showDetails(f.id)}>Details</button>
            </div>
          ))}
        </div>

        {selectedFish && (
          <div className="card" style={{ marginTop: 16 }}>
            <h3>Details: {selectedFish.name}</h3>
            <img src={selectedFish.image} alt={selectedFish.name} style={{ width: '100%', borderRadius: 8 }} />
            <p><strong>Species:</strong> {selectedFish.species}</p>
            <p>{selectedFish.description}</p>
          </div>
        )}

        <div style={{ marginTop: 20 }}>
          <h3>Upload New Fish (FormData)</h3>
          <form onSubmit={handleUpload} className="form-container">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="species">Species</label>
              <input id="species" name="species" required />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input id="image" name="image" type="file" accept="image/*" />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>Upload Fish</button>
          </form>

          {uploadResult && (
            <div className="result success" style={{ marginTop: 12 }}>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(uploadResult, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FishDemo;
