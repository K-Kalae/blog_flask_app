from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required
from . import db
from .models import Post, User

main = Blueprint('main', __name__)

# Create a test admin account (run once)
@main.route('/api/setup', methods=['POST'])
def create_admin():
    if User.query.filter_by(username='admin').first():
        return jsonify({'message': 'Admin already exists'}), 400

    hashed_pw = generate_password_hash('adminpass')
    admin = User(username='admin', password=hashed_pw)
    db.session.add(admin)
    db.session.commit()
    return jsonify({'message': 'Admin user created'})

@main.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.username)
        return jsonify(access_token=access_token), 200
    return jsonify({'message': 'Invalid credentials'}), 401




# Route to get all posts
@main.route('/api/posts', methods=['GET'])
def get_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([
        {
            'id': post.id,
            'title': post.title,
            'body': post.body,
            'created_at': post.created_at.isoformat()
        }
        for post in posts
    ])

# Route to create a new post
@main.route('/api/posts', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    new_post = Post(title=data['title'], body=data['body'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post created'}), 201

# Route to get a single post by ID
@main.route('/api/posts/<int:id>', methods=['GET'])
def get_post(id):
    post = Post.query.get_or_404(id)
    return jsonify({
        'id': post.id,
        'title': post.title,
        'body': post.body,
        'created_at': post.created_at.isoformat()
    })

# Route to delete a post by ID
@main.route('/api/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted'})
