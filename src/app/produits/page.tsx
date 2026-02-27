"use client";

import { useEffect, useState } from "react";
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
import { Loader2 } from "lucide-react";
import { ProductDialog } from "@/components/products/product-dialog";
import { DeleteButton } from "@/components/common/delete-button";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

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
            <CardHeader>
              <CardTitle>Inventaire</CardTitle>
              <CardDescription>Liste exhaustive des produits disponibles dans le système.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Désignation</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead className="text-right">Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="group transition-colors">
                        <TableCell className="font-mono text-xs text-muted-foreground">#{product.id}</TableCell>
                        <TableCell className="font-medium text-foreground">{product.design}</TableCell>
                        <TableCell className="text-right font-bold">{product.stock}</TableCell>
                        <TableCell className="text-right">
                          {product.stock > 20 ? (
                            <Badge variant="secondary" className="bg-accent/10 text-accent border-none">Optimal</Badge>
                          ) : product.stock > 5 ? (
                            <Badge variant="outline" className="border-primary/20 text-primary">Modéré</Badge>
                          ) : (
                            <Badge variant="destructive">Critique</Badge>
                          )}
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
                        <TableCell colSpan={5} className="h-24 text-center">
                          Aucun produit trouvé.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}