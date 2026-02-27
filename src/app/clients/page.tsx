"use client";

import { useEffect, useState } from "react";
import { fetchClients, deleteClient } from "@/lib/api";
import { Client } from "@/lib/types";
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
import { Loader2 } from "lucide-react";
import { ClientDialog } from "@/components/clients/client-dialog";
import { DeleteButton } from "@/components/common/delete-button";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const loadClients = async () => {
    setLoading(true);
    const data = await fetchClients();
    setClients(data);
    setLoading(false);
  };

  useEffect(() => {
    loadClients();
  }, []);

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
            <ClientDialog onSuccess={loadClients} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Clients Enregistrés</CardTitle>
              <CardDescription>Liste de tous les clients ayant un compte actif.</CardDescription>
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
                      <TableHead>Nom complet</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id} className="hover:bg-accent/5">
                        <TableCell className="font-mono text-xs text-muted-foreground">#{client.id}</TableCell>
                        <TableCell className="font-semibold">{client.nom}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <ClientDialog client={client} onSuccess={loadClients} />
                            <DeleteButton id={client.id} onDelete={deleteClient} title={client.nom} onSuccess={loadClients} />
                          </div>
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
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}