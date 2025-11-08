from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# ------------------- APP SETUP -------------------
app = Flask(__name__, static_folder="../client/static", static_url_path="/static")

# ✅ Correct CORS configuration
CORS(app, resources={r"/*": {"origins": ["https://rachanarane25.github.io"]}})

# ------------------- DATABASE SETUP -------------------
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'pets.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
