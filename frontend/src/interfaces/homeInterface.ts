import { CreateResponse, UpdateResponse } from "@refinedev/core";
import { FormEventHandler } from "react";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

export interface PieChartProps {
  title: string;
  value: number;
  series: number[];
  colors: string[];
}

export interface FormProps {
  type: string;
  register: any;
  onFinish: (
    values: FieldValues
  ) => Promise<void | CreateResponse | UpdateResponse>;
  formloading: boolean;
  handleSubmit: UseFormHandleSubmit<FieldValues>
  handleImageChange: (file: any) => void;
  onFinishedHandler: (data: FieldValues) => Promise<void>;
  propertyImages: { name: string; url: string };
}
