from flask import Flask, request, send_file, jsonify
from werkzeug.utils import secure_filename
import os
import re
import pandas as pd
import pdfplumber
from nanonets import NANONETSOCR
import fitz
import tempfile
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = tempfile.gettempdir()

api_token = '2ee5a8fa-9808-11ee-a8fa-d6d5eaa3d980'
model = NANONETSOCR()
model.set_token(api_token)

keys_of_interest_pf = [
    "TRRN No :", "Challan Status :", "Challan Generated On :", "Establishment ID :",
    "Establishment Name :", "Challan Type :", "Total Members :", "Wage Month :",
    "Total Amount (Rs) :", "Account-1 Amount (Rs) :", "Account-2 Amount (Rs) :",
    "Account-10 Amount (Rs) :", "Account-21 Amount (Rs) :", "Account-22 Amount (Rs) :",
    "Payment Confirmation Bank :", "CRN :", "Payment Date :", "Payment Confirmation Date :",
    "Total PMRPY Benefit :"
]

def extract_text_from_pdf(pdf_path):
    text = ""
    if pdf_path.endswith('.pdf'):
        with pdfplumber.open(pdf_path) as doc:
            for page in doc.pages:
                text += page.extract_text()
    elif pdf_path.endswith('.pdf'):
        with fitz.open(pdf_path) as doc:
            for page in doc:
                text += page.get_text()
    return text

def extract_data_esi(text):
    data = {
        "Transaction Status": re.search(r"Transaction\s+status\s*[:\-]?\s*(.+)", text, re.IGNORECASE),
        "Employer's Code No": re.search(r"Employer's\s+Code\s+No\s*[:\-]?\s*(\d+)", text, re.IGNORECASE),
        "Employer's Name": re.search(r"Employer's\s+Name\s*[:\-]?\s*(.+)", text, re.IGNORECASE),
        "Challan Period": re.search(r"Challan\s+Period\s*[:\-]?\s*(.+)", text, re.IGNORECASE),
        "Challan Number": re.search(r"Challan\s+Number\s*[:\-]?\s*(\d+)", text, re.IGNORECASE),
        "Challan Created Date": re.search(r"Challan\s+Created\s+Date\s*[:\-]?\s*(\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})", text, re.IGNORECASE),
        "Challan Submitted Date": re.search(r"Challan\s+Submitted\s+Date\s*[:\-]?\s*(\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})", text, re.IGNORECASE),
        "Amount Paid": re.search(r"Amount\s+Paid\s*[:\-]?\s*(.+)", text, re.IGNORECASE),
        "Transaction Number": re.search(r"Transaction\s+Number\s*[:\-]?\s*(\w+)", text, re.IGNORECASE)
    }
    for key in data:
        if data[key]:
            data[key] = data[key].group(1).strip()
        else:
            data[key] = None
    return data

def write_data_to_excel(data, filename='extracted_data.xlsx'):
    df = pd.DataFrame(data)
    temp_excel_file = os.path.join(tempfile.gettempdir(), filename)
    df.to_excel(temp_excel_file, index=False)
    return temp_excel_file

@app.route('/upload/esi', methods=['POST'])
def upload_file_esi():
    uploaded_files = request.files.getlist("file")
    if not uploaded_files:
        return jsonify({"error": "No files uploaded"}), 400

    all_extracted_data = []
    for file in uploaded_files:
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        file.save(file_path)
        text = extract_text_from_pdf(file_path)
        if len(text) < 50:
            text = model.convert_to_string(file_path, formatting='lines')
        extracted_data = extract_data_esi(text)
        all_extracted_data.append(extracted_data)

    excel_file_path = write_data_to_excel(all_extracted_data, filename='esi_data.xlsx')
    for file in uploaded_files:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        os.remove(file_path)
    return send_file(excel_file_path, as_attachment=True)

@app.route('/upload/pfchallan', methods=['POST'])
def upload_and_process_files_pf():
    files = request.files.getlist('file')
    if not files:
        return jsonify({'error': 'No files uploaded'}), 400

    all_data = pd.DataFrame()

    for file in files:
        if file and file.filename.endswith('.pdf'):
            filename = secure_filename(file.filename)
            pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(pdf_path)

            with tempfile.NamedTemporaryFile(mode='w+', suffix='.csv', delete=False) as temp_file:
                output_filename = temp_file.name
                model.convert_to_csv(pdf_path, output_file_name=output_filename)

                df = pd.read_csv(output_filename)
                filtered_data = df[df['Unnamed: 0'].isin(keys_of_interest_pf)]
                clean_data = pd.DataFrame(filtered_data['Unnamed: 1'].values, index=filtered_data['Unnamed: 0']).transpose()
                clean_data.columns = [col.strip(':') for col in clean_data.columns]

                all_data = pd.concat([all_data, clean_data], ignore_index=True)

            os.remove(output_filename)
            os.remove(pdf_path)

    if not all_data.empty:
        consolidated_excel_filename = os.path.join(tempfile.gettempdir(), 'consolidated_pf_data.xlsx')
        all_data.to_excel(consolidated_excel_filename, index=False)
        return send_file(consolidated_excel_filename, as_attachment=True)
    else:
        return jsonify({'error': 'No data processed'}), 404

if __name__ == '__main__':
    app.run(debug=True)
