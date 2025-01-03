import UpdateInformationForm from '../components/UpdateInformationForm';

export default function MyAccountPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-3">My Account</h1>
      <UpdateInformationForm />
    </div>
  );
}
