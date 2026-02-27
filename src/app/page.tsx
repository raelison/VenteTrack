import { fetchProducts, fetchClients, fetchSales } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default async function DashboardPage() {
  const products = await fetchProducts();
  const clients = await fetchClients();
  const sales = await fetchSales();

  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const totalSalesCount = sales.length;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-8 space-y-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-primary font-headline">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue sur VenteTrack. Voici un aperçu de votre activité.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produits</CardTitle>
                <Package className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-xs text-muted-foreground">Total designs en stock</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clients</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clients.length}</div>
                <p className="text-xs text-muted-foreground">Portefeuille clients actif</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventes</CardTitle>
                <ShoppingCart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSalesCount}</div>
                <p className="text-xs text-muted-foreground">Transactions effectuées</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-accent/20 bg-accent/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stock Total</CardTitle>
                <TrendingUp className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{totalStock}</div>
                <p className="text-xs text-muted-foreground">Unités disponibles</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Produits en alerte (Stock bas)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.filter(p => p.stock < 10).map(p => (
                    <div key={p.id} className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-medium">{p.design}</span>
                        <span className="text-xs text-muted-foreground">ID: {p.id}</span>
                      </div>
                      <span className="bg-destructive/10 text-destructive px-2 py-1 rounded text-xs font-bold">
                        {p.stock} restant
                      </span>
                    </div>
                  ))}
                  {products.filter(p => p.stock < 10).length === 0 && (
                    <p className="text-sm text-muted-foreground">Aucun produit en stock critique.</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Derniers Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.slice(-5).map(c => (
                    <div key={c.id} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xs">
                        {c.nom.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium">{c.nom}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}