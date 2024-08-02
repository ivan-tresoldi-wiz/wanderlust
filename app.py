from flask import Flask, render_template, request, jsonify, redirect, url_for
import mysql.connector

app = Flask(__name__)

# Vulnerable database connection
db = mysql.connector.connect(
    host="mysql-service",
    user="root",
    password="vulnerable_password",
    database="wanderlust_db"
)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/destinations')
def destinations():
    return render_template('destinations.html')

@app.route('/packages')
def packages():
    return render_template('packages.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Vulnerable SQL query
        cursor = db.cursor()
        query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
        cursor.execute(query)
        user = cursor.fetchone()
        
        if user:
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error="Invalid credentials")
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/sensitive_data', methods=['GET'])
def get_sensitive_data():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM customer_data")
    data = cursor.fetchall()
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000)