from fastapi import APIRouter

router = APIRouter()

@router.get("/journal")
def list_of_trades():
    return {"message:" : "List of trades coming soon"}