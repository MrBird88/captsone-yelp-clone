import json
from app.models import db, Image, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_images():
    data = open('app/seeds/data/images.json')
    images = json.load(data)

    print("\nSeeding images table...")
    for idx, image in enumerate(images):
        new_image = Image(
            url=image['url_regular'],
            url_small=image['url_small'],
            url_regular=image['url_regular'],
            url_full=image['url_full'],
            user_id=(idx % 50) + 1,
            business_id=(idx % 30) + 1,
            review_id=idx + 1,
        )
        db.session.add(new_image)

    db.session.commit()
    print("Images table seeded.")


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            f"TRUNCATE table images RESTART IDENTITY CASCADE;")

    db.session.commit()
