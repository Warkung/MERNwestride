import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { CreateResponse, UpdateResponse } from "@refinedev/core";
import React, { FormEventHandler } from "react";
import { FieldValues } from "react-hook-form";

interface FormProps {
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

function Form({
  type,
  register,
  onFinish,
  formloading,
  handleSubmit,
  handleImageChange,
  onFinishedHandler,
  propertyImages,
}: FormProps) {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700}>
        {type === "create" ? "Create Property" : "Edit Property"}
      </Typography>
      <Box mt={2.5} borderRadius={"15px"} padding={2} border={"1px solid #ccc"}>
        <form
          action=""
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          // onSubmit={handleSubmit(onFinishedHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
              }}
            >
              Enter property name
            </FormHelperText>
            <TextField
              fullWidth
              required
              color="info"
              placeholder="Property Name"
              variant="outlined"
              size="small"
              // {...register("title", { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
              }}
            >
              Enter property description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="Insert description"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "transparent",
                color: "gray",
                fontSize: "14px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
              }}
            />
          </FormControl>
          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                }}
              >
                Select property type
              </FormHelperText>
              <Select
                required
                variant="outlined"
                size="small"
                color="info"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={"apartment"}
              >
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="farmhouse">Farm house</MenuItem>
                <MenuItem value="condo">Condo</MenuItem>
                <MenuItem value="studio">Studio</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                }}
              >
                Enter property price
              </FormHelperText>
              <TextField
                fullWidth
                required
                color="info"
                placeholder="Property price"
                variant="outlined"
                size="small"
                // {...register("title", { required: true })}
              />
            </FormControl>
          </Stack>
          <FormControl>
          <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                }}
              >
                Enter property location
              </FormHelperText>
              <TextField
                fullWidth
                required
                color="info"
                placeholder="Property location"
                variant="outlined"
                size="small"
                // {...register("title", { required: true })}
              />
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}

export default Form;
