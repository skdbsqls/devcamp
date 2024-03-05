import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const phoneRegex = /^010\d{8}$/;

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "이름은 2글자 이상이어야 합니다.",
  }),
  email: z.string().email({
    message: "올바른 이메일을 입력해 주세요.",
  }),
  phone: z
    .string()
    .min(11, {
      message: "연락처는 11자리여야 합니다.",
    })
    .max(11, {
      message: "연락처는 11자리여야 합니다.",
    })
    .refine(
      (value) => phoneRegex.test(value),
      "010으로 시작하는 11자리 숫자를 입력해주세요"
    ),
  role: z.string().min(2, { message: "역할을 선택해주세요." }),
  password: z
    .string()
    .min(6, {
      message: "비밀번호는 최소 6자리 이상이어야 합니다.",
    })
    .refine(
      (value) => passwordRegex.test(value),
      "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
  confirm: z
    .string()
    .min(6, {
      message: "비밀번호는 최소 6자리 이상이어야 합니다.",
    })
    .refine(
      (value) => passwordRegex.test(value),
      "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
});
// .refine((data) => data.password === data.confirm, {
//   path: ["confirm"],
//   message: "비밀번호가 일치하지 않습니다.",
// });
