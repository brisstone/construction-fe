import InputField from "@/components/input/InputField";
import PasswordInput from "@/components/input/PasswordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import useLoginAdmin from "@/hooks/api/mutation/auth/useLogin";
import { toast } from "sonner";
import { UserRole } from "@/utils";

const Loginschema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter the correct email for account.",
    })
    .refine((s) => !s.includes(" "), "No spaces allowed"),
  password: z
    .string()
    .min(6, { message: "password must contain at least 6 characters" }),
});

type FormData = z.infer<typeof Loginschema>;

const Login = () => {
  const { setAccessToken, setCurrentUser, applyUserTheme } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      email: "",
    },
    resolver: zodResolver(Loginschema),
    mode: "onChange",
  });

  const { mutateAsync, isPending } = useLoginAdmin();

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key].toString());
        }
      });

      await mutateAsync(formData, {
        onSuccess: (response: any) => {
          const token = response?.data?.data?.accessToken;
          const user = response?.data?.data;
          response.data.data.primaryColor = "red" //"#3948CC" // "red";

          console.log(response)
          if (token && user) {
            setAccessToken(token);
            setCurrentUser(user);
          }

          applyUserTheme();

          if (user.role === UserRole.SUPER_ADMIN) {
            navigate("/super-admin");
          } else if (user.role === UserRole.ADMIN) {
            navigate("/admin/dashboard");
          } else {
            toast.error("Unauthorized Access");
          }

          toast.success(response?.data?.message || "Login successful");
          console.log(response, "responsebyzeek");
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "invalid details");
        },
      });
    } catch (error) {
      console.log("An error occurred: ", error);
    }

    // const response = {
    //   email: data?.email,
    //   primaryColor: "red",
    // };
    // try {
    //   if (data) {
    //     const user = response;
    //     setCurrentUser(user);

    //     // Apply the user's theme immediately after login
    //     applyUserTheme();

    //     navigate("/admin/dashboard");
    //   }
    // } catch (error) {
    //   console.log("An error occurred: ", error);
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-[50%] sm:p-8 p-4 w-11/12 h-[70vh] overflow-y-scroll scrollbar-hidden rounded-[12px] bg-white shadow-authshadow"
      >
        <h2 className="text-center text-2xl font-bold text-mediumBlue my-6">
          Log In
        </h2>
        <section>
          {errors.email && (
            <div className="w-full border border-dashed border-red-500 px-4 py-1  my-4 text-black text-sm font-semibold">
              {errors.email?.message}
            </div>
          )}
          <InputField
            label="Email Address"
            type="email"
            {...register("email")}
            name="email"
            placeholder="Enter email address"
          />
          {errors.password && (
            <div className="w-full border border-dashed border-red-500 px-4 py-1  my-4 text-black text-sm font-semibold">
              {errors.password?.message}
            </div>
          )}
          <PasswordInput
            {...register("password")}
            name="password"
            placeholder="Enter password"
            label="Password"
          />
          <Button className="h-14 w-full mt-8  rounded-[28px] text-white bg-deepBlue mx-auto">
            {isPending ? "loading..." : "Login"}
          </Button>
        </section>
      </form>
    </div>
  );
};

export default Login;
