export interface Product {
  id: number;
  design: string;
  stock: number;
}

export interface Client {
  id: number;
  nom: string;
}

export interface Sale {
  id: number;
  qtesortie: number;
  client: number;
  produit: number;
}

export interface SaleDetail extends Sale {
  client_name?: string;
  product_design?: string;
}