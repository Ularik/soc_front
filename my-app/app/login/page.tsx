"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type { UserLoginMutation } from "@/types/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogin } from "@/lib/hooks/authHooks";

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending, error: apiError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginMutation>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: UserLoginMutation) {
    login(values, {
      onSuccess: () => {
        router.push("/reports/create")
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Вход в систему</CardTitle>
          <CardDescription className="text-center">
            Введите ваш username и пароль для авторизации
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Ошибка авторизации от сервера (например, "Неверный логин или пароль") */}
            {apiError && (
              <div className="p-3 text-sm rounded-md bg-destructive/15 text-destructive font-medium">
                {apiError.message || "Ошибка входа в систему"}
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                placeholder="johndoe"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-50"
                disabled={isPending}
                {...register("username", {
                  required: "Введите имя пользователя",
                })}
              />
              {errors.username && (
                <p className="text-sm font-medium text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-50"
                disabled={isPending}
                {...register("password", {
                  required: "Введите пароль",
                  minLength: {
                    value: 4,
                    message: "Пароль должен содержать минимум 4 символа",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm font-medium text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Вход..." : "Войти"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
