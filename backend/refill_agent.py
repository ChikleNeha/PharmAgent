import sqlite3
import httpx
from fpdf import FPDF
from datetime import datetime, timedelta
from langchain_ollama import ChatOllama

llm = ChatOllama(model="llama3.2", temperature=0)

# Webhook URLs (In n8n, these would be two different Webhook Nodes)
INVENTORY_WEBHOOK = "http://localhost:5678/webhook/inventory-update"
CUSTOMER_NOTIFY_WEBHOOK = "http://localhost:5678/webhook/customer-refill"

async def warehouse_node(state):
    pzn = state["pzn"]
    prod = state["product_data"]
    
    # 1. Update SQLite
    conn = sqlite3.connect('pharmacy_warehouse.db')
    cursor = conn.cursor()
    cursor.execute("UPDATE inventory SET stock_level = stock_level - 1 WHERE pzn = ?", (pzn,))
    
    # 2. Check for Low Stock (The "Threshold" Logic)
    cursor.execute("SELECT stock_level FROM inventory WHERE pzn = ?", (pzn,))
    new_stock = cursor.fetchone()[0]
    conn.commit()
    conn.close()

    # 3. Fire Inventory Webhook ONLY if stock is low (e.g., < 5)
    if new_stock < 5:
        print(f"⚠️ LOW STOCK ALERT: {prod['product name']} only has {new_stock} left.")
        payload = {"event": "LOW_STOCK", "pzn": pzn, "name": prod['product name'], "stock": new_stock}
        try:
            async with httpx.AsyncClient() as client:
                await client.post(INVENTORY_WEBHOOK, json=payload, timeout=2.0)
        except: pass

    # 4. Generate PDF
    pdf = FPDF(); pdf.add_page(); pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"Invoice for PZN: {pzn}", ln=True)
    pdf.output(f"audit_{pzn}.pdf")
    
    return {"current_stock": new_stock}

async def predictive_node(state):
    prod = state["product_data"]
    # Logic: Assume 30-day supply
    refill_date = datetime.now() + timedelta(days=30)
    
    prompt = f"Patient bought {prod['product name']}. They run out on {refill_date.date()}. Draft a 1-sentence friendly refill reminder."
    res = await llm.ainvoke(prompt)
    reminder_text = res.content

    # 5. CUSTOMER NOTIFICATION WEBHOOK
    # This sends the "Predictive Alert" to the outside world (n8n/SMS/Email)
    customer_payload = {
        "patient_id": state.get("patient_id", "CUST_001"),
        "message": reminder_text,
        "scheduled_date": (refill_date - timedelta(days=3)).strftime("%Y-%m-%d"), # 3 days before empty
        "medication": prod['product name']
    }
    
    try:
        async with httpx.AsyncClient() as client:
            await client.post(CUSTOMER_NOTIFY_WEBHOOK, json=customer_payload, timeout=2.0)
            print(f"[System] Refill alert scheduled for {customer_payload['scheduled_date']}")
    except:
        print("[System] Customer Notification Webhook failed (n8n offline).")

    return {"prediction_msg": reminder_text}