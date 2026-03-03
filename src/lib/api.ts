
import API from './api-client';
import { Product, Client, Sale } from './types';

// --- PRODUITS ---
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await API.get('/produits/');
    return res.data;
  } catch (e) {
    console.error("Erreur fetchProducts:", e);
    return [];
  }
}

export async function createProduct(data: Omit<Product, 'id'>): Promise<Product | null> {
  try {
    const res = await API.post('/produits/', data);
    return res.data;
  } catch (e) {
    return null;
  }
}

export async function updateProduct(id: number, data: Partial<Product>): Promise<boolean> {
  try {
    const res = await API.patch(`/produits/${id}/`, data);
    return res.status === 200 || res.status === 204;
  } catch (e) {
    return false;
  }
}

export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const res = await API.delete(`/produits/${id}/`);
    return res.status === 200 || res.status === 204;
  } catch (e) {
    return false;
  }
}

// --- CLIENTS ---
export async function fetchClients(): Promise<Client[]> {
  try {
    const res = await API.get('/clients/');
    return res.data;
  } catch (e) {
    console.error("Erreur fetchClients:", e);
    return [];
  }
}

export async function createClient(data: Omit<Client, 'id'>): Promise<Client | null> {
  try {
    const res = await API.post('/clients/', data);
    return res.data;
  } catch (e) {
    return null;
  }
}

export async function updateClient(id: number, data: Partial<Client>): Promise<boolean> {
  try {
    const res = await API.patch(`/clients/${id}/`, data);
    return res.status === 200 || res.status === 204;
  } catch (e) {
    return false;
  }
}

export async function deleteClient(id: number): Promise<boolean> {
  try {
    const res = await API.delete(`/clients/${id}/`);
    return res.status === 200 || res.status === 204;
  } catch (e) {
    return false;
  }
}

// --- VENTES ---
export async function fetchSales(): Promise<Sale[]> {
  try {
    const res = await API.get('/ventes/');
    return res.data;
  } catch (e) {
    console.error("Erreur fetchSales:", e);
    return [];
  }
}

export async function createSale(data: Omit<Sale, 'id'>): Promise<Sale | null> {
  try {
    const res = await API.post('/ventes/', data);
    return res.data;
  } catch (e) {
    return null;
  }
}

export async function updateSale(id: number, data: Partial<Sale>): Promise<boolean> {
  try {
    const res = await API.patch(`/ventes/${id}/`, data);
    return res.status === 200 || res.status === 204;
  } catch (e) {
    return false;
  }
}

export async function deleteSale(id: number): Promise<boolean> {
  try {
    const res = await API.delete(`/ventes/${id}/`);
    return res.status === 200 || res.status === 204;
  } catch (e) {
    return false;
  }
}

export async function updateProductStock(id: number, newStock: number): Promise<boolean> {
  return updateProduct(id, { stock: newStock });
}
