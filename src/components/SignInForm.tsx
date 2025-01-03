import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import authService from '@/lib/auth-service';
import { handleError } from '@/lib/utils';
import useAuthStore from '@/stores/authStore';
import { ApplicationUser } from '@/types';
import LoadingButton from './ui/LoadingButton';
import appConstants from '@/lib/constants';
import firestoreClient from '@/lib/clients/firestore-client';

const signInSchema = z.object({
  username: z
    .string()
    .trim()
    .min(8, { message: 'Username must have at least 8 characters.' })
    .toLowerCase(),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must have at least 8 characters.' })
    .max(14),
});

type SignInSchema = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const { setUser, setLoading, isLoadingUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const handleSignIn = async (data: SignInSchema) => {
    setLoading(true);

    try {
      const userData = await authService.signIn(data.username, data.password);
      const userFromFirestore = await firestoreClient.getUserByUID(
        userData.user.uid
      );

      const applicationUser: ApplicationUser = {
        ...userData.user,
        username: userData.user.displayName || data.username,
        bookmarks: userFromFirestore?.bookmarks || [],
        sortOptions: userFromFirestore?.sortOptions || {},
        topics: userFromFirestore?.topics || appConstants.initialTopics,
      };

      setUser(applicationUser);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
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
          type="password"
          placeholder="Password"
          {...register('password')}
          className={`w-full p-3 border rounded-lg outline-none ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <LoadingButton type="submit" isLoading={isLoadingUser} className="w-full">
        Sign In
      </LoadingButton>
    </form>
  );
};

export default SignInForm;
