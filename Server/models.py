# app/models.py

from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class AdClickData(Base):
    __tablename__ = "ad_click_data"

    id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    history = Column(String, nullable=False)
    device = Column(String, nullable=False)
    ad_position = Column(String, nullable=False)
    click_flag = Column(Boolean, nullable=False)
 