import { useState } from "react";
import axios from "axios";

export default function PoemTranslator() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/process-poem`,
        formData
      );
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to process image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="translator">
      <h2>Upload Poem Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
      />
      {loading && <p>Processing...</p>}
      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h3>Original Text</h3>
          <pre>{result.original}</pre>
          <h3>Romanized Version</h3>
          <pre>{result.romanized}</pre>
          <h3>Translation</h3>
          <ul>
            {result.translation?.map((line, i) => (
              <li key={i}>
                <strong>{line.line}</strong>: {line.meaning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
