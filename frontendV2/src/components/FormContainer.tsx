interface FormContainerProps {
  children: React.ReactNode;
}

function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="min-h-fit flex items-start justify-center">
      <div className="max-w-md w-full p-6">
        {children}
      </div>
    </div>
  );
}

export default FormContainer;