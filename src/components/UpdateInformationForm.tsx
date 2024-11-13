import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const updateInformationSchema = z.object({
  username: z
    .string()
    .trim()
    .min(8, { message: "Username must have at least 8 characters." })
    .toLowerCase(),
  email: z.string().email().toLowerCase().nullable(),
});

type UpdateInformationSchema = z.infer<typeof updateInformationSchema>;

const UpdateInformationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateInformationSchema>({
    resolver: zodResolver(updateInformationSchema),
  });

  const handleUpdateInformation = (data: UpdateInformationSchema) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleUpdateInformation)}
      className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Update Data</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
          className={`w-full p-3 border rounded-lg outline-none ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="E-mail"
          {...register("email")}
          className={`w-full p-3 border rounded-lg outline-none ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full p-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save
      </button>
    </form>
  );
};

export default UpdateInformationForm;
