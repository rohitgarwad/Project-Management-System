import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { login } from "@/redux/Auth/Action";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    // Handle form submission here
    dispatch(login(data));
    //console.log("login form", data);
    navigate("/");
  };
  return (
    <div className="space-y-5">
      <h1 className="text-center text-xl">Log In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-inherit py-5 px-5"
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password" // Added password field
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password" // Added type attribute for password input
                    className="border w-full border-inherit py-5 px-5"
                    placeholder="Enter your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full border-inherit py-5">
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
