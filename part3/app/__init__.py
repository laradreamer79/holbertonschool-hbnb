import os

from flask import Flask, send_from_directory
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy 
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def seed_demo_data():
    from app.models.user import User
    from app.models.place import Place
    from app.models.amenity import Amenity

    admin_id = "36c9050e-ddd3-4c3b-9731-9f487208bbc1"
    wifi_id = "70b60c82-594b-4524-a914-657418fb708b"
    pool_id = "1aeb848d-c2c6-4f16-bf5e-87a483a22e93"
    ac_id = "a5381fb3-dde5-41ad-a9db-86a4107a8542"

    admin = db.session.get(User, admin_id)
    if not admin:
        admin = User(
            id=admin_id,
            first_name="Admin",
            last_name="HBnB",
            email="admin@hbnb.io",
            password="$2y$12$iK2xy/c.vLgsHXf/hzlOoOH/JkBCkDKkftMa3l.7NJm.aqEAIgLBy",
            is_admin=True,
        )
        db.session.add(admin)

    amenities = {
        wifi_id: "WiFi",
        pool_id: "Swimming Pool",
        ac_id: "Air Conditioning",
    }

    amenity_objects = {}
    for amenity_id, name in amenities.items():
        amenity = db.session.get(Amenity, amenity_id)
        if not amenity:
            amenity = Amenity(id=amenity_id, name=name)
            db.session.add(amenity)
        amenity_objects[amenity_id] = amenity

    places = [
        {
            "id": "5e2218a0-5af2-4f08-a3e0-465ac9a877e7",
            "title": "Palm View Suite",
            "description": "A bright resort suite with palm views, a private balcony, and easy access to the pool.",
            "price": 120.00,
            "latitude": 24.7136,
            "longitude": 46.6753,
            "amenities": [wifi_id, pool_id],
        },
        {
            "id": "c0b32c1f-9724-4a3b-8e41-6601662d3b24",
            "title": "Turquoise Beach Villa",
            "description": "A calm beachside villa with open living space, soft sea breeze, and sunset lounge areas.",
            "price": 185.00,
            "latitude": 25.2048,
            "longitude": 55.2708,
            "amenities": [wifi_id, ac_id],
        },
    ]

    for place_data in places:
        place = db.session.get(Place, place_data["id"])
        if not place:
            place = Place(
                id=place_data["id"],
                title=place_data["title"],
                description=place_data["description"],
                price=place_data["price"],
                latitude=place_data["latitude"],
                longitude=place_data["longitude"],
                owner=admin,
            )
            place.amenities = [
                amenity_objects[amenity_id]
                for amenity_id in place_data["amenities"]
            ]
            db.session.add(place)

    db.session.commit()

def initialize_database(app):
    with app.app_context():
        from app import models

        db.create_all()
        seed_demo_data()

def create_app(config_class="config.DevelopmentConfig"):
    frontend_dir = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "..", "part4")
    )
    app = Flask(__name__, static_folder=frontend_dir, static_url_path="")
    
    app.config.from_object(config_class)
    CORS(app)
    db.init_app(app) 
    bcrypt.init_app(app)
    jwt.init_app(app)
    
    from app.services.facade import HBnBFacade
    from app.api.v1.users import api as users_ns
    from app.api.v1.places import api as places_ns
    from app.api.v1.amenities import api as amenities_ns
    from app.api.v1.reviews import api as reviews_ns
    from app.api.v1.auth import api as auth_ns

    @app.route("/")
    def serve_frontend_home():
        return send_from_directory(frontend_dir, "index.html")

        
    api = Api(
        app,
        version="1.0",
        title="HBnB API",
        description="HBnB Application API",
        doc="/api-docs"  
    )
    app.config["FACADE"] = HBnBFacade()

    # Register Namespaces
    api.add_namespace(users_ns, path="/users")
    api.add_namespace(places_ns, path="/places")
    api.add_namespace(amenities_ns, path="/amenities")
    api.add_namespace(reviews_ns, path="/reviews")
    api.add_namespace(auth_ns, path="/auth")

    initialize_database(app)

    @app.route("/<path:filename>")
    def serve_frontend_file(filename):
        if os.path.exists(os.path.join(frontend_dir, filename)):
            return send_from_directory(frontend_dir, filename)
        return send_from_directory(frontend_dir, "index.html")

    return app
