from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

# ------------------- DATABASE SETUP -------------------
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'pets.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ------------------- DATABASE MODELS -------------------
class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    type = db.Column(db.String(30))
    age = db.Column(db.Integer)
    description = db.Column(db.String(200))
    adopted = db.Column(db.Boolean, default=False)

class Adoption(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50))
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'))
    pet_name = db.Column(db.String(50))

# ------------------- ROUTES -------------------
@app.route('/pets', methods=['GET'])
def get_pets():
    """Get all pets that are not yet adopted."""
    pets = Pet.query.filter_by(adopted=False).all()
    pet_list = [
        {"id": p.id, "name": p.name, "type": p.type, "age": p.age, "description": p.description}
        for p in pets
    ]
    return jsonify(pet_list)

@app.route('/adopt', methods=['POST'])
def adopt_pet():
    """Adopt a pet and record it in the database."""
    data = request.get_json()
    pet_id = data.get("pet_id")
    user_name = data.get("user_name")

    pet = Pet.query.get(pet_id)
    if not pet or pet.adopted:
        return jsonify({"error": "Pet not found or already adopted"}), 404

    # Mark as adopted
    pet.adopted = True
    adoption = Adoption(user_name=user_name, pet_id=pet.id, pet_name=pet.name)

    db.session.add(adoption)
    db.session.commit()

    return jsonify({"message": f"{user_name} successfully adopted {pet.name}!"})

@app.route('/adoptions', methods=['GET'])
def get_user_adoptions():
    """Get all adoptions made by a specific user."""
    user_name = request.args.get('user_name')
    if not user_name:
        return jsonify({"error": "Missing user name"}), 400

    adoptions = Adoption.query.filter_by(user_name=user_name).all()
    results = []
    for a in adoptions:
        pet = Pet.query.get(a.pet_id)
        results.append({
            "user_name": a.user_name,
            "pet_name": a.pet_name,
            "type": pet.type if pet else "Unknown",
            "age": pet.age if pet else "-",
            "description": pet.description if pet else "-"
        })
    return jsonify(results)

# ------------------- INITIAL DATA -------------------
@app.route('/init', methods=['GET'])
def init_data():
    """Initialize the database with sample pets."""
    db.create_all()
    if not Pet.query.first():
        pets = [
            Pet(name="Buddy", type="Dog", age=3, description="Friendly golden retriever"),
            Pet(name="Milo", type="Cat", age=2, description="Playful tabby cat"),
            Pet(name="Coco", type="Parrot", age=1, description="Loves to talk and sing")
        ]
        db.session.add_all(pets)
        db.session.commit()
    return jsonify({"message": "Database initialized with sample pets!"})

# ------------------- MAIN -------------------
if __name__ == '__main__':
    app.run(debug=True)
