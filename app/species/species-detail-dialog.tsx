"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import Image from "next/image";  // Add this import at the top

type Species = Database["public"]["Tables"]["species"]["Row"];

interface SpeciesDetailDialogProps{
  species: Species;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SpeciesDetailDialog({
  species,
  open,
  onOpenChange,
}: SpeciesDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{species.common_name ?? species.scientific_name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid w-full gap-4">
          {species.image && (
            <div className="relative w-full h-64">
              <Image 
                src={species.image} 
                alt={species.common_name ?? species.scientific_name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}

          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Scientific Name</h3>
              <p className="text-base italic">{species.scientific_name}</p>
            </div>

            {species.common_name && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground">Common Name</h3>
                <p className="text-base">{species.common_name}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Kingdom</h3>
              <p className="text-base">{species.kingdom}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Total Population</h3>
              <p className="text-base">
                {species.total_population?.toLocaleString() ?? "Unknown"}
              </p>
            </div>

            {species.description && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground">Description</h3>
                <p className="text-base">{species.description}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}