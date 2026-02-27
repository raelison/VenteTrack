import { fetchClients } from "@/lib/api";
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
import { Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function ClientsPage() {
  const clients = await fetchClients();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold text-primary font-headline">Répertoire Clients</h1>
              <p className="text-muted-foreground">Consultez et gérez votre base de données clients.</p>
            </div>
            <Users className="h-8 w-8 text-primary/20" />
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle>Clients Enregistrés</CardTitle>
                <CardDescription>Liste de tous les clients ayant un compte actif.</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un client..."
                  className="pl-8 bg-background border-muted"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Nom complet</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id} className="hover:bg-accent/5">
                      <TableCell className="font-mono text-xs text-muted-foreground">#{client.id}</TableCell>
                      <TableCell className="font-semibold">{client.nom}</TableCell>
                      <TableCell className="text-right">
                        <button className="text-primary hover:underline text-sm font-medium">Détails</button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {clients.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        Aucun client enregistré.
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