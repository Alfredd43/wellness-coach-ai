from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@host:port/database_name'  # Replace with your PostgreSQL connection string
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)  # TODO: Hash the password in a real application

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 409
    new_user = User(email=email, password=password) # TODO: Hash the password
    db.session.add(new_user) 
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email') 
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.password == password: # TODO: Compare with hashed password
        return jsonify({'message': 'User logged in successfully'}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@app.cli.command('create-db')
def create_db():
    db.create_all()
    print('Database tables created!')

if __name__ == '__main__':
    app.run(debug=True)