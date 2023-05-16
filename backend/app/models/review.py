from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    # Table properties
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Table columns
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    body = db.Column(db.String(255), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("businesses.id")), nullable=False)

    user = db.relationship("User", back_populates="reviews")
    business = db.relationship("Business", back_populates="reviews")
    images = db.relationship("Image", back_populates="review")

    # Model methods
    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'body': self.body,

            'user_id': self.user_id,
            'user': self.user,

            'business_id': self.business_id,
            'business': self.business,

            'images': self.images,
        }
