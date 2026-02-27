"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { createProduct, updateProduct } from "@/lib/api";
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
import { Plus, Edit2, Loader2 } from "lucide-react";

interface ProductDialogProps {
  product?: Product;
}

export function ProductDialog({ product }: ProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [design, setDesign] = useState(product?.design || "");
  const [stock, setStock] = useState(product?.stock?.toString() || "0");
  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const data = { design, stock: Number(stock) };
    const success = product 
      ? await updateProduct(product.id, data)
      : await createProduct(data);

    if (success) {
      toast({
        title: product ? "Produit mis à jour" : "Produit créé",
        description: `${design} a été enregistré avec succès.`,
      });
      setOpen(false);
      router.refresh();
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {product ? (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
            <Edit2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Nouveau Produit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{product ? "Modifier le produit" : "Ajouter un produit"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="design">Désignation</Label>
              <Input
                id="design"
                value={design}
                onChange={(e) => setDesign(e.target.value)}
                placeholder="Ex: Laptop Dell"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock Initial</Label>
              <Input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
