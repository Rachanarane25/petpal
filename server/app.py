from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

from flask_cors import CORS

CORS(app, resources={r"/*": {"origins": ["https://rachanarane25.github.io"]}})


basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'pets.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    type = db.Column(db.String(30))
    age = db.Column(db.Integer)
    description = db.Column(db.String(200))
    adopted = db.Column(db.Boolean, default=False)
    image = db.Column(db.String(200))

class Adoption(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50))
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'))
    pet_name = db.Column(db.String(50))

@app.route('/static/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(app.static_folder, 'images'), filename)

@app.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.filter_by(adopted=False).all()
    return jsonify([{
        "id": p.id,
        "name": p.name,
        "type": p.type,
        "age": p.age,
        "description": p.description,
        "image": p.image
    } for p in pets])

@app.route('/adopt', methods=['POST'])
def adopt_pet():
    data = request.get_json() or {}
    pet_id = data.get("pet_id")
    user_name = data.get("user_name")
    if not user_name:
        return jsonify({"error": "Please login first"}), 401
    pet = Pet.query.get(pet_id)
    if not pet or pet.adopted:
        return jsonify({"error": "Pet not found or already adopted"}), 404
    pet.adopted = True
    db.session.add(Adoption(user_name=user_name, pet_id=pet.id, pet_name=pet.name))
    db.session.commit()
    return jsonify({"message": f"{user_name} successfully adopted {pet.name}!"})

@app.route('/init', methods=['GET'])
def init_route():
    with app.app_context():
        _reset_pets()
    return jsonify({"message":"Database initialized with sample pets!"})

def _reset_pets():
    db.create_all()
    # remove existing rows
    Adoption.query.delete()
    Pet.query.delete()
    db.session.commit()
    pets = [
        Pet(name="Bruno", type="Dog", age=3, description="Friendly and loyal", image="/static/images/bruno.webp"),
        Pet(name="Chintu", type="Cat", age=2, description="Playful and curious", image="/static/images/chintu.webp"),
        Pet(name="Coco", type="Parrot", age=1, description="Talkative and cheerful", image="/static/images/coco.webp"),
        Pet(name="Rocky", type="Rabbit", age=1, description="Soft and gentle, loves carrots", image="/static/images/rocky.webp"),
        Pet(name="Tommy", type="Dog", age=4, description="Energetic and loves running", image="/static/images/tommy.webp"),
        Pet(name="Milo", type="Cat", age=3, description="Curious and independent", image="/static/images/milo.webp"),
        Pet(name="Soni", type="Rabbit", age=2, description="Soft and friendly", image="/static/images/soni.webp")
    ]
    db.session.add_all(pets)
    db.session.commit()

if __name__ == '__main__':
    # initialize DB when running locally
    with app.app_context():
        _reset_pets()
    app.run(debug=True)
