from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__, static_folder="static", static_url_path="/static")

# Allow only your GitHub Pages domain
CORS(app, resources={r"/*": {"origins": ["https://rachanarane25.github.io"]}})

# Database setup
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'pets.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
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

@app.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.filter_by(adopted=False).all()
    pet_list = [
        {"id": p.id, "name": p.name, "type": p.type, "age": p.age,
         "description": p.description, "image": p.image}
        for p in pets
    ]
    return jsonify(pet_list)

@app.route('/adopt', methods=['POST'])
def adopt_pet():
    data = request.get_json()
    pet_id = data.get("pet_id")
    user_name = data.get("user_name")

    if not user_name:
        return jsonify({"error": "Please login first"}), 403

    pet = Pet.query.get(pet_id)
    if not pet or pet.adopted:
        return jsonify({"error": "Pet not found or already adopted"}), 404

    pet.adopted = True
    adoption = Adoption(user_name=user_name, pet_id=pet.id, pet_name=pet.name)
    db.session.add(adoption)
    db.session.commit()
    return jsonify({"message": f"{user_name} adopted {pet.name}!"})

@app.route('/init', methods=['GET'])
def init_data():
    db.create_all()
    Pet.query.delete()
    Adoption.query.delete()
    db.session.commit()

    pets = [
        Pet(name="Bruno", type="Dog", age=3, description="Friendly and loyal", image="/static/images/bruno.webp"),
        Pet(name="Chintu", type="Cat", age=2, description="Playful and curious", image="/static/images/chintu.webp"),
        Pet(name="Coco", type="Parrot", age=1, description="Talkative and cheerful", image="/static/images/coco.webp"),
        Pet(name="Rocky", type="Rabbit", age=1, description="Loves carrots", image="/static/images/rocky.webp"),
        Pet(name="Tommy", type="Dog", age=4, description="Energetic and loving", image="/static/images/tommy.webp"),
        Pet(name="Milo", type="Cat", age=3, description="Independent and sweet", image="/static/images/milo.webp"),
        Pet(name="Soni", type="Rabbit", age=2, description="Soft and cuddly", image="/static/images/soni.webp"),
    ]

    db.session.add_all(pets)
    db.session.commit()
    return jsonify({"message": "Database initialized with 7 pets!"})

if __name__ == '__main__':
    app.run(debug=True)
