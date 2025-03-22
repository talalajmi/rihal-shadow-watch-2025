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

import { reportCrimeSchema } from "@/lib/validation";
import { toast } from "sonner";
import { useState } from "react";
import { addCrime } from "@/lib/actions/crime.action";
import { Crime } from "@/types/crime";

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
}

const ReportCrimeDialog = (props: ReportCrimeDialogProps) => {
  // ** Destructure props
  const { handleAddCrime } = props;

  // ** States
  const [isDialogopen, setIsDialogopen] = useState(false);

  // ** Form Validation
  const form = useForm<z.infer<typeof reportCrimeSchema>>({
    resolver: zodResolver(reportCrimeSchema),
    defaultValues,
  });

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

  return (
    <Dialog
      open={isDialogopen}
      onOpenChange={(isOpen) => setIsDialogopen(isOpen)}
    >
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
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crime Type</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => form.setValue("type", value)}
                      >
                        <SelectTrigger
                          className={`w-full
                            ${form.formState.errors.type && "border-red-500"}
                          `}
                        >
                          <SelectValue placeholder="Select a crime type">
                            {form.getValues("type")
                              ? crimeOptions.find(
                                  (option) => option === form.getValues("type")
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
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your national ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                          type="number"
                          step="any"
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
                          type="number"
                          step="any"
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
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportCrimeDialog;
