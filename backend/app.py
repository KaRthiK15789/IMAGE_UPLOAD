from flask import Flask, request, jsonify
from flask_cors import CORS
from google.generativeai import configure, GenerativeModel
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

app = Flask(__name__)
CORS(app)  # Enable CORS

# Configure Gemini AI
configure(api_key=os.getenv("GEMINI_API_KEY"))
model = GenerativeModel("gemini-pro-vision")

@app.route("/api/process-poem", methods=["POST"])
def process_poem():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        image = request.files["image"].read()
        prompt = """
        Extract and analyze this poem:
        1. Original text (in original script)
        2. Romanized version (English letters)
        3. English translation with meanings (line by line)
        
        Return JSON format:
        {
            "original": "...",
            "romanized": "...",
            "translation": [
                {"line": "...", "meaning": "..."},
                ...
            ]
        }
        """
        response = model.generate_content([prompt, {"mime_type": "image/jpeg", "data": image}])
        return jsonify(response.text)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
