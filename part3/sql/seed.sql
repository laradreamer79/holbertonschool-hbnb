-- seed.sql


-- Insert administrator user
INSERT INTO users (id, first_name, last_name, email, password, is_admin)
VALUES (
    '36c9050e-ddd3-4c3b-9731-9f487208bbc1',
    'Admin',
    'HBnB',
    'admin@hbnb.io',
    '$2y$12$iK2xy/c.vLgsHXf/hzlOoOH/JkBCkDKkftMa3l.7NJm.aqEAIgLBy',
    TRUE
);

-- Insert initial amenities
INSERT INTO amenities (id, name) VALUES
('70b60c82-594b-4524-a914-657418fb708b', 'WiFi'),
('1aeb848d-c2c6-4f16-bf5e-87a483a22e93', 'Swimming Pool'),
('a5381fb3-dde5-41ad-a9db-86a4107a8542', 'Air Conditioning');

-- Insert sample places
INSERT INTO places (id, title, description, price, latitude, longitude, owner_id) VALUES
(
    '5e2218a0-5af2-4f08-a3e0-465ac9a877e7',
    'Palm View Suite',
    'A bright resort suite with palm views, a private balcony, and easy access to the pool.',
    120.00,
    24.7136,
    46.6753,
    '36c9050e-ddd3-4c3b-9731-9f487208bbc1'
),
(
    'c0b32c1f-9724-4a3b-8e41-6601662d3b24',
    'Turquoise Beach Villa',
    'A calm beachside villa with open living space, soft sea breeze, and sunset lounge areas.',
    185.00,
    25.2048,
    55.2708,
    '36c9050e-ddd3-4c3b-9731-9f487208bbc1'
);

-- Link sample places to amenities
INSERT INTO place_amenity (place_id, amenity_id) VALUES
('5e2218a0-5af2-4f08-a3e0-465ac9a877e7', '70b60c82-594b-4524-a914-657418fb708b'),
('5e2218a0-5af2-4f08-a3e0-465ac9a877e7', '1aeb848d-c2c6-4f16-bf5e-87a483a22e93'),
('c0b32c1f-9724-4a3b-8e41-6601662d3b24', '70b60c82-594b-4524-a914-657418fb708b'),
('c0b32c1f-9724-4a3b-8e41-6601662d3b24', 'a5381fb3-dde5-41ad-a9db-86a4107a8542');
