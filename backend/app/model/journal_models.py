from sqlmodel import SQLModel
from datetime import date

class CreateTrade(SQLModel):
    asset_coin : str
    value_entered : float
    value_outcome : float
    date_open : date
    date_closed : date | None = None
    note : str |None = None
    strategy : str | None = None
    p_l : bool | None = None
    