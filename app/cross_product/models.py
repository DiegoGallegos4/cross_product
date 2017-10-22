from app import db


class CrossProduct(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vector1 = db.Column(db.PickleType(), nullable=False)
    vector2 = db.Column(db.PickleType(), nullable=False)
    result = db.Column(db.PickleType(), nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    def __init__(self, vector1, vector2, result):
        self.vector1 = vector1
        self.vector2 = vector2
        self.result = result

    def __repr__(self):
        return "{} x {} = {}".format(self.vector1, self.vector2, self.result)
