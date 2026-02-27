import { Product, Client, Sale } from './types';

const BASE_URL = 'http://127.0.0.1:8000';

// --- PRODUITS ---
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/produits/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    // Return mock data for development if API is unreachable
    return [
      { id: 1, design: 'Laptop Pro', stock: 15 },
      { id: 2, design: 'Smartphone Elite', stock: 42 },
      { id: 3, design: 'Monitor 4K', stock: 8 },
    ];
  }
}

export async function createProduct(data: Omit<Product, 'id'>): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/produits/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok ? await res.json() : null;
  } catch (e) {
    return null;
  }
}

export async function updateProduct(id: number, data: Partial<Product>): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/produits/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/produits/${id}/`, { method: 'DELETE' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

// --- CLIENTS ---
export async function fetchClients(): Promise<Client[]> {
  try {
    const res = await fetch(`${BASE_URL}/clients/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [
      { id: 1, nom: 'Jean Dupont' },
      { id: 2, nom: 'Marie Curie' },
    ];
  }
}

export async function createClient(data: Omit<Client, 'id'>): Promise<Client | null> {
  try {
    const res = await fetch(`${BASE_URL}/clients/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok ? await res.json() : null;
  } catch (e) {
    return null;
  }
}

export async function updateClient(id: number, data: Partial<Client>): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/clients/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

export async function deleteClient(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/clients/${id}/`, { method: 'DELETE' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

// --- VENTES ---
export async function fetchSales(): Promise<Sale[]> {
  try {
    const res = await fetch(`${BASE_URL}/ventes/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function createSale(data: Omit<Sale, 'id'>): Promise<Sale | null> {
  try {
    const res = await fetch(`${BASE_URL}/ventes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok ? await res.json() : null;
  } catch (e) {
    return null;
  }
}

export async function updateSale(id: number, data: Partial<Sale>): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/ventes/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

export async function deleteSale(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/ventes/${id}/`, { method: 'DELETE' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

export async function updateProductStock(id: number, newStock: number): Promise<boolean> {
  return updateProduct(id, { stock: newStock });
}