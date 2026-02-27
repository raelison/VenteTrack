"use client";

import { useState } from "react";
import { Client } from "@/lib/types";
import { createClient, updateClient } from "@/lib/api";
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

interface ClientDialogProps {
  client?: Client;
  onSuccess?: () => void;
}

export function ClientDialog({ client, onSuccess }: ClientDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState(client?.nom || "");
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const data = { nom };
    const success = client 
      ? await updateClient(client.id, data)
      : await createClient(data);

    if (success) {
      toast({
        title: client ? "Client mis à jour" : "Client ajouté",
        description: `${nom} a été enregistré avec succès.`,
      });
      setOpen(false);
      if (onSuccess) onSuccess();
    } else {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer le client.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {client ? (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
            <Edit2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Ajouter Client
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{client ? "Modifier le client" : "Nouveau client"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nom">Nom complet</Label>
              <Input
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex: Jean Marc"
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