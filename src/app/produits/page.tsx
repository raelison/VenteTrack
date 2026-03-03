
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProducts, deleteProduct } from "@/lib/api";
import { Product } from "@/lib/types";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package } from "lucide-react";
import { ProductDialog } from "@/components/products/product-dialog";
import { DeleteButton } from "@/components/common/delete-button";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadProducts();
  }, [router]);

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold text-primary font-headline">Catalogue Produits</h1>
              <p className="text-muted-foreground">Gérez votre inventaire et suivez les niveaux de stock.</p>
            </div>
            <ProductDialog onSuccess={loadProducts} />
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Inventaire</CardTitle>
                <CardDescription>Gestion complète des produits (Modèle Django).</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Désignation</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-mono text-xs">#{product.id}</TableCell>
                      <TableCell className="font-medium">{product.design}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={product.stock > 10 ? "secondary" : "destructive"}>
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <ProductDialog product={product} onSuccess={loadProducts} />
                          <DeleteButton id={product.id} onDelete={deleteProduct} title={product.design} onSuccess={loadProducts} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {products.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        Aucun produit trouvé.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
