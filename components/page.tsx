"use client";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "이름은 2글자 이상이어야 합니다.",
  }),
  email: z.string().email({
    message: "올바른 이메일을 입력해 주세요.",
  }),
  phonenumber: z.string().min(11, {
    message: "연락처는 11자리여야 합니다.",
  }),
  role: z.string().nonempty("역할을 입력해 주세요."),
  password: z
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,}$/,
      "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
  confirm: z
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,}$/,
      "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
});
// .refine((data) => data.password === data.confirm, {
//   path: ["confirm"],
//   message: "비밀번호가 일치하지 않습니다.",
// });

const Home = () => {
  const { toast } = useToast();
  const [transformed, setTransformed] = useState(false);
  const handleButtonClick = () => {
    setTransformed(!transformed);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phonenumber: "",
      role: "",
      password: "",
      confirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirm) {
      toast({
        variant: "destructive",
        description: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }
    const userData = {
      name: values.name,
      email: values.email,
      phonenumber: values.phonenumber,
      role: values.role,
      password: values.password,
      confirm: values.confirm,
    };
    alert(JSON.stringify(userData, null, 2));
  }

  return (
    <div className="min-h-screen">
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-[380px]">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              회원가입
            </h3>
            <p className="text-sm text-muted-foreground">
              필수 정보를 입력해 주세요.
            </p>
          </div>
          <div className="p-6 pt-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative space-y-3 overflow-x-hidden"
              >
                <div
                  className="space-y-3"
                  style={{
                    transform: transformed
                      ? "translateX(0%) translateZ(0px)"
                      : "translateX(-100%) translateZ(0px)",
                    transition: "transform 0.5s ease-in-out",
                  }}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input placeholder="홍길동" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input placeholder="hello@devcamp.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>연락처</FormLabel>
                        <FormControl>
                          <Input placeholder="01012345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>역할</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="역할을 선택해주세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">관리자</SelectItem>
                            <SelectItem value="user">일반사용자</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className="space-y-3 absolute top-0 left-0 right-0"
                  style={{
                    transform: transformed
                      ? "translateX(100%) translateZ(0px)"
                      : "translateX(0%) translateZ(0px)",
                    transition: "transform 0.5s ease-in-out",
                  }}
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>비밀번호</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>비밀번호 확인</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <Button className={transformed ? "hidden" : ""} type="submit">
                    등록하기
                  </Button>
                  <Button
                    className={transformed ? "" : "hidden"}
                    type="button"
                    onClick={handleButtonClick}
                  >
                    다음 단계로
                  </Button>
                  <Button
                    className={transformed ? "hidden" : ""}
                    variant="ghost"
                    type="button"
                    onClick={handleButtonClick}
                  >
                    이전 단계로
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
