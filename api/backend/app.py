import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
import tempfile
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from config import OPENAI_API_PROMPT

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    try:
        file_content = uploaded_file.read().decode('utf-8')

        prompt = OPENAI_API_PROMPT + f"\n\n{file_content}\n\n"
        response = client.completions.create(engine='text-davinci-003',
        prompt=prompt,
        max_tokens=1024,
        temperature=0.7,
        n=1,
        stop=None)

        synthetic_data = response.choices[0].text.strip()

        temp_file = tempfile.NamedTemporaryFile(delete=False, mode='w+', encoding='utf-8')
        temp_file.write(synthetic_data)
        temp_file.flush()
        temp_file.seek(0)

        return send_file(
            temp_file.name,
            as_attachment=True,
            attachment_filename='synthetic_data.txt',
            mimetype='text/plain'
        )
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred during processing'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
