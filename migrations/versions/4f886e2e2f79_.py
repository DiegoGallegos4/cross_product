"""empty message

Revision ID: 4f886e2e2f79
Revises: 
Create Date: 2017-10-30 23:37:23.600722

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f886e2e2f79'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cross_product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('vector1', sa.PickleType(), nullable=False),
    sa.Column('vector2', sa.PickleType(), nullable=False),
    sa.Column('result', sa.PickleType(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cross_product')
    # ### end Alembic commands ###
