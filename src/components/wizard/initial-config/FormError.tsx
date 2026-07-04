interface FormErrorProps {
  message: string;
  id?: string;
}

export default function FormError({ message, id = 'form-error' }: FormErrorProps) {
  if (!message) return null;

  return (
    <div id={id} role="alert" className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
      {message}
    </div>
  );
}
