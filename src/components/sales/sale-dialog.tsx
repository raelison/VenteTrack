"use client";

import { useState } from "react";
import { Product, Client, Sale } from "@/lib/types";
import { updateSale, updateProductStock } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit2, Loader2 } from "lucide-react";

interface SaleDialogProps {
  sale: Sale;
  products: Product[];
  clients: Client[];
  onSuccess?: () => void;
}

export function SaleDialog({ sale, products, clients, onSuccess }: SaleDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qtesortie, setQtesortie] = useState(sale.qtesortie.toString());
  const [clientId, setClientId] = useState(sale.client.toString());
  const [produitId, setProduitId] = useState(sale.produit.toString());
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const newQte = Number(qtesortie);
    const oldQte = sale.qtesortie;
    const diff = newQte - oldQte;
    
    const product = products.find(p => p.id === Number(produitId));

    if (product && product.stock < diff) {
      toast({
        title: "Erreur de stock",
        description: `Stock insuffisant pour augmenter la vente. Disponible: ${product.stock}`,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const success = await updateSale(sale.id, {
      qtesortie: newQte,
      client: Number(clientId),
      produit: Number(produitId),
    });

    if (success) {
      // Ajuster le stock du produit si la quantité a changé
      if (product && diff !== 0) {
        await updateProductStock(product.id, product.stock - diff);
      }

      toast({
        title: "Vente modifiée",
        description: "La transaction a été mise à jour.",
      });
      setOpen(false);
      if (onSuccess) onSuccess();
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la vente.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier la vente #{sale.id}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Client</Label>
              <Select onValueChange={setClientId} value={clientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(c => (
                    <SelectItem key={c.id} value={c.id.toString()}>{c.nom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Produit</Label>
              <Select onValueChange={setProduitId} value={produitId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un produit" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(p => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.design} (Stock: {p.stock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="qtesortie">Quantité vendue</Label>
              <Input
                id="qtesortie"
                type="number"
                value={qtesortie}
                onChange={(e) => setQtesortie(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
