from fastapi import APIRouter
from sqlmodel import Session, select
from backend.app.core.database import engine, Journal
from backend.app.model.journal_models import CreateTrade
router = APIRouter()

@router.get("/journal")
def list_of_trades():
    return {"message" : "List of trades coming soon"}
  
      
@router.post("/register/trade")
def register_trade(journal_info: CreateTrade, user_id: int):
    with Session(engine) as session:
        new_trade = Journal(
            user_id = user_id,
            asset_coin = journal_info.asset_coin,
            value_entered = journal_info.value_entered,
            value_outcome = journal_info.value_outcome,
            date_open = journal_info.date_open,
            date_closed = journal_info.date_closed,
            note = journal_info.note,
            strategy = journal_info.strategy,   
            p_l = journal_info.p_l
        )
        
        session.add(new_trade)
        session.commit()
        session.refresh(new_trade)
        
        return {"message" : "New Trade Created succesfully", "trade id" : new_trade.id}