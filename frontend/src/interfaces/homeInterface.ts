import { CreateResponse, UpdateResponse } from "@refinedev/core";
import { FormEventHandler } from "react";
import { FieldValues } from "react-hook-form";

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
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleImageChange: (file: any) => void;
  onFinishedHandler: (values: FieldValues) => Promise<void>;
  propertyImages: { name: string; url: string };
}
