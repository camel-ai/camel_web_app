"""Edit replace id integers in all models to use UUID instead

Revision ID: d98dd8ec85a3
Revises: 9c0a54914c78
Create Date: 2024-07-19 04:08:04.000976

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = 'd98dd8ec85a3'
down_revision = '9c0a54914c78'
branch_labels = None
depends_on = None


def upgrade():
    # Ensure uuid-ossp extension is available
    op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    # Create a new UUID column with a default UUID value
    op.add_column('user', sa.Column('new_id', postgresql.UUID(as_uuid=True), default=sa.text('uuid_generate_v4()')))

    # Populate the new columns with UUIDs
    op.execute('UPDATE "user" SET new_id = uuid_generate_v4()')

    # Set the new_id as not nullable
    op.alter_column('user', 'new_id', nullable=False)

    op.drop_column('user', 'id')
    op.alter_column('user', 'new_id', new_column_name='id')

    # Create primary key constraint
    op.create_primary_key('user_pkey', 'user', ['id'])

def downgrade():
    # Reverse the upgrade process
    op.add_column('user', sa.Column('old_id', sa.Integer, autoincrement=True))

    # Populate the old columns with default values
    # Generate sequences for the integer IDs if not exist
    op.execute('CREATE SEQUENCE IF NOT EXISTS user_id_seq AS INTEGER OWNED BY "user".old_id')

    op.execute('SELECT setval(\'user_id_seq\', COALESCE((SELECT MAX(old_id) + 1 FROM "user"), 1), false)')

    op.execute('UPDATE "user" SET old_id = nextval(\'user_id_seq\')')

    op.drop_column('user', 'id')
    op.alter_column('user', 'old_id', new_column_name='id')

    # Create primary key constraint
    op.create_primary_key('user_pkey', 'user', ['id'])
