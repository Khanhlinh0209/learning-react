import { z } from "zod";

const DIFFICULTY_LEVELS = ["dễ", "trung bình", "khó", "rất khó"] as const;

export const ritualSchema = z.object({
  name: z.string().min(1, "Tên nghi lễ không được để trống"),
  dateLunar: z.string().min(1, "Ngày âm lịch không được để trống"),
  dateSolar: z.string().optional(),
  timeOfExecution: z.string().optional(),
  difficultyLevel: z.enum(DIFFICULTY_LEVELS, {
    message: "Vui lòng chọn độ khó",
  }),
  description: z.string().optional(),
  content: z.string().optional(),
  reference: z.string().optional(),
  isHot: z.boolean().catch(false),
  ritualCategoryId: z.string().optional(),
});

export type RitualFormData = z.infer<typeof ritualSchema>;
