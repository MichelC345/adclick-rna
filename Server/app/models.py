# Definição de como deve ser os dados a serem armazenados no banco de dados

from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class AdClickData(Base):
    __tablename__ = "adclick-data" # Tabela adclick-data armazenará os novos dados

    id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    history = Column(String, nullable=False)
    device = Column(String, nullable=False)
    timeOfDay = Column(String, nullable=False)
    adPosition = Column(String, nullable=False)
    click = Column(Boolean, nullable=False)
 