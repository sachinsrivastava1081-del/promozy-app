import { Product } from '../types';

export function generateWhatsAppMessage(product: Product): string {
  const message = `🛒 *${product.name}*

${product.description}

💰 Price: ₹${product.price.toLocaleString()}

📱 Order now on WhatsApp!`;
  
  return encodeURIComponent(message);
}

export function shareOnWhatsApp(product: Product): void {
  const message = generateWhatsAppMessage(product);
  const url = `https://wa.me/?text=${message}`;
  window.open(url, '_blank');
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function isSubscriptionActive(endDate: Date): boolean {
  return new Date(endDate) > new Date();
}

export function getDaysRemaining(endDate: Date): number {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}