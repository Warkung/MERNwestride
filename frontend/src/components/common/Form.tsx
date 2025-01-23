import {
  Box,
  Button,
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
import CustomButton from "./CustomButton";
import { FormProps } from "../../interfaces/homeInterface";


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
              {...register("title", { required: true })}
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
              {...register("description", { required: true })}
            />
          </FormControl>
          <Stack direction={{ xs: "column", sm: "row" }} gap={4}>
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
                {...register("propertyType", { required: true })}
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
                {...register("price", { required: true })}
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
              {...register("location", { required: true })}
            />
          </FormControl>
          <Stack direction="column" gap={1} justifyContent={"center"} mb={2}>
            <Stack direction={"row"} gap={2}>
              <Typography fontSize={16} fontWeight={500} my={"10px"}>
                Property Photo
              </Typography>
              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
              >
                upload *
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {                    
                    handleImageChange(e.target.files![0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              fontWeight={400}
              color={propertyImages?.name ? "green" : "#666"}
              sx={{ wordBreak: "break-all" }}
            >
              {propertyImages?.name || "No image selected"}
            </Typography>
          </Stack>
          <CustomButton
            type="submit"
            title={formloading ? "Loading..." : "Submit"}
            backgroundColor={"#475be8"}
            color={"#fff"}
          />
        </form>
      </Box>
    </Box>
  );
}

export default Form;
