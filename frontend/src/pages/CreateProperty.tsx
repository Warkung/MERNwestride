import { useGetIdentity } from "@refinedev/core";
import React, { useState } from "react";
import { Form } from "../components";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

function CreateProperty() {
  const { data: user } = useGetIdentity<any>();

  const [propertyImages, setPropertyImages] = useState({
    name: "",
    url: "",
  });

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    setPropertyImages({
      name: file.name,
      url: URL.createObjectURL(file),
    });
  };

  const onFinishedHandler = async (data: FieldValues) => {
    if (!propertyImages.name) return alert("Please upload an image");
    await onFinish({
      ...data,
      photo: propertyImages.url,
      email: user.email,
    });
  };

  return (
    <Form
      type="create"
      register={register}
      onFinish={onFinish}
      formloading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishedHandler={onFinishedHandler}
      propertyImages={propertyImages}
    />
  );
}

export default CreateProperty;
