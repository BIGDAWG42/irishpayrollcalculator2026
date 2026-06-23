from flask import Flask, render_template, request, jsonify, send_file
import pandas as pd
import json
from datetime import datetime
import os
import io

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'data'

# 2026 Irish tax rates (approximate - for estimation only)
TAX_RATES = {
    'standard_rate': 0.20,
    'higher_rate': 0.40,
    'srcop_single': 44000,
    'usc_bands': [
        (12012, 0.005),
        (28700, 0.02),
        (70044, 0.03),
        (float('inf'), 0.08)
    ],
    'prsi_rate': 0.042,
    'employer_prsi': 0.1125
}

def calculate_paye(gross, tax_credits=0, srcop=44000):
    taxable = max(0, gross - tax_credits)
    paye = min(taxable, srcop) * TAX_RATES['standard_rate']
    if taxable > srcop:
        paye += (taxable - srcop) * TAX_RATES['higher_rate']
    return round(paye, 2)

def calculate_usc(gross):
    if gross < 13000:
        return 0.0
    usc = 0.0
    prev = 0
    for band, rate in TAX_RATES['usc_bands']:
        segment = min(gross - prev, band - prev) if band != float('inf') else (gross - prev)
        if segment > 0:
            usc += segment * rate
        prev = band
    return round(usc, 2)

def calculate_prsi(gross):
    return round(gross * TAX_RATES['prsi_rate'], 2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    employees = data.get('employees', [])
    results = []
    totals = {'gross': 0, 'paye': 0, 'usc': 0, 'prsi': 0, 'employer_prsi': 0, 'net': 0}

    for emp in employees:
        try:
            gross = float(emp.get('gross_pay', 0) or 0)
            tax_credits = float(emp.get('tax_credits', 0) or 0)
            srcop = float(emp.get('srcop', TAX_RATES['srcop_single']))

            paye = calculate_paye(gross, tax_credits, srcop)
            usc = calculate_usc(gross)
            prsi = calculate_prsi(gross)
            employer_prsi = round(gross * TAX_RATES['employer_prsi'], 2)
            net = round(gross - paye - usc - prsi, 2)

            result = {**emp, 'paye': paye, 'usc': usc, 'prsi': prsi, 'employer_prsi': employer_prsi, 'net_pay': net}
            results.append(result)

            totals['gross'] += gross
            totals['paye'] += paye
            totals['usc'] += usc
            totals['prsi'] += prsi
            totals['employer_prsi'] += employer_prsi
            totals['net'] += net
        except Exception as e:
            results.append({**emp, 'error': str(e)})

    summary = {
        'total_employees': len(results),
        'total_gross': round(totals['gross'], 2),
        'total_paye': round(totals['paye'], 2),
        'total_usc': round(totals['usc'], 2),
        'total_prsi': round(totals['prsi'], 2),
        'total_employer_prsi': round(totals['employer_prsi'], 2),
        'total_net': round(totals['net'], 2)
    }

    return jsonify({'employees': results, 'summary': summary})

@app.route('/export_csv', methods=['POST'])
def export_csv():
    data = request.json.get('employees', [])
    df = pd.DataFrame(data)
    output = io.BytesIO()
    df.to_csv(output, index=False)
    output.seek(0)
    return send_file(output, mimetype='text/csv', as_attachment=True, download_name=f'payroll_{datetime.now().strftime("%Y%m%d")}.csv')

if __name__ == '__main__':
    os.makedirs('data', exist_ok=True)
    app.run(debug=True, port=5000)
