import { Product, Client, Sale } from './types';

const BASE_URL = 'http://127.0.0.1:8000';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/produits/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error('Failed to fetch products', e);
    // Returning dummy data for preview if backend is not running
    return [
      { id: 1, design: 'Laptop Pro', stock: 15 },
      { id: 2, design: 'Smartphone Elite', stock: 42 },
      { id: 3, design: 'Monitor 4K', stock: 8 },
    ];
  }
}

export async function fetchClients(): Promise<Client[]> {
  try {
    const res = await fetch(`${BASE_URL}/clients/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error('Failed to fetch clients', e);
    return [
      { id: 1, nom: 'Jean Dupont' },
      { id: 2, nom: 'Marie Curie' },
      { id: 3, nom: 'Alice Martin' },
    ];
  }
}

export async function fetchSales(): Promise<Sale[]> {
  try {
    const res = await fetch(`${BASE_URL}/ventes/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error('Failed to fetch sales', e);
    return [
      { id: 1, qtesortie: 2, client: 1, produit: 1 },
      { id: 2, qtesortie: 1, client: 2, produit: 2 },
    ];
  }
}

export async function createSale(data: Omit<Sale, 'id'>): Promise<Sale | null> {
  try {
    const res = await fetch(`${BASE_URL}/ventes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create sale');
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function updateProductStock(id: number, newStock: number): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/produits/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock: newStock }),
    });
    return res.ok;
  } catch (e) {
    console.error('Failed to update stock', e);
    return false;
  }
}