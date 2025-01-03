import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useState } from 'react';
import userService from '@/lib/user-service';
import { handleError } from '@/lib/utils';
import useAuthStore from '@/stores/authStore';

const updateInformationSchema = z.object({
  username: z
    .string()
    .trim()
    .min(8, { message: 'Username must have at least 8 characters.' })
    .toLowerCase(),
  email: z.string().email().toLowerCase().nullable(),
});

type UpdateInformationSchema = z.infer<typeof updateInformationSchema>;

const UpdateInformationForm = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateInformationSchema>({
    resolver: zodResolver(updateInformationSchema),
  });

  const handleUpdateInformation = async (data: UpdateInformationSchema) => {
    if (user) {
      setIsLoading(true);

      try {
        await userService.setUsernameAndEmail(
          user.uid,
          data.username,
          data.email || ''
        );

        window.location.reload();
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    }
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
          placeholder="Username*"
          {...register('username')}
          className={`w-full p-3 border rounded-lg outline-none ${
            errors.username ? 'border-red-500' : 'border-gray-300'
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
          {...register('email')}
          className={`w-full p-3 border rounded-lg outline-none ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <Button variant="formActive" size={'form'} disabled={isLoading}>
        {isLoading === true ? <LoadingSpinner size="small" /> : 'Save'}
      </Button>
    </form>
  );
};

export default UpdateInformationForm;
