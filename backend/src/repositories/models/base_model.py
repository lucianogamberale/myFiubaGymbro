from datetime import datetime
from typing import Annotated

from sqlalchemy import BigInteger, Integer, String
from sqlalchemy.orm import DeclarativeBase, mapped_column

Str = Annotated[str, 255]
SmallStr = Annotated[str, 50]
LargeStr = Annotated[str, 1000]
BigInt = Annotated[int, BigInteger]


class Base(DeclarativeBase):
    type_annotation_map = {
        BigInt: BigInteger(),
        Str: String(255),
        SmallStr: String(50),
        LargeStr: String(1000),
    }


IntPK = Annotated[
    int, mapped_column(BigInteger().with_variant(Integer, "sqlite"), primary_key=True)
]
AutoDateTime = Annotated[datetime, mapped_column(insert_default=datetime.now)]


# Note: To allow distribution of classes across multiple files and avoid circular imports due to relationship definitions, we use the TYPE_CHECKING constant to avoid importing classes directly at runtime. This is a common pattern.
# Check:
# - https://github.com/sqlalchemy/sqlalchemy/discussions/9576#discussioncomment-11867298
# - https://docs.python.org/3/library/typing.html#typing.TYPE_CHECKING
# - https://peps.python.org/pep-0484/#runtime-or-type-checking
# - https://peps.python.org/pep-0484/#forward-references

# Default SQLAlchemy type_map: https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#mapped-column-derives-the-datatype-and-nullability-from-the-mapped-annotation
