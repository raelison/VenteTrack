"use client";

import { useState } from "react";
import { Product, Client } from "@/lib/types";
import { createSale, updateProductStock } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShoppingCart, Loader2 } from "lucide-react";

const saleSchema = z.object({
  client: z.string().min(1, "Veuillez choisir un client"),
  produit: z.string().min(1, "Veuillez choisir un produit"),
  qtesortie: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "La quantité doit être un nombre supérieur à 0",
  }),
});

interface SaleFormProps {
  products: Product[];
  clients: Client[];
  onSuccess?: () => void;
}

export function SaleForm({ products, clients, onSuccess }: SaleFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof saleSchema>>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      client: "",
      produit: "",
      qtesortie: "",
    },
  });

  async function onSubmit(values: z.infer<typeof saleSchema>) {
    setLoading(true);
    const qte = Number(values.qtesortie);
    const prodId = Number(values.produit);
    const product = products.find(p => p.id === prodId);

    if (product && product.stock < qte) {
      toast({
        title: "Erreur de stock",
        description: `Stock insuffisant pour ${product.design}. Disponible: ${product.stock}`,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const saleResult = await createSale({
      client: Number(values.client),
      produit: prodId,
      qtesortie: qte,
    });

    if (saleResult) {
      if (product) {
        await updateProductStock(prodId, product.stock - qte);
      }
      
      toast({
        title: "Vente enregistrée",
        description: "La transaction a été complétée et le stock mis à jour.",
      });
      form.reset();
      if (onSuccess) onSuccess();
    } else {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer la vente sur le serveur.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <Card className="border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-accent" />
          Nouvelle Vente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients.map(c => (
                        <SelectItem key={c.id} value={c.id.toString()}>{c.nom}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="produit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produit</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un produit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map(p => (
                        <SelectItem key={p.id} value={p.id.toString()}>
                          {p.design} (Stock: {p.stock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qtesortie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantité vendue</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90" 
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Enregistrer la transaction"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}