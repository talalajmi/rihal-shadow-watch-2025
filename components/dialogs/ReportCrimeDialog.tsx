import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ReportCrimeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" size="lg">
          Report Crime
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Crime</DialogTitle>
          <DialogDescription>
            Fill out the form below to report a crime.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <Label>Report Details</Label>
            <Input placeholder="Enter report details" />
          </div>
          <div className="space-y-2">
            <Label>Crime Type</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Crime Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assault">Assault</SelectItem>
                <SelectItem value="robbery">Robbery</SelectItem>
                <SelectItem value="homicide">Homicide</SelectItem>
                <SelectItem value="kidnapping">Kidnapping</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>National ID</Label>
            <Input type="number" placeholder="Enter your National ID" />
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="w-1/2 space-y-2">
              <Label>Latitude</Label>
              <Input type="number" placeholder="Enter latitude" />
            </div>
            <div className="w-1/2 space-y-2">
              <Label>Longitude</Label>
              <Input type="number" placeholder="Enter longitude" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
