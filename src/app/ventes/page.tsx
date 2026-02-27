import { fetchProducts, fetchClients, fetchSales, deleteSale } from "@/lib/api";
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
import { SaleForm } from "@/components/sales/sale-form";
import { ShoppingCart, History } from "lucide-react";
import { SaleDetail } from "@/lib/types";
import { DeleteButton } from "@/components/common/delete-button";

export default async function SalesPage() {
  const [products, clients, sales] = await Promise.all([
    fetchProducts(),
    fetchClients(),
    fetchSales(),
  ]);

  // Enrich sales data for display
  const enrichedSales: SaleDetail[] = sales.map(sale => ({
    ...sale,
    client_name: clients.find(c => c.id === sale.client)?.nom || `Client #${sale.client}`,
    product_design: products.find(p => p.id === sale.produit)?.design || `Produit #${sale.produit}`,
  }));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold text-primary font-headline">Gestion des Ventes</h1>
              <p className="text-muted-foreground">Enregistrez de nouvelles ventes et consultez l'historique.</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-primary/20" />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <SaleForm products={products} clients={clients} />
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Historique des Transactions</CardTitle>
                    <CardDescription>Liste chronologique des ventes effectuées.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Produit</TableHead>
                        <TableHead className="text-right">Quantité</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrichedSales.slice().reverse().map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell className="font-medium">{sale.client_name}</TableCell>
                          <TableCell>{sale.product_design}</TableCell>
                          <TableCell className="text-right font-bold text-accent">{sale.qtesortie}</TableCell>
                          <TableCell className="text-right">
                            <DeleteButton 
                              id={sale.id} 
                              onDelete={deleteSale} 
                              title={`la vente #${sale.id}`} 
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                      {enrichedSales.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                            Aucune vente enregistrée.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
