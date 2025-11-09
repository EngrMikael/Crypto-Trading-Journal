from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from backend.app.core.database import get_session, Journal, get_session_dependency
from backend.app.model.journal_models import CreateTrade
from backend.app.core.auth_utils import get_current_user

router = APIRouter()

@router.get("/journal")
def list_of_trades(current_user: int = Depends(get_current_user), session: Session = Depends(get_session_dependency)):
    trades = session.exec(select(Journal).where(Journal.user_id == current_user)).all()
    return trades
  
@router.post("/register/trade")
def register_trade(
    journal_info: CreateTrade,
    current_user : int = Depends(get_current_user),
    session: Session = Depends(get_session_dependency)
    ):
        new_trade = Journal(
            user_id = current_user,
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