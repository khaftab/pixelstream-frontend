import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  type: string;
}

const CustomFormField = ({ form, name, label, placeholder, type }: FormFieldProps) => {
  return (
    <div className="grid gap-2 flex-1">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={`${name}-input`}>{label}</FormLabel>
            <FormControl>
              <Input
                id={`${name}-input`}
                placeholder={placeholder}
                {...field}
                type={type || "text"}
              />
            </FormControl>
            <div className="min-h-[20px]">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormField;
