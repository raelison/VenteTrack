import { fetchProducts } from "@/lib/api";
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
import { Package } from "lucide-react";

export default async function ProductsPage() {
  const products = await fetchProducts();

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
            <Package className="h-8 w-8 text-primary/20" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inventaire</CardTitle>
              <CardDescription>Liste exhaustive des produits disponibles dans le système.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Désignation</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Statut</TableHead>
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
                          <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20 border-none">Optimal</Badge>
                        ) : product.stock > 5 ? (
                          <Badge variant="outline" className="border-primary/20 text-primary">Modéré</Badge>
                        ) : (
                          <Badge variant="destructive" className="animate-pulse">Critique</Badge>
                        )}
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