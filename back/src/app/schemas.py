from typing import List
from pydantic import BaseModel


class Path(BaseModel):
    source: str
    destination: str

class Merchandise(BaseModel):
    max_weight: int
    weights: List[int]
    values: List[int]