from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import os

def generate_invoice_pdf(order):
    """Generate PDF invoice for a given order."""
    file_path = f"media/invoices/{order.order_id}.pdf"
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    c = canvas.Canvas(file_path, pagesize=A4)
    width, height = A4

    # Header
    c.setFont("Helvetica-Bold", 20)
    c.drawString(200, height - 50, "Invoice")

    # Order details
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 100, f"Order ID: {order.order_id}")
    c.drawString(50, height - 120, f"Client: {order.client.username} ({order.client.email})")
    c.drawString(50, height - 140, f"Total Amount: {order.total_amount}")
    c.drawString(50, height - 160, f"Discount: {order.discount}")
    c.drawString(50, height - 180, f"Grand Total: {order.grand_total}")

    # Services list
    y = height - 220
    for svc in order.services.all():
        c.drawString(60, y, f"{svc.service.name} x {svc.quantity} = {svc.amount}")
        y -= 20

    c.drawString(50, y - 40, "Payment Status: PAID ✅")

    c.save()
    return file_path
