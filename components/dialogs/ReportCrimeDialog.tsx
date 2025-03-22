"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { reportCrimeSchema } from "@/lib/validation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { addCrime } from "@/lib/actions/crime.action";
import { Crime } from "@/types/crime";
import { Check, FilePenLine, MapPin, X } from "lucide-react";

const defaultValues = {
  details: "",
  type: "",
  nationalId: "",
  location: {
    lat: null,
    lng: null,
  },
};

const crimeOptions = ["Assault", "Robbery", "Homicide", "Kidnapping"];

interface ReportCrimeDialogProps {
  handleAddCrime: (crime: Crime) => void;
  selectedLocation?: { lat: number; lng: number } | null;
  isUserSelectingLocation: boolean;
  setIsUserSelectingLocation: (isSelecting: boolean) => void;
}

const ReportCrimeDialog = (props: ReportCrimeDialogProps) => {
  // ** Destructure props
  const {
    handleAddCrime,
    selectedLocation,
    setIsUserSelectingLocation,
    isUserSelectingLocation,
  } = props;

  // ** States
  const [isDialogopen, setIsDialogopen] = useState(false);

  // ** Form Validation
  const form = useForm<z.infer<typeof reportCrimeSchema>>({
    resolver: zodResolver(reportCrimeSchema),
    defaultValues,
  });

  useEffect(() => {
    if (selectedLocation) {
      form.setValue("location", selectedLocation);
    }
  }, [selectedLocation, form]);

  const onSubmit = async (data: z.infer<typeof reportCrimeSchema>) => {
    try {
      // ** Add crime to the database
      const crime = await addCrime(data);

      // ** Reset form
      form.reset(defaultValues);

      // ** Close dialog
      setIsDialogopen(false);

      toast.success("Crime reported successfully");

      handleAddCrime(crime);
    } catch (error) {
      console.error("Error reporting crime:", error);
      toast.error("Failed to report crime");
    }
  };

  const handleSelectLocationFromMap = () => {
    setIsDialogopen(false);
    setIsUserSelectingLocation(true);
  };

  const handleCancelSelection = () => {
    form.setValue("location", { lat: null, lng: null });
    setIsUserSelectingLocation(false);
  };

  return (
    <Dialog
      open={isDialogopen}
      onOpenChange={(isOpen) => setIsDialogopen(isOpen)}
    >
      <DialogTrigger asChild>
        <div className="flex flex-col items-center gap-5">
          {selectedLocation && isUserSelectingLocation ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    onClick={handleCancelSelection}
                    className="bg-red-500 hover:bg-red-600 rounded-full  transition duration-300 ease-in-out sm:hover:scale-105"
                  >
                    <X size={20} strokeWidth={2} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Cancel location selection</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
          <Button
            size="lg"
            onClick={() => {
              setIsDialogopen(true);
              setIsUserSelectingLocation(false);
            }}
            className={` transition duration-300 ease-in-out sm:hover:scale-105 rounded-full
            ${
              selectedLocation && isUserSelectingLocation
                ? "bg-green-600 hover:bg-green-700"
                : "bg-black hover:bg-gray-900"
            }
              `}
          >
            {selectedLocation && isUserSelectingLocation ? (
              <>
                <Check size={20} strokeWidth={2} />
                Confirm Location
              </>
            ) : (
              <>
                <FilePenLine size={20} />
                Report Crime
              </>
            )}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Report Crime</DialogTitle>
          <DialogDescription>
            Fill out the form below to report a crime.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Details</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter details of the crime"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="w-full sm:w-1/2 space-y-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crime Type</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(value) =>
                            form.setValue("type", value)
                          }
                        >
                          <SelectTrigger
                            className={`w-full
                            ${form.formState.errors.type && "border-red-500"}
                          `}
                          >
                            <SelectValue placeholder="Select a crime type">
                              {form.getValues("type")
                                ? crimeOptions.find(
                                    (option) =>
                                      option === form.getValues("type")
                                  )
                                : "Select a crime type"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {crimeOptions.map((crimeOption, i) => (
                              <SelectItem key={i} value={crimeOption}>
                                {crimeOption}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full sm:w-1/2 space-y-2">
                <FormField
                  control={form.control}
                  name="nationalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>National ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="numeric"
                          placeholder="Enter your national ID"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="space-y-2">
                <FormLabel>Location</FormLabel>
                <p className="text-gray-500 text-sm">
                  Click on the map to select the location where the crime
                  occurred
                </p>
              </div>
              <Button
                type="button"
                onClick={handleSelectLocationFromMap}
                className=" bg-blue-500 hover:bg-blue-600"
              >
                <MapPin size={20} />
                Select Crime Location
              </Button>
              <div className="flex items-center gap-3">
                <hr className="w-full" />
                <p>or</p>
                <hr className="w-full" />
              </div>
              <p className="text-gray-500 text-sm">
                Enter the latitude and longitude of the location where the crime
                occurred
              </p>
              <div className="flex justify-between items-center gap-2">
                <div className="w-1/2 space-y-2">
                  <FormField
                    control={form.control}
                    name="location.lat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            step="any"
                            type="number"
                            placeholder="Enter latitude"
                            value={
                              field.value !== null && field.value !== undefined
                                ? field.value
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              form.setValue(
                                "location.lat",
                                value === "" ? null : parseFloat(value)
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2 space-y-2">
                  <FormField
                    control={form.control}
                    name="location.lng"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            step="any"
                            type="number"
                            placeholder="Enter longitude"
                            value={
                              field.value !== null && field.value !== undefined
                                ? field.value
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              form.setValue(
                                "location.lng",
                                value === "" ? null : parseFloat(value)
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                <Check size={20} strokeWidth={2} />
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportCrimeDialog;
