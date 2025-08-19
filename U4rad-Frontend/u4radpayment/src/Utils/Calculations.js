// utils/calculations.js

// Calculate amount based on service type and quantity
    export const calculateAmount = (item) => {
    const qty = item.quantity;
    
    if (qty === 0) return 0;
    
    switch (item.name) {
        case 'XRAY':
        if (qty <= 50) {
            return qty * 30;
        } else {
            return (50 * 30) + ((qty - 50) * 50);
        }
        
        case 'CT':
        if (qty <= 50) {
            return qty * 90;
        } else {
            return (50 * 90) + ((qty - 50) * 120);
        }
        
        case 'MRI':
        return qty * 500;
        
        case 'Mammo':
       if (qty <= 10) {
            return qty * 500;
        } else {
            return (10 * 500) + ((qty - 10) * 10);
        }
        
        default:
        return qty * item.rate;
    }
    };

    // Calculate total cart amount
    export const calculateCartTotal = (cartItems) => {
    return cartItems.reduce((sum, item) => sum + calculateAmount(item), 0);
    };

    // Apply discount based on promo code
    export const applyPromoDiscount = (promoCode, totalAmount) => {
    const code = promoCode.toUpperCase().trim();
    
    switch (code) {
        case 'SAVE10':
        return {
            discount: totalAmount * 0.1,
            message: '10% discount applied successfully!'
        };
        
        case 'FIRST20':
        return {
            discount: totalAmount * 0.2,
            message: '20% discount applied for first-time users!'
        };
        
        case 'BULK25':
        return totalAmount >= 5000 ? {
            discount: totalAmount * 0.25,
            message: '25% bulk discount applied!'
        } : {
            discount: 0,
            message: 'Bulk discount requires minimum ₹5000 order'
        };
        
        default:
        return {
            discount: 0,
            message: 'Invalid promo code'
        };
    }
    };

    // Get rate display string
    export const getRateDisplay = (serviceName, quantity = 0) => {
    switch (serviceName) {
        case 'XRAY':
        if (quantity <= 50) return '₹30 per case';
        return '₹30 (1-50), ₹50 (51+)';
        
        case 'CT':
        if (quantity <= 50) return '₹90 per case';
        return '₹90 (1-50), ₹120 (51+)';
        
        case 'MRI':
        return '₹120 per case';
        
        case 'Mammo':
        return '₹80 per case';
        
        default:
        return 'Rate not available';
    }
    };

    // Validate cart items
    export const validateCartItems = (cartItems) => {
    const errors = [];
    
    cartItems.forEach((item, index) => {
        if (item.quantity < 0) {
        errors.push(`${item.name}: Quantity cannot be negative`);
        }
        
        if (item.quantity > 1000) {
        errors.push(`${item.name}: Maximum quantity is 1000`);
        }
    });
    
    return errors;
    };

    // Format currency
    export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
    };